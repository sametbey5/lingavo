import React, { useState, useMemo, useEffect } from 'react';
import { useGamification } from '../context/GamificationContext';
import { BookOpen, Search, Sparkles, Volume2, Bookmark, PlusCircle, Trash2, Brain, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Button from '../components/Button';
import { VocabWord } from '../types';

interface DictionaryWord {
  word: string;
  definition: string;
  exampleSentence: string;
  pronunciation: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  category: string;
}

const STATIC_DICTIONARY: DictionaryWord[] = [
  // A1 words
  {
    word: "Hello",
    definition: "A greeting used when meeting someone.",
    exampleSentence: "Hello! Nice to meet you.",
    pronunciation: "/həˈləʊ/",
    level: "A1",
    category: "Greeting"
  },
  {
    word: "Family",
    definition: "A group of parents and children living together.",
    exampleSentence: "I love spending weekend time with my family.",
    pronunciation: "/ˈfæm.əl.i/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Beautiful",
    definition: "Very pleasing to the senses or mind.",
    exampleSentence: "What a beautiful sunny day!",
    pronunciation: "/ˈbjuː.tɪ.fəl/",
    level: "A1",
    category: "Adjective"
  },
  {
    word: "Journey",
    definition: "An act of traveling from one place to another.",
    exampleSentence: "We began our journey across the country.",
    pronunciation: "/ˈdʒɜː.ni/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Bright",
    definition: "Giving out or reflecting much light.",
    exampleSentence: "The sun is very bright today.",
    pronunciation: "/braɪt/",
    level: "A1",
    category: "Adjective"
  },
  // A2 words
  {
    word: "Adventure",
    definition: "An unusual and exciting, typically hazardous, experience or activity.",
    exampleSentence: "Climbing the mountain was a real adventure.",
    pronunciation: "/ədˈven.tʃər/",
    level: "A2",
    category: "Noun"
  },
  {
    word: "Celebrate",
    definition: "Acknowledge a significant event with a social gathering.",
    exampleSentence: "We will celebrate your birthday tonight!",
    pronunciation: "/ˈsel.ə.breɪt/",
    level: "A2",
    category: "Verb"
  },
  {
    word: "Curious",
    definition: "Eager to know or learn something.",
    exampleSentence: "Cats are very curious animals.",
    pronunciation: "/ˈkjʊə.ri.əs/",
    level: "A2",
    category: "Adjective"
  },
  {
    word: "Delicious",
    definition: "Highly pleasant to the taste.",
    exampleSentence: "This chocolate cake is delicious!",
    pronunciation: "/dɪˈlɪʃ.əs/",
    level: "A2",
    category: "Adjective"
  },
  {
    word: "Explore",
    definition: "Travel through an unfamiliar area to learn about it.",
    exampleSentence: "Let's explore the old forest path.",
    pronunciation: "/ɪkˈsplɔːr/",
    level: "A2",
    category: "Verb"
  },
  // B1 words
  {
    word: "Collaborate",
    definition: "Work jointly on an activity or project.",
    exampleSentence: "Our teams will collaborate to finish the project.",
    pronunciation: "/kəˈlæb.ə.reɪt/",
    level: "B1",
    category: "Verb"
  },
  {
    word: "Essential",
    definition: "Absolutely necessary; extremely important.",
    exampleSentence: "Water is essential for life.",
    pronunciation: "/ɪˈsen.ʃəl/",
    level: "B1",
    category: "Adjective"
  },
  {
    word: "Challenge",
    definition: "A task or situation that tests someone's abilities.",
    exampleSentence: "Learning a new language is a great challenge.",
    pronunciation: "/ˈtʃæl.ɪndʒ/",
    level: "B1",
    category: "Noun"
  },
  {
    word: "Patience",
    definition: "The capacity to accept or tolerate delay or trouble without getting angry.",
    exampleSentence: "Teaching kids requires a lot of patience.",
    pronunciation: "/ˈpeɪ.ʃəns/",
    level: "B1",
    category: "Noun"
  },
  {
    word: "Navigate",
    definition: "Plan and direct the course of a ship, aircraft, or other form of transport.",
    exampleSentence: "We used a map to navigate the narrow city streets.",
    pronunciation: "/ˈnæv.ɪ.ɡeɪt/",
    level: "B1",
    category: "Verb"
  },
  // B2 words
  {
    word: "Perspective",
    definition: "A particular attitude toward or way of regarding something; a point of view.",
    exampleSentence: "Traveling opens up a brand new perspective on life.",
    pronunciation: "/pəˈspek.tɪv/",
    level: "B2",
    category: "Noun"
  },
  {
    word: "Resilient",
    definition: "Able to withstand or recover quickly from difficult conditions.",
    exampleSentence: "The young plants are very resilient to the cold winter.",
    pronunciation: "/rɪˈzɪl.i.ənt/",
    level: "B2",
    category: "Adjective"
  },
  {
    word: "Analyse",
    definition: "Examine methodically and in detail the structure of something.",
    exampleSentence: "We need to analyse the test results before deciding.",
    pronunciation: "/ˈæn.ə.laɪz/",
    level: "B2",
    category: "Verb"
  },
  {
    word: "Accomplish",
    definition: "Achieve or complete successfully.",
    exampleSentence: "If we work together, we can accomplish anything.",
    pronunciation: "/əˈkʌm.plɪʃ/",
    level: "B2",
    category: "Verb"
  },
  {
    word: "Significant",
    definition: "Sufficiently great or important to be worthy of attention.",
    exampleSentence: "He made a significant contribution to the research.",
    pronunciation: "/sɪɡˈnɪf.ɪ.kənt/",
    level: "B2",
    category: "Adjective"
  },
  // C1 words
  {
    word: "Pragmatic",
    definition: "Dealing with things sensibly and realistically in a way that is based on practical considerations.",
    exampleSentence: "We need a pragmatic solution to this financial issue.",
    pronunciation: "/præɡˈmæt.ɪk/",
    level: "C1",
    category: "Adjective"
  },
  {
    word: "Eloquent",
    definition: "Fluent or persuasive in speaking or writing.",
    exampleSentence: "The president gave an eloquent speech about unity.",
    pronunciation: "/ˈel.ə.kwənt/",
    level: "C1",
    category: "Adjective"
  },
  {
    word: "Ambiguous",
    definition: "Open to more than one interpretation; not having one obvious meaning.",
    exampleSentence: "The ending of the movie was mysterious and ambiguous.",
    pronunciation: "/æmˈbɪɡ.ju.əs/",
    level: "C1",
    category: "Adjective"
  },
  {
    word: "Benevolent",
    definition: "Well meaning and kindly.",
    exampleSentence: "A benevolent donor gifted computers to the school library.",
    pronunciation: "/bəˈnev.əl.ənt/",
    level: "C1",
    category: "Adjective"
  },
  {
    word: "Superfluous",
    definition: "Unnecessary, especially through being more than enough.",
    exampleSentence: "Avoid adding superfluous words to your simple sentences.",
    pronunciation: "/suːˈpɜː.flu.əs/",
    level: "C1",
    category: "Adjective"
  },
  // C2 words
  {
    word: "Pristine",
    definition: "In its original condition; unspoiled, clean, and fresh.",
    exampleSentence: "The snowy mountain peaks looked absolutely pristine.",
    pronunciation: "/pɪsˈtiːn/",
    level: "C2",
    category: "Adjective"
  },
  {
    word: "Idiosyncrasy",
    definition: "A mode of behavior or way of thought peculiar to an individual.",
    exampleSentence: "One of his idiosyncrasies was wearing mismatching socks.",
    pronunciation: "/ˌɪd.i.əˈsɪŋ.krə.si/",
    level: "C2",
    category: "Noun"
  },
  {
    word: "Capricious",
    definition: "Given to sudden and unaccountable changes of mood or behavior.",
    exampleSentence: "The weather in this country is notorious for being capricious.",
    pronunciation: "/kəˈprɪʃ.əs/",
    level: "C2",
    category: "Adjective"
  },
  {
    word: "Quintessential",
    definition: "Representing the most perfect or typical example of a quality or class.",
    exampleSentence: "This quaint cafe is the quintessential British experience.",
    pronunciation: "/ˌkwɪn.tɪˈsen.ʃəl/",
    level: "C2",
    category: "Adjective"
  },
  {
    word: "Ineffable",
    definition: "Too great or extreme to be expressed or described in words.",
    exampleSentence: "Standing at the edge of the sky-scraping canyon filled them with ineffable awe.",
    pronunciation: "/ɪnˈef.ə.bəl/",
    level: "C2",
    category: "Adjective"
  }
];

const WORD_IMAGES: Record<string, string> = {
  "hello": "https://images.unsplash.com/photo-1516214104703-d870798883c5?w=500&auto=format&fit=crop&q=80",
  "family": "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&auto=format&fit=crop&q=80",
  "beautiful": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format&fit=crop&q=80",
  "journey": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&auto=format&fit=crop&q=80",
  "bright": "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=500&auto=format&fit=crop&q=80",
  "adventure": "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=500&auto=format&fit=crop&q=80",
  "celebrate": "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&auto=format&fit=crop&q=80",
  "curious": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=80",
  "delicious": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=80",
  "explore": "https://images.unsplash.com/photo-1527549993586-dff825b37782?w=500&auto=format&fit=crop&q=80",
  "collaborate": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=80",
  "essential": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500&auto=format&fit=crop&q=80",
  "challenge": "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=500&auto=format&fit=crop&q=80",
  "patience": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&auto=format&fit=crop&q=80",
  "navigate": "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=500&auto=format&fit=crop&q=80",
  "perspective": "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=500&auto=format&fit=crop&q=80",
  "resilient": "https://images.unsplash.com/photo-1485550409059-9afb054cada4?w=500&auto=format&fit=crop&q=80",
  "analyse": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=80",
  "accomplish": "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=500&auto=format&fit=crop&q=80",
  "significant": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80",
  "pragmatic": "https://images.unsplash.com/photo-1504140713414-2a6c17e3be9e?w=500&auto=format&fit=crop&q=80",
  "eloquent": "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&auto=format&fit=crop&q=80",
  "ambiguous": "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&auto=format&fit=crop&q=80",
  "benevolent": "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&auto=format&fit=crop&q=80",
  "superfluous": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80",
  "pristine": "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=500&auto=format&fit=crop&q=80",
  "idiosyncrasy": "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&auto=format&fit=crop&q=80",
  "capricious": "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=500&auto=format&fit=crop&q=80",
  "quintessential": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&auto=format&fit=crop&q=80",
  "ineffable": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80"
};

const getWordImage = (word: string): string => {
  const normalized = word.trim().toLowerCase();
  if (WORD_IMAGES[normalized]) {
    return WORD_IMAGES[normalized];
  }
  return `https://picsum.photos/seed/${encodeURIComponent(normalized)}/400/300`;
};

const WordBank: React.FC = () => {
  const { cefrLevel, wordBank, addToWordBank, awardPoints } = useGamification();

  // Pick user's CEFR level as the starting tab
  const [selectedLevel, setSelectedLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'saved'>(cefrLevel || 'A1');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom word creation form
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setCurrentFlashcardIndex(0);
    setIsFlipped(false);
  }, [selectedLevel, searchQuery]);
  
  const [newWord, setNewWord] = useState('');
  const [newDef, setNewDef] = useState('');
  const [newEx, setNewEx] = useState('');
  const [newPron, setNewPron] = useState('');
  const [newCategory, setNewCategory] = useState('Noun');
  const [newLevel, setNewLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'>('A2');
  const [customWords, setCustomWords] = useState<DictionaryWord[]>(() => {
    const saved = localStorage.getItem('custom_dict_words');
    return saved ? JSON.parse(saved) : [];
  });

  // Handle defaulting the level accurately if it shifts
  useEffect(() => {
    if (cefrLevel) {
      setSelectedLevel(cefrLevel);
    }
  }, [cefrLevel]);

  // Combine static dict and custom words matching format
  const allDictionaryWords = useMemo(() => {
    return [...STATIC_DICTIONARY, ...customWords];
  }, [customWords]);

  // Speak word via standard audio synthesis
  const speakWord = (word: string) => {
    try {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.warn("Speech Synthesis is not supported in this frame environment.");
    }
  };

  // Check if word already bookmarked in WordBank
  const isBookmarked = (wordStr: string) => {
    return wordBank.some(entry => entry.word.toLowerCase() === wordStr.toLowerCase());
  };

  // Toggle bookmark / got it action
  const toggleBookmark = (dictWord: DictionaryWord) => {
    if (isBookmarked(dictWord.word)) {
      return; // Already bookmarked, keep it simple
    }

    const vocabFormat: VocabWord = {
      word: dictWord.word,
      definition: dictWord.definition,
      exampleSentence: dictWord.exampleSentence,
      pronunciation: dictWord.pronunciation,
      cefrLevel: dictWord.level
    };

    addToWordBank(vocabFormat, `Dictionary: ${dictWord.level}`);
    awardPoints(10, `Learned word: ${dictWord.word}`, 'vocabulary');
  };

  // Save new custom word
  const handleAddCustomWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord || !newDef) return;

    const addedWord: DictionaryWord = {
      word: newWord.trim(),
      definition: newDef.trim(),
      exampleSentence: newEx.trim() || "No example provided yet.",
      pronunciation: newPron.trim() || "/.../",
      level: newLevel,
      category: newCategory
    };

    const updated = [addedWord, ...customWords];
    setCustomWords(updated);
    localStorage.setItem('custom_dict_words', JSON.stringify(updated));

    // Also directly bookmark it
    const vocabFormat: VocabWord = {
      word: addedWord.word,
      definition: addedWord.definition,
      exampleSentence: addedWord.exampleSentence,
      pronunciation: addedWord.pronunciation,
      cefrLevel: addedWord.level
    };
    addToWordBank(vocabFormat, "Custom Dictionary Word");
    awardPoints(15, `Added dictionary word: ${addedWord.word}`, 'vocabulary');

    // Reset Form
    setNewWord('');
    setNewDef('');
    setNewEx('');
    setNewPron('');
    setShowAddForm(false);
  };

  // Delete custom word
  const handleDeleteCustomWord = (wordStr: string) => {
    const filtered = customWords.filter(w => w.word !== wordStr);
    setCustomWords(filtered);
    localStorage.setItem('custom_dict_words', JSON.stringify(filtered));
  };

  // Filter dictionary based on state selection and search query
  const filteredWords = useMemo(() => {
    const searchLow = searchQuery.toLowerCase();

    if (selectedLevel === 'saved') {
      // Return user's bookmarked list mapped to DictionaryWord representation
      return wordBank.map(entry => ({
        word: entry.word,
        definition: entry.definition,
        exampleSentence: entry.exampleSentence,
        pronunciation: entry.pronunciation || '/.../',
        level: entry.cefrLevel || 'A2',
        category: 'Bookmarked'
      })).filter(w => 
        w.word.toLowerCase().includes(searchLow) ||
        w.definition.toLowerCase().includes(searchLow)
      );
    }

    return allDictionaryWords.filter(w => {
      const matchTab = w.level === selectedLevel;
      const matchQuery = w.word.toLowerCase().includes(searchLow) || w.definition.toLowerCase().includes(searchLow);
      return matchTab && matchQuery;
    });
  }, [allDictionaryWords, selectedLevel, searchQuery, wordBank]);

  return (
    <div className="p-2 sm:p-3 max-w-xl mx-auto space-y-2.5 sm:space-y-3 animate-fade-in">
      
      {/* Integrated Header and Level Filters Navigation */}
      <div className="bg-white rounded-xl p-2.5 sm:p-3 shadow-md border-2 border-slate-100 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-black text-slate-800 uppercase tracking-tight">
              Dictionary
            </h1>
            <div className="px-1.5 py-0.5 bg-fun-blue/10 text-fun-blue text-[9px] font-black rounded-md uppercase tracking-wider shrink-0">
              {cefrLevel || 'A1'}
            </div>
          </div>
          
          {/* Search bar integrated cleanly directly inside the top row */}
          <div className="relative w-36 xs:w-44 shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-7 pr-2.5 py-1 rounded-lg border border-slate-200 focus:border-fun-blue bg-white font-bold text-[11px] text-slate-700 placeholder-slate-400 outline-none"
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-3 h-3" />
          </div>
        </div>

        {/* Level Filters + Saves integrated right in the header bar */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none no-scrollbar">
          {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const).map(level => {
            const isUserLevel = level === cefrLevel;
            const isSelected = selectedLevel === level;
            return (
              <button
                key={level}
                onClick={() => {
                  setSelectedLevel(level);
                  setSearchQuery('');
                }}
                className={`px-2 py-1 rounded-lg font-bold text-[10px] md:text-11px uppercase transition-all duration-200 flex items-center gap-0.5 transform active:scale-95 shrink-0 ${
                  isSelected
                    ? 'bg-fun-blue text-white shadow-sm border-b-2 border-blue-800'
                    : 'bg-white text-slate-600 hover:bg-slate-105 border border-slate-200'
                }`}
              >
                <span>{level}</span>
                {isUserLevel && (
                  <span className={`text-[7px] font-black px-1 py-0.2 rounded-md shrink-0 ${
                    isSelected ? 'bg-white text-fun-blue' : 'bg-fun-pink text-white animate-pulse'
                  }`}>
                    REC
                  </span>
                )}
              </button>
            );
          })}
          
          <button
            onClick={() => {
              setSelectedLevel('saved');
              setSearchQuery('');
            }}
            className={`px-2 py-1 rounded-lg font-bold text-[10px] md:text-11px uppercase transition-all duration-200 flex items-center gap-1 transform active:scale-95 shrink-0 ${
              selectedLevel === 'saved'
                ? 'bg-fun-pink text-white shadow-sm border-b-2 border-pink-805'
                : 'bg-white text-slate-600 hover:bg-slate-105 border border-slate-200'
            }`}
          >
            <Bookmark className="w-2.5 h-2.5 fill-current" />
            <span>Saves</span>
            <span className="text-[9px] bg-black/10 px-1 py-0.2 rounded-md font-black">{wordBank.length}</span>
          </button>
        </div>
      </div>

      {/* Main Flashcard Area */}
      {filteredWords.length === 0 ? (
        <div className="bg-white rounded-[2rem] p-8 text-center shadow-lg border-2 border-slate-100 max-w-sm mx-auto">
          <BookOpen size={40} className="text-fun-pink mx-auto mb-3" />
          <h3 className="text-xl font-black text-slate-800">No matching words</h3>
          <p className="text-slate-400 font-bold mt-1 text-xs">
            Try choosing a different level tab or clearing your search queries!
          </p>
        </div>
      ) : (
        <div className="max-w-xl mx-auto">
          <div className="text-center font-bold text-slate-400 mb-1 tracking-widest uppercase text-[10px]">
            {currentFlashcardIndex + 1} OF {filteredWords.length}
          </div>
          <div className="relative h-[290px] sm:h-[340px] md:h-[360px] w-full perspective-1000 mb-3 z-10" onClick={() => setIsFlipped(!isFlipped)}>
            <motion.div
              className="w-full h-full relative transform-style-3d cursor-pointer"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            >
              {/* Front side */}
              <div 
                className="absolute w-full h-full backface-hidden bg-white rounded-2xl md:rounded-[2rem] p-4 sm:p-6 shadow-xl border-2 border-slate-100 flex flex-col items-center justify-center text-center group"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="absolute top-2.5 left-3 sm:left-4 right-3 sm:right-4 flex justify-between items-center z-10">
                  <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-[9px] sm:text-[10px] rounded-lg text-slate-500 font-black uppercase tracking-wider">
                    {filteredWords[currentFlashcardIndex].category || 'Noun'}
                  </span>
                  <div className="flex gap-1">
                    <span className="px-2 py-0.5 bg-fun-pink/10 text-fun-pink font-black text-[9px] sm:text-[10px] rounded-lg tracking-wider">
                      {filteredWords[currentFlashcardIndex].level}
                    </span>
                  </div>
                </div>

                <h4 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-850 tracking-tight leading-none mb-1 group-hover:scale-105 transition-transform duration-300">
                  {filteredWords[currentFlashcardIndex].word}
                </h4>
                
                {/* Single Image representation for word - Made SIGNIFICANTLY larger */}
                <div className="w-full max-w-[200px] sm:max-w-[260px] md:max-w-[300px] h-24 sm:h-32 md:h-36 overflow-hidden rounded-xl border border-slate-200 my-1.5 shadow-inner bg-slate-50 relative shrink-0">
                  <img
                    src={getWordImage(filteredWords[currentFlashcardIndex].word)}
                    alt={filteredWords[currentFlashcardIndex].word}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {filteredWords[currentFlashcardIndex].pronunciation && (
                  <p className="text-[10px] sm:text-xs font-semibold font-mono text-slate-400 tracking-widest uppercase bg-slate-50 py-0.5 px-1.5 rounded-md inline-block">
                    {filteredWords[currentFlashcardIndex].pronunciation}
                  </p>
                )}

                <div className="absolute bottom-2 left-0 w-full text-center text-slate-305 font-black text-[9px] uppercase tracking-widest animate-pulse">
                  Click to reveal meaning
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakWord(filteredWords[currentFlashcardIndex].word);
                  }}
                  className="absolute bottom-2 right-2 bg-slate-50 hover:bg-fun-blue hover:text-white p-1.5 rounded-xl transition text-slate-400 shadow-sm border border-slate-100 z-20"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Back side */}
              <div 
                className="absolute w-full h-full bg-slate-800 text-white rounded-2xl md:rounded-[2rem] p-4 sm:p-6 shadow-xl border-2 border-slate-700 flex flex-col items-center justify-center text-center rotate-y-180 group"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <h4 className="text-2xl sm:text-3xl font-black mb-1 sm:mb-2 tracking-tight text-yellow-300">
                  {filteredWords[currentFlashcardIndex].word}
                </h4>
                
                <p className="text-xs sm:text-sm md:text-base font-bold mb-2 sm:mb-3 leading-snug max-w-sm px-2">
                  {filteredWords[currentFlashcardIndex].definition}
                </p>

                {filteredWords[currentFlashcardIndex].exampleSentence && (
                  <div className="bg-white/10 rounded-xl p-2 sm:p-3 border border-white/20 italic text-slate-300 text-[10px] sm:text-xs max-w-md w-full relative">
                    <span className="absolute -top-2 left-4 bg-slate-800 px-1.5 text-[8px] font-black tracking-widest text-slate-400 uppercase">Example</span>
                    <p className="pt-1">"{filteredWords[currentFlashcardIndex].exampleSentence}"</p>
                  </div>
                )}
                
                <div className="absolute bottom-2 left-0 w-full flex justify-center text-white/30 font-black text-[9px] uppercase tracking-widest">
                  Tap to flip back
                </div>
              </div>
            </motion.div>
          </div>

          {/* Flashcard Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 mt-4">
            <div className="flex w-full sm:w-auto gap-2">
              <Button 
                variant="secondary"
                onClick={() => {
                    setIsFlipped(false);
                    setTimeout(() => setCurrentFlashcardIndex(prev => Math.max(0, prev - 1)), 150);
                }}
                disabled={currentFlashcardIndex === 0}
                className="flex-1 sm:w-28 py-1.5 sm:py-2 text-xs md:text-sm"
              >
                  Prev
              </Button>
              <Button 
                variant="primary"
                onClick={() => {
                    setIsFlipped(false);
                    setTimeout(() => setCurrentFlashcardIndex(prev => Math.min(filteredWords.length - 1, prev + 1)), 150);
                }}
                disabled={currentFlashcardIndex === filteredWords.length - 1}
                className="flex-1 sm:w-28 block sm:hidden py-1.5 sm:py-2 text-xs md:text-sm"
              >
                  Next
              </Button>
            </div>
            
            <div className="flex w-full sm:w-auto flex-col gap-1.5 shrink-0">
               {(() => {
                 const currentWordObj = filteredWords[currentFlashcardIndex];
                 const bookmarked = isBookmarked(currentWordObj.word);
                 const customOwned = customWords.some(cw => cw.word === currentWordObj.word);

                 return (
                   <div className="flex gap-2 w-full">
                     {customOwned && (
                       <button
                         onClick={() => {
                            handleDeleteCustomWord(currentWordObj.word);
                            setCurrentFlashcardIndex(prev => Math.max(0, prev - 1));
                         }}
                         className="bg-rose-50 hover:bg-rose-100 text-rose-500 p-2 flex-shrink-0 flex items-center justify-center rounded-xl transition shadow-sm border border-rose-100"
                         title="Delete custom word"
                       >
                         <Trash2 size={20} />
                       </button>
                     )}
                     <button
                       onClick={() => toggleBookmark(currentWordObj)}
                       disabled={bookmarked}
                       className={`w-full px-3 sm:px-6 py-2 rounded-xl font-black text-xs uppercase shadow-md flex items-center justify-center gap-1.5 transition-all ${
                         bookmarked
                           ? 'bg-fun-green text-white cursor-default border-b-2 border-green-800 shadow-none'
                           : 'bg-fun-pink text-white hover:bg-pink-500 active:scale-95 border-b-2 border-pink-800'
                       }`}
                     >
                       {bookmarked ? (
                         <>
                           <Check className="w-3.5 h-3.5 stroke-[3]" />
                           Learned
                         </>
                       ) : (
                         <>
                           <Bookmark className="w-3.5 h-3.5 fill-current" />
                           Got It (+10 XP)
                         </>
                       )}
                     </button>
                   </div>
                 );
               })()}
            </div>

            <Button 
               variant="primary"
               onClick={() => {
                   setIsFlipped(false);
                   setTimeout(() => setCurrentFlashcardIndex(prev => Math.min(filteredWords.length - 1, prev + 1)), 150);
               }}
               disabled={currentFlashcardIndex === filteredWords.length - 1}
               className="hidden sm:block sm:w-28 flex-shrink-0 py-1.5 sm:py-2 text-xs md:text-sm"
            >
               Next
            </Button>
          </div>
        </div>
      )}

    </div>
  );
};

export default WordBank;
