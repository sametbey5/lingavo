import React, { useState, useEffect, useRef } from "react";
import { useGamification } from "../context/GamificationContext";
import { useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import {
  Mic,
  MicOff,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Trophy,
  Star,
  ArrowRight,
  Volume2,
  BookOpen,
  MessageSquare,
  EyeOff,
  Target,
  Flame,
  Users,
  Activity,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Confetti from "../components/Confetti";
import AnimatedMascot from "../components/AnimatedMascot";
import { PHRASES, Phrase } from "../constants/phrases";

const AI_ASSISTANTS = [
  {
    id: "char1",
    name: "Character 1",
    icon: "👤",
    systemPrompt:
      "You are Character 1, a helpful AI English tutor designed for language learners. Keep your responses conversational and short. Ask engaging questions.",
    initialMessage:
      "Hello! I am Character 1. What would you like to talk about today?",
  },
  {
    id: "char2",
    name: "Character 2",
    icon: "👤",
    systemPrompt:
      "You are Character 2, a helpful AI English tutor designed for language learners. Keep your responses conversational and short. Ask engaging questions.",
    initialMessage:
      "Hi there! I am Character 2. Ready to practice your English?",
  },
  {
    id: "char3",
    name: "Character 3",
    icon: "👤",
    systemPrompt:
      "You are Character 3, a helpful AI English tutor designed for language learners. Keep your responses conversational and short. Ask engaging questions.",
    initialMessage:
      "Greetings! I am Character 3. How can I help you practice today?",
  },
  {
    id: "char4",
    name: "Character 4",
    icon: "👤",
    systemPrompt:
      "You are Character 4, a helpful AI English tutor designed for language learners. Keep your responses conversational and short. Ask engaging questions.",
    initialMessage: "Hello! I am Character 4. Let's have a conversation.",
  },
  {
    id: "char5",
    name: "Character 5",
    icon: "👤",
    systemPrompt:
      "You are Character 5, a helpful AI English tutor designed for language learners. Keep your responses conversational and short. Ask engaging questions.",
    initialMessage: "Hi! I am Character 5. What's on your mind today?",
  },
  {
    id: "char6",
    name: "Character 6",
    icon: "👤",
    systemPrompt:
      "You are Character 6, a helpful AI English tutor designed for language learners. Keep your responses conversational and short. Ask engaging questions.",
    initialMessage: "Hello! I am Character 6. Shall we begin our chat?",
  },
  {
    id: "char7",
    name: "Character 7",
    icon: "👤",
    systemPrompt:
      "You are Character 7, a helpful AI English tutor designed for language learners. Keep your responses conversational and short. Ask engaging questions.",
    initialMessage: "Hi there! I am Character 7. It's good to see you.",
  },
  {
    id: "char8",
    name: "Character 8",
    icon: "👤",
    systemPrompt:
      "You are Character 8, a helpful AI English tutor designed for language learners. Keep your responses conversational and short. Ask engaging questions.",
    initialMessage: "Hello! I am Character 8. I am ready when you are.",
  },
  {
    id: "char9",
    name: "Character 9",
    icon: "👤",
    systemPrompt:
      "You are Character 9, a helpful AI English tutor designed for language learners. Keep your responses conversational and short. Ask engaging questions.",
    initialMessage: "Hey! I am Character 9. Let's practice some English.",
  },
  {
    id: "char10",
    name: "Character 10",
    icon: "👤",
    systemPrompt:
      "You are Character 10, a helpful AI English tutor designed for language learners. Keep your responses conversational and short. Ask engaging questions.",
    initialMessage: "Hi! I am Character 10. Let's talk.",
  },
];

const CATEGORIES = Array.from(new Set(PHRASES.map((p) => p.category)));

const PronunciationPractice: React.FC = () => {
  const { awardPoints, mode } = useGamification();
  const [searchParams] = useSearchParams();
  const isKids = mode === "kids";

  const [view, setView] = useState<
    "menu" | "selection" | "practice" | "ai-assistant" | "ai-selection"
  >("menu");
  const viewRef = useRef(view);
  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | "All">(
    "All",
  );

  // AI Assistant State
  const [selectedAssistantId, setSelectedAssistantId] = useState(
    AI_ASSISTANTS[0].id,
  );
  const [aiChatHistory, setAiChatHistory] = useState<
    { role: "user" | "ai"; text: string }[]
  >([
    {
      role: "ai",
      text:
        AI_ASSISTANTS[0].initialMessage ||
        "Hello! I'm your AI English tutor. What would you like to talk about today?",
    },
  ]);
  const [aiTranscript, setAiTranscript] = useState("");
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const aiMessagesEndRef = useRef<HTMLDivElement>(null);

  const handleAiConversation = async (userMsg: string) => {
    const newUserHistory = [
      ...aiChatHistory,
      { role: "user" as const, text: userMsg },
    ];
    setAiChatHistory(newUserHistory);
    setAiTranscript("");
    awardPoints(10, "Spoke with AI", "speaking");

    const assistant = AI_ASSISTANTS.find((a) => a.id === selectedAssistantId);

    try {
      const mappedHistory = newUserHistory.map((m) => ({
        role: m.role === "ai" ? "assistant" : "user",
        content: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: mappedHistory,
          systemPrompt:
            assistant?.systemPrompt || AI_ASSISTANTS[0].systemPrompt,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response");
      }

      const data = await res.json();
      const aiResponse = data.message;

      setAiChatHistory((prev) => [...prev, { role: "ai", text: aiResponse }]);

      const utterance = new SpeechSynthesisUtterance(aiResponse);
      utterance.lang = "en-US";
      utterance.onstart = () => setIsAiSpeaking(true);
      utterance.onend = () => setIsAiSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error("AI chat error:", err);
      setError("Sorry, I couldn't connect to my brain. Try again!");
    }
  };

  useEffect(() => {
    if (view === "ai-assistant") {
      aiMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [aiChatHistory, view]);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const qPhrase = searchParams.get("phrase") || searchParams.get("search");
    if (qPhrase) {
      const decodedPhrase = decodeURIComponent(qPhrase);
      const foundIdx = PHRASES.findIndex(
        (p) =>
          p.text.toLowerCase().includes(decodedPhrase.toLowerCase()) ||
          decodedPhrase.toLowerCase().includes(p.text.toLowerCase()),
      );
      if (foundIdx !== -1) {
        setSelectedCategory("All");
        setCurrentPhraseIndex(foundIdx);
        setView("practice");
      }
    }
  }, [searchParams]);

  const filteredPhrases =
    selectedCategory === "All"
      ? PHRASES
      : PHRASES.filter((p) => p.category === selectedCategory);

  const currentPhrase = filteredPhrases[currentPhraseIndex] || PHRASES[0];

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        const confidence = event.results[0][0].confidence;
        if (viewRef.current === "ai-assistant") {
          setAiTranscript(result);
          handleAiConversation(result);
        } else {
          setTranscript(result);
          evaluatePronunciation(result, confidence);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setError(`Error: ${event.error}`);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      setError(
        "Your browser does not support speech recognition. Please try Chrome or Edge.",
      );
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) return;
    setError(null);
    setTranscript("");
    setScore(null);
    setFeedback(null);
    setIsListening(true);
    try {
      recognitionRef.current.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setIsListening(false);
  };

  const evaluatePronunciation = (result: string, confidence: number) => {
    const target = currentPhrase.text
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    const actual = result
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");

    // Simple word match score
    const targetWords = target.split(" ");
    const actualWords = actual.split(" ");

    let matches = 0;
    targetWords.forEach((word) => {
      if (actualWords.includes(word)) matches++;
    });

    const accuracy = (matches / targetWords.length) * 100;
    // Combine accuracy with API confidence
    const finalScore = Math.round(accuracy * 0.7 + confidence * 100 * 0.3);

    setScore(finalScore);

    if (finalScore >= 90) {
      setFeedback("Perfect! You sound like a native speaker!");
      setShowConfetti(true);
      awardPoints(50, "Perfect Pronunciation", "speaking");
      setTimeout(() => setShowConfetti(false), 3000);
    } else if (finalScore >= 70) {
      setFeedback("Great job! Just a few small improvements needed.");
      awardPoints(30, "Good Pronunciation", "speaking");
    } else if (finalScore >= 40) {
      setFeedback("Not bad! Try to speak more clearly and focus on each word.");
      awardPoints(10, "Pronunciation Practice", "speaking");
    } else {
      setFeedback("Keep practicing! Try listening to the phrase again.");
    }
  };

  const speakPhrase = () => {
    const utterance = new SpeechSynthesisUtterance(currentPhrase.text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const nextPhrase = () => {
    setCurrentPhraseIndex((prev) => (prev + 1) % filteredPhrases.length);
    setTranscript("");
    setScore(null);
    setFeedback(null);
    setError(null);
  };

  const selectPhrase = (index: number) => {
    setCurrentPhraseIndex(index);
    setView("practice");
    setTranscript("");
    setScore(null);
    setFeedback(null);
    setError(null);
  };

  if (view === "menu") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto space-y-6 pb-28 px-3 sm:px-4 font-sans"
      >
        {/* Top Stats Section */}
        <div className="flex gap-2 sm:gap-4 mt-2">
           <div className="flex-1 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 hover:-translate-y-1 hover:shadow-md transition-all cursor-default">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                 <Flame size={20} className="fill-current" />
              </div>
              <div>
                 <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Streak</p>
                 <p className="text-sm sm:text-base font-black text-slate-800">4 Days</p>
              </div>
           </div>
           <div className="flex-1 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 hover:-translate-y-1 hover:shadow-md transition-all cursor-default">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                 <Target size={20} className="fill-current" />
              </div>
              <div>
                 <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Goal</p>
                 <p className="text-sm sm:text-base font-black text-slate-800">10 min</p>
              </div>
           </div>
           <div className="hidden sm:flex flex-1 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm items-center gap-3 hover:-translate-y-1 hover:shadow-md transition-all cursor-default">
              <div className="w-10 h-10 rounded-xl bg-yellow-50 text-yellow-500 flex items-center justify-center">
                 <Star size={20} className="fill-current" />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total XP</p>
                 <p className="font-black text-slate-800">64,544</p>
              </div>
           </div>
        </div>

        {/* Hero Section */}
        <div className="relative w-full rounded-[2.5rem] bg-indigo-950 overflow-hidden shadow-2xl p-6 sm:p-10 flex flex-col items-center justify-center text-center border-4 border-indigo-900 ring-4 ring-indigo-500/20 group cursor-pointer" onClick={() => setView("selection")}>
            <div className="absolute inset-0 bg-gradient-to-br from-fun-blue/40 to-fun-purple/40 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-fun-purple/20 rounded-full blur-[90px] transform translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-fun-blue/20 rounded-full blur-[90px] transform -translate-x-1/2 translate-y-1/2 z-0 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
            
            <div className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-fun-blue to-fun-purple rounded-full animate-pulse opacity-60 blur-xl" />
                <div className="absolute inset-2 bg-gradient-to-r from-fun-blue to-fun-purple rounded-full opacity-90 shadow-inner" />
                <div className="absolute inset-3 bg-indigo-900 rounded-full flex items-center justify-center border border-indigo-400/30 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]">
                   <Mic size={40} className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
                </div>
            </div>

            <div className="relative z-10 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-white/90 font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <Sparkles size={14} className="text-fun-yellow" /> Voice Engine Ready
            </div>

            <h2 className="relative z-10 text-3xl sm:text-5xl font-black text-white tracking-tight mb-3 drop-shadow-lg">
               Speak with Confidence
            </h2>
            <p className="relative z-10 text-indigo-200 font-bold text-sm sm:text-base max-w-sm mb-8 drop-shadow-md">
               Practice pronunciation, fluency, and real conversations.
            </p>

            <button className="relative z-10 bg-gradient-to-r from-fun-blue to-fun-purple px-8 py-4 sm:px-10 sm:py-5 rounded-full text-white font-black text-lg sm:text-xl shadow-[0_10px_30px_rgba(102,126,234,0.5)] hover:scale-105 hover:shadow-[0_15px_40px_rgba(102,126,234,0.7)] transition-all duration-300 ring-2 ring-white/30 hover:ring-white">
                Tap to start speaking
            </button>
        </div>

        {/* Practice Modes Section */}
        <div>
           <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="font-black text-slate-800 text-xl">Choose Your Practice</h3>
           </div>
           
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div onClick={() => setView("ai-selection")} className="bg-white rounded-[2rem] p-4 sm:p-5 border-2 border-slate-100 shadow-sm cursor-pointer hover:-translate-y-1 hover:shadow-md hover:border-fun-purple/30 transition-all group flex flex-col h-full relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-fun-purple/5 rounded-bl-[4rem] -z-10 group-hover:bg-fun-purple/10 transition-colors" />
                 <div className="w-12 h-12 bg-fun-purple/10 text-fun-purple rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <MessageSquare size={24} />
                 </div>
                 <h4 className="font-black text-slate-800 text-base sm:text-lg mb-1 group-hover:text-fun-purple transition-colors">AI Conversation</h4>
                 <p className="text-[10px] sm:text-xs font-bold text-slate-500 mb-4 line-clamp-2 leading-relaxed">Chat naturally with your AI assistant.</p>
                 <div className="mt-auto flex items-center gap-1.5 text-fun-purple font-black text-[10px] uppercase tracking-wider bg-fun-purple/5 w-fit px-2.5 py-1.5 rounded-lg border border-fun-purple/10">
                    <Zap size={14} className="fill-current" /> +20 XP
                 </div>
              </div>

              <div onClick={() => setView("selection")} className="bg-white rounded-[2rem] p-4 sm:p-5 border-2 border-slate-100 shadow-sm cursor-pointer hover:-translate-y-1 hover:shadow-md hover:border-fun-blue/30 transition-all group flex flex-col h-full relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-fun-blue/5 rounded-bl-[4rem] -z-10 group-hover:bg-fun-blue/10 transition-colors" />
                 <div className="w-12 h-12 bg-fun-blue/10 text-fun-blue rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Volume2 size={24} />
                 </div>
                 <h4 className="font-black text-slate-800 text-base sm:text-lg mb-1 group-hover:text-fun-blue transition-colors">Pronunciation</h4>
                 <p className="text-[10px] sm:text-xs font-bold text-slate-500 mb-4 line-clamp-2 leading-relaxed">Perfect your sounds with instant scoring.</p>
                 <div className="mt-auto flex items-center gap-1.5 text-fun-blue font-black text-[10px] uppercase tracking-wider bg-fun-blue/5 w-fit px-2.5 py-1.5 rounded-lg border border-fun-blue/10">
                    <Zap size={14} className="fill-current" /> +30 XP
                 </div>
              </div>
              
              <div className="bg-slate-50 rounded-[2rem] p-4 sm:p-5 border-2 border-slate-100 shadow-none hover:shadow-md transition-all group flex flex-col h-full relative overflow-hidden opacity-80 cursor-not-allowed">
                 <div className="absolute top-4 right-4 bg-white text-slate-400 text-[9px] font-black px-2 py-1 rounded-lg uppercase shadow-sm border border-slate-100">Soon</div>
                 <div className="w-12 h-12 bg-fun-orange/10 text-fun-orange rounded-2xl flex items-center justify-center mb-4 opacity-70">
                    <Users size={24} />
                 </div>
                 <h4 className="font-black text-slate-600 text-base sm:text-lg mb-1">Roleplay</h4>
                 <p className="text-[10px] sm:text-xs font-bold text-slate-400 mb-4 line-clamp-2">Real-life speaking scenarios.</p>
              </div>

              <div className="bg-slate-50 rounded-[2rem] p-4 sm:p-5 border-2 border-slate-100 shadow-none hover:shadow-md transition-all group flex flex-col h-full relative overflow-hidden opacity-80 cursor-not-allowed">
                 <div className="absolute top-4 right-4 bg-white text-slate-400 text-[9px] font-black px-2 py-1 rounded-lg uppercase shadow-sm border border-slate-100">Soon</div>
                 <div className="w-12 h-12 bg-fun-green/10 text-fun-green rounded-2xl flex items-center justify-center mb-4 opacity-70">
                    <Activity size={24} />
                 </div>
                 <h4 className="font-black text-slate-600 text-base sm:text-lg mb-1">Fluency Drill</h4>
                 <p className="text-[10px] sm:text-xs font-bold text-slate-400 mb-4 line-clamp-2">Build speed and confidence.</p>
              </div>
           </div>
        </div>

        {/* Daily Speaking Challenge */}
        <div className="bg-gradient-to-r from-teal-400 to-emerald-500 rounded-[2rem] p-5 sm:p-8 text-white shadow-lg relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6 cursor-pointer hover:shadow-xl transition-all group mt-2">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none group-hover:bg-white/20 transition-colors" />
            <div className="absolute bottom-0 right-10 opacity-10 scale-150 transform translate-y-1/4 translate-x-1/4 font-black pointer-events-none">
                ☕
            </div>
            <div className="relative z-10 flex-1">
               <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-white/20 text-white font-black text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">Daily Challenge</span>
                  <span className="bg-orange-500 text-white font-black text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-sm"><Zap size={12} className="fill-current" /> 50 XP</span>
               </div>
               <h3 className="text-2xl sm:text-3xl font-black mb-1 drop-shadow-sm">Order coffee at a cafe</h3>
               <p className="text-white/90 font-bold text-xs sm:text-base drop-shadow-sm max-w-sm">Practice ordering a cappuccino smoothly and naturally.</p>
            </div>
            <button className="relative z-10 bg-white text-emerald-600 font-black px-8 py-3.5 rounded-xl hover:bg-slate-50 transition-colors shadow-lg active:scale-95 text-sm sm:text-base whitespace-nowrap self-start sm:self-auto hover:-translate-y-0.5">
               Start Challenge
            </button>
        </div>

        {/* Analytics Section */}
        <div className="bg-white rounded-[2rem] p-5 sm:p-6 border-2 border-slate-100 shadow-sm mt-2 flex flex-col">
           <h3 className="font-black text-slate-800 text-lg mb-4 px-1">Your Speaking Progress</h3>
           <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center text-center p-3 sm:p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 hover:border-fun-blue/30 transition-colors group cursor-default">
                 <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-2">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                       <path className="text-slate-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                       <path className="text-fun-blue drop-shadow-md" strokeDasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-black text-xs sm:text-sm text-slate-700 bg-white m-1.5 rounded-full shadow-inner">
                       85%
                    </div>
                 </div>
                 <span className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-wider group-hover:text-fun-blue transition-colors">Pronunciation</span>
              </div>

              <div className="flex flex-col items-center text-center p-3 sm:p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 hover:border-fun-purple/30 transition-colors group cursor-default">
                 <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-2">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                       <path className="text-slate-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                       <path className="text-fun-purple drop-shadow-md" strokeDasharray="92, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-black text-xs sm:text-sm text-slate-700 bg-white m-1.5 rounded-full shadow-inner">
                       92%
                    </div>
                 </div>
                 <span className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-wider group-hover:text-fun-purple transition-colors">Fluency</span>
              </div>
              
              <div className="flex flex-col items-center text-center p-3 sm:p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 hover:border-fun-orange/30 transition-colors group cursor-default">
                 <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-2">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                       <path className="text-slate-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                       <path className="text-fun-orange drop-shadow-md" strokeDasharray="78, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-black text-xs sm:text-sm text-slate-700 bg-white m-1.5 rounded-full shadow-inner">
                       78%
                    </div>
                 </div>
                 <span className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-wider group-hover:text-fun-orange transition-colors">Confidence</span>
              </div>
           </div>
        </div>

      </motion.div>
    );
  }

  if (view === "selection") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-4 sm:space-y-8 pb-20 px-4"
      >
        <div className="text-center space-y-2 sm:space-y-4">
          <div className="inline-block bg-fun-blue/10 p-2 sm:p-4 rounded-full mb-1 sm:mb-2">
            <Mic size={28} className="sm:w-12 sm:h-12 text-fun-blue" />
          </div>
          <h2 className="text-2xl md:text-5xl font-black text-slate-800 tracking-tight uppercase leading-tight">
            Speaking Practice
          </h2>
          <p className="text-xs sm:text-xl font-bold text-slate-500 max-w-2xl mx-auto">
            Choose a phrase to practice your pronunciation! 🎤
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-8">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-3 py-1.5 sm:px-6 sm:py-2 rounded-full font-black text-[10px] sm:text-sm transition-all ${selectedCategory === "All" ? "bg-fun-blue text-white shadow-md sm:shadow-lg" : "bg-white text-slate-500 border-2 border-slate-100 hover:bg-slate-50"}`}
          >
            ALL
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 sm:px-6 sm:py-2 rounded-full font-black text-[10px] sm:text-sm transition-all ${selectedCategory === cat ? "bg-fun-blue text-white shadow-md sm:shadow-lg" : "bg-white text-slate-500 border-2 border-slate-100 hover:bg-slate-50"}`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredPhrases.map((phrase, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => selectPhrase(idx)}
              className="bg-white p-3 sm:p-6 rounded-2xl sm:rounded-[2rem] border-2 sm:border-4 border-slate-100 shadow-sm cursor-pointer hover:border-fun-blue transition-all group flex flex-col justify-between"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start mb-2 sm:mb-4 gap-1">
                <span
                  className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest leading-none ${
                    phrase.difficulty === "Beginner"
                      ? "bg-green-100 text-green-600"
                      : phrase.difficulty === "Intermediate"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-purple-100 text-purple-600"
                  }`}
                >
                  {phrase.difficulty}
                </span>
                <span className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                  {phrase.category}
                </span>
              </div>
              <h4 className="text-base sm:text-xl font-bold text-slate-800 mb-2 sm:mb-6 group-hover:text-fun-blue transition-colors leading-tight">
                "{phrase.text}"
              </h4>
              <div className="flex items-center justify-between text-fun-blue font-black text-[10px] sm:text-sm mt-auto">
                <span>Practice</span>
                <ArrowRight size={14} className="sm:w-5 sm:h-5" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (view === "ai-selection") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-6 sm:space-y-8"
      >
        <div className="flex items-center gap-4 mb-4 sm:mb-8 px-4">
          <button
            onClick={() => setView("menu")}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-fun-blue hover:shadow-md transition-all border-2 border-slate-100"
          >
            <RotateCcw size={20} className="sm:w-6 sm:h-6" />
          </button>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
              Choose an AI Assistant
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-bold">
              Select a character to practice your English with!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
          {AI_ASSISTANTS.map((assistant) => (
            <motion.div
              key={assistant.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedAssistantId(assistant.id);
                setAiChatHistory([
                  {
                    role: "ai",
                    text:
                      assistant.initialMessage ||
                      `Hello! I'm your ${assistant.name}. What would you like to talk about today?`,
                  },
                ]);
                setAiTranscript("");
                setView("ai-assistant");
              }}
              className="bg-white p-6 rounded-3xl border-4 border-slate-100 shadow-sm cursor-pointer hover:border-fun-purple transition-all flex flex-col items-center justify-center text-center group"
            >
              <span className="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform">
                {assistant.icon}
              </span>
              <h3 className="font-bold text-slate-800 group-hover:text-fun-purple transition-colors">
                {assistant.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (view === "ai-assistant") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-140px)] min-h-[500px]"
      >
        <div className="flex items-center justify-between mb-4 sm:mb-6 px-4">
          <button
            onClick={() => setView("ai-selection")}
            className="flex items-center gap-2 text-slate-500 font-black hover:text-fun-purple transition-colors"
          >
            <RotateCcw size={20} /> Change Assistant
          </button>
          <div className="bg-fun-purple/10 text-fun-purple px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2">
            <span>
              {AI_ASSISTANTS.find((a) => a.id === selectedAssistantId)?.icon}
            </span>
            <span>
              {AI_ASSISTANTS.find((a) => a.id === selectedAssistantId)?.name}
            </span>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-[2rem] sm:rounded-[3rem] border-4 border-slate-100 shadow-2xl flex flex-col overflow-hidden mx-4 pb-4 relative">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={() => setShowChat(!showChat)}
              className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl shadow-sm border-2 border-slate-100 text-slate-400 hover:text-fun-blue hover:border-fun-blue/30 transition-all font-black flex items-center gap-2 text-sm"
              title={showChat ? "Hide Chat" : "Show Chat"}
            >
              {showChat ? (
                <>
                  <EyeOff size={18} /> Voice Only
                </>
              ) : (
                <>
                  <MessageSquare size={18} /> Show Chat
                </>
              )}
            </button>
          </div>

          <AnimatedMascot
            isSpeaking={isAiSpeaking}
            isListening={isListening}
            assistantId={selectedAssistantId}
          />

          {showChat ? (
            <>
              <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-4 sm:space-y-6 bg-slate-50/50">
                {aiChatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-end gap-3 max-w-[90%] sm:max-w-[80%]`}
                    >
                      {msg.role === "ai" && (
                        <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-fun-purple/20 border-2 border-fun-purple flex items-center justify-center shrink-0 relative overflow-hidden">
                          <span className="text-xl sm:text-2xl">🦉</span>
                        </div>
                      )}
                      <div
                        className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl font-bold text-sm sm:text-base shadow-sm ${msg.role === "user" ? "bg-fun-purple text-white rounded-br-none" : "bg-white border-2 border-slate-100 text-slate-800 rounded-bl-none"}`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={aiMessagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="px-4 sm:px-8 flex flex-col gap-2 pt-2">
                {isListening && (
                  <div className="bg-slate-800 text-white px-4 py-2 rounded-full font-bold flex items-center justify-center self-center gap-2 text-xs animate-pulse shadow-md">
                    <Mic size={14} className="text-fun-pink" /> Listening...
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (aiTranscript.trim()) {
                      handleAiConversation(aiTranscript);
                      setAiTranscript("");
                    }
                  }}
                  className="flex items-center gap-2 sm:gap-3 bg-slate-50 p-2 sm:p-3 rounded-full border-2 border-slate-100 focus-within:border-fun-purple/50 transition-colors"
                >
                  <button
                    type="button"
                    onClick={isListening ? stopListening : startListening}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all shrink-0 ${
                      isListening
                        ? "bg-fun-pink text-white shadow-inner scale-95"
                        : "bg-fun-purple/10 text-fun-purple hover:bg-fun-purple/20"
                    }`}
                  >
                    {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                  </button>

                  <input
                    type="text"
                    value={aiTranscript}
                    onChange={(e) => setAiTranscript(e.target.value)}
                    placeholder="Type or speak a message..."
                    className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base font-bold text-slate-700 placeholder-slate-400"
                  />

                  <button
                    type="submit"
                    disabled={!aiTranscript.trim()}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all shrink-0 ${
                      aiTranscript.trim()
                        ? "bg-fun-blue text-white shadow-md hover:scale-105 active:scale-95"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    <ArrowRight size={20} />
                  </button>
                </form>
                {error && (
                  <p className="text-xs font-bold text-red-500 text-center mb-2">
                    {error}
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50/50">
              <div className="text-center space-y-6">
                {isListening && (
                  <div className="bg-slate-800 text-white px-6 py-3 rounded-full font-bold flex items-center gap-3 animate-bounce shadow-xl mx-auto w-fit">
                    <Mic size={20} className="text-fun-pink animate-pulse" />{" "}
                    Listening...
                  </div>
                )}
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`w-24 h-24 sm:w-32 sm:h-32 rounded-[2rem] sm:rounded-[3rem] flex items-center justify-center transition-all shadow-2xl hover:scale-105 active:scale-95 mx-auto ${
                    isListening
                      ? "bg-fun-pink text-white animate-pulse"
                      : "bg-fun-purple text-white"
                  }`}
                >
                  {isListening ? (
                    <MicOff size={40} className="sm:w-12 sm:h-12" />
                  ) : (
                    <Mic size={40} className="sm:w-12 sm:h-12" />
                  )}
                </button>
                <p className="text-base sm:text-lg font-bold text-slate-400">
                  {isListening
                    ? "Tap to stop recording"
                    : "Tap the mic to start talking"}
                </p>
                {error && (
                  <p className="text-sm font-bold text-red-500 text-center mt-2">
                    {error}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8 pb-20 px-4"
    >
      {showConfetti && <Confetti />}

      <div className="flex items-center justify-between">
        <button
          onClick={() => setView("selection")}
          className="flex items-center gap-2 text-slate-500 font-black hover:text-fun-blue transition-colors"
        >
          <RotateCcw size={20} /> Back to Selection
        </button>
        <div className="bg-slate-100 px-4 py-2 rounded-full font-black text-xs text-slate-500 uppercase tracking-widest">
          Phrase {currentPhraseIndex + 1} of {filteredPhrases.length}
        </div>
      </div>

      <div className="text-center space-y-4">
        <div className="inline-block bg-fun-green/10 p-4 rounded-full mb-2">
          <Mic size={48} className="text-fun-green" />
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
          PRONUNCIATION LAB
        </h2>
      </div>

      <div className="bg-white p-6 sm:p-8 md:p-12 rounded-[3rem] border-4 border-slate-100 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 sm:p-6">
          <span
            className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${
              currentPhrase.difficulty === "Beginner"
                ? "bg-green-100 text-green-600"
                : currentPhrase.difficulty === "Intermediate"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-purple-100 text-purple-600"
            }`}
          >
            {currentPhrase.difficulty}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhraseIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <div className="space-y-2">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                {currentPhrase.category}
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 leading-tight">
                "{currentPhrase.text}"
              </h3>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <button
                onClick={speakPhrase}
                className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                title="Listen to phrase"
              >
                <Volume2 size={24} className="sm:w-8 sm:h-8" />
              </button>

              <button
                onClick={isListening ? stopListening : startListening}
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center transition-all shadow-xl hover:scale-105 active:scale-95 ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-fun-blue text-white"
                }`}
              >
                {isListening ? (
                  <MicOff size={32} className="sm:w-10 sm:h-10" />
                ) : (
                  <Mic size={32} className="sm:w-10 sm:h-10" />
                )}
              </button>

              <button
                onClick={nextPhrase}
                className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                title="Next phrase"
              >
                <ArrowRight size={24} className="sm:w-8 sm:h-8" />
              </button>
            </div>

            {isListening && (
              <div className="flex items-center gap-2 text-fun-blue font-black animate-pulse">
                <div className="w-2 h-2 bg-fun-blue rounded-full" />
                <div className="w-2 h-2 bg-fun-blue rounded-full" />
                <div className="w-2 h-2 bg-fun-blue rounded-full" />
                <span>Listening...</span>
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-2 font-bold">
                <AlertCircle size={20} />
                {error}
              </div>
            )}

            {transcript && !isListening && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 w-full"
              >
                <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-100">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                    You said:
                  </span>
                  <p className="text-2xl font-bold text-slate-700 italic">
                    "{transcript}"
                  </p>
                </div>

                {score !== null && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white p-6 rounded-3xl border-4 border-slate-50 shadow-sm flex flex-col items-center justify-center"
                    >
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                        Accuracy Score
                      </span>
                      <div
                        className={`text-5xl font-black ${
                          score >= 80
                            ? "text-fun-green"
                            : score >= 50
                              ? "text-fun-yellow"
                              : "text-fun-orange"
                        }`}
                      >
                        {score}%
                      </div>
                      <div className="flex gap-1 mt-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={20}
                            className={`${score >= star * 20 ? "text-fun-yellow fill-current" : "text-slate-200"}`}
                          />
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white p-6 rounded-3xl border-4 border-slate-50 shadow-sm flex flex-col items-center justify-center"
                    >
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                        Feedback
                      </span>
                      <p className="text-lg font-bold text-slate-700">
                        {feedback}
                      </p>
                      {score >= 70 ? (
                        <CheckCircle2
                          size={32}
                          className="text-fun-green mt-3"
                        />
                      ) : (
                        <RotateCcw
                          size={32}
                          className="text-fun-blue mt-3 cursor-pointer hover:rotate-180 transition-transform"
                          onClick={startListening}
                        />
                      )}
                    </motion.div>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border-4 border-slate-100 shadow-md flex items-center gap-4">
          <div className="w-12 h-12 bg-fun-blue/10 rounded-xl flex items-center justify-center text-fun-blue">
            <Trophy size={24} />
          </div>
          <div>
            <h4 className="font-black text-slate-800">Daily Goal</h4>
            <p className="text-xs font-bold text-slate-400">3/5 Phrases</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border-4 border-slate-100 shadow-md flex items-center gap-4">
          <div className="w-12 h-12 bg-fun-pink/10 rounded-xl flex items-center justify-center text-fun-pink">
            <Star size={24} />
          </div>
          <div>
            <h4 className="font-black text-slate-800">Best Score</h4>
            <p className="text-xs font-bold text-slate-400">98% Accuracy</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border-4 border-slate-100 shadow-md flex items-center gap-4">
          <div className="w-12 h-12 bg-fun-purple/10 rounded-xl flex items-center justify-center text-fun-purple">
            <RotateCcw size={24} />
          </div>
          <div>
            <h4 className="font-black text-slate-800">Total Practice</h4>
            <p className="text-xs font-bold text-slate-400">124 Phrases</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PronunciationPractice;
