
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Brain, Star, Flame, CheckCircle2, PlayCircle, Sparkles, Wand2, Award, Palette, Mic, Map, Flag, MonitorPlay, Target, Bell, BookOpen, Users, User, ChevronRight, X, ArrowLeft, Heart, Medal, Gift, Lock, MessageCircle, Home } from 'lucide-react';
import Button from '../components/Button';
import { Badge } from '../types';
import { useGamification } from '../context/GamificationContext';
import UserRoleBadge from '../components/UserRoleBadge';

import speakImage from '../src/assets/images/speak.png';
import watchImage from '../src/assets/images/watch.png';

import grammarImg from '../src/assets/images/grammar.png';
import vocImg from '../src/assets/images/dictionary.png';
import scrambleImg from '../src/assets/images/scramble.png';
import wordRushImg from '../src/assets/images/race.png';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { stats, quests, mode, userId, isPremium, isAdmin } = useGamification();
  
  const isKids = true; // Forced to kids mode
  
  
  // Helper to format username
  const displayName = userId ? userId.charAt(0).toUpperCase() + userId.slice(1) : `Hero ${stats.level}`;

  const pointsPerLevel = 500;
  const currentLevelPoints = stats.points % pointsPerLevel;
  const progressPercent = (currentLevelPoints / pointsPerLevel) * 100;
  const pointsToNextLevel = pointsPerLevel - currentLevelPoints;

  const PracticeCard = ({ title, desc, icon: Icon, imageSrc, onClick, colorFrom, colorTo, progress = 0 }: any) => (
      <div 
         onClick={onClick} 
         className="relative w-full rounded-[1.25rem] border border-slate-100 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group bg-white shadow-xs flex flex-col h-full ring-2 ring-transparent hover:ring-fun-blue/20"
      >
          <div className={`relative h-16 sm:h-20 w-full bg-gradient-to-br ${colorFrom} ${colorTo} overflow-hidden shrink-0`}>
              <div className="absolute inset-0 bg-white/20 blur-xl group-hover:bg-white/30 transition-colors" />
              <img src={imageSrc} className="absolute -bottom-2 -right-2 w-20 h-20 sm:w-24 sm:h-24 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md origin-bottom-right" alt={title} referrerPolicy="no-referrer" />
              <div className="absolute top-2 left-2 w-6 h-6 sm:w-8 sm:h-8 bg-white/30 backdrop-blur-md rounded-lg flex items-center justify-center text-white shadow-sm">
                 <Icon size={14} />
              </div>
          </div>
          <div className="p-2.5 sm:p-3 flex flex-col flex-1 justify-center">
             <h4 className="font-black text-slate-800 text-xs sm:text-sm mb-0.5 group-hover:text-fun-blue transition-colors line-clamp-1">{title}</h4>
             <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 line-clamp-1">{desc}</p>
          </div>
      </div>
  );

  return (
    <div className="w-full flex flex-col pb-24 animate-fade-in font-sans">
      
      {/* 1. Profile Progress Card (Premium) */}
      <header className="px-3 pt-3 sm:px-4 sm:pt-4 shrink-0">
         <div className="bg-white rounded-[1.5rem] p-4 shadow-sm border border-slate-100 relative overflow-hidden flex flex-col gap-3">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-fun-blue/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-3 relative z-10">
               <div onClick={() => navigate('/my-style')} className={`w-14 h-14 sm:w-16 sm:h-16 shrink-0 ${stats.themeColor || 'bg-fun-blue'} rounded-2xl border-[3px] border-white shadow-md flex items-center justify-center cursor-pointer hover:scale-105 transition-transform relative group overflow-hidden`}>
                  <img src={stats.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} alt="User Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <Palette className="text-white w-5 h-5" />
                  </div>
               </div>
               
               <div className="flex-1 min-w-0">
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs flex items-center gap-1 mb-0.5">
                     <Sparkles size={10} className="text-fun-yellow" /> Welcome Back
                  </p>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight truncate leading-none">
                    {displayName}
                  </h2>
               </div>
            </div>

            <div className="relative z-10 w-full bg-slate-50 rounded-2xl p-3 border border-slate-100 flex flex-col gap-2">
               <div className="flex justify-between items-center">
                  <div>
                     <p className="font-black text-slate-800 text-sm sm:text-base flex items-center gap-1">
                        <Award className="text-fun-blue" size={16} /> Level {stats.level}
                     </p>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="flex items-center gap-1 text-orange-500 font-black bg-orange-50 px-2.5 py-1 rounded-xl border border-orange-100 text-xs sm:text-sm">
                        <Flame size={14} className="fill-current" /> {stats.streakDays}
                     </div>
                     <div className="flex items-center gap-1 text-yellow-500 font-black bg-yellow-50 px-2.5 py-1 rounded-xl border border-yellow-100 text-xs sm:text-sm">
                        <Star size={14} className="fill-current" /> {stats.points}
                     </div>
                  </div>
               </div>
               <div className="flex flex-col gap-1">
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden shadow-inner flex">
                     <div className="h-full bg-gradient-to-r from-fun-blue to-teal-400 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.4)] transition-all duration-1000 ease-out" style={{ width: `${progressPercent}%` }} />
                  </div>
                  <p className="font-bold text-slate-400 text-[10px] text-right">
                     {pointsToNextLevel} XP to next level
                  </p>
               </div>
            </div>
         </div>
      </header>

      {/* 2. Segemented Navigation (Top Tabs) */}
      <div className="px-3 py-3 sm:px-4 shrink-0">
         <div className="flex gap-1 p-1 bg-slate-200/50 rounded-xl backdrop-blur-md">
            <button
               onClick={() => navigate('/my-style')}
               className="flex-1 py-1.5 rounded-lg font-black text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-1.5 text-slate-500 hover:text-slate-700 bg-transparent hover:bg-white/50"
            >
               <Palette size={14} /> <span className="hidden sm:inline">Style</span>
            </button>
            <button
               onClick={() => navigate('/trophy-case')}
               className="flex-1 py-1.5 rounded-lg font-black text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-1.5 text-slate-500 hover:text-slate-700 bg-transparent hover:bg-white/50"
            >
               <Award size={14} /> <span className="hidden sm:inline">Trophies</span>
            </button>
            <button
               onClick={() => navigate('/your-progress')}
               className="flex-1 py-1.5 rounded-lg font-black text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-1.5 bg-white text-fun-blue shadow-sm"
            >
               <Target size={14} /> <span>Progress</span>
            </button>
         </div>
      </div>

      {/* 4. Main Hero Feature (Grammar) */}
      <div className="px-3 pb-3 sm:px-4 shrink-0">
         <div 
             onClick={() => navigate('/grammar-lessons')}
             className="relative w-full rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group bg-slate-900 border-[3px] border-white ring-2 ring-transparent hover:ring-fun-blue/30 flex flex-row h-[100px] sm:h-[130px]"
         >
             <div className="absolute inset-0 bg-gradient-to-br from-fun-blue to-teal-500 opacity-90 z-10" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.3),transparent_60%)] z-10 pointer-events-none" />
             
             <div className="relative z-20 flex-1 p-3 sm:p-5 flex flex-col justify-center text-white">
                 <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-1 sm:mb-2 w-fit">
                    <BookOpen size={10} /> Grammar Coach
                 </div>
                 <h2 className="font-black text-lg sm:text-2xl leading-none mb-1 drop-shadow-md">Alphabet & Sounds</h2>
                 <p className="text-white/90 font-bold text-[10px] sm:text-xs mb-2 line-clamp-1 max-w-[80%]">Learn the foundations of English reading.</p>
                 
                 <div className="w-full max-w-[150px] h-1.5 bg-black/20 rounded-full overflow-hidden flex">
                    <div className="h-full bg-white w-[25%] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                 </div>
             </div>
             
             <div className="relative z-20 w-[35%] h-full overflow-hidden flex items-end justify-end shrink-0">
                 <img src={grammarImg} className="w-auto h-[90%] object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)] origin-bottom-right" alt="Grammar" referrerPolicy="no-referrer" />
             </div>
         </div>
      </div>

      {/* 5. Practice Games Area (Grid layout tailored to fit smaller space) */}
      <div className="px-3 pb-6 sm:px-4 flex-1 flex flex-col">
         <div className="flex items-center justify-between mb-2.5 px-1 shrink-0">
            <h3 className="font-black text-slate-800 text-sm sm:text-base">Practice & Play</h3>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 xs:gap-3 flex-1">
            <PracticeCard 
               title="Dictionary" 
               desc="Build vocab"
               icon={BookOpen}
               imageSrc={vocImg}
               onClick={() => navigate('/wordbank')}
               colorFrom="from-fun-pink"
               colorTo="to-rose-400"
               progress={40}
            />
            <PracticeCard 
               title="Word Rush" 
               desc="Beat the clock"
               icon={Zap}
               imageSrc={wordRushImg}
               onClick={() => navigate('/vocab')}
               colorFrom="from-orange-400"
               colorTo="to-yellow-400"
            />
            <PracticeCard 
               title="Scramble" 
               desc="Fix sentences"
               icon={Brain}
               imageSrc={scrambleImg}
               onClick={() => navigate('/game/scramble')}
               colorFrom="from-fun-purple"
               colorTo="to-indigo-400"
            />
            <PracticeCard 
               title="Speak" 
               desc="Pronounce"
               icon={Mic}
               imageSrc={speakImage}
               onClick={() => navigate('/pronunciation')}
               colorFrom="from-teal-400"
               colorTo="to-emerald-400"
               progress={15}
            />
         </div>
      </div>
    </div>
  );
};

// Simple Chest SVG component for the daily quest design
const ChestIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-8 h-8">
    <path d="M21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7" />
    <path d="M3 7L12 11L21 7" />
    <path d="M3 7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7" />
    <circle cx="12" cy="14" r="2" />
  </svg>
)

export default Dashboard;

