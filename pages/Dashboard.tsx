
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Brain, Star, Flame, CheckCircle2, PlayCircle, Sparkles, Wand2, Award, Palette, Mic, Map, Flag, MonitorPlay, Target, Bell, BookOpen, Users, User, ChevronRight, X, ArrowLeft, Heart, Medal, Gift, Lock, MessageCircle, Home, Gamepad2, PenTool } from 'lucide-react';
import Button from '../components/Button';
import { Badge } from '../types';
import { useGamification } from '../context/GamificationContext';
import UserRoleBadge from '../components/UserRoleBadge';
import { LESSONS } from '../components/grammarLessonsData';
import { supabase } from '../services/supabase';

import speakImage from '../src/assets/images/speak.png';
import watchImage from '../src/assets/images/watch.png';

import grammarImg from '../src/assets/images/grammar.png';
import vocImg from '../src/assets/images/dictionary.png';
import wordRushImg from '../src/assets/images/race.png';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { stats, quests, mode, userId, isPremium, isAdmin } = useGamification();
  
  const isKids = true; // Forced to kids mode
  
  const completedGrammar = stats?.completedGrammar || [];
  const completedGrammarCount = completedGrammar.length || 0;
  const totalGrammarLessons = LESSONS.length || 1;
  const grammarPercent = Math.round((completedGrammarCount / totalGrammarLessons) * 100);
  
  const nextLesson = LESSONS.find(l => !completedGrammar.includes(l.id)) || LESSONS[0];
  const nextLessonTitle = nextLesson ? nextLesson.title : "Alphabet & Sounds";

  // Helper to format username
  const displayName = userId ? userId.charAt(0).toUpperCase() + userId.slice(1) : `Hero ${stats.level}`;

  const pointsPerLevel = 500;
  const currentLevelPoints = stats.points % pointsPerLevel;
  const progressPercent = (currentLevelPoints / pointsPerLevel) * 100;
  const pointsToNextLevel = pointsPerLevel - currentLevelPoints;

  const PracticeCard = ({ title, desc, icon: Icon, imageSrc, onClick, bgClass, borderClass, textHoverClass, progress = 0 }: any) => (
      <div 
         onClick={onClick} 
         className={`relative w-full rounded-[1.25rem] border-[2px] ${borderClass || 'border-slate-100'} overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group bg-white shadow-sm flex flex-col h-full min-h-0 ring-2 ring-transparent hover:ring-black/5`}
      >
          <div className={`relative h-[55%] sm:h-[60%] w-full ${bgClass} overflow-hidden shrink-0`}>
              <div className="absolute inset-0 bg-white/20 blur-xl group-hover:bg-white/30 transition-colors" />
              <img src={imageSrc} className="absolute -bottom-1 -right-1 h-[130%] object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md origin-bottom-right" alt={title} referrerPolicy="no-referrer" />
              <div className="absolute top-2 left-2 w-5 h-5 sm:w-7 sm:h-7 bg-white/30 backdrop-blur-md rounded-lg flex items-center justify-center text-white shadow-sm">
                 <Icon size={14} className="sm:w-4 sm:h-4" />
              </div>
          </div>
          <div className="p-2 sm:p-2.5 flex flex-col flex-1 justify-center min-h-0 overflow-hidden">
             <h4 className={`font-black text-slate-800 text-[14px] xs:text-[15px] sm:text-base leading-tight mb-0.5 ${textHoverClass} transition-colors truncate`}>{title}</h4>
             <p className="text-[11px] xs:text-[12px] sm:text-xs font-bold text-slate-400 leading-tight truncate">{desc}</p>
          </div>
      </div>
  );

  return (
    <div className="w-full flex flex-col justify-between animate-fade-in font-sans h-full min-h-0 -mt-2">
      
      {/* 1. Profile Progress Card (Premium) */}
      <header className="px-2 pt-0 sm:px-4 sm:pt-2 shrink-0">
         <div className="bg-white rounded-[1.25rem] p-3 shadow-sm border border-slate-100 relative overflow-hidden flex flex-col gap-2">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-fun-blue/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-2 relative z-10 w-full">
               <div onClick={() => navigate('/my-style')} className={`w-14 h-14 sm:w-20 sm:h-20 shrink-0 ${stats.themeColor || 'bg-fun-blue'} rounded-xl border-[2px] border-white shadow-md flex items-center justify-center cursor-pointer hover:scale-105 transition-transform relative group overflow-hidden`}>
                  <img src={stats.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} alt="User Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <Palette className="text-white w-4 h-4" />
                  </div>
               </div>
               
               <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1">
                     <h2 className="text-xl sm:text-3xl font-black text-slate-800 tracking-tight truncate leading-none">
                       {displayName}
                     </h2>
                     
                     <div className="flex items-center gap-1.5 ml-auto shrink-0">
                        <div className="flex items-center gap-1 text-orange-500 font-black bg-orange-50 px-2 py-1 rounded border border-orange-100 text-[13px] sm:text-[15px]">
                           <Flame size={14} className="fill-current sm:w-4 sm:h-4" /> {stats.streakDays}
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500 font-black bg-yellow-50 px-2 py-1 rounded border border-yellow-100 text-[13px] sm:text-[15px]">
                           <Star size={14} className="fill-current sm:w-4 sm:h-4" /> {stats.points}
                        </div>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-2 w-full mt-0.5">
                     <span className="text-[13px] sm:text-[15px] font-black text-fun-blue flex items-center gap-1 shrink-0">
                        <Award size={14} className="sm:hidden" />
                        <Award size={16} className="hidden sm:block" /> 
                        Lv.{stats.level}
                     </span>
                     <div className="flex-1 h-3 sm:h-3.5 bg-slate-200 rounded-full overflow-hidden shadow-inner flex">
                        <div className="h-full bg-fun-blue rounded-full shadow-[0_0_10px_rgba(56,189,248,0.4)] transition-all duration-1000 ease-out" style={{ width: `${progressPercent}%` }} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </header>

      {/* 2. Segemented Navigation (Top Tabs) */}
      <div className="px-3 py-3 sm:px-4 shrink-0">
         <div className="flex gap-1 p-1 bg-slate-200/50 rounded-xl backdrop-blur-md overflow-x-auto scrollbar-none">
            <button
               onClick={() => navigate('/leaderboard')}
               className="flex-shrink-0 min-w-[70px] flex-1 py-1.5 rounded-lg font-black text-xs sm:text-sm transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 text-slate-600 hover:text-fun-blue bg-white/50 shadow-sm hover:shadow-md hover:bg-white"
            >
               <Users size={16} /> <span>Rankings</span>
            </button>
            <button
               onClick={() => navigate('/my-style')}
               className="flex-shrink-0 min-w-[70px] flex-1 py-1.5 rounded-lg font-black text-xs sm:text-sm transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 text-slate-600 hover:text-fun-blue bg-white/50 shadow-sm hover:shadow-md hover:bg-white"
            >
               <Palette size={16} /> <span>Style</span>
            </button>
            <button
               onClick={() => navigate('/trophy-case')}
               className="flex-shrink-0 min-w-[70px] flex-1 py-1.5 rounded-lg font-black text-xs sm:text-sm transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 text-slate-600 hover:text-fun-blue bg-white/50 shadow-sm hover:shadow-md hover:bg-white"
            >
               <Award size={16} /> <span>Trophies</span>
            </button>
            <button
               onClick={() => navigate('/your-progress')}
               className="flex-shrink-0 min-w-[70px] flex-1 py-1.5 rounded-lg font-black text-xs sm:text-sm transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 text-slate-600 hover:text-fun-blue bg-white/50 shadow-sm hover:shadow-md hover:bg-white"
            >
               <Target size={16} /> <span>Progress</span>
            </button>
         </div>
      </div>

      {/* 4. Main Hero Feature (Grammar) */}
      <div className="px-3 pb-3 sm:px-4 shrink-0">
         <div 
             onClick={() => navigate('/grammar-lessons')}
             className="relative w-full rounded-[1.25rem] border-[2px] border-[#7A9CFF] overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group bg-white ring-2 ring-transparent hover:ring-[#7A9CFF]/20 flex flex-row h-[110px] xs:h-[120px] sm:h-[140px]"
         >
             <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center min-w-0 overflow-hidden z-20">
                 <div className="inline-flex items-center gap-1 sm:gap-1.5 text-slate-400 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] mb-1">
                    <BookOpen size={10} className="text-[#7A9CFF]" /> <span className="truncate">Lessons</span>
                 </div>
                 <h2 className="font-black text-slate-800 text-xl sm:text-3xl truncate mb-0.5 sm:mb-1 group-hover:text-[#7A9CFF] transition-colors leading-snug">{nextLessonTitle}</h2>
                 <p className="text-[11px] sm:text-xs font-bold text-slate-400 leading-tight truncate mb-2 sm:mb-2.5">Master your English grammar.</p>
                 
                 <div className="w-full max-w-[150px] h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden flex shrink-0">
                    <div className="h-full bg-[#7A9CFF] rounded-full transition-all duration-1000" style={{ width: `${grammarPercent}%` }} />
                 </div>
             </div>
             
             <div className="relative w-[35%] sm:w-[40%] bg-[#7A9CFF] overflow-hidden shrink-0">
                 <div className="absolute inset-0 bg-white/20 blur-xl group-hover:bg-white/30 transition-colors" />
                 <img src={grammarImg} className="absolute -bottom-1 -right-2 h-[120%] sm:h-[130%] object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md origin-bottom-right" alt="Grammar" referrerPolicy="no-referrer" />
             </div>
         </div>
      </div>

      {/* 5. Practice Games Area (Grid layout tailored to fit smaller space) */}
      <div className="px-3 pb-0 sm:px-4 flex-1 flex flex-col min-h-0 mt-1">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 xs:gap-3 flex-1 min-h-[140px] mb-1">
            <PracticeCard 
               title="Speak" 
               desc="Pronounce"
               icon={Mic}
               imageSrc={speakImage}
               onClick={() => navigate('/speak')}
               bgClass="bg-[#71D5C1]"
               borderClass="border-[#71D5C1]"
               textHoverClass="group-hover:text-[#71D5C1]"
               progress={40}
            />
            <PracticeCard 
               title="Write" 
               desc="Practice"
               icon={PenTool}
               imageSrc={vocImg}
               onClick={() => navigate('/write')}
               bgClass="bg-[#FFCF9C]"
               borderClass="border-[#FFCF9C]"
               textHoverClass="group-hover:text-[#FFCF9C]"
            />
            <PracticeCard 
               title="Watch" 
               desc="Watch & Learn"
               icon={MonitorPlay}
               imageSrc={watchImage}
               onClick={() => navigate('/videos')}
               bgClass="bg-[#FF7A7A]"
               borderClass="border-[#FF7A7A]"
               textHoverClass="group-hover:text-[#FF7A7A]"
            />
            <PracticeCard 
               title="Play" 
               desc="Have fun"
               icon={Gamepad2}
               imageSrc={wordRushImg}
               onClick={() => navigate('/play')}
               bgClass="bg-[#B69CFF]"
               borderClass="border-[#B69CFF]"
               textHoverClass="group-hover:text-[#B69CFF]"
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

