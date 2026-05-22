
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Brain, Sword, Star, Flame, CheckCircle2, Rocket, PlayCircle, Sparkles, Wand2, RocketIcon, BarChart, ArrowRight, BookOpen, Clock, Target, Calendar, Award, Palette, X, Smile, Mic, Ear, Globe, Map, Settings, Flag, MonitorPlay, User, Crown, Bell, Gamepad2 } from 'lucide-react';
import Button from '../components/Button';
import { Badge, SkillTree } from '../types';
import { useGamification } from '../context/GamificationContext';
import { BadgeDisplayKids, BadgeDisplayPro } from '../components/BadgeDisplay';
import ProgressTracker from '../components/ProgressTracker';
import { ALL_BADGES } from '../constants/badges';
import MysteryBox from '../components/MysteryBox';
import UserRoleBadge from '../components/UserRoleBadge';

const THEME_COLORS = [
  'bg-fun-blue', 'bg-fun-green', 'bg-fun-yellow', 'bg-fun-orange', 'bg-fun-pink', 'bg-fun-purple',
  'bg-fun-red', 'bg-fun-teal', 'bg-fun-indigo', 'bg-fun-lime', 'bg-fun-amber',
  'bg-slate-800', 'bg-emerald-500', 'bg-rose-500', 'bg-violet-600'
];
const AVATAR_OPTIONS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Toby&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Milo&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Harry&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Mia&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Noah&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Ava&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Chloe&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Bear&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Boots&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Bubba&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Bunny&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Buster&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Button&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Casper&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Cookie&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Cooper&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Daisy&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Duke&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Finn&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=George&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Gizmo&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Harley&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Henry&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jax&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Kiki&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Lola&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Lulu&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Marley&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Max&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Mittens&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Murphy&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Olive&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Oscar&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Otis&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Peanut&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Penny&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Pepper&mouth=serious',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Piper&mouth=serious',
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { stats, quests, mode, awardPoints, badges, setThemeColor, setAvatar, grantBadge, userId, isPremium, isAdmin, isVerifiedTeacher, verifiedTeachers } = useGamification();
  const [showMysteryBox, setShowMysteryBox] = useState(false);
  const [isBoxClaimed, setIsBoxClaimed] = useState(false);
  const [showStyleModal, setShowStyleModal] = useState(false);
  const [modalTab, setModalTab] = useState<'avatar' | 'color'>('avatar');
  
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

  const StylePickerModal = () => (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 max-w-md w-full shadow-2xl border-4 border-slate-100 relative">
        <button onClick={() => setShowStyleModal(false)} className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full p-2">
          <X size={20} />
        </button>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mb-6 text-center">Customize Look</h3>
        
        <div className="flex gap-2 sm:gap-4 mb-6 bg-slate-100 p-2 rounded-2xl">
           <button onClick={() => setModalTab('avatar')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${modalTab === 'avatar' ? 'bg-white text-fun-blue shadow-sm' : 'text-slate-500 hover:bg-slate-200'}`}>Presets</button>
           <button onClick={() => setModalTab('color')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${modalTab === 'color' ? 'bg-white text-fun-blue shadow-sm' : 'text-slate-500 hover:bg-slate-200'}`}>Theme</button>
        </div>

        <div className="max-h-[50vh] sm:max-h-[60vh] overflow-y-auto pr-2 scrollbar-hide">
          {modalTab === 'avatar' && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
              {AVATAR_OPTIONS.map(imgUrl => (
                <button 
                  key={imgUrl} 
                  onClick={() => { setAvatar(imgUrl); setShowStyleModal(false); }}
                  className={`relative aspect-square rounded-2xl border-4 transition-all hover:scale-110 active:scale-95 overflow-hidden ${stats.avatar === imgUrl ? 'border-fun-blue ring-4 ring-blue-100' : 'border-slate-100 hover:border-slate-200 bg-slate-50'}`}
                >
                  <img 
                    src={imgUrl} 
                    alt="Avatar Option" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}

          {modalTab === 'color' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {THEME_COLORS.map(color => (
                <button 
                  key={color} 
                  onClick={() => { setThemeColor(color); setShowStyleModal(false); }}
                  className={`h-20 sm:h-24 rounded-2xl border-4 transition-all hover:scale-110 active:scale-95 ${color} ${stats.themeColor === color ? 'border-slate-800 shadow-lg scale-105' : 'border-white shadow-sm'}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const SkillTreeCard = ({ skill, onClick }: { skill: any, onClick: () => void }) => (
      <div onClick={onClick} className={`bg-white p-4 rounded-[1.5rem] border-4 border-slate-100 shadow-sm cursor-pointer hover:border-fun-blue hover:scale-105 transition-all group relative overflow-hidden`}>
          <div className={`absolute top-0 right-0 p-2 opacity-10 text-4xl group-hover:scale-125 transition-transform`}>
              {skill.icon}
          </div>
          <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 ${skill.color} rounded-xl flex items-center justify-center text-2xl text-white shadow-sm`}>
                  {skill.icon}
              </div>
              <div>
                  <h4 className="font-black text-lg text-slate-800 leading-tight">{skill.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Level {skill.level}</p>
              </div>
          </div>
          
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border-2 border-slate-50">
              <div className={`${skill.color} h-full transition-all duration-1000`} style={{ width: `${skill.progress}%` }} />
          </div>
          <div className="flex justify-between mt-1.5 text-[10px] font-bold text-slate-400">
              <span>{Math.floor(skill.progress)} / 100 XP</span>
              <span>Next Lvl</span>
          </div>
      </div>
  );

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
      {showStyleModal && <StylePickerModal />}
      {showMysteryBox && (
        <MysteryBox 
          onClose={() => setShowMysteryBox(false)} 
          onRewardClaimed={handleRewardClaimed}
          availableBadges={ALL_BADGES}
        />
      )}
      
      {/* Header */}
      <header className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-6 shadow-sm bg-white rounded-[1.5rem] sm:rounded-[2rem] border-4 border-slate-100 relative overflow-hidden`}>
        <div className="absolute top-4 right-4 z-10">
           <button 
             onClick={() => navigate('/notifications')}
             className="p-1.5 sm:p-2 bg-slate-100 hover:bg-fun-orange hover:text-white rounded-lg sm:rounded-xl transition-all text-slate-500 shadow-sm flex items-center gap-1.5 font-black text-[9px] sm:text-[10px] uppercase tracking-widest"
           >
             <Bell size={14} className="sm:w-4 sm:h-4" /> News
           </button>
        </div>
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-fun-blue/5 rounded-full -mr-12 -mt-12 sm:-mr-16 sm:-mt-16 animate-pulse" />
        <div className="flex items-center gap-3 sm:gap-5 mt-4 sm:mt-0">
           <div onClick={() => setShowStyleModal(true)} className={`w-16 h-16 sm:w-20 sm:h-20 ${stats.themeColor || 'bg-fun-blue'} rounded-[1rem] sm:rounded-[1.5rem] border-2 border-white shadow-lg flex items-center justify-center transform rotate-3 animate-float cursor-pointer hover:scale-110 transition-transform relative group overflow-hidden`}>
             <img 
               src={stats.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} 
               alt="User Avatar" 
               className="w-full h-full object-cover"
               referrerPolicy="no-referrer"
             />
             <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Palette className="text-white w-5 h-5 sm:w-6 sm:h-6" />
             </div>
           </div>
           <div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-1.5 sm:gap-2 leading-none mb-1">
                {stats.identityTitle || 'Explorer'} <Sparkles className="text-fun-yellow animate-pulse shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
              </h2>
              <p className="text-slate-500 font-bold text-xs sm:text-sm">Level {stats.level} • <span className="text-fun-pink">{displayName}</span></p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                 <span className="px-1.5 py-0.5 bg-slate-100 rounded-md text-[9px] font-black text-slate-500 uppercase tracking-widest border border-slate-200">
                    {userId}
                 </span>
                 {isAdmin && <UserRoleBadge role="admin" size="sm" />}
                 {isVerifiedTeacher && <UserRoleBadge role="teacher" size="sm" />}
                 {isPremium && <UserRoleBadge role="premium" size="sm" />}
              </div>
           </div>
        </div>
        <div className="flex items-center justify-center sm:justify-end space-x-2 sm:space-x-3">
            <div className="group flex flex-col items-center px-3 sm:px-4 py-1.5 bg-orange-100 border-b-2 border-orange-200 rounded-xl sm:rounded-2xl text-orange-600 font-black cursor-help">
               <Flame className="w-4 h-4 sm:w-5 sm:h-5 fill-current animate-pulse group-hover:scale-125 transition-transform" />
               <span className="text-base sm:text-xl leading-none mt-0.5">{stats.streakDays}</span>
               <span className="text-[8px] uppercase">STREAK</span>
            </div>
            <div className="group flex flex-col items-center px-3 sm:px-4 py-1.5 bg-yellow-100 border-b-2 border-yellow-200 rounded-xl sm:rounded-2xl text-yellow-600 font-black">
               <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current animate-bounce-slow group-hover:rotate-180 transition-transform duration-500" />
               <span className="text-base sm:text-xl leading-none mt-0.5">{stats.points}</span>
               <span className="text-[8px] uppercase">TOTAL XP</span>
            </div>
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

            {/* Skill Trees Grid */}
            <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-4 flex items-center gap-2 px-2">
                    <Globe className="text-fun-purple w-5 h-5 sm:w-6 sm:h-6" /> SKILL TREES
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stats.skills && (
                        <>
                            <SkillTreeCard skill={stats.skills.vocabulary} onClick={() => navigate('/vocab')} />
                            <SkillTreeCard skill={stats.skills.speaking} onClick={() => navigate('/pronunciation')} />
                            <SkillTreeCard skill={stats.skills.listening} onClick={() => navigate('/story')} />
                            <SkillTreeCard skill={stats.skills.grammar} onClick={() => navigate('/grammar-lessons')} />
                            <SkillTreeCard skill={stats.skills.realLife} onClick={() => navigate('/story')} />
                        </>
                    )}
                </div>
            </div>

            {/* Teachers Section */}
            <div className="bg-white p-4 sm:p-6 rounded-[2rem] border-4 border-slate-100 shadow-md relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                        <User className="text-fun-blue w-5 h-5" /> TEACHERS
                    </h3>
                    <button 
                        onClick={() => navigate('/teachers')}
                        className="text-fun-blue font-black text-[10px] sm:text-sm hover:underline flex items-center gap-1"
                    >
                        View All <ArrowRight size={14} />
                    </button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {verifiedTeachers.length === 0 ? (
                        <div className="flex items-center gap-2 text-slate-400 font-bold italic p-2 text-sm">
                            No verified teachers yet.
                        </div>
                    ) : (
                        verifiedTeachers.map((teacher, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[80px] sm:min-w-[100px] cursor-pointer" onClick={() => navigate('/teachers')}>
                                <div className="relative group">
                                    <img 
                                        src={teacher.avatar} 
                                        alt={teacher.username} 
                                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-slate-50 shadow-sm group-hover:scale-110 transition-transform bg-slate-100"
                                        referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-fun-green border border-white rounded-full flex items-center justify-center">
                                        <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="font-black text-slate-800 text-[10px] sm:text-xs truncate max-w-[80px]">{teacher.username}</p>
                                    <UserRoleBadge role="teacher" size="sm" showText={false} />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>

        {/* Right Column: Quests & Loot */}
        <div className="space-y-6">
            {/* Progress Tracker */}
            <ProgressTracker />

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

            {/* Badges Trophy Case */}
            <div className="bg-white rounded-[2rem] border-4 border-slate-100 p-4 sm:p-6 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                    <Award className="text-fun-yellow fill-current w-6 h-6 sm:w-8 sm:h-8" />
                    <h3 className="text-lg sm:text-xl font-black text-slate-800 uppercase tracking-tight">Trophy Case</h3>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {badges.map((badge, index) => (
                    <BadgeDisplayKids key={`${badge.id}_${index}`} badge={badge} />
                    ))}
                    {badges.length === 0 && (
                    <div className="text-slate-400 font-bold italic text-xs">Play games to unlock your first badge!</div>
                    )}
                </div>
            </div>

            {/* Customize Look Card */}
            <div 
              onClick={() => setShowStyleModal(true)}
              className="bg-white p-4 sm:p-5 rounded-[1.5rem] border-4 border-slate-100 shadow-md cursor-pointer hover:scale-105 transition-transform group"
            >
               <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="font-black text-sm sm:text-base text-slate-800 flex items-center gap-1.5">
                     <Smile className="text-fun-purple shrink-0 w-4 h-4" /> MY STYLE
                  </h3>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${stats.themeColor || 'bg-fun-blue'} border-2 border-slate-200 shadow-sm flex items-center justify-center overflow-hidden shrink-0`}>
                     <img 
                       src={stats.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} 
                       alt="Avatar" 
                       className="w-full h-full object-cover"
                       referrerPolicy="no-referrer"
                     />
                  </div>
               </div>
               <p className="text-slate-500 font-bold text-[10px] sm:text-xs">Change color & avatar!</p>
               <button 
                 onClick={(e) => { e.stopPropagation(); navigate('/settings'); }}
                 className="mt-3 w-full py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-500 font-black text-[9px] sm:text-[10px] transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
               >
                 <Settings size={12} /> MANAGE ACCOUNT
               </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
