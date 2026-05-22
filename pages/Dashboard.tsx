
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Brain, Star, Flame, CheckCircle2, PlayCircle, Sparkles, Wand2, Award, Palette, Mic, Map, Flag, MonitorPlay, Target, Bell, BookOpen } from 'lucide-react';
import Button from '../components/Button';
import { Badge } from '../types';
import { useGamification } from '../context/GamificationContext';
import { ALL_BADGES } from '../constants/badges';
import MysteryBox from '../components/MysteryBox';
import UserRoleBadge from '../components/UserRoleBadge';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { stats, quests, mode, awardPoints, grantBadge, userId, isPremium, isAdmin, isVerifiedTeacher } = useGamification();
  const [showMysteryBox, setShowMysteryBox] = useState(false);
  const [isBoxClaimed, setIsBoxClaimed] = useState(false);
  
  const isKids = true; // Forced to kids mode

  // Helper to format username
  const displayName = userId ? userId.charAt(0).toUpperCase() + userId.slice(1) : `Hero ${stats.level}`;

  const pointsPerLevel = 500;
  const currentLevelPoints = stats.points % pointsPerLevel;
  const progressPercent = (currentLevelPoints / pointsPerLevel) * 100;

  const handleRewardClaimed = (reward: { type: 'xp' | 'badge', value: any }) => {
    if (reward.type === 'xp') {
      awardPoints(reward.value, 'Mystery Box');
    } else {
      grantBadge({
        ...reward.value,
        earnedAt: new Date().toISOString()
      });
    }
    setIsBoxClaimed(true);
  };

  const DailyFlowCard = ({ title, time, icon, color, onClick, completed }: any) => (
      <div onClick={onClick} className={`flex items-center gap-3 p-3 rounded-[1.5rem] border-4 transition-all cursor-pointer ${completed ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-100 hover:border-fun-blue hover:shadow-sm'}`}>
          <div className={`w-10 h-10 ${completed ? 'bg-slate-200' : color} rounded-xl flex items-center justify-center text-white text-xl shadow-sm shrink-0`}>
              {completed ? <CheckCircle2 size={20} /> : React.cloneElement(icon as React.ReactElement, { size: 20 })}
          </div>
          <div className="flex-1">
              <h4 className={`font-black text-sm sm:text-base leading-tight ${completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{title}</h4>
              <p className="text-[10px] sm:text-xs font-bold text-slate-400">{time}</p>
          </div>
          {!completed && <div className="bg-slate-100 p-1.5 rounded-full text-slate-400 shrink-0"><PlayCircle size={18} /></div>}
      </div>
  );

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {showMysteryBox && (
        <MysteryBox 
          onClose={() => setShowMysteryBox(false)} 
          onRewardClaimed={handleRewardClaimed}
          availableBadges={ALL_BADGES}
        />
      )}
      
      {/* Header */}
      <header className={`p-4 sm:p-5 shadow-sm bg-white rounded-[1.5rem] sm:rounded-[2rem] border-4 border-slate-100 relative overflow-hidden`}>
        {/* Top row: avatar + info + stats + notifications */}
        <div className="flex items-center gap-3 justify-between">
          {/* Avatar */}
          <div className="flex items-center gap-3 min-w-0">
            <div onClick={() => navigate('/my-style')} className={`w-14 h-14 shrink-0 ${stats.themeColor || 'bg-fun-blue'} rounded-[1rem] border-2 border-white shadow-lg flex items-center justify-center animate-float cursor-pointer hover:scale-110 transition-transform relative group overflow-hidden`}>
              <img src={stats.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} alt="User Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Palette className="text-white w-4 h-4" />
              </div>
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-black text-slate-800 tracking-tight flex items-center gap-1 leading-none mb-0.5 truncate">
                {stats.identityTitle || 'Explorer'} <Sparkles className="text-fun-yellow animate-pulse shrink-0 w-3.5 h-3.5" />
              </h2>
              <p className="text-slate-500 font-bold text-[11px]">Lv.{stats.level} • <span className="text-fun-pink">{displayName}</span></p>
              <div className="mt-1 flex flex-wrap gap-1">
                <span className="px-1.5 py-0.5 bg-slate-100 rounded-md text-[9px] font-black text-slate-500 uppercase tracking-widest border border-slate-200">{userId}</span>
                {isAdmin && <UserRoleBadge role="admin" size="sm" />}
                {isVerifiedTeacher && <UserRoleBadge role="teacher" size="sm" />}
                {isPremium && <UserRoleBadge role="premium" size="sm" />}
              </div>
            </div>
          </div>
          {/* Stats + bell */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="flex flex-col items-center px-2.5 py-1 bg-orange-100 border-b-2 border-orange-200 rounded-xl text-orange-600 font-black">
              <Flame className="w-3.5 h-3.5 fill-current animate-pulse" />
              <span className="text-sm leading-none mt-0.5">{stats.streakDays}</span>
              <span className="text-[7px] uppercase">STREAK</span>
            </div>
            <div className="flex flex-col items-center px-2.5 py-1 bg-yellow-100 border-b-2 border-yellow-200 rounded-xl text-yellow-600 font-black">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-sm leading-none mt-0.5">{stats.points}</span>
              <span className="text-[7px] uppercase">XP</span>
            </div>
            <button onClick={() => navigate('/notifications')} className="p-1.5 bg-slate-100 hover:bg-fun-orange hover:text-white rounded-lg transition-all text-slate-500 flex items-center gap-1 font-black text-[9px] uppercase tracking-widest">
              <Bell size={13} />
            </button>
          </div>
        </div>

        {/* Quick-nav buttons: My Style, Trophy Case, Your Progress */}
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => navigate('/my-style')}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-fun-purple/10 hover:bg-fun-purple/20 active:scale-95 rounded-xl transition-all"
          >
            <div className={`w-5 h-5 rounded-md ${stats.themeColor || 'bg-fun-blue'} overflow-hidden shrink-0`}>
              <img src={stats.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <span className="font-black text-[10px] text-fun-purple uppercase tracking-wide">My Style</span>
          </button>
          <button
            onClick={() => navigate('/trophy-case')}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-yellow-50 hover:bg-yellow-100 active:scale-95 rounded-xl transition-all"
          >
            <Award className="w-4 h-4 text-fun-yellow fill-current shrink-0" />
            <span className="font-black text-[10px] text-yellow-600 uppercase tracking-wide">Trophies</span>
          </button>
          <button
            onClick={() => navigate('/your-progress')}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-fun-blue/10 hover:bg-fun-blue/20 active:scale-95 rounded-xl transition-all"
          >
            <Target className="w-4 h-4 text-fun-blue shrink-0" />
            <span className="font-black text-[10px] text-fun-blue uppercase tracking-wide">Progress</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Daily Flow & Skills */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Daily Flow Section */}
            <div className="bg-white p-4 sm:p-6 rounded-[2rem] border-4 border-slate-100 shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
                    <div className="h-full bg-fun-green w-1/3" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-4 flex items-center gap-2">
                    <Map className="text-fun-blue w-5 h-5 sm:w-6 sm:h-6" /> TODAY'S JOURNEY
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DailyFlowCard 
                        title="Warm Up: Word Rush" 
                        time="2 min • Vocabulary" 
                        icon={<Zap />} 
                        color="bg-fun-yellow" 
                        onClick={() => navigate('/vocab')}
                        completed={false}
                    />
                    <DailyFlowCard 
                        title="Live Race: Compete!" 
                        time="3 min • Multiplayer" 
                        icon={<Flag />} 
                        color="bg-red-500" 
                        onClick={() => navigate('/race')}
                        completed={false}
                    />
                    <DailyFlowCard 
                        title="Speak: Pronunciation" 
                        time="3 min • Speaking" 
                        icon={<Mic />} 
                        color="bg-fun-green" 
                        onClick={() => navigate('/pronunciation')}
                        completed={false}
                    />
                    <DailyFlowCard 
                        title="Story: Coffee Run" 
                        time="5 min • Real Life" 
                        icon={<BookOpen />} 
                        color="bg-fun-pink" 
                        onClick={() => navigate('/story')}
                        completed={false}
                    />
                    <DailyFlowCard 
                        title="Learn: Grammar" 
                        time="10 min • Lessons" 
                        icon={<BookOpen />} 
                        color="bg-fun-orange" 
                        onClick={() => navigate('/grammar-lessons')}
                        completed={false}
                    />
                    <DailyFlowCard 
                        title="Review: Scramble" 
                        time="3 min • Grammar" 
                        icon={<Brain />} 
                        color="bg-fun-blue" 
                        onClick={() => navigate('/game/scramble')}
                        completed={false}
                    />
                    <DailyFlowCard 
                        title="Watch: Lingavo Learns" 
                        time="5 min • Immersive" 
                        icon={<MonitorPlay />} 
                        color="bg-[#00F798]" 
                        onClick={() => navigate('/videos')}
                        completed={false}
                    />
                </div>
            </div>

        </div>

        {/* Right Column: Quests & Loot */}
        <div className="space-y-3">

            {/* Daily Loot */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-5 sm:p-6 rounded-[2rem] text-center shadow-lg relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
               <h3 className="text-white font-black text-lg sm:text-xl mb-4 flex items-center justify-center gap-2">
                  <Wand2 className="text-fun-blue w-5 h-5" /> DAILY LOOT
               </h3>
               
               <div 
                 onClick={() => !isBoxClaimed && setShowMysteryBox(true)}
                 className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 flex items-center justify-center text-4xl sm:text-5xl cursor-pointer transition-all ${!isBoxClaimed ? 'hover:scale-110 active:scale-95 animate-float' : 'opacity-50 grayscale'}`}
               >
                  {isBoxClaimed ? '✨' : '🎁'}
               </div>
               
               <p className="text-white font-bold text-xs sm:text-sm mb-3">
                  {isBoxClaimed ? 'Come back tomorrow!' : 'Win XP or Rare Badges!'}
               </p>
               
               {!isBoxClaimed && (
                 <button onClick={() => setShowMysteryBox(true)} className="bg-fun-blue text-white px-6 py-2.5 rounded-xl font-black text-sm shadow-md border-b-2 border-blue-800 hover:bg-blue-500">
                    OPEN BOX
                 </button>
               )}
            </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
