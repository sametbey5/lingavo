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
    <div className="p-4 sm:p-6 md:p-10 max-w-6xl mx-auto space-y-10 animate-fade-in">
      
      {/* Header Banner */}
      <div className="relative bg-white rounded-[3rem] p-8 md:p-10 shadow-xl border-4 border-slate-100 overflow-hidden">
        {/* Decorative ambient blobs */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-fun-pink/5 rounded-full -mr-16 -mt-16 animate-pulse" />
        <div className="absolute -bottom-8 left-10 w-24 h-24 bg-fun-blue/5 rounded-full" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-fun-pink text-white text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider animate-float shrink-0">
                Level-Adaptive
              </span>
              <BookOpen className="text-fun-blue shrink-0" size={24} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 uppercase tracking-tight">
              Adaptive Dictionary
            </h1>
            <p className="text-slate-500 font-bold text-lg mt-2">
              Browse, hear, and bookmark words crafted matching the <span className="text-fun-pink font-black">{cefrLevel || 'A1'} Level</span>!
            </p>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 border-4 border-slate-100 p-4 rounded-3xl shrink-0">
            <div className="w-12 h-12 bg-fun-blue rounded-2xl flex items-center justify-center text-white text-2xl font-black">
              {cefrLevel || 'A1'}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Your Level Indicator</p>
              <h4 className="font-black text-slate-800 text-lg mt-1">Recommended Starting Point</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Searching Hub */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50 p-4 sm:p-5 rounded-[2.5rem] border-2 border-slate-100 shadow-inner">
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
                className={`px-4 sm:px-6 py-3 rounded-2xl font-black text-sm uppercase transition-all duration-300 flex items-center gap-2 transform active:scale-95 ${
                  isSelected
                    ? 'bg-fun-blue text-white shadow-md scale-105 border-b-4 border-blue-800'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border-2 border-slate-200'
                }`}
              >
                <span>{level}</span>
                {isUserLevel && (
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full shrink-0 ${
                    isSelected ? 'bg-white text-fun-blue' : 'bg-fun-pink text-white animate-pulse'
                  }`}>
                    RECOMMENDED
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
            className={`px-4 sm:px-6 py-3 rounded-2xl font-black text-sm uppercase transition-all duration-300 flex items-center gap-2 transform active:scale-95 ${
              selectedLevel === 'saved'
                ? 'bg-fun-pink text-white shadow-md scale-105 border-b-4 border-pink-800'
                : 'bg-white text-slate-600 hover:bg-slate-100 border-2 border-slate-200'
            }`}
          >
            <Bookmark size={16} className="fill-current" />
            <span>My Saves</span>
            <span className="text-[10px] bg-black/10 px-2 py-0.5 rounded-full">{wordBank.length}</span>
          </button>
        </div>

        {/* Live Search Block */}
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${selectedLevel === 'saved' ? 'saved' : selectedLevel} words...`}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border-4 border-slate-200 focus:border-fun-blue bg-white font-bold text-slate-700 placeholder-slate-400 outline-none transition-all shadow-inner"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        </div>
      </div>

      {/* Suggest Custom Word Toggle & Form */}
      <div className="flex justify-end px-2">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 font-black text-sm text-fun-blue hover:text-blue-600 uppercase border-2 border-dashed border-fun-blue/30 px-5 py-2.5 rounded-2xl transition hover:bg-fun-blue/5"
        >
          <PlusCircle size={18} />
          {showAddForm ? 'Close Word Panel' : 'Suggest / Add Custom Word'}
        </button>
      </div>

      {/* New Custom Word Dialog form modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleAddCustomWord} className="bg-white p-6 sm:p-8 rounded-[2.5rem] border-4 border-slate-100 shadow-xl space-y-6">
              <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2 uppercase">
                <Sparkles className="text-fun-yellow shrink-0 animate-pulse" /> Add Custom Word Entry
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider block">Word Title</label>
                  <input
                    type="text"
                    required
                    value={newWord}
                    onChange={e => setNewWord(e.target.value)}
                    placeholder="e.g., Pragmatic"
                    className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-fun-blue font-bold outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider block">Phonetic Pronunciation</label>
                  <input
                    type="text"
                    value={newPron}
                    onChange={e => setNewPron(e.target.value)}
                    placeholder="e.g., /præɡˈmæt.ɪk/"
                    className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-fun-blue font-bold outline-none"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider block">Definition / Meaning</label>
                  <input
                    type="text"
                    required
                    value={newDef}
                    onChange={e => setNewDef(e.target.value)}
                    placeholder="A sensible, realistic way of solving problems based on practical conditions."
                    className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-fun-blue font-bold outline-none"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider block">Example Sentence</label>
                  <input
                    type="text"
                    value={newEx}
                    onChange={e => setNewEx(e.target.value)}
                    placeholder="Let's find a pragmatic solution instead of debating."
                    className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-fun-blue font-bold outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider block">Speech Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-fun-blue font-bold outline-none bg-white"
                  >
                    <option>Noun</option>
                    <option>Verb</option>
                    <option>Adjective</option>
                    <option>Adverb</option>
                    <option>Interjection</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider block">CEFR Target Level</label>
                  <div className="flex gap-2">
                    {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const).map(lvl => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setNewLevel(lvl)}
                        className={`flex-1 py-3 rounded-xl font-bold text-sm transition ${
                          newLevel === lvl ? 'bg-fun-blue text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="success">
                  Save Entry (+15 XP)
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Words Grid Area */}
      {filteredWords.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-12 text-center shadow-lg border-2 border-slate-100 max-w-lg mx-auto">
          <BookOpen size={48} className="text-fun-pink mx-auto mb-4" />
          <h3 className="text-2xl font-black text-slate-800">No matching words</h3>
          <p className="text-slate-400 font-bold mt-2">
            Try choosing a different level tab or clearing your search queries!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredWords.map((wordObj, idx) => {
              const bookmarked = isBookmarked(wordObj.word);
              const customOwned = customWords.some(cw => cw.word === wordObj.word);
              
              return (
                <motion.div
                  key={wordObj.word}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2, delay: Math.min(idx * 0.05, 0.4) }}
                  className={`bg-white rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between shadow-xl border-4 transition-all hover:scale-105 hover:shadow-2xl relative group overflow-hidden ${
                    bookmarked ? 'border-fun-green' : 'border-slate-100 hover:border-fun-blue'
                  }`}
                  style={{ contentVisibility: 'auto' }}
                >
                  {/* Decorative background number list */}
                  <div className="absolute top-2 right-2 text-[10px] font-black text-slate-200 select-none">
                    #{idx + 1}
                  </div>

                  <div>
                    {/* Top line with Level and category */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-0.5 bg-slate-100 border-2 border-slate-200 text-[10px] rounded-lg text-slate-500 font-black uppercase tracking-wider">
                        {wordObj.category || 'Noun'}
                      </span>
                      <div className="flex gap-1">
                        <span className="px-2 py-0.5 bg-fun-pink/10 text-fun-pink font-black text-[10px] rounded-lg tracking-wider">
                          {wordObj.level}
                        </span>
                        {wordObj.level === cefrLevel && (
                          <span className="px-2 py-0.5 bg-fun-blue/10 text-fun-blue font-black text-[10px] rounded-lg">
                            ★ YOUR LEVEL
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Word and Speak Row */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="text-3xl font-black text-slate-850 tracking-tight leading-none truncate select-all">
                        {wordObj.word}
                      </h4>
                      <button
                        onClick={() => speakWord(wordObj.word)}
                        className="bg-slate-50 hover:bg-fun-blue hover:text-white p-2.5 rounded-xl transition text-slate-400 shrink-0 shadow-sm border border-slate-100 focus:scale-95"
                        title="Pronounce aloud"
                      >
                        <Volume2 size={16} />
                      </button>
                    </div>

                    {/* Pronunciation phonetics */}
                    {wordObj.pronunciation && (
                      <p className="text-xs font-semibold font-mono text-slate-400 mb-4 tracking-wider uppercase bg-slate-50 py-1 px-2 rounded-md inline-block">
                        {wordObj.pronunciation}
                      </p>
                    )}

                    {/* Short separator */}
                    <div className="h-0.5 w-12 bg-slate-100 mb-4" />

                    {/* Definition */}
                    <p className="text-slate-600 font-bold text-sm mb-4 leading-relaxed">
                      {wordObj.definition}
                    </p>

                    {/* Example Sentence inside styled bubble */}
                    {wordObj.exampleSentence && (
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 italic text-slate-500 text-xs text-left relative mt-4">
                        <span className="absolute top-2 left-2 text-[10px] font-black tracking-widest text-slate-305 uppercase select-none leading-none">Example</span>
                        <p className="pt-3">"{wordObj.exampleSentence}"</p>
                      </div>
                    )}
                  </div>

                  {/* Operational Footer action button */}
                  <div className="mt-8 pt-4 border-t-2 border-slate-100 flex items-center justify-between gap-2">
                    {customOwned ? (
                      <button
                        onClick={() => handleDeleteCustomWord(wordObj.word)}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-500 p-2.5 rounded-xl transition shadow-sm"
                        title="Delete custom word"
                      >
                        <Trash2 size={16} />
                      </button>
                    ) : (
                      <div className="w-4" />
                    )}

                    <button
                      onClick={() => toggleBookmark(wordObj)}
                      disabled={bookmarked}
                      className={`px-4 py-2.5 rounded-xl font-black text-xs uppercase shadow-md flex items-center gap-1.5 transition-all outline-none ${
                        bookmarked
                          ? 'bg-fun-green text-white cursor-default shadow-none border-b-2 border-green-800'
                          : 'bg-fun-pink text-white hover:bg-pink-500 active:scale-95 border-b-4 border-pink-800'
                      }`}
                    >
                      {bookmarked ? (
                        <>
                          <Check size={14} className="stroke-[3]" />
                          Learned
                        </>
                      ) : (
                        <>
                          <Bookmark size={12} className="fill-current" />
                          Got It (+10 XP)
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Spaced repetition review reminder footer inside dictionary */}
      <div className="bg-white rounded-[3rem] p-6 sm:p-8 border-4 border-slate-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-yellow-300 to-fun-yellow rounded-2xl flex items-center justify-center text-white text-3xl shadow-md">
            🤝
          </div>
          <div>
            <h4 className="font-black text-xl text-slate-800 uppercase leading-none">Dynamic Adaptive Practice</h4>
            <p className="text-slate-400 font-bold text-sm mt-1">
              Words bookmarked as "Learned" here will feed directly into your dynamic vocab challenges!
            </p>
          </div>
        </div>
        <div className="text-slate-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1 shrink-0">
          <Brain size={16} className="text-slate-400 animate-pulse" /> Active Bookmarks: <span className="bg-slate-100 py-1 px-2 rounded-lg font-black text-slate-500">{wordBank.length} words</span>
        </div>
      </div>
    </div>
  );
};

export default WordBank;
