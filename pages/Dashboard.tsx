
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Brain, Star, Flame, CheckCircle2, PlayCircle, Sparkles, Wand2, Award, Palette, Mic, Map, Flag, MonitorPlay, Target, Bell, BookOpen } from 'lucide-react';
import Button from '../components/Button';
import { Badge } from '../types';
import { useGamification } from '../context/GamificationContext';
import UserRoleBadge from '../components/UserRoleBadge';

import warmUpImage from '../src/assets/images/warm_up_button_1779508278650.png';
import learnImage from '../src/assets/images/learn_button_1779508296021.png';
import speakImage from '../src/assets/images/speak_button_1779508313149.png';
import watchImage from '../src/assets/images/watch_button_1779508330353.png';
import reviewImage from '../src/assets/images/review_button_1779508350867.png';
import challengeImage from '../src/assets/images/challenge_button_1779508368287.png';

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
         className="relative w-full aspect-square rounded-2xl sm:rounded-[2rem] border-4 border-slate-100 overflow-hidden cursor-pointer hover:border-fun-blue hover:shadow-xl hover:-translate-y-1 transition-all group bg-slate-50"
      >
          <img src={imageSrc} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Action button" />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none" />
      </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in pb-10">
      {/* Header */}
      <header className={`p-4 sm:p-5 shadow-sm bg-white rounded-[1.5rem] sm:rounded-[2rem] border-[3px] sm:border-4 border-slate-100 relative overflow-hidden`}>
        {/* Top row: avatar + info + stats + notifications */}
        <div className="flex items-center gap-3 justify-between">
          {/* Avatar */}
          <div className="flex items-center gap-3 min-w-0">
            <div onClick={() => navigate('/my-style')} className={`w-12 h-12 sm:w-16 sm:h-16 shrink-0 ${stats.themeColor || 'bg-fun-blue'} rounded-xl sm:rounded-[1rem] border-[3px] border-white shadow-md flex items-center justify-center animate-float cursor-pointer hover:scale-110 transition-transform relative group overflow-hidden`}>
              <img src={stats.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} alt="User Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Palette className="text-white w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="min-w-0 flex flex-col justify-center">
              <h2 className="text-base sm:text-lg font-black text-slate-800 tracking-tight flex items-center gap-1 leading-none mb-1 truncate">
                {stats.identityTitle || 'Explorer'} <Sparkles className="text-fun-yellow animate-pulse shrink-0 w-4 h-4" />
              </h2>
              <p className="text-slate-500 font-bold text-[11px] sm:text-xs leading-tight">Lv.{stats.level} • <span className="text-fun-pink">{displayName}</span></p>
              <div className="mt-1 flex flex-wrap gap-1">
                <span className="px-1.5 py-0.5 bg-slate-100 rounded-md text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-200">{userId}</span>
              </div>
            </div>
          </div>
          {/* Stats + bell */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex flex-col items-center px-2 sm:px-3 py-1 sm:py-1.5 bg-orange-100 border-b-2 border-orange-200 rounded-xl text-orange-600 font-black">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 fill-current animate-pulse mb-0.5" />
              <span className="text-sm sm:text-base leading-none">{stats.streakDays}</span>
            </div>
            <div className="flex flex-col items-center px-2 sm:px-3 py-1 sm:py-1.5 bg-yellow-100 border-b-2 border-yellow-200 rounded-xl text-yellow-600 font-black">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current mb-0.5" />
              <span className="text-sm sm:text-base leading-none">{stats.points}</span>
            </div>
            <button onClick={() => navigate('/notifications')} className="p-2 bg-slate-100 hover:bg-fun-orange hover:text-white rounded-xl transition-all text-slate-500 flex items-center justify-center h-full">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
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

      <div className="flex flex-col space-y-6">
        {/* Daily Flow Section */}
        <div className="bg-white p-3 sm:p-5 rounded-2xl sm:rounded-[2rem] border-2 sm:border-4 border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 sm:h-1.5 bg-slate-100">
                <div className="h-full bg-fun-green w-1/3" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-4 sm:mb-5 flex items-center gap-2 uppercase">
                LET'S...
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                <ImageFlowCard 
                    imageSrc={warmUpImage}
                    onClick={() => navigate('/vocab')}
                />
                <ImageFlowCard 
                    imageSrc={learnImage}
                    onClick={() => navigate('/grammar-lessons')}
                />
                <ImageFlowCard 
                    imageSrc={speakImage}
                    onClick={() => navigate('/pronunciation')}
                />
                <ImageFlowCard 
                    imageSrc={watchImage}
                    onClick={() => navigate('/videos')}
                />
                <ImageFlowCard 
                    imageSrc={reviewImage}
                    onClick={() => navigate('/game/scramble')}
                />
                <ImageFlowCard 
                    imageSrc={challengeImage}
                    onClick={() => navigate('/race')}
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
