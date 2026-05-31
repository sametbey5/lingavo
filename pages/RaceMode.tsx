import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGamification } from '../context/GamificationContext';
import { 
  Trophy, Users, Zap, Timer, Flag, CheckCircle2, XCircle, Home, 
  Flame, Award, RefreshCw, Info, Loader2, Star, Sparkles, BookOpen, AlertCircle, PlayCircle
} from 'lucide-react';
import Button from '../components/Button';
import { motion, AnimatePresence } from 'motion/react';
import { generateRaceQuestions } from '../services/geminiService';
import { supabase } from '../services/supabaseClient';
import { UI_TRANSLATIONS } from '../translations';
import { VocabWord } from '../types';

// Let's pool A1-C2 level words from old VocabBuilder to make Word Rush super snappy
interface LevelWord {
  word: string;
  definition: string;
  exampleSentence: string;
  pronunciation?: string;
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
}

const LEVEL_WORDS_POOL: LevelWord[] = [
  // A1 Words
  { word: "Beautiful", definition: "Very pleasing to the senses or mind.", exampleSentence: "What a beautiful sunny day!", pronunciation: "/ˈbjuː.tɪ.fəl/", cefrLevel: "A1" },
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
  { word: "Connect", definition: "Join together so as to provide a link or relationship.", exampleSentence: "The app helps language learners connect worldwide.", pronunciation: "/kə\u200bnekt/", cefrLevel: "B1" },
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

interface Opponent {
  name: string;
  avatar: string;
  progress: number;
  speed: number;
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

interface RaceModeProps {
  defaultTab?: 'single' | 'multi';
}

const RaceMode: React.FC<RaceModeProps> = ({ defaultTab }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, stats, cefrLevel, awardPoints, preferredLanguage, addToWordBank } = useGamification();
  
  const translations = UI_TRANSLATIONS[preferredLanguage] || UI_TRANSLATIONS['Turkish'] || {};
  const t = (key: string) => translations[key] || key;

  // Determine initial game mode (Single Player vs Multiplayer)
  const initialMode = defaultTab || (location.pathname.includes('vocab') ? 'single' : 'multi');
  const [activeMode, setActiveMode] = useState<'single' | 'multi'>(initialMode);
  
  // High level game stages
  const [gameState, setGameState] = useState<'lobby' | 'matching' | 'playing' | 'results'>('lobby');

  // Unified shared states
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- 1. SINGLE PLAYER (Word Rush) States ---
  const [activeTestLevel, setActiveTestLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'>(cefrLevel || 'A2');
  const [words, setWords] = useState<VocabWord[]>([]);
  const [rushTimer, setRushTimer] = useState(10);
  const [options, setOptions] = useState<string[]>([]);
  const [isFever, setIsFever] = useState(false);

  // --- 2. MULTIPLAYER (Live Word Race) States ---
  const [isRealOpponent, setIsRealOpponent] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [multiLeft, setMultiLeft] = useState(45);
  const [isPenalty, setIsPenalty] = useState(false);
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  const [opponent, setOpponent] = useState<Opponent | null>(null);
  const [opponentProgress, setOpponentProgress] = useState(0);

  // Refs for timers and messaging subscriptions
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const opponentTimerRef = useRef<NodeJS.Timeout | null>(null);
  const matchingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lobbyChannelRef = useRef<any>(null);
  const gameChannelRef = useRef<any>(null);

  // Clean timers up on end
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (opponentTimerRef.current) clearInterval(opponentTimerRef.current);
      if (matchingTimeoutRef.current) clearTimeout(matchingTimeoutRef.current);
      if (lobbyChannelRef.current) lobbyChannelRef.current.unsubscribe();
      if (gameChannelRef.current) gameChannelRef.current.unsubscribe();
    };
  }, []);

  // Sync level with gamification profile once loaded
  useEffect(() => {
    if (cefrLevel) {
      setActiveTestLevel(cefrLevel);
    }
  }, [cefrLevel]);

  // Adjust tabs on route change in case of navigation inside page
  useEffect(() => {
    const routeMode = location.pathname.includes('vocab') ? 'single' : 'multi';
    setActiveMode(routeMode);
    setGameState('lobby');
  }, [location.pathname]);

  // ==================== [Word Rush - SINGLE PLAYER] Logic ====================
  const startSinglePlayer = () => {
    const matched = LEVEL_WORDS_POOL.filter(w => w.cefrLevel === activeTestLevel);
    if (matched.length === 0) return;

    const shuffled = [...matched].sort(() => Math.random() - 0.5);
    const vocabList: VocabWord[] = shuffled.map(w => ({
      word: w.word,
      definition: w.definition,
      exampleSentence: w.exampleSentence,
      pronunciation: w.pronunciation,
      cefrLevel: w.cefrLevel
    }));

    setWords(vocabList);
    setScore(0);
    setCombo(0);
    setIsFever(false);
    setCurrentIndex(0);
    setGameState('playing');
    setupRushTurn(vocabList, 0, false);

    // Bookmarks target words
    vocabList.forEach(w => addToWordBank(w, `Word Rush: Level ${activeTestLevel}`));
  };

  const setupRushTurn = (wordList: VocabWord[], idx: number, feverActive: boolean) => {
    const current = wordList[idx];
    const otherDefs = LEVEL_WORDS_POOL
      .filter(w => w.word !== current.word)
      .map(w => w.definition);

    const shuffledDistractors = [...otherDefs].sort(() => Math.random() - 0.5).slice(0, 3);
    const combinedOptions = [current.definition, ...shuffledDistractors].sort(() => Math.random() - 0.5);

    setOptions(combinedOptions);
    setRushTimer(feverActive ? 7 : 10);
    setFeedback(null);
  };

  // Rush timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing' && activeMode === 'single' && rushTimer > 0 && !feedback) {
      interval = setInterval(() => {
        setRushTimer(t => {
          if (t <= 1) {
            handleSingleAnswer(''); // timeout triggers auto incorrect
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, activeMode, rushTimer, feedback]);

  const handleSingleAnswer = (choice: string) => {
    const correctDef = words[currentIndex].definition;
    const isCorrect = choice === correctDef;
    
    setFeedback(isCorrect ? 'correct' : 'wrong');

    let nextCombo = combo;
    let nextFever = isFever;

    if (isCorrect) {
      nextCombo = combo + 1;
      setCombo(nextCombo);
      const points = (rushTimer * 10) * (isFever ? 2 : 1) * (1 + Math.floor(nextCombo / 3));
      setScore(s => s + points);
      if (nextCombo >= 3) {
        setIsFever(true);
        nextFever = true;
      }
    } else {
      setCombo(0);
      nextCombo = 0;
      setIsFever(false);
      nextFever = false;
    }

    setTimeout(() => {
      if (currentIndex < words.length - 1 && currentIndex < 9) { // 10 rounds limit for fast gameplay
        const nextIdx = currentIndex + 1;
        setCurrentIndex(nextIdx);
        setupRushTurn(words, nextIdx, nextFever);
      } else {
        setGameState('results');
        awardPoints(score, `Word Rush (Level ${activeTestLevel}) Complete`, 'vocabulary');
      }
    }, 600);
  };


  // ==================== [Live Race - MULTIPLAYER] Logic ====================
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

    // Fallback bot simulation after 6 seconds for high conversion
    matchingTimeoutRef.current = setTimeout(() => {
      if (lobbyChannelRef.current) lobbyChannelRef.current.unsubscribe();
      startBotMatch();
    }, 6000);
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
            name: "Pro Player",
            avatar: payload.hostAvatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Pro",
            progress: 0,
            speed: 0
          });
          setGameState('playing');
          startMultiplayerTimers();
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
            name: "Elite Competitor",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elite",
            progress: 0,
            speed: 0
          });
          
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
          startMultiplayerTimers();
        }
      });
  };

  const startBotMatch = async () => {
    const randomOpponent = OPPONENTS[Math.floor(Math.random() * OPPONENTS.length)];
    setOpponent({ ...randomOpponent, progress: 0 });
    setIsRealOpponent(false);
    
    const q = await generateRaceQuestions(cefrLevel);
    setQuestions(q);
    setGameState('playing');
    startMultiplayerTimers();
  };

  const startMultiplayerTimers = () => {
    setMultiLeft(45);
    setCurrentIndex(0);
    setScore(0);
    setCombo(0);
    setOpponentProgress(0);
    setMistakes([]);

    // Race loop timer
    timerRef.current = setInterval(() => {
      setMultiLeft((prev) => {
        if (prev <= 1) {
          endMultiplayerGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulated progress increments
    if (!isRealOpponent) {
      opponentTimerRef.current = setInterval(() => {
        setOpponentProgress((prev) => {
          if (prev >= 100) return 100;
          const jump = Math.random() * 6 * (opponent?.speed || 0.2) * 10;
          return Math.min(100, prev + jump);
        });
      }, 1500);
    }
  };

  const endMultiplayerGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (opponentTimerRef.current) clearInterval(opponentTimerRef.current);
    if (gameChannelRef.current) gameChannelRef.current.unsubscribe();
    setGameState('results');

    const progressPercent = (currentIndex / questions.length) * 100;
    if (progressPercent > opponentProgress) {
      awardPoints(200 + score, 'Race Mode Victory!', 'vocabulary');
    } else {
      awardPoints(50 + Math.floor(score / 2), 'Match Finished!', 'vocabulary');
    }
  };

  const handleMultiAnswer = (selected: string) => {
    if (isPenalty || gameState !== 'playing') return;

    const currentQ = questions[currentIndex];
    const isCorrect = selected === currentQ.answer;

    if (isCorrect) {
      setFeedback('correct');
      const nextCombo = combo + 1;
      setCombo(nextCombo);

      const speedBonus = Math.floor(multiLeft / 2);
      const multi = Math.min(3, 1 + Math.floor(nextCombo / 3) * 0.5);
      setScore(s => s + Math.floor((10 + speedBonus) * multi));

      setTimeout(() => {
        setFeedback(null);
        const nextIndex = currentIndex + 1;
        const complete = nextIndex >= questions.length;

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

        if (complete) {
          endMultiplayerGame();
        } else {
          setCurrentIndex(nextIndex);
        }
      }, 300);
    } else {
      setFeedback('wrong');
      setCombo(0);
      setIsPenalty(true);

      setMistakes(prev => [
        {
          question: currentQ.question,
          yourAnswer: selected,
          correctAnswer: currentQ.answer,
          explanation: currentQ.explanation
        },
        ...prev
      ].slice(0, 3));

      // 1s freeze cooldown
      setTimeout(() => {
        setIsPenalty(false);
        setFeedback(null);
        if (currentIndex + 1 >= questions.length) {
          endMultiplayerGame();
        } else {
          setCurrentIndex(prev => prev + 1);
        }
      }, 1000);
    }
  };


  // ==================== RENDERING SUB-LEVELS ====================

  // Mode Selection lobby
  const renderLobbySelection = () => (
    <div className="max-w-xl mx-auto space-y-6 animate-fade-in py-6">
      
      {/* PRIMARY LOBBY WITH BOTH OPTIONS */}
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-800 uppercase tracking-tighter leading-none">
          Word Rush
        </h2>
        <p className="text-sm font-bold text-slate-500 max-w-sm mx-auto px-4 leading-tight">
          Test your speed and vocabulary. Play solo or compete against real players!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* SINGLE PLAYER CARD */}
        <div className="bg-white p-5 sm:p-6 rounded-[2.5rem] border-4 border-slate-100 shadow-lg space-y-6 flex flex-col items-center justify-between transition-transform hover:-translate-y-1">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-fun-yellow rounded-full flex items-center justify-center mx-auto shadow-md border-4 border-white mb-2">
            <Zap size={32} className="text-white fill-current" />
          </div>
          <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight text-center leading-none">
            Single Player
          </h3>
          <p className="text-xs font-bold text-slate-500 text-center leading-snug">
            Beat the clock, build combo streaks, and master words by CEFR level.
          </p>
          
          <div className="w-full space-y-2 mt-4">
            <label className="text-[10px] sm:text-xs font-black uppercase text-slate-400 block tracking-wider flex items-center justify-center gap-1.5">
              Select Difficulty
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const).map(lvl => {
                const isSelected = activeTestLevel === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setActiveTestLevel(lvl)}
                    className={`py-2 rounded-xl font-black text-sm transition-all border-2 transform active:scale-95 ${
                      isSelected
                        ? 'bg-fun-yellow border-yellow-600 text-slate-900 shadow-md scale-105'
                        : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>

          <Button onClick={() => { setActiveMode('single'); startSinglePlayer(); }} className="w-full mt-4 py-3.5 text-base sm:text-lg transform outline-none shadow-md font-black border-b-4 border-yellow-700" variant="primary">
            START SOLO
          </Button>
        </div>

        {/* MULTIPLAYER CARD */}
        <div className="bg-white p-5 sm:p-6 rounded-[2.5rem] border-4 border-slate-100 shadow-lg space-y-6 flex flex-col items-center justify-between transition-transform hover:-translate-y-1">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto shadow-md border-4 border-white mb-2">
            <Users size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight text-center leading-none">
            Multiplayer
          </h3>
          <p className="text-xs font-bold text-slate-500 text-center leading-snug">
            1v1 real-time matches against other players at your skill level.
          </p>
          
          <div className="flex justify-center -space-x-3 overflow-hidden py-2 my-auto">
            {OPPONENTS.map((opp, i) => (
              <img key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-slate-50" src={opp.avatar} alt="Bot player avatar" />
            ))}
            <div className="inline-block h-10 w-10 rounded-full bg-slate-800 border-2 border-white flex items-center justify-center text-white text-[10px] font-black z-10">
              +LIVE
            </div>
          </div>

          <Button onClick={() => { setActiveMode('multi'); startMatching(); }} className="w-full mt-4 py-3.5 text-base sm:text-lg transform outline-none shadow-md font-black border-b-4 border-red-800" variant="danger">
            FIND MATCH
          </Button>
        </div>
      </div>
    </div>
  );

  // Searching match lobby
  const renderMatchingLobby = () => (
    <div className="max-w-md mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-fade-in">
      <div className="relative inline-block">
        <div className="w-24 h-24 rounded-full border-4 border-slate-100 border-t-red-500 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Users size={32} className="text-red-500 animate-pulse" />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-black text-slate-900 leading-tight tracking-tight uppercase">Searching Match...</h2>
        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">Matching CEFR difficulty: {cefrLevel || 'A2'}</p>
      </div>
      
      <div className="flex justify-center items-center gap-6 opacity-80 bg-white px-6 py-4 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-12 h-12 rounded-xl bg-fun-blue/10 overflow-hidden border-2 border-fun-blue/30">
            <img src={stats.avatar} alt="You" className="w-full h-full object-cover" />
          </div>
          <span className="font-black text-[10px] text-slate-500 uppercase">YOU</span>
        </div>
        <div className="text-lg font-black text-slate-300">VS</div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-12 h-12 rounded-xl bg-slate-150 flex items-center justify-center border-2 border-dashed border-slate-300">
            <Loader2 className="animate-spin text-slate-400 size-5" />
          </div>
          <span className="font-black text-[10px] text-slate-300 uppercase animate-pulse">FINDING</span>
        </div>
      </div>
    </div>
  );

  // Active playing level design
  const renderGameActive = () => {
    // 1. Single Player Content
    if (activeMode === 'single') {
      const activeWord = words[currentIndex] || { word: '...', definition: '...', cefrLevel: 'A1' };
      return (
        <div className={`max-w-2xl mx-auto space-y-4 sm:space-y-6 animate-fade-in py-4 ${isFever ? 'bg-yellow-50/40 p-3 rounded-[2.5rem]' : ''}`}>
          
          {/* Header Dashboard panel */}
          <div className={`flex justify-between items-center ${isFever ? 'bg-amber-500 animate-pulse' : 'bg-slate-900'} text-white p-3 sm:p-4.5 rounded-[1.5rem] sm:rounded-[2rem] shadow-lg border-4 ${isFever ? 'border-amber-300' : 'border-slate-800'} transition-colors`}>
             <div className="flex items-center gap-2">
               <div className="bg-white/10 p-1.5 sm:p-2 rounded-xl flex items-center justify-center">
                 <Timer className={rushTimer < 4 ? "text-red-500 animate-wiggle size-5" : "text-fun-yellow size-5"} />
               </div>
               <span className={`text-xl sm:text-2xl font-black leading-none ${rushTimer < 4 ? 'text-red-500' : 'text-white'}`}>{rushTimer}s</span>
             </div>
             
             <div className="flex flex-col items-center relative">
                {combo > 1 && (
                  <div className="absolute -top-10 sm:-top-11 bg-fun-pink text-white px-3 py-1 rounded-full font-black text-[10px] sm:text-xs border-2 border-white shadow-md uppercase">
                    {combo}X STREAK {isFever && '🐾 FEVER'}
                  </div>
                )}
                <div className="text-lg sm:text-xl font-black text-fun-yellow tracking-wider flex items-center gap-1.5 leading-none">
                  <Flame size={16} className={isFever ? "text-orange-400 fill-current animate-bounce" : "hidden"} />
                  {score} <span className="text-xs uppercase font-bold text-white/70">XP</span>
                </div>
             </div>
             
             <button
                onClick={() => setGameState('lobby')}
                className="bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wide cursor-pointer transition-colors"
             >
               Exit
             </button>
          </div>

          {/* Question / Word Board */}
          <div className={`p-5 sm:p-8 bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-xl border-b-[8px] sm:border-b-[12px] transition-all text-center ${
            feedback === 'correct' ? 'border-fun-green scale-[1.01]' : 
            feedback === 'wrong' ? 'border-red-500 skew-y-0 animate-wiggle' : 
            isFever ? 'border-amber-400 ring-8 ring-amber-50' : 'border-slate-100'
          }`}>
             <span className={`text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-3 block ${isFever ? 'text-orange-500' : 'text-slate-400'}`}>
               {isFever ? 'FEVER BOOST' : 'WORD RUSH'}
             </span>
             <h3 className={`text-3xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-8 tracking-tighter leading-none ${isFever ? 'text-amber-600' : 'text-slate-800'}`}>
               {activeWord.word}
             </h3>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left">
                {options.map((opt, i) => (
                  <button
                    key={i}
                    disabled={!!feedback}
                    onClick={() => handleSingleAnswer(opt)}
                    className={`p-3.5 sm:p-5 text-sm font-bold rounded-2xl border-4 transition-all text-left flex items-start gap-2.5 sm:gap-3 ${
                      feedback && opt === activeWord.definition ? 'bg-fun-green border-green-600 text-white shadow-md' :
                      feedback === 'wrong' && opt !== activeWord.definition ? 'bg-slate-50 border-slate-100 opacity-40' :
                      'bg-white border-slate-100 hover:border-fun-yellow hover:bg-amber-50 hover:-translate-y-0.5 text-slate-700 active:scale-98'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border-2 shrink-0 ${feedback && opt === activeWord.definition ? 'bg-white text-fun-green border-white' : 'bg-slate-150 text-slate-400 border-slate-200'}`}>
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

    // 2. Multiplayer Content (Live Race)
    const currentQ = questions[currentIndex] || { query: 'Loading questions...', type: 'meaning', question: 'Please wait...', options: [], answer: '' };
    const playerProgress = (currentIndex / Math.max(1, questions.length)) * 100;

    return (
      <div className="max-w-2xl mx-auto space-y-4 animate-fade-in py-4">
        
        {/* Progress Comparison Panel */}
        <div className="bg-white rounded-[2rem] p-4.5 border-4 border-slate-100 shadow-lg space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-red-150 flex items-center justify-center border border-red-200">
                <Timer className={multiLeft < 10 ? 'text-fun-pink animate-pulse size-5' : 'text-red-500 size-5'} />
              </div>
              <div className="text-2xl font-black text-slate-800">{multiLeft}s</div>
            </div>
            
            <button
               onClick={() => {
                 if (window.confirm("Abandoning the race forfeits XP. Exit?")) {
                   endMultiplayerGame();
                 }
               }}
               className="text-[10px] uppercase font-black tracking-wide bg-slate-100 hover:bg-slate-250 px-3 py-1.5 rounded-xl text-slate-500 transition-colors"
            >
              Surrender
            </button>
          </div>

          <div className="space-y-2.5">
            {/* Player Progress track */}
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase leading-none">
                <span>YOU (RACEPROGRESS)</span>
                <span>{Math.round(playerProgress)}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200 p-0.5">
                <motion.div 
                  className="h-full bg-fun-yellow rounded-full shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${playerProgress}%` }}
                />
              </div>
            </div>
            
            {/* Opponent Progress track */}
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase leading-none">
                <span>{opponent?.name || 'Opponent'}</span>
                <span>{Math.round(opponentProgress)}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200 p-0.5">
                <motion.div 
                  className="h-full bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.6)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${opponentProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Question Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className={`bg-white rounded-[2rem] p-6 sm:p-8 border-b-[8px] border-slate-150 shadow-xl text-center space-y-6 min-h-[300px] flex flex-col justify-center ${isPenalty ? 'opacity-50 grayscale' : ''}`}
            >
              <div className="space-y-2">
                <span className="px-3.5 py-1 bg-red-50 rounded-full text-[9px] font-black text-red-500 uppercase tracking-widest border border-red-100">
                  {currentQ?.type.replace('-', ' ')}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-800 leading-snug px-2">
                  {currentQ?.question}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                {currentQ?.options?.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={isPenalty || !!feedback}
                    onClick={() => handleMultiAnswer(option)}
                    className={`p-4 rounded-xl text-sm font-bold transition-all border-4 flex items-center ${
                      feedback === 'correct' && option === currentQ.answer ? 'bg-fun-green border-green-600 text-white scale-102 font-black' :
                      feedback === 'wrong' && option !== currentQ.answer ? 'bg-slate-50 border-slate-100 text-slate-300' :
                      feedback === 'wrong' && option === currentQ.answer ? 'bg-fun-green/20 border-fun-green/30 text-fun-green text-bold' :
                      'bg-white border-slate-100 text-slate-700 hover:border-red-400 hover:bg-red-50/20 hover:scale-[1.01]'
                    }`}
                  >
                    <span className="flex-1 text-left leading-normal">{option}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Penalty overlay */}
          {isPenalty && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-red-500 text-white px-5 py-3 rounded-2xl font-black text-base animate-bounce shadow-2xl flex items-center gap-2">
                <XCircle size={20} /> STUNNED PENALTY! (1s)
              </div>
            </div>
          )}
          
          {/* Answer confirmation display */}
          {feedback === 'correct' && (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.4, opacity: 1 }}
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

  // Reusable results component
  const renderResultsScreen = () => {
    // 1. Single Player End Cards
    if (activeMode === 'single') {
      return (
        <div className="max-w-md mx-auto text-center space-y-6 animate-fade-in py-10">
          <div className="relative inline-block">
            <Trophy size={80} className="mx-auto text-fun-yellow animate-bounce" />
            <Star className="absolute -top-2 -right-4 text-amber-400 animate-pulse" size={24} />
            <Sparkles className="absolute -bottom-2 -left-4 text-cyan-400 animate-pulse" size={24} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tighter uppercase leading-none">
            RUSH TERMINATED!
          </h2>

          <div className="bg-white p-5 sm:p-8 rounded-[2rem] border-4 border-slate-100 shadow-xl relative overflow-hidden text-left">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-fun-yellow via-fun-pink to-fun-blue" />
             <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] sm:text-xs mb-3 text-center">Summary of Progress</p>
             <div className="text-5xl font-black text-fun-yellow text-center mb-6 tracking-tight">{score} <span className="text-xl text-slate-400">XP</span></div>
             
             <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-50 px-4 py-3 rounded-2xl border-2 border-slate-100">
                   <span className="text-[10px] font-black text-slate-400 block uppercase">Level tested</span>
                   <span className="text-lg font-black text-slate-800 uppercase">{activeTestLevel}</span>
                </div>
                <div className="bg-slate-50 px-4 py-3 rounded-2xl border-2 border-slate-100">
                   <span className="text-[10px] font-black text-slate-400 block uppercase">Max combo</span>
                   <span className="text-lg font-black text-slate-800">{combo}X</span>
                </div>
             </div>

             <div className="flex gap-3 mt-4">
               <Button onClick={startSinglePlayer} className="flex-1 py-4 text-sm font-black rounded-xl border-b-4 border-yellow-700" variant="primary">
                 PLAY AGAIN
               </Button>
               <Button onClick={() => setGameState('lobby')} className="flex-1 py-4 text-sm font-black rounded-xl" variant="secondary">
                 LOBBY
               </Button>
             </div>
          </div>
        </div>
      );
    }

    // 2. Multiplayer Match Results
    const playerProgress = (currentIndex / Math.max(1, questions.length)) * 100;
    const isWinner = playerProgress > opponentProgress;

    return (
      <div className="max-w-xl mx-auto space-y-6 animate-fade-in pb-10 pt-4">
        <div className="text-center space-y-3">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`inline-block p-6 rounded-full shadow-lg ${isWinner ? 'bg-fun-yellow' : 'bg-slate-200'}`}
          >
            {isWinner ? <Trophy size={48} className="text-slate-950" /> : <Flag size={48} className="text-slate-400" />}
          </motion.div>
          <h1 className={`text-4xl sm:text-5xl font-black tracking-tighter leading-none ${isWinner ? 'text-fun-yellow' : 'text-slate-400'}`}>
            {isWinner ? "VICTORY!" : "DEFEAT!"}
          </h1>
          <p className="text-xs font-bold uppercase text-slate-400 italic">
            {isWinner ? "Speed and mastery was unmatched!" : "Better luck in the next race course!"}
          </p>
        </div>

        <div className="bg-white rounded-[2rem] p-6 border-4 border-slate-100 shadow-xl">
          <div className="grid grid-cols-3 gap-2 devide-x divider-slate-150 text-center py-2">
            <div>
              <div className="font-bold text-slate-400 text-xs uppercase mb-1">Score</div>
              <div className="text-2xl font-black text-slate-800 leading-none">{score}</div>
            </div>
            <div>
              <div className="font-bold text-slate-400 text-xs uppercase mb-1">XP Loot</div>
              <div className="text-2xl font-black text-fun-green leading-none">+{isWinner ? 200 + score : 50 + Math.floor(score/2)}</div>
            </div>
            <div>
              <div className="font-bold text-slate-400 text-xs uppercase mb-1">Accuracy</div>
              <div className="text-2xl font-black text-slate-800 leading-none">
                {Math.round((currentIndex / Math.max(1, currentIndex + mistakes.length)) * 100) || 0}%
              </div>
            </div>
          </div>
        </div>

        {/* Highlighted Mistakes Panel if any */}
        {mistakes.length > 0 && (
          <div className="bg-white p-5 rounded-[2rem] border-4 border-slate-100 shadow-md text-left space-y-3">
            <h4 className="font-black text-slate-800 text-sm tracking-tight flex items-center gap-1.5 uppercase">
              <CheckCircle2 size={16} className="text-slate-400" /> Lesson Corner (Last Mistakes)
            </h4>
            <div className="divide-y divide-slate-100">
              {mistakes.map((mis, idx) => (
                <div key={idx} className="py-2.5 first:pt-0 last:pb-0 space-y-1">
                  <span className="text-[10px] font-bold text-red-500 uppercase">Q: {mis.question}</span>
                  <div className="flex gap-4 text-xs font-black">
                    <span className="text-slate-400 leading-none">Your Answer: <span className="text-red-400 line-through">{mis.yourAnswer || 'N/A'}</span></span>
                    <span className="text-fun-green leading-none">Correction: <span>{mis.correctAnswer}</span></span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold italic mt-0.5">{mis.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button 
            variant="danger" 
            fullWidth 
            className="py-4 text-base rounded-2xl flex items-center justify-center gap-2 border-b-4 border-red-800"
            onClick={startMatching}
          >
            <RefreshCw size={18} /> REMATCH
          </Button>
          <Button 
            variant="secondary" 
            fullWidth 
            className="py-4 text-base rounded-2xl flex items-center justify-center gap-2"
            onClick={() => setGameState('lobby')}
          >
            <Home size={18} /> BACK TO LOBBY
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8">
      <AnimatePresence mode="wait">
        {gameState === 'lobby' && renderLobbySelection()}
        {gameState === 'matching' && renderMatchingLobby()}
        {gameState === 'playing' && renderGameActive()}
        {gameState === 'results' && renderResultsScreen()}
      </AnimatePresence>
    </div>
  );
};

export default RaceMode;
