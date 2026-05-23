
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Brain, Star, Flame, CheckCircle2, PlayCircle, Sparkles, Wand2, Award, Palette, Mic, Map, Flag, MonitorPlay, Target, Bell, BookOpen } from 'lucide-react';
import Button from '../components/Button';
import { Badge } from '../types';
import { useGamification } from '../context/GamificationContext';
import UserRoleBadge from '../components/UserRoleBadge';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { stats, quests, mode, userId, isPremium, isAdmin, isVerifiedTeacher } = useGamification();
  
  const isKids = true; // Forced to kids mode

  // Helper to format username
  const displayName = userId ? userId.charAt(0).toUpperCase() + userId.slice(1) : `Hero ${stats.level}`;

  const pointsPerLevel = 500;
  const currentLevelPoints = stats.points % pointsPerLevel;
  const progressPercent = (currentLevelPoints / pointsPerLevel) * 100;

  const DailyFlowCard = ({ title, time, icon, color, onClick, completed }: any) => (
      <div onClick={onClick} className={`flex items-center gap-3 p-3 sm:p-4 rounded-[1.25rem] sm:rounded-[1.5rem] border-[3px] sm:border-4 transition-all cursor-pointer ${completed ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-100 hover:border-fun-blue hover:shadow-sm'}`}>
          <div className={`w-10 h-10 sm:w-12 sm:h-12 ${completed ? 'bg-slate-200' : color} rounded-xl sm:rounded-xl flex items-center justify-center text-white text-lg sm:text-2xl shadow-sm shrink-0`}>
              {completed ? <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" /> : React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5 sm:w-6 sm:h-6" })}
          </div>
          <div className="flex-1 min-w-0">
              <h4 className={`font-black text-sm sm:text-base leading-tight truncate ${completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{title}</h4>
              <p className="text-[10px] sm:text-xs font-bold text-slate-400 truncate mt-0.5">{time}</p>
          </div>
          {!completed && <div className="bg-slate-100 p-1.5 sm:p-2 rounded-full text-slate-400 shrink-0"><PlayCircle className="w-5 h-5 sm:w-6 sm:h-6" /></div>}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <DailyFlowCard 
                    title="Warm Up" 
                    time="Word Rush" 
                    icon={<Zap />} 
                    color="bg-fun-yellow" 
                    onClick={() => navigate('/vocab')}
                    completed={false}
                />
                <DailyFlowCard 
                    title="Learn" 
                    time="Grammar & Stories" 
                    icon={<BookOpen />} 
                    color="bg-fun-purple" 
                    onClick={() => navigate('/grammar-lessons')}
                    completed={false}
                />
                <DailyFlowCard 
                    title="Speak" 
                    time="Speaking Practice" 
                    icon={<Mic />} 
                    color="bg-fun-green" 
                    onClick={() => navigate('/pronunciation')}
                    completed={false}
                />
                <DailyFlowCard 
                    title="Watch" 
                    time="Smart Clips" 
                    icon={<MonitorPlay />} 
                    color="bg-fun-pink" 
                    onClick={() => navigate('/videos')}
                    completed={false}
                />
                <DailyFlowCard 
                    title="Review" 
                    time="Scramble Master & Coach" 
                    icon={<Brain />} 
                    color="bg-fun-blue" 
                    onClick={() => navigate('/game/scramble')}
                    completed={false}
                />
                <DailyFlowCard 
                    title="Challenge" 
                    time="Live Race" 
                    icon={<Flag />} 
                    color="bg-red-500" 
                    onClick={() => navigate('/race')}
                    completed={false}
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
