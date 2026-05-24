
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Brain, Star, Flame, CheckCircle2, PlayCircle, Sparkles, Wand2, Award, Palette, Mic, Map, Flag, MonitorPlay, Target, Bell, BookOpen, Users, ChevronRight, X, ArrowLeft, Heart, Medal } from 'lucide-react';
import Button from '../components/Button';
import { Badge } from '../types';
import { useGamification } from '../context/GamificationContext';
import UserRoleBadge from '../components/UserRoleBadge';
import { motion, AnimatePresence } from 'motion/react';

import warmUpImage from '../src/assets/images/speak.png';
import learnImage from '../src/assets/images/learn.png';
import speakImage from '../src/assets/images/speak.png';
import watchImage from '../src/assets/images/watch.png';
import reviewImage from '../src/assets/images/play.png';
import challengeImage from '../src/assets/images/learn.png';

import grammarImg from '../src/assets/images/grammar.png';
import vocImg from '../src/assets/images/vocabulary.png';
import listenImg from '../src/assets/images/listening.png';
import speakImg2 from '../src/assets/images/speaking.png';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { stats, quests, mode, userId, isPremium, isAdmin, isVerifiedTeacher } = useGamification();
  
  const isKids = true; // Forced to kids mode

  const [activeCategory, setActiveCategory] = useState<'learn' | 'play' | 'speak' | 'community' | null>(null);

  // Helper to format username
  const displayName = userId ? userId.charAt(0).toUpperCase() + userId.slice(1) : `Hero ${stats.level}`;

  const pointsPerLevel = 500;
  const currentLevelPoints = stats.points % pointsPerLevel;
  const progressPercent = (currentLevelPoints / pointsPerLevel) * 100;

  const ImageFlowCard = ({ imageSrc, onClick, isActive }: any) => (
      <div 
         onClick={onClick} 
         className={`relative w-full aspect-square rounded-[1.75rem] sm:rounded-[2.25rem] border-[4px] overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group bg-slate-100 ${isActive ? 'border-fun-blue ring-4 ring-fun-blue/20' : 'border-slate-100 ring-4 ring-transparent hover:ring-fun-blue/20'}`}
      >
          <img src={imageSrc} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Activity" referrerPolicy="no-referrer" />
      </div>
  );

  const ImageSubCard = ({ imageSrc, title, desc, onClick }: any) => (
      <div 
          onClick={onClick}
          className="flex items-center gap-2 sm:gap-3 p-2 bg-slate-50 rounded-xl border-2 border-slate-100 hover:border-fun-blue/50 hover:bg-white hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer group"
      >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden shrink-0 border-2 border-white shadow-sm">
              <img src={imageSrc} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={title} referrerPolicy="no-referrer" />
          </div>
          <div className="flex-1 min-w-0">
             <h4 className="font-black text-slate-800 text-[10px] sm:text-xs leading-tight uppercase truncate">{title}</h4>
             <p className="text-[8px] sm:text-[9px] text-slate-500 font-bold mt-0.5 line-clamp-2 leading-tight">{desc}</p>
          </div>
      </div>
  );

  return (
    <div className="space-y-3 sm:space-y-4 animate-fade-in pb-6">
      {/* Header */}
      <header className={`p-3 sm:p-5 shadow-sm bg-white rounded-[1.5rem] sm:rounded-[2rem] border-[3px] sm:border-4 border-slate-100 relative overflow-hidden`}>
        {/* Top row: avatar + info + stats + level */}
        <div className="flex items-center gap-3 justify-between">
          {/* Avatar */}
          <div className="flex items-center gap-3 min-w-0">
            <div onClick={() => navigate('/my-style')} className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 ${stats.themeColor || 'bg-fun-blue'} rounded-xl sm:rounded-[1rem] border-[3px] border-white shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-transform relative group overflow-hidden`}>
              <img src={stats.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} alt="User Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Palette className="text-white w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="min-w-0 flex flex-col justify-center">
              <h2 className="text-xl sm:text-3xl font-black text-slate-800 tracking-tight flex items-center leading-none truncate">
                {displayName}
              </h2>
            </div>
          </div>
          {/* Stats: Streak + XP + Level */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex flex-col items-center px-2 sm:px-3 py-1 sm:py-1.5 bg-orange-100 border-b-2 border-orange-200 rounded-xl text-orange-600 font-black">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 fill-current animate-pulse mb-0.5" />
              <span className="text-sm sm:text-base leading-none">{stats.streakDays}</span>
            </div>
            <div className="flex flex-col items-center px-2 sm:px-3 py-1 sm:py-1.5 bg-yellow-100 border-b-2 border-yellow-200 rounded-xl text-yellow-600 font-black">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current mb-0.5" />
              <span className="text-sm sm:text-base leading-none">{stats.points}</span>
            </div>
            <div className="flex flex-col items-center px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-100 border-b-2 border-blue-200 rounded-xl text-blue-600 font-black">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 fill-current mb-0.5" />
              <span className="text-sm sm:text-base leading-none">Lv.{stats.level}</span>
            </div>
          </div>
        </div>

        {/* Quick-nav buttons: My Style, Trophy Case, Your Progress */}
        <div className="mt-3 sm:mt-4 flex gap-2 sm:gap-3">
          <button
            onClick={() => navigate('/my-style')}
            className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-3 bg-fun-purple/10 hover:bg-fun-purple/20 active:scale-95 rounded-xl transition-all"
          >
            <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md ${stats.themeColor || 'bg-fun-blue'} overflow-hidden shrink-0`}>
              <img src={stats.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <span className="font-black text-xs sm:text-sm text-fun-purple uppercase tracking-wide">My Style</span>
          </button>
          <button
            onClick={() => navigate('/trophy-case')}
            className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-3 bg-yellow-50 hover:bg-yellow-100 active:scale-95 rounded-xl transition-all"
          >
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-fun-yellow fill-current shrink-0" />
            <span className="font-black text-xs sm:text-sm text-yellow-600 uppercase tracking-wide">Trophies</span>
          </button>
          <button
            onClick={() => navigate('/your-progress')}
            className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-3 bg-fun-blue/10 hover:bg-fun-blue/20 active:scale-95 rounded-xl transition-all"
          >
            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-fun-blue shrink-0" />
            <span className="font-black text-xs sm:text-sm text-fun-blue uppercase tracking-wide">Progress</span>
          </button>
        </div>
      </header>

      <div className="flex flex-col space-y-3 sm:space-y-4">
        {/* Daily Flow Section with the 4 parent categories */}
        <div className="bg-white p-3 sm:p-5 rounded-2xl sm:rounded-[2rem] border-[3px] sm:border-4 border-slate-100 shadow-sm relative flex flex-col gap-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5 items-start">
                
                {/* Learn Column */}
                <div className="flex flex-col gap-3 relative">
                    <ImageFlowCard 
                        imageSrc={learnImage}
                        isActive={activeCategory === 'learn'}
                        onClick={() => setActiveCategory(activeCategory === 'learn' ? null : 'learn')}
                    />
                    <AnimatePresence>
                        {activeCategory === 'learn' && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 min-w-[160px] sm:min-w-[200px] mt-2 z-50 flex flex-col gap-2 bg-white/90 backdrop-blur rounded-2xl shadow-xl border-2 border-slate-100 p-2"
                            >
                                <ImageSubCard 
                                    imageSrc={grammarImg}
                                    title="Grammar"
                                    desc="Syllables & rules"
                                    onClick={() => navigate('/grammar-lessons')}
                                />
                                <ImageSubCard 
                                    imageSrc={vocImg}
                                    title="Dictionary"
                                    desc="CEFR words"
                                    onClick={() => navigate('/wordbank')}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Play Column */}
                <div className="flex flex-col gap-3 relative">
                    <ImageFlowCard 
                        imageSrc={reviewImage}
                        isActive={activeCategory === 'play'}
                        onClick={() => setActiveCategory(activeCategory === 'play' ? null : 'play')}
                    />
                    <AnimatePresence>
                        {activeCategory === 'play' && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full right-0 min-w-[160px] sm:min-w-[200px] mt-2 z-50 flex flex-col gap-2 bg-white/90 backdrop-blur rounded-2xl shadow-xl border-2 border-slate-100 p-2"
                            >
                                <ImageSubCard 
                                    imageSrc={reviewImage}
                                    title="Word Rush"
                                    desc="Matching countdown"
                                    onClick={() => navigate('/vocab')}
                                />
                                <ImageSubCard 
                                    imageSrc={listenImg}
                                    title="Scramble"
                                    desc="Arrange sentences"
                                    onClick={() => navigate('/game/scramble')}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Speak Column */}
                <div className="flex flex-col gap-3">
                    <ImageFlowCard 
                        imageSrc={speakImage}
                        isActive={false}
                        onClick={() => navigate('/pronunciation')}
                    />
                </div>

                {/* Watch Column */}
                <div className="flex flex-col gap-3">
                    <ImageFlowCard 
                        imageSrc={watchImage}
                        isActive={false}
                        onClick={() => navigate('/videos')}
                    />
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
