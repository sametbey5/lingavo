
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VocabWord } from '../types';
import { Gamepad2, RotateCcw, ChevronLeft, Trophy, Heart, Zap, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGamification } from '../context/GamificationContext';
import Button from '../components/Button';
import Confetti from '../components/Confetti';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES: { id: string; label: string; color: string; words: VocabWord[] }[] = [
  { 
    id: 'family', 
    label: 'FAMILY', 
    color: '#F06292', 
    words: [
      { word: 'Mother', definition: 'A female parent', exampleSentence: 'My mother is a teacher.', cefrLevel: 'A1' },
      { word: 'Father', definition: 'A male parent', exampleSentence: 'My father is a doctor.', cefrLevel: 'A1' },
      { word: 'Brother', definition: 'A male sibling', exampleSentence: 'I have one younger brother.', cefrLevel: 'A1' },
      { word: 'Sister', definition: 'A female sibling', exampleSentence: 'My sister is older than me.', cefrLevel: 'A1' },
      { word: 'Uncle', definition: 'The brother of your father or mother', exampleSentence: 'My uncle lives in London.', cefrLevel: 'A2' },
      { word: 'Aunt', definition: 'The sister of your father or mother', exampleSentence: 'My aunt is visiting us today.', cefrLevel: 'A2' },
      { word: 'Cousin', definition: 'The child of your aunt or uncle', exampleSentence: 'I am playing with my cousin.', cefrLevel: 'A2' }
    ] 
  },
  { 
    id: 'animal', 
    label: 'ANIMALS', 
    color: '#AED581', 
    words: [
      { word: 'Lion', definition: 'A large wild cat', exampleSentence: 'The lion is the king of the jungle.', cefrLevel: 'A1' },
      { word: 'Tiger', definition: 'A large cat with orange and black stripes', exampleSentence: 'Tigers are very fast.', cefrLevel: 'A1' },
      { word: 'Elephant', definition: 'A very large animal with a long trunk', exampleSentence: 'Elephants have big ears.', cefrLevel: 'A1' },
      { word: 'Giraffe', definition: 'An animal with a very long neck', exampleSentence: 'The giraffe eats leaves from tall trees.', cefrLevel: 'A1' },
      { word: 'Monkey', definition: 'A clever animal that lives in trees', exampleSentence: 'Monkeys like to eat bananas.', cefrLevel: 'A1' },
      { word: 'Zebra', definition: 'A horse-like animal with black and white stripes', exampleSentence: 'Zebras live in Africa.', cefrLevel: 'A1' },
      { word: 'Panda', definition: 'A black and white bear from China', exampleSentence: 'Pandas eat bamboo.', cefrLevel: 'A2' }
    ] 
  },
  { 
    id: 'food', 
    label: 'FOOD', 
    color: '#FFD54F', 
    words: [
      { word: 'Pizza', definition: 'An Italian dish with cheese and tomato', exampleSentence: 'I love eating cheese pizza.', cefrLevel: 'A1' },
      { word: 'Burger', definition: 'A sandwich with meat and lettuce', exampleSentence: 'The burger was delicious.', cefrLevel: 'A1' },
      { word: 'Pasta', definition: 'Italian food made from flour and water', exampleSentence: 'I like pasta with tomato sauce.', cefrLevel: 'A1' },
      { word: 'Bread', definition: 'A common food made from baked dough', exampleSentence: 'I have bread for breakfast.', cefrLevel: 'A1' },
      { word: 'Apple', definition: 'A round fruit that can be red or green', exampleSentence: 'An apple a day keeps the doctor away.', cefrLevel: 'A1' },
      { word: 'Banana', definition: 'A long yellow fruit', exampleSentence: 'Monkeys love bananas.', cefrLevel: 'A1' },
      { word: 'Sushi', definition: 'A Japanese dish with rice and fish', exampleSentence: 'I enjoyed the fresh sushi.', cefrLevel: 'B1' }
    ] 
  },
  { 
    id: 'color', 
    label: 'COLORS', 
    color: '#64B5F6', 
    words: [
      { word: 'Red', definition: 'The color of tomatoes', exampleSentence: 'The rose is red.', cefrLevel: 'A1' },
      { word: 'Blue', definition: 'The color of the sky', exampleSentence: 'The sky is clear and blue.', cefrLevel: 'A1' },
      { word: 'Green', definition: 'The color of grass', exampleSentence: 'The grass is very green in spring.', cefrLevel: 'A1' },
      { word: 'Yellow', definition: 'The color of lemons', exampleSentence: 'The sun is bright yellow.', cefrLevel: 'A1' },
      { word: 'Purple', definition: 'A color made by mixing red and blue', exampleSentence: 'Purple is my favorite color.', cefrLevel: 'A1' },
      { word: 'Orange', definition: 'The color of carrots', exampleSentence: 'The orange is sweet and juicy.', cefrLevel: 'A1' },
      { word: 'Pink', definition: 'A pale red color', exampleSentence: 'She is wearing a pink dress.', cefrLevel: 'A1' }
    ] 
  }
];

