
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

  const ImageFlowCard = ({ imageSrc, onClick }: any) => (
      <div 
         onClick={onClick} 
         className="relative w-full aspect-square rounded-[1.25rem] sm:rounded-[1.75rem] border-[3px] border-slate-100 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group bg-slate-100 ring-4 ring-transparent hover:ring-fun-blue/20"
      >
          <img src={imageSrc} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Activity" referrerPolicy="no-referrer" />
      </div>
  );

  return (
    <div className="space-y-2.5 sm:space-y-3.5 animate-fade-in pb-2">
      {/* Header */}
      <header className={`p-3 sm:p-4.5 shadow-sm bg-white rounded-[1.25rem] sm:rounded-[1.75rem] border-[3px] border-slate-100 relative overflow-hidden`}>
        {/* Top row: avatar + info + stats + level */}
        <div className="flex items-center gap-2.5 justify-between">
          {/* Avatar */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div onClick={() => navigate('/my-style')} className={`w-14 h-14 sm:w-18 sm:h-18 shrink-0 ${stats.themeColor || 'bg-fun-blue'} rounded-xl border-[3px] border-white shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-transform relative group overflow-hidden`}>
              <img src={stats.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} alt="User Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Palette className="text-white w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="min-w-0 flex flex-col justify-center">
              <h2 className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight flex items-center leading-none truncate">
                {displayName}
              </h2>
            </div>
          </div>
          {/* Stats: Streak + XP + Level */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="flex flex-col items-center px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-orange-100 border-b-2 border-orange-200 rounded-xl text-orange-600 font-black">
              <Flame className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 fill-current animate-pulse mb-0.5" />
              <span className="text-xs sm:text-sm leading-none">{stats.streakDays}</span>
            </div>
            <div className="flex flex-col items-center px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-yellow-100 border-b-2 border-yellow-200 rounded-xl text-yellow-600 font-black">
              <Star className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 fill-current mb-0.5" />
              <span className="text-xs sm:text-sm leading-none">{stats.points}</span>
            </div>
            <div className="flex flex-col items-center px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-blue-100 border-b-2 border-blue-200 rounded-xl text-blue-600 font-black">
              <Award className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 fill-current mb-0.5" />
              <span className="text-xs sm:text-sm leading-none">Lv.{stats.level}</span>
            </div>
          </div>
        </div>

        {/* Quick-nav buttons: My Style, Trophy Case, Your Progress */}
        <div className="mt-2.5 sm:mt-3 flex gap-2">
          <button
            onClick={() => navigate('/my-style')}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 sm:py-2.5 bg-fun-purple/10 hover:bg-fun-purple/20 active:scale-95 rounded-xl transition-all"
          >
            <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md ${stats.themeColor || 'bg-fun-blue'} overflow-hidden shrink-0`}>
              <img src={stats.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <span className="font-black text-[10px] sm:text-xs text-fun-purple uppercase tracking-wide">My Style</span>
          </button>
          <button
            onClick={() => navigate('/trophy-case')}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 sm:py-2.5 bg-yellow-50 hover:bg-yellow-100 active:scale-95 rounded-xl transition-all"
          >
            <Award className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-fun-yellow fill-current shrink-0" />
            <span className="font-black text-[10px] sm:text-xs text-yellow-600 uppercase tracking-wide">Trophies</span>
          </button>
          <button
            onClick={() => navigate('/your-progress')}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 sm:py-2.5 bg-fun-blue/10 hover:bg-fun-blue/20 active:scale-95 rounded-xl transition-all"
          >
            <Target className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-fun-blue shrink-0" />
            <span className="font-black text-[10px] sm:text-xs text-fun-blue uppercase tracking-wide">Progress</span>
          </button>
        </div>
      </header>

      <div className="flex flex-col space-y-2.5 sm:space-y-3.5">
        {/* Daily Flow Section with exactly the 6 main buttons */}
        <div className="bg-white p-2 sm:p-4 rounded-[1.25rem] sm:rounded-[1.75rem] border-[3px] border-slate-100 shadow-sm relative flex flex-col gap-3">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3.5 items-start">
                
                {/* 1. Grammar */}
                <div className="flex flex-col gap-2">
                    <ImageFlowCard 
                        imageSrc={grammarImg}
                        onClick={() => navigate('/grammar-lessons')}
                    />
                </div>

                {/* 2. Dictionary */}
                <div className="flex flex-col gap-2">
                    <ImageFlowCard 
                        imageSrc={vocImg}
                        onClick={() => navigate('/wordbank')}
                    />
                </div>

                {/* 3. Word Rush */}
                <div className="flex flex-col gap-2">
                    <ImageFlowCard 
                        imageSrc={wordRushImg}
                        onClick={() => navigate('/vocab')}
                    />
                </div>

                {/* 4. Scramble */}
                <div className="flex flex-col gap-2">
                    <ImageFlowCard 
                        imageSrc={scrambleImg}
                        onClick={() => navigate('/game/scramble')}
                    />
                </div>

                {/* 5. Speak */}
                <div className="flex flex-col gap-2">
                    <ImageFlowCard 
                        imageSrc={speakImage}
                        onClick={() => navigate('/pronunciation')}
                    />
                </div>

                {/* 6. Watch */}
                <div className="flex flex-col gap-2">
                    <ImageFlowCard 
                        imageSrc={watchImage}
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
