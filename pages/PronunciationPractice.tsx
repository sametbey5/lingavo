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
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Confetti from "../components/Confetti";
import AnimatedMascot from "../components/AnimatedMascot";
import { PHRASES, Phrase } from "../constants/phrases";

const AI_ASSISTANTS = [
  {
    id: "friendly_tutor",
    name: "Friendly Tutor",
    icon: "👨‍🏫",
    systemPrompt:
      "You are a helpful, enthusiastic, and encouraging AI English tutor designed for language learners. Keep your responses conversational, natural, and relatively short (2-3 sentences max). Ask engaging questions to keep the conversation going.",
    initialMessage:
      "Hello! I'm your Friendly Tutor. What would you like to talk about today?",
  },
  {
    id: "strict_grammarian",
    name: "Strict Grammarian",
    icon: "🧐",
    systemPrompt:
      "You are a strict and precise English grammar tutor. You meticulously point out every grammatical, syntactical, and vocabulary error the user makes and explain the rule before continuing the conversation. Keep responses under 4 sentences.",
    initialMessage:
      "Greetings. I am here to correct your grammar. Please speak clearly, and try not to make any mistakes.",
  },
  {
    id: "job_interviewer",
    name: "Tech Interviewer",
    icon: "💼",
    systemPrompt:
      "You are a professional hiring manager conducting a job interview for a software engineering position. Ask professional interview questions, wait for the user's answers, and evaluate their responses professionally. Keep questions brief.",
    initialMessage:
      "Hello. I'm the hiring manager. Are you ready to begin your interview?",
  },
  {
    id: "travel_guide",
    name: "Travel Guide",
    icon: "🗺️",
    systemPrompt:
      "You are an enthusiastic travel guide leading a virtual tour. Describe sights, give travel tips, and ask the user about their travel preferences and questions about navigating new cities. Keep responses natural and under 3 sentences.",
    initialMessage: "Welcome aboard! Where would you like to travel today?",
  },
  {
    id: "chill_friend",
    name: "Chill Friend",
    icon: "😎",
    systemPrompt:
      "You are a casual, laid-back friend chatting with the user. Use everyday conversational English, some modern slang (in a natural way), and keep things lighthearted. Ask about their day or hobbies. Max 2-3 sentences.",
    initialMessage: "Hey, what's up? How's your day going?",
  },
  {
    id: "debate_opponent",
    name: "Debate Opponent",
    icon: "⚖️",
    systemPrompt:
      "You are an articulate and challenging debate opponent. Whatever opinion the user holds, you must respectfully but persistently argue the opposite side. Use advanced vocabulary and persuasive language. Keep responses concise but thought-provoking.",
    initialMessage:
      "State your opinion on any topic, and I will prove you wrong. Let us begin.",
  },
  {
    id: "storyteller",
    name: "Storyteller",
    icon: "📖",
    systemPrompt:
      "You are a creative storyteller co-writing a fantasy adventure with the user. Provide the next short paragraph of the story ending with a choice or a cliffhanger, and ask the user what they want to do next. Keep it immersive.",
    initialMessage:
      "Once upon a time, in a dark and mysterious forest... How would you like our story to start?",
  },
  {
    id: "business_boss",
    name: "Corporate Boss",
    icon: "📈",
    systemPrompt:
      "You are a direct, results-oriented corporate executive. Speak in business English, using corporate jargon. Focus on work scenarios, meetings, and project updates. Keep it professional and short.",
    initialMessage:
      "Let's touch base on your current projects. Give me an update on your bandwidth.",
  },
  {
    id: "pirate_captain",
    name: "Pirate Captain",
    icon: "🏴‍☠️",
    systemPrompt:
      "You are a boisterous, salty pirate captain sailing the high seas. Speak using pirate slang (arr, matey, shiver me timbers) and talk about treasure, the ocean, and sailing. Respond in 2-3 sentences.",
    initialMessage:
      "Ahoy there, matey! Ready to set sail for some buried treasure?",
  },
  {
    id: "shakespearean",
    name: "Shakespearean Actor",
    icon: "🎭",
    systemPrompt:
      "You are a dramatic actor from Elizabethan England. Speak exclusively in Early Modern English (using thee, thou, hath, anon) with poetic flair and dramatic metaphors. Keep responses short but highly dramatic.",
    initialMessage:
      "Hark! Who goes there? Pray tell me thy name and thy business.",
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
        className="max-w-5xl mx-auto space-y-8 sm:space-y-12 pb-20 px-4"
      >
        <div className="text-center space-y-4">
          <div className="inline-block bg-fun-blue/10 p-4 rounded-full mb-2">
            <Mic size={48} className="text-fun-blue" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 tracking-tight uppercase leading-tight">
            Speak Clear
          </h2>
          <p className="text-lg sm:text-xl font-bold text-slate-500 max-w-2xl mx-auto">
            Choose how you want to practice your speaking! 🗣️
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setView("ai-selection");
            }}
            className="bg-white p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3rem] border-4 border-slate-100 shadow-xl cursor-pointer hover:border-fun-purple transition-all group flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 bg-fun-purple/10 rounded-2xl flex items-center justify-center text-fun-purple mb-6 group-hover:scale-110 transition-transform">
              <Volume2 size={40} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mb-4">
              Practice with AI Assistant
            </h3>
            <p className="text-slate-500 font-bold">
              Have a natural voice conversation with our AI English tutor.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setView("selection")}
            className="bg-white p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3rem] border-4 border-slate-100 shadow-xl cursor-pointer hover:border-fun-blue transition-all group flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 bg-fun-blue/10 rounded-2xl flex items-center justify-center text-fun-blue mb-6 group-hover:scale-110 transition-transform">
              <Mic size={40} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mb-4">
              Recording & Accuracy
            </h3>
            <p className="text-slate-500 font-bold">
              Read phrases aloud, record your voice, and get instant accuracy
              scores.
            </p>
          </motion.div>
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
