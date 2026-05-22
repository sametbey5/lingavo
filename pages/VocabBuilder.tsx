import React, { useState, useEffect, useMemo } from 'react';
import { VocabWord } from '../types';
import Button from '../components/Button';
import { Zap, Trophy, Clock, Flame, Sparkles, Star, BookOpen, AlertCircle, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';
import Confetti from '../components/Confetti';
import { UI_TRANSLATIONS } from '../translations';

interface LevelWord {
  word: string;
  definition: string;
  exampleSentence: string;
  pronunciation?: string;
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
}

const LEVEL_WORDS_POOL: LevelWord[] = [
  // A1 Words
  { word: "Hello", definition: "A greeting used when meeting someone.", exampleSentence: "Hello! Nice to meet you.", pronunciation: "/həˈləʊ/", cefrLevel: "A1" },
  { word: "Family", definition: "A group of parents and children living together.", exampleSentence: "I love spending weekend time with my family.", pronunciation: "/ˈfæm.əl.i/", cefrLevel: "A1" },
  { word: "Beautiful", definition: "Very pleasing to the senses or mind.", exampleSentence: "What a beautiful sunny day!", pronunciation: "/ˈbjuː.tɪ.fəl/", cefrLevel: "A1" },
  { word: "Journey", definition: "An act of traveling from one place to another.", exampleSentence: "We began our journey across the country.", pronunciation: "/ˈdʒɜː.ni/", cefrLevel: "A1" },
  { word: "Bright", definition: "Giving out or reflecting much light.", exampleSentence: "The sun is very bright today.", pronunciation: "/braɪt/", cefrLevel: "A1" },
  { word: "Friend", definition: "A person whom one knows and with whom one has a bond of mutual affection.", exampleSentence: "She is my best friend from school.", pronunciation: "/frend/", cefrLevel: "A1" },
  { word: "House", definition: "A building for human habitation, especially one that is lived in is a house.", exampleSentence: "They live in a beautiful red house.", pronunciation: "/haʊs/", cefrLevel: "A1" },
  { word: "Happy", definition: "Feeling or showing pleasure or contentment.", exampleSentence: "Winning the prize made him extremely happy.", pronunciation: "/ˈhæp.i/", cefrLevel: "A1" },
  { word: "Water", definition: "A colorless, transparent, odorless liquid that forms the seas, lakes, and rain.", exampleSentence: "Make sure you drink plenty of fresh water.", pronunciation: "/ˈwɔː.tər/", cefrLevel: "A1" },
  { word: "Simple", definition: "Easily understood or done; presenting no difficulty.", exampleSentence: "The teacher gave us a very simple homework task.", pronunciation: "/ˈsɪm.pəl/", cefrLevel: "A1" },

  // A2 Words
  { word: "Adventure", definition: "An unusual and exciting, typically hazardous, experience or activity.", exampleSentence: "Climbing the mountain was a real adventure.", pronunciation: "/ədˈven.tʃər/", cefrLevel: "A2" },
  { word: "Celebrate", definition: "Acknowledge a significant event with a social gathering.", exampleSentence: "We will celebrate your birthday tonight!", pronunciation: "/ˈsel.ə.breɪt/", cefrLevel: "A2" },
  { word: "Curious", definition: "Eager to know or learn something.", exampleSentence: "Cats are very curious animals.", pronunciation: "/ˈkjʊə.ri.əs/", cefrLevel: "A2" },
  { word: "Delicious", definition: "Highly pleasant to the taste.", exampleSentence: "This chocolate cake is delicious!", pronunciation: "/dɪˈlɪʃ.əs/", cefrLevel: "A2" },
  { word: "Explore", definition: "Travel through an unfamiliar area to learn about it.", exampleSentence: "Let's explore the old forest path.", pronunciation: "/ɪkˈsplɔːr/", cefrLevel: "A2" },
  { word: "Neighbor", definition: "A person living near or next door.", exampleSentence: "Our neighbor is very friendly and helped us move.", pronunciation: "/ˈneɪ.bər/", cefrLevel: "A2" },
  { word: "Travel", definition: "Go from one place to another, typically over a distance of some length.", exampleSentence: "They love to travel around Europe in summer.", pronunciation: "/ˈtræv.əl/", cefrLevel: "A2" },
  { word: "Library", definition: "A building containing collections of books and resources for reading.", exampleSentence: "I borrowed some history books from the local library.", pronunciation: "/ˈlaɪ.brər.i/", cefrLevel: "A2" },
  { word: "Active", definition: "Engaging or ready to engage in physically energetic pursuits.", exampleSentence: "Playing sports keeps us active and healthy.", pronunciation: "/ˈæk.tɪv/", cefrLevel: "A2" },
  { word: "Famous", definition: "Known about by many people.", exampleSentence: "The Eiffel Tower is a extremely famous landmark.", pronunciation: "/ˈfeɪ.məs/", cefrLevel: "A2" },

  // B1 Words
  { word: "Collaborate", definition: "Work jointly on an activity or project.", exampleSentence: "Our teams will collaborate to finish the project.", pronunciation: "/kəˈlæb.ə.reɪt/", cefrLevel: "B1" },
  { word: "Essential", definition: "Absolutely necessary; extremely important.", exampleSentence: "Water is essential for life.", pronunciation: "/ɪˈsen.ʃəl/", cefrLevel: "B1" },
  { word: "Challenge", definition: "A task or situation that tests someone's abilities.", exampleSentence: "Learning a new language is a great challenge.", pronunciation: "/ˈtʃæl.ɪndʒ/", cefrLevel: "B1" },
  { word: "Patience", definition: "The capacity to accept or tolerate delay or trouble without getting angry.", exampleSentence: "Teaching kids requires a lot of patience.", pronunciation: "/ˈpeɪ.ʃəns/", cefrLevel: "B1" },
  { word: "Navigate", definition: "Plan and direct the course of a ship, aircraft, or other form of transport.", exampleSentence: "We used a map to navigate the narrow city streets.", pronunciation: "/ˈnæv.ɪ.ɡeɪt/", cefrLevel: "B1" },
  { word: "Focus", definition: "The center of interest or activity.", exampleSentence: "Our main focus is to improve your speaking progress.", pronunciation: "/ˈfəʊ.kəs/", cefrLevel: "B1" },
  { word: "Courage", definition: "The ability to do something that frightens one.", exampleSentence: "It took courage to speak English on the big stage.", pronunciation: "/ˈkʌr.ɪdʒ/", cefrLevel: "B1" },
  { word: "Dynamic", definition: "Characterized by constant change, activity, or progress.", exampleSentence: "The business industry is incredibly fast-paced and dynamic.", pronunciation: "/daɪˈnæm.ɪk/", cefrLevel: "B1" },
  { word: "Connect", definition: "Join together so as to provide a link or relationship.", exampleSentence: "The app helps language learners connect worldwide.", pronunciation: "/kəˈnekt/", cefrLevel: "B1" },
  { word: "Structure", definition: "The arrangement of and relations between the parts of something complex.", exampleSentence: "We need to study the sentence structure of English.", pronunciation: "/ˈstrʌk.tʃər/", cefrLevel: "B1" },

  // B2 Words
  { word: "Perspective", definition: "A particular attitude toward or way of regarding something; a point of view.", exampleSentence: "Traveling opens up a brand new perspective on life.", pronunciation: "/pəˈspek.tɪv/", cefrLevel: "B2" },
  { word: "Resilient", definition: "Able to withstand or recover quickly from difficult conditions.", exampleSentence: "The young plants are very resilient to the cold winter.", pronunciation: "/rɪˈzɪl.i.ənt/", cefrLevel: "B2" },
  { word: "Analyse", definition: "Examine methodically and in detail the structure of something.", exampleSentence: "We need to analyse the test results before deciding.", pronunciation: "/ˈæn.ə.laɪz/", cefrLevel: "B2" },
  { word: "Accomplish", definition: "Achieve or complete successfully.", exampleSentence: "If we work together, we can accomplish anything.", pronunciation: "/əˈkʌm.plɪʃ/", cefrLevel: "B2" },
  { word: "Significant", definition: "Sufficiently great or important to be worthy of attention.", exampleSentence: "He made a significant contribution to the research.", pronunciation: "/sɪɡˈnɪf.ɪ.kənt/", cefrLevel: "B2" },
  { word: "Constant", definition: "Occurring continuously over a period of time.", exampleSentence: "The constant drone of traffic made it hard to study.", pronunciation: "/ˈkɒn.stənt/", cefrLevel: "B2" },
  { word: "Benefit", definition: "An advantage or profit gained from something.", exampleSentence: "Regular practice has a massive benefit for speaking fluency.", pronunciation: "/ˈben.ɪ.fɪt/", cefrLevel: "B2" },
  { word: "Contrast", definition: "The state of being strikingly different from something else in juxtaposition.", exampleSentence: "The blue ocean stands in stark contrast with the yellow sand.", pronunciation: "/ˈkɒn.trɑːst/", cefrLevel: "B2" },
  { word: "Strategy", definition: "A plan of action designed to achieve a long-term or overall aim.", exampleSentence: "We need a clear learning strategy to pass the exam.", pronunciation: "/ˈstræt.ə.dʒi/", cefrLevel: "B2" },
  { word: "Creative", definition: "Relating to or involving the imagination or original ideas.", exampleSentence: "She wrote a creative essay and won first place.", pronunciation: "/kriˈeɪ.tɪv/", cefrLevel: "B2" },

  // C1 Words
  { word: "Pragmatic", definition: "Dealing with things sensibly and realistically in a way that is based on practical considerations.", exampleSentence: "We need a pragmatic solution to this financial issue.", pronunciation: "/præɡˈmæt.ɪk/", cefrLevel: "C1" },
  { word: "Eloquent", definition: "Fluent or persuasive in speaking or writing.", exampleSentence: "The president gave an eloquent speech about unity.", pronunciation: "/ˈel.ə.kwənt/", cefrLevel: "C1" },
  { word: "Ambiguous", definition: "Open to more than one interpretation; not having one obvious meaning.", exampleSentence: "The ending of the movie was mysterious and ambiguous.", pronunciation: "/æmˈbɪɡ.ju.əs/", cefrLevel: "C1" },
  { word: "Benevolent", definition: "Well meaning and kindly.", exampleSentence: "A benevolent donor gifted computers to the school library.", pronunciation: "/bəˈnev.əl.ənt/", cefrLevel: "C1" },
  { word: "Superfluous", definition: "Unnecessary, especially through being more than enough.", exampleSentence: "Avoid adding superfluous words to your simple sentences.", pronunciation: "/suːˈpɜː.flu.əs/", cefrLevel: "C1" },
  { word: "Aesthetic", definition: "Concerned with beauty or the appreciation of beauty.", exampleSentence: "The artwork possesses a wonderful aesthetic value.", pronunciation: "/esˈθet.ɪk/", cefrLevel: "C1" },
  { word: "Disdain", definition: "The feeling that someone or something is unworthy of one's consideration or respect.", exampleSentence: "He expressed total disdain for the boring lecture.", pronunciation: "/dɪsˈdeɪn/", cefrLevel: "C1" },
  { word: "Integrity", definition: "The quality of being honest and having strong moral principles.", exampleSentence: "A reliable teacher behaves with absolute integrity.", pronunciation: "/ɪnˈteɡ.rə.ti/", cefrLevel: "C1" },
  { word: "Advocate", definition: "A person who publicly supports or recommends a particular cause or policy.", exampleSentence: "She is a passionate advocate for environmental protection.", pronunciation: "/ˈæd.və.keɪt/", cefrLevel: "C1" },
  { word: "Elaborate", definition: "Involving many carefully arranged parts or details; detailed and complicated.", exampleSentence: "The stage showed an elaborate display of ancient symbols.", pronunciation: "/iˈlæb.ər.ət/", cefrLevel: "C1" },

  // C2 Words
  { word: "Pristine", definition: "In its original condition; unspoiled, clean, and fresh.", exampleSentence: "The snowy mountain peaks looked absolutely pristine.", pronunciation: "/pɪsˈtiːn/", cefrLevel: "C2" },
  { word: "Idiosyncrasy", definition: "A mode of behavior or way of thought peculiar to an individual.", exampleSentence: "One of his idiosyncrasies was wearing mismatching socks.", pronunciation: "/ˌɪd.i.əˈsɪŋ.krə.si/", cefrLevel: "C2" },
  { word: "Capricious", definition: "Given to sudden and unaccountable changes of mood or behavior.", exampleSentence: "The weather in this country is notorious for being capricious.", pronunciation: "/kəˈprɪʃ.əs/", cefrLevel: "C2" },
  { word: "Quintessential", definition: "Representing the most perfect or typical example of a quality or class.", exampleSentence: "This quaint cafe is the quintessential British experience.", pronunciation: "/ˌkwɪn.tɪˈsen.ʃəl/", cefrLevel: "C2" },
  { word: "Ineffable", definition: "Too great or extreme to be expressed or described in words.", exampleSentence: "Standing at the edge of the sky-scraping canyon filled them with ineffable awe.", pronunciation: "/ɪnˈef.ə.bəl/", cefrLevel: "C2" },
  { word: "Ephemeral", definition: "Lasting for a very short time.", exampleSentence: "The beautiful cherry blooms are gorgeous but ephemeral.", pronunciation: "/ɪˈfem.ər.əl/", cefrLevel: "C2" },
  { word: "Nefarious", definition: "Wicked, infamous, or criminal.", exampleSentence: "The hacker had a nefarious scheme to break into the mainframe.", pronunciation: "/nɪˈfeə.ri.əs/", cefrLevel: "C2" },
  { word: "Zenith", definition: "The time at which something is most powerful or successful.", exampleSentence: "The empire reached its glorious zenith in the second century.", pronunciation: "/ˈzen.ɪθ/", cefrLevel: "C2" },
  { word: "Cacophony", definition: "A harsh, discordant mixture of sounds.", exampleSentence: "A loud cacophony of sirens woke up the whole neighborhood.", pronunciation: "/kəˈkɒf.ə.ni/", cefrLevel: "C2" },
  { word: "Paragon", definition: "A person or thing viewed as a model of excellence.", exampleSentence: "Our mentor is considered a paragon of professional virtue.", pronunciation: "/ˈpær.ə.ɡən/", cefrLevel: "C2" }
];

const VocabBuilder: React.FC = () => {
  const { awardPoints, preferredLanguage, addToWordBank, cefrLevel } = useGamification();
  
  const t = (key: string) => UI_TRANSLATIONS[preferredLanguage]?.[key] || UI_TRANSLATIONS['Turkish']?.[key] || key;

  // Selected battle level (defaults to user's real language level)
  const [activeTestLevel, setActiveTestLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'>(cefrLevel || 'A2');
  
  // Game States
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'results'>('lobby');
  
  // Word Rush State
  const [words, setWords] = useState<VocabWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(10);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isFever, setIsFever] = useState(false);

  // Initialize active level correctly when cefrLevel loads
  useEffect(() => {
    if (cefrLevel) {
      setActiveTestLevel(cefrLevel);
    }
  }, [cefrLevel]);

  // Start Word Rush testing ALL WORDS in the active cefrLevel
  const startGame = () => {
    // 1. Filter raw pool by selected language level
    const levelMatched = LEVEL_WORDS_POOL.filter(w => w.cefrLevel === activeTestLevel);
    
    if (levelMatched.length === 0) return;

    // 2. Shuffle matched words
    const shuffledPool = [...levelMatched].sort(() => Math.random() - 0.5);

    // Map to App VocabWord format
    const mappedVocab: VocabWord[] = shuffledPool.map(w => ({
      word: w.word,
      definition: w.definition,
      exampleSentence: w.exampleSentence,
      pronunciation: w.pronunciation,
      cefrLevel: w.cefrLevel
    }));

    // Start
    setWords(mappedVocab);
    setGameState('playing');
    setCurrentIndex(0);
    setScore(0);
    setCombo(0);
    setIsFever(false);
    setupTurn(mappedVocab, 0);

    // Mirror learning: add all target words to Word Bank/Dictionary bookmarks natively
    mappedVocab.forEach(w => addToWordBank(w, `Word Rush: Level ${activeTestLevel}`));
  };

  const setupTurn = (wordList: VocabWord[], index: number) => {
    const current = wordList[index];
    
    // Choose distractors from OTHER words in pool to ensure real complexity
    const otherDefinitions = LEVEL_WORDS_POOL
      .filter(w => w.word !== current.word)
      .map(w => w.definition);

    const shuffledDistractors = [...otherDefinitions].sort(() => Math.random() - 0.5).slice(0, 3);
    const shuffled = [current.definition, ...shuffledDistractors].sort(() => Math.random() - 0.5);
    
    setOptions(shuffled);
    setTimer(isFever ? 7 : 10);
    setFeedback(null);
  };

  useEffect(() => {
    let interval: any;
    if (gameState === 'playing' && timer > 0 && !feedback) {
      interval = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000);
    } else if (timer === 0 && gameState === 'playing' && !feedback) {
      handleAnswer('');
    }
    return () => clearInterval(interval);
  }, [gameState, timer, feedback]);

  const handleAnswer = (selected: string) => {
    const isCorrect = selected === words[currentIndex].definition;
    setFeedback(isCorrect ? 'correct' : 'wrong');
    
    if (isCorrect) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      const points = (timer * 10) * (isFever ? 2 : 1) * (1 + Math.floor(newCombo / 3));
      setScore(s => s + points);
      if (newCombo >= 3) setIsFever(true);
    } else {
      setCombo(0);
      setIsFever(false);
    }

    setTimeout(() => {
      if (currentIndex < words.length - 1) {
        const next = currentIndex + 1;
        setCurrentIndex(next);
        setupTurn(words, next);
      } else {
        setGameState('results');
        awardPoints(score, `Word Rush Language Level ${activeTestLevel} Completed`, 'vocabulary');
      }
    }, 600);
  };

  if (gameState === 'lobby') {
    return (
      <div className="max-w-xl mx-auto space-y-6 animate-fade-in py-6">
        
        {/* Banner Card */}
        <div className="relative text-center space-y-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-fun-yellow rounded-full flex items-center justify-center mx-auto shadow-xl border-4 border-white ring-4 ring-yellow-100 animate-bounce">
            <Zap size={32} className="text-white fill-current" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 uppercase tracking-tighter rainbow-text leading-none">
            Level Word Rush
          </h2>
          <p className="text-sm font-bold text-slate-500 italic max-w-sm mx-auto px-4">
            Test yourself on all vocabulary words matched exactly to your CEFR language level!
          </p>

          {/* Lobby Configuration Dashboard without "learning focus" */}
          <div className="bg-white p-4 sm:p-6 rounded-[2rem] border-4 border-slate-100 shadow-md space-y-6">
            <div className="text-left space-y-3">
              <label className="text-[10px] sm:text-xs font-black uppercase text-slate-400 mb-2 block px-1 tracking-wider flex items-center gap-1">
                <CheckCircle2 size={12} className="text-fun-green" /> Language Level Target
              </label>
              
              {/* Responsive Selector for CEFR Levels */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const).map(lvl => {
                  const isUserActualLvl = lvl === cefrLevel;
                  const isSelected = activeTestLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setActiveTestLevel(lvl)}
                      className={`py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-base transition-all border-2 transform active:scale-95 flex flex-col items-center justify-center relative ${
                        isSelected
                          ? 'bg-fun-blue border-blue-600 text-white shadow-md scale-105'
                          : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <span>{lvl}</span>
                      {isUserActualLvl && (
                        <span className={`absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded-full shrink-0 ${
                          isSelected ? 'bg-fun-pink text-white' : 'bg-slate-800 text-slate-100 animate-pulse'
                        }`}>
                          MINE
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start gap-2 mt-4">
                <AlertCircle className="text-fun-blue shrink-0 mt-0.5" size={14} />
                <p className="text-slate-500 font-bold text-[10px] sm:text-xs leading-relaxed">
                  We'll shuffle and test you on all of the words for <span className="text-fun-pink font-black uppercase">{activeTestLevel}</span>. Build a combo to multiply your XP!
                </p>
              </div>
            </div>

            <Button onClick={startGame} className="w-full py-4 sm:py-5 text-lg sm:text-xl transform outline-none shadow-md font-black border-b-4 border-green-800" variant="success">
              START RUSH - {activeTestLevel}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Active Game State
  if (gameState === 'playing') {
    return (
      <div className={`max-w-2xl mx-auto space-y-4 sm:space-y-6 animate-fade-in transition-colors duration-500 ${isFever ? 'bg-orange-50/50 p-2 sm:p-4 rounded-[2rem]' : ''}`}>
        
        {/* Scoring / Timer panel */}
        <div className={`flex justify-between items-center ${isFever ? 'bg-orange-600 animate-pulse' : 'bg-slate-900'} text-white p-3 sm:p-5 rounded-[1.5rem] sm:rounded-[2rem] shadow-lg border-4 ${isFever ? 'border-orange-400' : 'border-slate-700'} transition-colors`}>
           <div className="flex items-center gap-2">
             <div className="bg-white/10 p-1.5 sm:p-2 rounded-xl">
               <Clock className={timer < 4 ? "text-red-500 animate-wiggle" : "text-fun-blue"} size={20} />
             </div>
             <span className={`text-xl sm:text-2xl font-black leading-none ${timer < 4 ? 'text-red-500' : 'text-white'}`}>{timer}s</span>
           </div>
           
           <div className="flex flex-col items-center relative">
              {combo > 1 && (
                <div className="absolute -top-8 sm:-top-10 animate-bounce bg-fun-yellow text-slate-900 px-3 py-1 rounded-full font-black text-[10px] sm:text-xs border-2 border-white shadow-sm whitespace-nowrap">
                  {combo}X {isFever && ' FEVER'}
                </div>
              )}
              <div className="text-lg sm:text-xl font-black text-fun-yellow tracking-widest flex items-center gap-1.5 sm:gap-2 leading-none">
                <Flame size={16} className={isFever ? "text-orange-400 fill-current animate-pulse animate-float" : "hidden"} />
                {score} XP
              </div>
           </div>
           
           <div className="bg-white/10 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black opacity-75 uppercase">
             {currentIndex + 1}/{words.length}
           </div>
        </div>

        {/* Question Area */}
        <div className={`p-4 sm:p-8 bg-white rounded-[2rem] sm:rounded-[3rem] shadow-xl border-b-[8px] sm:border-b-[12px] transition-all text-center ${
          feedback === 'correct' ? 'border-fun-green scale-[1.02] animate-pop' : 
          feedback === 'wrong' ? 'border-fun-pink animate-wiggle' : 
          isFever ? 'border-orange-500 ring-4 sm:ring-8 ring-orange-100' : 'border-slate-100'
        }`}>
           <span className={`text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-3 block ${isFever ? 'text-orange-500 animate-pulse' : 'text-slate-300'}`}>
             {isFever ? 'FEVER MODE' : 'WORD RUSH'}
           </span>
           <h3 className={`text-2xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-8 tracking-tight transition-colors break-all leading-tight ${isFever ? 'text-orange-600' : 'text-slate-800'}`}>
             {words[currentIndex].word}
           </h3>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {options.map((opt, i) => (
                <button
                  key={i}
                  disabled={!!feedback}
                  onClick={() => handleAnswer(opt)}
                  className={`p-3 sm:p-5 text-sm sm:text-base font-black rounded-[1rem] sm:rounded-[1.5rem] border-4 transition-all text-left flex items-center sm:items-start gap-2 sm:gap-3 ${
                    feedback && opt === words[currentIndex].definition ? 'bg-fun-green border-green-600 text-white shadow-md' :
                    feedback === 'wrong' && opt !== words[currentIndex].definition ? 'bg-slate-50 border-slate-100 opacity-40' :
                    'bg-white border-slate-50 hover:bg-slate-50 hover:border-fun-blue hover:-translate-y-1 text-slate-600 active:scale-95'
                  }`}
                >
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs border-2 shrink-0 ${feedback && opt === words[currentIndex].definition ? 'bg-white text-fun-green border-white' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="flex-1 text-left select-none leading-snug">{opt}</span>
                </button>
              ))}
           </div>
        </div>
      </div>
    );
  }

  // Game End / Results
  return (
    <div className="max-w-md mx-auto text-center space-y-6 animate-fade-in py-10">
      <Confetti />
      <div className="relative inline-block">
        <Trophy size={80} className="mx-auto text-fun-yellow animate-bounce" />
        <Star className="absolute -top-2 -right-4 text-yellow-300 animate-pulse" size={24} />
        <Sparkles className="absolute -bottom-2 -left-4 text-cyan-400 animate-pulse" size={24} />
      </div>
      <h2 className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tighter uppercase leading-none">
        Completed!
      </h2>
      <div className="bg-white p-5 sm:p-8 rounded-[2rem] border-4 border-slate-100 shadow-xl relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-fun-pink via-fun-yellow to-fun-blue" />
         <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-3">Loot Earned</p>
         <div className="text-5xl sm:text-6xl font-black text-fun-blue mb-6 tracking-tighter">{score} <span className="text-xl sm:text-2xl text-slate-305">XP</span></div>
         <div className="flex justify-center gap-3 mb-6">
            <div className="bg-slate-50 px-4 py-2 rounded-xl border-2 border-slate-100 w-1/2">
               <span className="text-[10px] font-black text-slate-400 block uppercase">Max Combo</span>
               <span className="text-lg font-black text-slate-800">{combo}X</span>
            </div>
            <div className="bg-slate-50 px-4 py-2 rounded-xl border-2 border-slate-100 w-1/2">
               <span className="text-[10px] font-black text-slate-400 block uppercase">Fever</span>
               <span className="text-lg font-black text-slate-800">{isFever ? 'Yes' : 'No'}</span>
            </div>
         </div>
         <Button onClick={() => setGameState('lobby')} className="w-full py-4 text-lg" variant="primary">
           Play Again
         </Button>
      </div>
    </div>
  );
};

export default VocabBuilder;