interface Brick {
  x: number;
  y: number;
  width: number;
  height: number;
  wordObj: VocabWord;
  category: string;
  color: string;
  status: number; // 1 = ok, 0 = broken
}

const VocabBreaker: React.FC = () => {
  const navigate = useNavigate();
  const { awardPoints, addToWordBank, cefrLevel } = useGamification();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [targetCategory, setTargetCategory] = useState(CATEGORIES[1]);
  const [feedback, setFeedback] = useState<string | null>(null);
  
  // Game state refs for the loop
  const requestRef = useRef<number>();
  const ballPos = useRef({ x: 0, y: 0 });
  const ballVel = useRef({ dx: 2.5, dy: -2.5 });
  const paddlePos = useRef({ x: 0 });
  const bricksRef = useRef<Brick[]>([]);
  
  const canvasWidth = 800;
  const canvasHeight = 500;
  const ballRadius = 8;
  const paddleHeight = 12;
  const paddleWidth = 100;
  
  const brickRowCount = 5;
  const brickColumnCount = 8;
  const brickWidth = 85;
  const brickHeight = 35;
  const brickPadding = 10;
  const brickOffsetTop = 50;
  const brickOffsetLeft = 35;

  const initGame = useCallback(() => {
    const target = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    setTargetCategory(target);
    
    ballPos.current = { x: canvasWidth / 2, y: canvasHeight - 30 };
    ballVel.current = { dx: 2.5 * (Math.random() > 0.5 ? 1 : -1), dy: -2.5 };
    paddlePos.current = { x: (canvasWidth - paddleWidth) / 2 };
    
    const newBricks: Brick[] = [];
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        
        const isTarget = Math.random() > 0.6;
        let cat;
        if (isTarget) {
          cat = target;
        } else {
          cat = CATEGORIES.filter(ca => ca.id !== target.id)[Math.floor(Math.random() * (CATEGORIES.length - 1))];
        }
        
        newBricks.push({
          x: brickX,
          y: brickY,
          width: brickWidth,
          height: brickHeight,
          wordObj: cat.words[Math.floor(Math.random() * cat.words.length)],
          category: cat.id,
          color: cat.color,
          status: 1,
        });
      }
    }
    bricksRef.current = newBricks;
  }, []);

  const startGame = () => {
    setScore(0);
    setLives(3);
    initGame();
    setGameState('playing');
  };

  const drawBall = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(ballPos.current.x, ballPos.current.y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
    
    // Ball glow
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#ffffff";
  };

  const drawPaddle = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.roundRect(paddlePos.current.x, canvasHeight - paddleHeight - 10, paddleWidth, paddleHeight, 6);
    ctx.fillStyle = "#0d75eb";
    ctx.fill();
    ctx.closePath();
    
    // Paddle shadow/glow
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#0d75eb";
  };

  const drawBricks = (ctx: CanvasRenderingContext2D) => {
    bricksRef.current.forEach(brick => {
      if (brick.status === 1) {
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.roundRect(brick.x, brick.y, brick.width, brick.height, 8);
        ctx.fillStyle = brick.color;
        ctx.fill();
        ctx.closePath();
        
        // Brick text
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 12px 'Avenir Next Rounded', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(brick.wordObj.word, brick.x + brickWidth / 2, brick.y + brickHeight / 2 + 5);
      }
    });
  };

  const collisionDetection = () => {
    bricksRef.current.forEach(brick => {
      if (brick.status === 1) {
        if (
          ballPos.current.x > brick.x &&
          ballPos.current.x < brick.x + brick.width &&
          ballPos.current.y > brick.y &&
          ballPos.current.y < brick.y + brick.height
        ) {
          ballVel.current.dy = -ballVel.current.dy;
          brick.status = 0;
          
          // Add to learned list
          addToWordBank(brick.wordObj, 'Vocab Breaker');

          if (brick.category === targetCategory.id) {
            setScore(s => s + 50);
            setFeedback("+50 TARGET!");
          } else {
            setScore(s => s + 10);
            setFeedback("+10");
          }
          setTimeout(() => setFeedback(null), 800);
          
          // Check if win
          const activeBricks = bricksRef.current.filter(b => b.status === 1);
          if (activeBricks.length === 0) {
            setGameState('end');
          }
        }
      }
    });
  };

  const update = () => {
    if (gameState !== 'playing') return;

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    drawBricks(ctx);
    drawBall(ctx);
    drawPaddle(ctx);
    collisionDetection();

    // Wall bounce
    if (ballPos.current.x + ballVel.current.dx > canvasWidth - ballRadius || ballPos.current.x + ballVel.current.dx < ballRadius) {
      ballVel.current.dx = -ballVel.current.dx;
    }
    if (ballPos.current.y + ballVel.current.dy < ballRadius) {
      ballVel.current.dy = -ballVel.current.dy;
    } else if (ballPos.current.y + ballVel.current.dy > canvasHeight - ballRadius - 10) {
      // Paddle bounce
      if (ballPos.current.x > paddlePos.current.x && ballPos.current.x < paddlePos.current.x + paddleWidth) {
        ballVel.current.dy = -ballVel.current.dy;
        // Add some spin based on where it hits the paddle
        const hitPoint = (ballPos.current.x - (paddlePos.current.x + paddleWidth / 2)) / (paddleWidth / 2);
        ballVel.current.dx = 8 * hitPoint;
      } else {
        // Fall down
        setLives(l => {
          if (l <= 1) {
            setGameState('end');
            return 0;
          }
          ballPos.current = { x: canvasWidth / 2, y: canvasHeight - 30 };
          ballVel.current = { dx: 2.5, dy: -2.5 };
          return l - 1;
        });
      }
    }

    ballPos.current.x += ballVel.current.dx;
    ballPos.current.y += ballVel.current.dy;

    // Ball speed stays slow as per user request
    requestRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    if (gameState === 'playing') {
      requestRef.current = requestAnimationFrame(update);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const root = document.documentElement;
    const mouseX = e.clientX - rect.left - root.scrollLeft;
    paddlePos.current.x = Math.max(0, Math.min(canvasWidth - paddleWidth, mouseX - paddleWidth / 2));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !e.touches[0]) return;
    const mouseX = e.touches[0].clientX - rect.left;
    paddlePos.current.x = Math.max(0, Math.min(canvasWidth - paddleWidth, mouseX - paddleWidth / 2));
  };

  if (gameState === 'start') {
    return (
      <div className="min-h-[80vh] bg-slate-900 rounded-[3rem] flex flex-col items-center justify-center text-white p-10 relative overflow-hidden border-8 border-slate-800">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,#0d75eb_1px,transparent_1px)] bg-[size:40px_40px]" />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Gamepad2 size={120} className="text-fun-blue mb-6" />
        </motion.div>
        <h2 className="text-6xl font-black tracking-tighter text-white drop-shadow-[0_0_20px_rgba(13,117,235,0.5)]">VOCAB BREAKER</h2>
        <p className="text-xl font-bold text-slate-400 mt-4 max-w-md text-center">Break the blocks and find the words! Target correct items for massive bonus points!</p>
        
        <div className="mt-10 grid grid-cols-2 gap-4 max-w-lg w-full">
            <div className="bg-white/5 p-6 rounded-3xl border-2 border-white/10 text-center">
                <Sparkles className="text-fun-yellow mx-auto mb-2" />
                <h3 className="font-black text-sm uppercase text-slate-500">Bonus</h3>
                <p className="text-lg font-bold">50 XP per target block</p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border-2 border-white/10 text-center">
                <Zap className="text-fun-blue mx-auto mb-2" />
                <h3 className="font-black text-sm uppercase text-slate-500">Speed</h3>
                <p className="text-lg font-bold">Ball gets faster over time</p>
            </div>
        </div>

        <div className="mt-12">
           <Button onClick={startGame} className="px-12 py-6 text-2xl shadow-[0_0_30px_rgba(13,117,235,0.4)]" variant="primary">
              LAUNCH GAME
           </Button>
        </div>
      </div>
    );
  }

  if (gameState === 'end') {
    return (
      <div className="min-h-[80vh] bg-slate-900 rounded-[3rem] flex flex-col items-center justify-center text-white p-10 relative overflow-hidden border-8 border-slate-800">
        {score > 500 && <Confetti />}
        <Trophy size={100} className="text-fun-yellow mb-6" />
        <h2 className="text-6xl font-black text-white mb-6 uppercase tracking-tighter">Mission Results</h2>
        
        <div className="bg-white/10 p-8 rounded-3xl border-4 border-white/20 mb-10 text-center w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">Final XP</span>
                <span className="text-4xl font-black text-fun-blue">{score}</span>
            </div>
            <div className="h-px bg-white/10 mb-4" />
            <div className="flex justify-between items-center">
                <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">Performance</span>
                <span className="text-xl font-bold">{score > 1000 ? 'LEGENDARY' : score > 500 ? 'EXPERT' : 'GOOD'}</span>
            </div>
        </div>

        <div className="flex gap-4">
             <Button onClick={() => navigate('/')} variant="secondary">STATION</Button>
             <Button onClick={() => { awardPoints(score, 'Vocab Breaker Score'); startGame(); }} variant="primary" icon={<RotateCcw/>}>RE-ENTRY</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-slate-950 rounded-[3rem] p-8 flex flex-col relative overflow-hidden border-8 border-slate-800 shadow-2xl">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-fun-blue/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-fun-pink/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      {/* Header */}
      <div className="flex justify-between items-center mb-8 z-10">
         <button onClick={() => navigate('/')} className="bg-white/5 p-3 rounded-2xl text-slate-400 hover:bg-white/10 hover:text-white font-bold flex items-center gap-2 transition-all">
            <ChevronLeft size={20} /> Abort Mission
         </button>
         
         <div className="flex items-center gap-4 bg-white/5 px-8 py-3 rounded-full border-2 border-white/10 backdrop-blur-md">
             <div className="flex items-center gap-2">
                 <Sparkles size={20} className="text-fun-yellow" />
                 <span className="text-white font-black text-2xl tracking-tight">{score}</span>
             </div>
             <div className="w-px h-6 bg-white/10" />
             <div className="flex items-center gap-2">
                 {[...Array(3)].map((_, i) => (
                    <Heart 
                      key={i} 
                      size={20} 
                      className={i < lives ? "fill-fun-pink text-fun-pink" : "text-white/10"} 
                    />
                 ))}
             </div>
         </div>
      </div>

      {/* Target Category UI */}
      <div className="text-center mb-6 z-10 relative">
         <motion.div 
           initial={{ y: -20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="inline-block px-10 py-5 rounded-[2.5rem] bg-white text-slate-900 shadow-[0_10px_40px_rgba(0,0,0,0.3)] border-b-8 border-slate-200"
         >
            <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] block mb-1">TARGET CLASSIFICATION</span>
            <span className="text-4xl font-black tracking-tighter flex items-center gap-4">
                BRICK TYPE: <span style={{ color: targetCategory.color }}>{targetCategory.label}s</span>
            </span>
         </motion.div>
         
         <AnimatePresence>
            {feedback && (
                <motion.div 
                    key={feedback + Date.now()}
                    initial={{ scale: 0.5, opacity: 0, y: 0 }}
                    animate={{ scale: 1.2, opacity: 1, y: -20 }}
                    exit={{ scale: 1.5, opacity: 0, y: -40 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 text-fun-yellow font-black text-5xl drop-shadow-lg"
                >
                    {feedback}
                </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* Main Game Stage */}
      <div className="flex-1 flex items-center justify-center relative touch-none">
         <div className="relative p-4 bg-white/5 rounded-[2rem] border-4 border-white/10 backdrop-blur-sm overflow-hidden shadow-inner">
            <canvas
              ref={canvasRef}
              width={canvasWidth}
              height={canvasHeight}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="max-w-full h-auto cursor-none"
            />
            
            {/* Grid Pattern in Canvas bg */}
            <div className="absolute inset-0 -z-10 opacity-5 pointer-events-none">
               <div className="w-full h-full bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>
         </div>
      </div>

      {/* Controls Hint */}
      <div className="mt-6 text-center text-slate-500 font-bold text-sm tracking-widest uppercase">
         Use Mouse or Touch to move the Shield
      </div>
    </div>
  );
};

export default VocabBreaker;
