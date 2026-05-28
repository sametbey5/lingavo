
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Brain, Star, Flame, CheckCircle2, PlayCircle, Sparkles, Wand2, Award, Palette, Mic, Map, Flag, MonitorPlay, Target, Bell, BookOpen, Users, ChevronRight, X, ArrowLeft, Heart, Medal } from 'lucide-react';
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
  const { stats, quests, mode, userId, isPremium, isAdmin, isVerifiedTeacher } = useGamification();
  
  const isKids = true; // Forced to kids mode

  // Helper to format username
  const displayName = userId ? userId.charAt(0).toUpperCase() + userId.slice(1) : `Hero ${stats.level}`;

  const pointsPerLevel = 500;
  const currentLevelPoints = stats.points % pointsPerLevel;
  const progressPercent = (currentLevelPoints / pointsPerLevel) * 100;

  const ImageFlowCard = ({ imageSrc, onClick, className = 'aspect-square' }: any) => (
      <div 
         onClick={onClick} 
         className={`relative w-full rounded-[1.25rem] sm:rounded-[1.75rem] border-[3px] border-slate-100 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group bg-slate-100 ring-4 ring-transparent hover:ring-fun-blue/20 ${className}`}
      >
          <img src={imageSrc} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Activity" referrerPolicy="no-referrer" />
      </div>
  );

  return (
    <div className="space-y-2.5 sm:space-y-3.5 animate-fade-in pb-2">
      {/* Header */}
      <header className={`p-3 sm:p-4.5 shadow-sm bg-white rounded-[1.25rem] sm:rounded-[1.75rem] border-[3px] border-slate-100 relative overflow-hidden`}>
        {/* Top row: avatar + info + stats + level */}
        <div className="flex items-center gap-3 justify-between">
          {/* Avatar */}
          <div className="flex items-center gap-3 min-w-0">
            <div onClick={() => navigate('/my-style')} className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 ${stats.themeColor || 'bg-fun-blue'} rounded-2xl border-4 border-white shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-transform relative group overflow-hidden`}>
              <img src={stats.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} alt="User Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Palette className="text-white w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <div className="min-w-0 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight flex items-center leading-none truncate">
                {displayName}
              </h2>
            </div>
          </div>
          {/* Stats: Streak + XP + Level */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="flex flex-col items-center px-2.5 sm:px-4 py-1.5 sm:py-2 bg-orange-100 border-b-4 border-orange-200 rounded-2xl text-orange-600 font-black">
              <Flame className="w-5 h-5 sm:w-7 sm:h-7 fill-current animate-pulse mb-0.5" />
              <span className="text-sm sm:text-lg leading-none">{stats.streakDays}</span>
            </div>
            <div className="flex flex-col items-center px-2.5 sm:px-4 py-1.5 sm:py-2 bg-yellow-100 border-b-4 border-yellow-200 rounded-2xl text-yellow-600 font-black">
              <Star className="w-5 h-5 sm:w-7 sm:h-7 fill-current mb-0.5" />
              <span className="text-sm sm:text-lg leading-none">{stats.points}</span>
            </div>
            <div className="flex flex-col items-center px-2.5 sm:px-4 py-1.5 sm:py-2 bg-blue-100 border-b-4 border-blue-200 rounded-2xl text-blue-600 font-black">
              <Award className="w-5 h-5 sm:w-7 sm:h-7 fill-current mb-0.5" />
              <span className="text-sm sm:text-lg leading-none">Lv.{stats.level}</span>
            </div>
          </div>
        </div>

        {/* Quick-nav buttons: My Style, Trophy Case, Your Progress */}
        <div className="mt-4 sm:mt-5 flex gap-2">
          <button
            onClick={() => navigate('/my-style')}
            className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-3 bg-transparent hover:bg-slate-50 active:scale-95 rounded-xl transition-all"
          >
            <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md ${stats.themeColor || 'bg-fun-blue'} overflow-hidden shrink-0 border-2 border-slate-200`}>
              <img src={stats.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <span className="font-black text-xs sm:text-sm text-fun-purple uppercase tracking-wide">My Style</span>
          </button>
          <button
            onClick={() => navigate('/trophy-case')}
            className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-3 bg-transparent hover:bg-slate-50 active:scale-95 rounded-xl transition-all"
          >
            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-fun-yellow fill-current shrink-0" />
            <span className="font-black text-xs sm:text-sm text-yellow-600 uppercase tracking-wide">Trophies</span>
          </button>
          <button
            onClick={() => navigate('/your-progress')}
            className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-3 bg-transparent hover:bg-slate-50 active:scale-95 rounded-xl transition-all"
          >
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-fun-blue shrink-0" />
            <span className="font-black text-xs sm:text-sm text-fun-blue uppercase tracking-wide">Progress</span>
          </button>
        </div>
      </header>

      <div className="flex flex-col space-y-2.5 sm:space-y-3.5">
        {/* Daily Flow Section with exactly the 6 main buttons */}
        <div className="bg-white p-3 sm:p-5 rounded-[1.5rem] sm:rounded-[2rem] border-[3px] border-slate-100 shadow-sm relative flex flex-col gap-3 sm:gap-4 mt-2">
            
            {/* 1. Grammar (Large Horizontal Card) */}
            <div 
                onClick={() => navigate('/grammar-lessons')}
                className="relative w-full rounded-[1.25rem] sm:rounded-[1.75rem] border-[3px] border-slate-100 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group bg-slate-50 ring-4 ring-transparent hover:ring-fun-blue/20 flex flex-row items-stretch"
            >
                <div className="flex-1 p-5 sm:p-8 flex flex-col justify-center">
                    <h3 className="font-black text-2xl sm:text-4xl text-slate-800 mb-1 sm:mb-2 leading-tight">Grammar</h3>
                    <p className="text-sm sm:text-lg font-bold text-slate-500 leading-snug">Continue your last lesson!</p>
                </div>
                <div className="w-[45%] sm:w-1/3 shrink-0 relative overflow-hidden">
                    <img src={grammarImg} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Grammar" referrerPolicy="no-referrer" />
                </div>
            </div>

            {/* Other 5 cards */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 items-start px-0.5 sm:px-2">
                
                {/* 2. Dictionary */}
                <div className="w-[30%] sm:flex-1 flex flex-col gap-1.5 items-center">
                    <div className="w-full">
                        <ImageFlowCard 
                            imageSrc={vocImg}
                            onClick={() => navigate('/wordbank')}
                            className="aspect-square sm:aspect-[4/5] shadow-sm"
                        />
                    </div>
                </div>

                {/* 3. Word Rush */}
                <div className="w-[30%] sm:flex-1 flex flex-col gap-1.5 items-center">
                    <div className="w-full">
                        <ImageFlowCard 
                            imageSrc={wordRushImg}
                            onClick={() => navigate('/vocab')}
                            className="aspect-square sm:aspect-[4/5] shadow-sm"
                        />
                    </div>
                </div>

                {/* 4. Scramble */}
                <div className="w-[30%] sm:flex-1 flex flex-col gap-1.5 items-center">
                    <div className="w-full">
                        <ImageFlowCard 
                            imageSrc={scrambleImg}
                            onClick={() => navigate('/game/scramble')}
                            className="aspect-square sm:aspect-[4/5] shadow-sm"
                        />
                    </div>
                </div>

                {/* 5. Speak */}
                <div className="w-[30%] sm:flex-1 flex flex-col gap-1.5 items-center">
                    <div className="w-full">
                        <ImageFlowCard 
                            imageSrc={speakImage}
                            onClick={() => navigate('/pronunciation')}
                            className="aspect-square sm:aspect-[4/5] shadow-sm"
                        />
                    </div>
                </div>

                {/* 6. Watch */}
                <div className="w-[30%] sm:flex-1 flex flex-col gap-1.5 items-center">
                    <div className="w-full">
                        <ImageFlowCard 
                            imageSrc={watchImage}
                            onClick={() => navigate('/videos')}
                            className="aspect-square sm:aspect-[4/5] shadow-sm"
                        />
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
