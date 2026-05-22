
import React, { useState, useEffect, useRef } from 'react';
import { useGamification } from '../context/GamificationContext';
import { Trophy, Users, Zap, Timer, Flag, CheckCircle2, XCircle, Home, Flame, Award, RefreshCw, Info, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import { motion, AnimatePresence } from 'motion/react';
import { generateRaceQuestions } from '../services/geminiService';
import { supabase } from '../services/supabaseClient';

interface Opponent {
  name: string;
  avatar: string;
  progress: number;
  speed: number; // questions per second approx
}

interface Question {
  id: string;
  type: 'meaning' | 'fill' | 'correction' | 'synonym';
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface Mistake {
  question: string;
  yourAnswer: string;
  correctAnswer: string;
  explanation: string;
}

const OPPONENTS: Opponent[] = [
  { name: "Speedy Sam", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam", progress: 0, speed: 0.15 },
  { name: "Quick Quinn", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Quinn", progress: 0, speed: 0.18 },
  { name: "Turbo Tom", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom", progress: 0, speed: 0.22 },
  { name: "Flash Fiona", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fiona", progress: 0, speed: 0.25 },
];

const RaceMode: React.FC = () => {
  const { userId, stats, cefrLevel, awardPoints } = useGamification();
  
  // Game State
  const [gameState, setGameState] = useState<'idle' | 'matching' | 'playing' | 'results'>('idle');
  const [isRealOpponent, setIsRealOpponent] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isPenalty, setIsPenalty] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  
  // Opponent State
  const [opponent, setOpponent] = useState<Opponent | null>(null);
  const [opponentProgress, setOpponentProgress] = useState(0);
  
  // Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const opponentTimerRef = useRef<NodeJS.Timeout | null>(null);
  const matchingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lobbyChannelRef = useRef<any>(null);
  const gameChannelRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (opponentTimerRef.current) clearInterval(opponentTimerRef.current);
      if (matchingTimeoutRef.current) clearTimeout(matchingTimeoutRef.current);
      if (lobbyChannelRef.current) lobbyChannelRef.current.unsubscribe();
      if (gameChannelRef.current) gameChannelRef.current.unsubscribe();
    };
  }, []);

  // --- Matching Logic ---

  const startMatching = () => {
    setGameState('matching');
    setIsRealOpponent(false);
    
    const lobbyId = `race_lobby:${cefrLevel || 'A1'}`;
    const channel = supabase.channel(lobbyId, {
      config: { presence: { key: userId || 'anonymous' } }
    });

    lobbyChannelRef.current = channel;

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const players = Object.keys(state).filter(id => id !== userId);
        
        if (players.length > 0) {
          const opponentId = players[0];
          const isHost = (userId || '') < opponentId;
          const matchRoomId = isHost ? `match_${userId}_${opponentId}` : `match_${opponentId}_${userId}`;
          
          if (isHost) {
            channel.send({
              type: 'broadcast',
              event: 'match_found',
              payload: { hostId: userId, opponentId, roomId: matchRoomId }
            });
          }
        }
      })
      .on('broadcast', { event: 'match_found' }, (payload: any) => {
        if (payload.opponentId === userId || payload.hostId === userId) {
          if (matchingTimeoutRef.current) clearTimeout(matchingTimeoutRef.current);
          channel.unsubscribe();
          startRealMatch(payload.roomId, payload.hostId === userId ? 'host' : 'guest');
        }
      })
      .subscribe(async (status: string) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ userId, joinedAt: Date.now() });
        }
      });

    // Fallback to bot after 10 seconds
    matchingTimeoutRef.current = setTimeout(() => {
      if (lobbyChannelRef.current) lobbyChannelRef.current.unsubscribe();
      startBotMatch();
    }, 10000);
  };

  const startBotMatch = () => {
    const randomOpponent = OPPONENTS[Math.floor(Math.random() * OPPONENTS.length)];
    setOpponent({ ...randomOpponent, progress: 0 });
    setIsRealOpponent(false);
    loadQuestions();
  };

  const startRealMatch = async (roomId: string, role: 'host' | 'guest') => {
    setIsRealOpponent(true);
    const channel = supabase.channel(`race_game:${roomId}`);
    gameChannelRef.current = channel;

    channel
      .on('broadcast', { event: 'start_game' }, (payload: any) => {
        if (role === 'guest') {
          setQuestions(payload.questions);
          setOpponent({
            name: payload.hostName,
            avatar: payload.hostAvatar,
            progress: 0,
            speed: 0
          });
          setGameState('playing');
          startTimers();
        }
      })
      .on('broadcast', { event: 'progress_update' }, (payload: any) => {
        if (payload.userId !== userId) {
          setOpponentProgress(payload.progress);
        }
      })
      .subscribe(async (status: string) => {
        if (status === 'SUBSCRIBED' && role === 'host') {
          const q = await generateRaceQuestions(cefrLevel);
          setQuestions(q);
          setOpponent({
            name: "Opponent", // Will be updated by presence if needed, but broadcast is simpler
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Opponent",
            progress: 0,
            speed: 0
          });
          
          // Host sends questions to guest
          channel.send({
            type: 'broadcast',
            event: 'start_game',
            payload: { 
              questions: q, 
              hostName: userId, 
              hostAvatar: stats.avatar 
            }
          });
          
          setGameState('playing');
          startTimers();
        }
      });
  };

  const loadQuestions = async () => {
    const q = await generateRaceQuestions(cefrLevel);
    setQuestions(q);
    setGameState('playing');
    startTimers();
  };

  const startTimers = () => {
    setTimeLeft(45);
    setCurrentIndex(0);
    setScore(0);
    setCombo(0);
    setOpponentProgress(0);
    setMistakes([]);

    // Main Game Timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Opponent Progress Simulation (Only for bots)
    if (!isRealOpponent) {
      opponentTimerRef.current = setInterval(() => {
        setOpponentProgress((prev) => {
          if (prev >= 100) return 100;
          // Random progress based on opponent speed
          const increment = Math.random() * 5 * (opponent?.speed || 0.2) * 10;
          return Math.min(100, prev + increment);
        });
      }, 1500);
    }
  };

  const endGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (opponentTimerRef.current) clearInterval(opponentTimerRef.current);
    if (gameChannelRef.current) gameChannelRef.current.unsubscribe();
    setGameState('results');
    
    // Award points if won or played well
    const playerProgress = (currentIndex / questions.length) * 100;
    if (playerProgress > opponentProgress) {
      awardPoints(200 + score, 'Race Victory!', 'vocabulary');
    } else {
      awardPoints(50 + Math.floor(score / 2), 'Race Participation', 'vocabulary');
    }
  };

  const handleAnswer = (selectedOption: string) => {
    if (isPenalty || gameState !== 'playing') return;

    const currentQ = questions[currentIndex];
    const isCorrect = selectedOption === currentQ.answer;

    if (isCorrect) {
      setFeedback('correct');
      const newCombo = combo + 1;
      setCombo(newCombo);
      
      // Score calculation: speed bonus + combo multiplier
      const speedBonus = Math.floor(timeLeft / 2);
      const comboMultiplier = Math.min(3, 1 + Math.floor(newCombo / 3) * 0.5);
      setScore(prev => prev + Math.floor((10 + speedBonus) * comboMultiplier));

      setTimeout(() => {
        setFeedback(null);
        const nextIndex = currentIndex + 1;
        const isFinished = nextIndex >= questions.length;
        
        // Broadcast progress if real opponent
        if (isRealOpponent && gameChannelRef.current) {
          gameChannelRef.current.send({
            type: 'broadcast',
            event: 'progress_update',
            payload: { 
              userId, 
              progress: (nextIndex / questions.length) * 100 
            }
          });
        }

        if (isFinished) {
          endGame();
        } else {
          setCurrentIndex(nextIndex);
        }
      }, 300);
    } else {
      setFeedback('wrong');
      setCombo(0);
      setIsPenalty(true);
      
      // Record mistake
      setMistakes(prev => [
        ...prev,
        {
          question: currentQ.question,
          yourAnswer: selectedOption,
          correctAnswer: currentQ.answer,
          explanation: currentQ.explanation
        }
      ].slice(0, 3)); // Keep last 3 mistakes

      // 1-second freeze penalty
      setTimeout(() => {
        setIsPenalty(false);
        setFeedback(null);
        // Don't skip the question, let them try again or just move on?
        // User said "penalty for wrong answers: small time loss or 1-second freeze"
        // Let's move to next question after penalty to keep it fast
        if (currentIndex + 1 >= questions.length) {
          endGame();
        } else {
          setCurrentIndex(prev => prev + 1);
        }
      }, 1000);
    }
  };

  // --- UI Components ---

  const renderIdle = () => (
    <div className="max-w-xl mx-auto text-center flex flex-col justify-center items-center h-[70vh] space-y-6">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="inline-block p-6 bg-fun-yellow rounded-[2rem] shadow-xl"
      >
        <Flag size={48} className="text-white" />
      </motion.div>
      <div className="space-y-1 mb-4">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">LIVE RACE</h1>
        <p className="text-sm text-slate-500 font-bold">Fast-paced 1v1 battles</p>
      </div>

      <Button 
        variant="primary" 
        fullWidth 
        className="py-5 text-xl rounded-2xl shadow-lg hover:scale-105 transition-transform max-w-xs"
        onClick={startMatching}
      >
        FIND MATCH
      </Button>
    </div>
  );

  const renderMatching = () => (
    <div className="max-w-md mx-auto flex flex-col items-center justify-center h-[70vh] text-center space-y-8">
      <div className="relative inline-block">
        <div className="w-24 h-24 rounded-full border-4 border-slate-100 border-t-fun-blue animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Users size={32} className="text-fun-blue animate-pulse" />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-black text-slate-900 leading-tight">SEARCHING...</h2>
      </div>
      
      <div className="flex justify-center items-center gap-6 opacity-50">
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden">
            <img src={stats.avatar} alt="You" className="w-full h-full object-cover" />
          </div>
          <span className="font-black text-[10px] uppercase">YOU</span>
        </div>
        <div className="text-2xl font-black text-slate-200">VS</div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
            <Loader2 className="animate-spin text-slate-300 size-5" />
          </div>
          <span className="font-black text-[10px] uppercase text-slate-300">???</span>
        </div>
      </div>
    </div>
  );

  const renderPlaying = () => {
    const currentQ = questions[currentIndex];
    const playerProgress = (currentIndex / questions.length) * 100;

    return (
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Header: Progress Comparison */}
        <div className="bg-white rounded-[1.5rem] p-4 border-2 border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-fun-blue/10 flex items-center justify-center">
                <Timer className={timeLeft < 10 ? 'text-fun-pink animate-pulse size-5' : 'text-fun-blue size-5'} />
              </div>
              <div className="text-2xl font-black text-slate-800">{timeLeft}s</div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] font-black text-slate-400 uppercase">Score</div>
                <div className="text-xl font-black text-fun-yellow leading-none">{score}</div>
              </div>
              {combo >= 3 && (
                <div className="flex items-center gap-1 px-2 py-1 bg-fun-orange rounded-lg text-white font-black text-[10px] animate-bounce">
                  <Flame size={12} /> {combo}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            {/* Player Progress */}
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase leading-none">
                <span>YOU</span>
                <span>{Math.round(playerProgress)}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-fun-blue shadow-[0_0_10px_rgba(0,122,255,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${playerProgress}%` }}
                />
              </div>
            </div>
            
            {/* Opponent Progress */}
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase leading-none">
                <span>{opponent?.name || 'Opponent'}</span>
                <span>{Math.round(opponentProgress)}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-fun-pink shadow-[0_0_10px_rgba(255,45,85,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${opponentProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className={`bg-white rounded-[2rem] p-6 border-b-[8px] border-slate-100 shadow-lg text-center space-y-6 min-h-[300px] flex flex-col justify-center ${isPenalty ? 'opacity-50 grayscale' : ''}`}
            >
              <div className="space-y-2">
                <span className="px-3 py-1 bg-slate-100 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest">
                  {currentQ?.type.replace('-', ' ')}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight px-2">
                  {currentQ?.question}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ?.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={isPenalty}
                    onClick={() => handleAnswer(option)}
                    className={`p-4 rounded-2xl text-lg font-black transition-all border-4 flex items-center justify-center ${
                      feedback === 'correct' && option === currentQ.answer ? 'bg-fun-green border-fun-green text-white scale-105' :
                      feedback === 'wrong' && option !== currentQ.answer ? 'bg-slate-50 border-slate-100 text-slate-300' :
                      feedback === 'wrong' && option === currentQ.answer ? 'bg-fun-green/20 border-fun-green/30 text-fun-green' :
                      'bg-white border-slate-100 text-slate-700 hover:border-fun-blue hover:bg-blue-50 hover:scale-[1.02]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Penalty Overlay */}
          {isPenalty && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-fun-pink text-white px-6 py-3 rounded-2xl font-black text-xl animate-bounce shadow-xl flex items-center gap-2">
                <XCircle size={24} /> FROZEN! (1s)
              </div>
            </div>
          )}
          
          {/* Correct Feedback */}
          {feedback === 'correct' && (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 1 }}
                className="text-fun-green"
              >
                <CheckCircle2 size={80} />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const playerProgress = (currentIndex / questions.length) * 100;
    const isWinner = playerProgress > opponentProgress;

    return (
      <div className="max-w-xl mx-auto space-y-6 animate-fade-in pb-10">
        <div className="text-center space-y-2">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`inline-block p-6 rounded-full shadow-lg ${isWinner ? 'bg-fun-yellow' : 'bg-slate-200'}`}
          >
            {isWinner ? <Trophy size={48} className="text-white" /> : <Flag size={48} className="text-slate-400" />}
          </motion.div>
          <h1 className={`text-4xl lg:text-5xl font-black tracking-tighter leading-none ${isWinner ? 'text-fun-yellow' : 'text-slate-400'}`}>
            {isWinner ? "VICTORY!" : "DEFEAT!"}
          </h1>
        </div>

        <div className="bg-white rounded-[2rem] p-6 border-4 border-slate-100 shadow-md">
          <div className="flex justify-around items-center divide-x-2 divide-slate-100">
            <div className="text-center px-2">
              <div className="font-bold text-slate-400 text-xs uppercase mb-1">Score</div>
              <div className="text-2xl font-black text-slate-800">{score}</div>
            </div>
            <div className="text-center px-2">
              <div className="font-bold text-slate-400 text-xs uppercase mb-1">Accuracy</div>
              <div className="text-2xl font-black text-slate-800">
                {Math.round((currentIndex / (currentIndex + mistakes.length)) * 100) || 0}%
              </div>
            </div>
            <div className="text-center px-2">
              <div className="font-bold text-slate-400 text-xs uppercase mb-1">XP</div>
              <div className="text-2xl font-black text-fun-green">+{isWinner ? 200 + score : 50 + Math.floor(score/2)}</div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            variant="primary" 
            fullWidth 
            className="py-4 text-base rounded-2xl flex items-center justify-center gap-2"
            onClick={startMatching}
          >
            <RefreshCw size={20} /> REMATCH
          </Button>
          <Button 
            variant="secondary" 
            fullWidth 
            className="py-4 text-base rounded-2xl flex items-center justify-center gap-2"
            onClick={() => setGameState('idle')}
          >
            <Home size={20} /> HOME
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <AnimatePresence mode="wait">
        {gameState === 'idle' && renderIdle()}
        {gameState === 'matching' && renderMatching()}
        {gameState === 'playing' && renderPlaying()}
        {gameState === 'results' && renderResults()}
      </AnimatePresence>
    </div>
  );
};

export default RaceMode;
