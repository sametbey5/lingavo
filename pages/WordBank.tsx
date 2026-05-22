import React, { useState, useMemo, useEffect } from 'react';
import { useGamification } from '../context/GamificationContext';
import { BookOpen, Search, Sparkles, Volume2, Bookmark, PlusCircle, Trash2, Brain, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Button from '../components/Button';
import { VocabWord } from '../types';
import { CAMBRIDGE_DICTIONARY, DictionaryWord } from '../constants/dictionary';
import { WORD_IMAGES } from '../constants/wordImages';

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
    return [...CAMBRIDGE_DICTIONARY, ...customWords];
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
