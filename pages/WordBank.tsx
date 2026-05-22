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
    <div className="p-3 sm:p-6 max-w-6xl mx-auto space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="relative bg-white rounded-[2rem] p-5 sm:p-8 shadow-xl border-4 border-slate-100 overflow-hidden">
        {/* Decorative ambient blobs */}
        <div className="absolute top-0 right-0 w-20 h-20 sm:w-36 sm:h-36 bg-fun-pink/5 rounded-full -mr-10 -mt-10 sm:-mr-16 sm:-mt-16 animate-pulse" />
        <div className="absolute -bottom-6 left-8 w-14 h-14 sm:w-24 sm:h-24 bg-fun-blue/5 rounded-full" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-fun-pink text-white text-[10px] sm:text-xs font-black uppercase px-2 py-0.5 rounded-full tracking-wider animate-float shrink-0">
                Level-Adaptive
              </span>
              <BookOpen className="text-fun-blue shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 uppercase tracking-tight leading-none">
              Dictionary
            </h1>
            <p className="text-slate-500 font-bold text-sm sm:text-base mt-2">
              Browse and hear vocabulary for <span className="text-fun-pink font-black">{cefrLevel || 'A1'} Level</span>!
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-4 bg-slate-50 border-4 border-slate-100 p-3 rounded-3xl shrink-0">
            <div className="w-10 h-10 bg-fun-blue rounded-2xl flex items-center justify-center text-white text-xl font-black">
              {cefrLevel || 'A1'}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Your Level Indicator</p>
              <h4 className="font-black text-slate-800 text-base mt-1">Recommended Starting Point</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Searching Hub */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-3 sm:p-5 rounded-[2rem] border-2 border-slate-100 shadow-inner">
        {/* Level Filters */}
        <div className="flex flex-wrap gap-2">
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
                className={`px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm uppercase transition-all duration-300 flex items-center gap-1 sm:gap-2 transform active:scale-95 ${
                  isSelected
                    ? 'bg-fun-blue text-white shadow-md scale-105 border-b-4 border-blue-800'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border-2 border-slate-200'
                }`}
              >
                <span>{level}</span>
                {isUserLevel && (
                  <span className={`hidden sm:inline-block text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded-full shrink-0 ${
                    isSelected ? 'bg-white text-fun-blue' : 'bg-fun-pink text-white animate-pulse'
                  }`}>
                    REC.
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
            className={`px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm uppercase transition-all duration-300 flex items-center gap-1 sm:gap-2 transform active:scale-95 ${
              selectedLevel === 'saved'
                ? 'bg-fun-pink text-white shadow-md scale-105 border-b-4 border-pink-800'
                : 'bg-white text-slate-600 hover:bg-slate-100 border-2 border-slate-200'
            }`}
          >
            <Bookmark className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
            <span>My Saves</span>
            <span className="text-[10px] bg-black/10 px-1.5 sm:px-2 py-0.5 rounded-full">{wordBank.length}</span>
          </button>
        </div>

        {/* Live Search Block */}
        <div className="relative w-full md:max-w-xs shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${selectedLevel === 'saved' ? 'saved' : selectedLevel} words...`}
            className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border-4 border-slate-200 focus:border-fun-blue bg-white font-bold text-xs sm:text-sm text-slate-700 placeholder-slate-400 outline-none transition-all shadow-inner"
          />
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
        </div>
      </div>



      {/* Main Flashcard Area */}
      {filteredWords.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-12 text-center shadow-lg border-2 border-slate-100 max-w-lg mx-auto">
          <BookOpen size={48} className="text-fun-pink mx-auto mb-4" />
          <h3 className="text-2xl font-black text-slate-800">No matching words</h3>
          <p className="text-slate-400 font-bold mt-2">
            Try choosing a different level tab or clearing your search queries!
          </p>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="text-center font-bold text-slate-400 mb-2 sm:mb-4 tracking-widest uppercase text-[10px] sm:text-xs">
            {currentFlashcardIndex + 1} OF {filteredWords.length}
          </div>
          <div className="relative h-[250px] sm:h-[350px] md:h-[400px] w-full perspective-1000 mb-4 sm:mb-8 z-10" onClick={() => setIsFlipped(!isFlipped)}>
            <motion.div
              className="w-full h-full relative transform-style-3d cursor-pointer"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            >
              {/* Front side */}
              <div 
                className="absolute w-full h-full backface-hidden bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 shadow-2xl border-4 border-slate-100 flex flex-col items-center justify-center text-center group"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-center z-10">
                  <span className="px-2 sm:px-3 py-1 bg-slate-100 border-2 border-slate-200 text-[10px] sm:text-xs rounded-xl text-slate-500 font-black uppercase tracking-wider">
                    {filteredWords[currentFlashcardIndex].category || 'Noun'}
                  </span>
                  <div className="flex gap-1 sm:gap-2">
                    <span className="px-2 sm:px-3 py-1 bg-fun-pink/10 text-fun-pink font-black text-[10px] sm:text-xs rounded-xl tracking-wider">
                      {filteredWords[currentFlashcardIndex].level}
                    </span>
                  </div>
                </div>

                <h4 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-850 tracking-tight leading-none mb-2 sm:mb-4 group-hover:scale-105 transition-transform duration-300">
                  {filteredWords[currentFlashcardIndex].word}
                </h4>
                
                {filteredWords[currentFlashcardIndex].pronunciation && (
                  <p className="text-sm sm:text-base font-semibold font-mono text-slate-400 tracking-widest uppercase bg-slate-50 py-1 px-2 sm:py-1.5 sm:px-3 rounded-lg inline-block">
                    {filteredWords[currentFlashcardIndex].pronunciation}
                  </p>
                )}

                <div className="absolute bottom-4 sm:bottom-6 left-0 w-full text-center text-slate-300 font-black text-[10px] sm:text-xs uppercase tracking-widest animate-pulse">
                  Click to reveal meaning
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakWord(filteredWords[currentFlashcardIndex].word);
                  }}
                  className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 bg-slate-50 hover:bg-fun-blue hover:text-white p-2 sm:p-3 rounded-2xl transition text-slate-400 shadow-sm border-2 border-slate-100 z-20"
                >
                  <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Back side */}
              <div 
                className="absolute w-full h-full bg-slate-800 text-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 shadow-2xl border-4 border-slate-700 flex flex-col items-center justify-center text-center rotate-y-180 group"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <h4 className="text-2xl sm:text-3xl font-black mb-2 sm:mb-4 tracking-tight text-yellow-300">
                  {filteredWords[currentFlashcardIndex].word}
                </h4>
                
                <p className="text-sm sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 leading-relaxed max-w-sm px-2">
                  {filteredWords[currentFlashcardIndex].definition}
                </p>

                {filteredWords[currentFlashcardIndex].exampleSentence && (
                  <div className="bg-white/10 rounded-2xl p-3 sm:p-5 border border-white/20 italic text-slate-300 text-xs sm:text-sm max-w-md w-full relative">
                    <span className="absolute -top-2 sm:-top-3 left-4 bg-slate-800 px-2 text-[8px] sm:text-[10px] font-black tracking-widest text-slate-400 uppercase">Example</span>
                    <p className="pt-1 sm:pt-2">"{filteredWords[currentFlashcardIndex].exampleSentence}"</p>
                  </div>
                )}
                
                <div className="absolute bottom-4 sm:bottom-6 left-0 w-full flex justify-center text-white/30 font-black text-[10px] sm:text-xs uppercase tracking-widest">
                  Tap to flip back
                </div>
              </div>
            </motion.div>
          </div>

          {/* Flashcard Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mt-6">
            <div className="flex w-full sm:w-auto gap-3">
              <Button 
                variant="secondary"
                onClick={() => {
                    setIsFlipped(false);
                    setTimeout(() => setCurrentFlashcardIndex(prev => Math.max(0, prev - 1)), 150);
                }}
                disabled={currentFlashcardIndex === 0}
                className="flex-1 sm:w-32"
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
                className="flex-1 sm:w-32 block sm:hidden"
              >
                  Next
              </Button>
            </div>
            
            <div className="flex w-full sm:w-auto flex-col gap-2 shrink-0">
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
                         className="bg-rose-50 hover:bg-rose-100 text-rose-500 p-3 flex-shrink-0 flex items-center justify-center rounded-2xl transition shadow-sm border-2 border-rose-100"
                         title="Delete custom word"
                       >
                         <Trash2 size={24} />
                       </button>
                     )}
                     <button
                       onClick={() => toggleBookmark(currentWordObj)}
                       disabled={bookmarked}
                       className={`w-full px-4 sm:px-8 py-3 rounded-2xl font-black text-xs sm:text-sm uppercase shadow-md flex items-center justify-center gap-2 transition-all ${
                         bookmarked
                           ? 'bg-fun-green text-white cursor-default border-b-4 border-green-800 shadow-none'
                           : 'bg-fun-pink text-white hover:bg-pink-500 active:scale-95 border-b-4 border-pink-800'
                       }`}
                     >
                       {bookmarked ? (
                         <>
                           <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
                           Learned
                         </>
                       ) : (
                         <>
                           <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
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
               className="hidden sm:block sm:w-32 flex-shrink-0"
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
