
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
import watchImage from '../src/assets/images/speak.png';
import reviewImage from '../src/assets/images/speak.png';
import challengeImage from '../src/assets/images/learn.png';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { stats, quests, mode, userId, isPremium, isAdmin, isVerifiedTeacher } = useGamification();
  
  const isKids = true; // Forced to kids mode

  const [activeCategory, setActiveCategory] = useState<'learn' | 'play' | 'speak' | 'community' | null>(null);
  const [showSocialSubView, setShowSocialSubView] = useState<boolean>(false);
  const [giftedFriends, setGiftedFriends] = useState<Record<string, boolean>>({});
  const [giftMessage, setGiftMessage] = useState<string | null>(null);

  const mockFriends = [
    { name: 'Sparky ⚡', xp: '2,450 XP', level: 'Lv.5', status: 'Online', seed: 'Sparky' },
    { name: 'Felix 🐱', xp: '1,980 XP', level: 'Lv.4', status: 'Online', seed: 'Felix' },
    { name: 'Luna 🌙', xp: '3,120 XP', level: 'Lv.7', status: 'In a Race', seed: 'Luna' }
  ];

  const handleSendGift = (friendName: string) => {
    setGiftedFriends(prev => ({ ...prev, [friendName]: true }));
    setGiftMessage(`Sent 15 XP Gift to ${friendName}! 🎁`);
    setTimeout(() => setGiftMessage(null), 3500);
  };

  // Helper to format username
  const displayName = userId ? userId.charAt(0).toUpperCase() + userId.slice(1) : `Hero ${stats.level}`;

  const pointsPerLevel = 500;
  const currentLevelPoints = stats.points % pointsPerLevel;
  const progressPercent = (currentLevelPoints / pointsPerLevel) * 100;

  const ImageFlowCard = ({ imageSrc, onClick, title }: any) => (
      <div 
         onClick={onClick} 
         className="relative w-full aspect-square rounded-[1.75rem] sm:rounded-[2.25rem] border-[4px] border-slate-100 overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group bg-slate-100 ring-4 ring-transparent hover:ring-fun-blue/20"
      >
          <img src={imageSrc} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={title} referrerPolicy="no-referrer" />
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
        {/* Daily Flow Section with the 4 parent categories */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] border-[3px] sm:border-4 border-slate-100 shadow-sm relative overflow-hidden">
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-4 sm:mb-6 flex items-center gap-2 uppercase tracking-tight">
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                <ImageFlowCard 
                    imageSrc={learnImage}
                    title="Learn"
                    onClick={() => {
                        setActiveCategory('learn');
                        setShowSocialSubView(false);
                    }}
                />
                <ImageFlowCard 
                    imageSrc={reviewImage}
                    title="Play"
                    onClick={() => {
                        setActiveCategory('play');
                        setShowSocialSubView(false);
                    }}
                />
                <ImageFlowCard 
                    imageSrc={speakImage}
                    title="Speak"
                    onClick={() => navigate('/pronunciation')}
                />
                <ImageFlowCard 
                    imageSrc={watchImage}
                    title="Watch"
                    onClick={() => navigate('/videos')}
                />
                <ImageFlowCard 
                    imageSrc={challengeImage}
                    title="Community"
                    onClick={() => {
                        setActiveCategory('community');
                        setShowSocialSubView(false);
                    }}
                />
            </div>
        </div>
      </div>

      {/* Modal Hub System */}
      <AnimatePresence>
        {activeCategory && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border-b-[8px] border-slate-200 max-w-md w-full p-5 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col gap-4"
            >
              {/* Close button */}
              <button 
                onClick={() => {
                  setActiveCategory(null);
                  setShowSocialSubView(false);
                }}
                className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer font-bold select-none text-sm z-20"
              >
                <X size={18} />
              </button>

              {/* Back button (Only shown in inner Subviews, e.g. Friends & Teams) */}
              {showSocialSubView && (
                <button 
                  onClick={() => setShowSocialSubView(false)}
                  className="absolute top-4 left-4 bg-slate-100 hover:bg-slate-250 py-1.5 px-3 rounded-xl flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-500 hover:text-slate-800 transition-all cursor-pointer z-20"
                >
                  <ArrowLeft size={12} /> Back
                </button>
              )}

              {/* Header Title inside popup */}
              <div className="text-center pt-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1 block">
                  {showSocialSubView ? 'Live Social' : `Category Hub`}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-800 uppercase tracking-tight leading-none">
                  {showSocialSubView ? 'Friends & Teams' : 
                   activeCategory === 'learn' ? "Let's Learn!" :
                   activeCategory === 'play' ? "Let's Play!" :
                   activeCategory === 'speak' ? "Speak & Listen!" : "Our Community!"}
                </h3>
              </div>

              {/* Sub-panel Content list based on choice */}
              <div className="mt-2 space-y-3">
                {/* 1. LEARN SUB OPTIONS */}
                {activeCategory === 'learn' && (
                  <div className="flex flex-col gap-3.5">
                    {/* Grammar Academy Button */}
                    <div 
                      onClick={() => { setActiveCategory(null); navigate('/grammar-lessons'); }}
                      className="p-4 sm:p-4.5 bg-slate-50 border-2 border-slate-100 hover:border-fun-purple hover:bg-fun-purple/5 hover:-translate-y-0.5 rounded-2xl cursor-pointer transition-all flex items-center gap-4 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-fun-purple/10 flex items-center justify-center text-fun-purple font-black shrink-0 transition-all group-hover:scale-110">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <h4 className="font-extrabold text-slate-800 text-sm sm:text-base leading-tight">Grammar Academy</h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 font-bold mt-0.5">Syllables, sentence guides & short stories.</p>
                      </div>
                      <ChevronRight className="text-slate-400 group-hover:text-fun-purple group-hover:translate-x-1 transition-all" size={18} />
                    </div>

                    {/* English Dictionary Button */}
                    <div 
                      onClick={() => { setActiveCategory(null); navigate('/wordbank'); }}
                      className="p-4 sm:p-4.5 bg-slate-50 border-2 border-slate-100 hover:border-fun-blue hover:bg-fun-blue/5 hover:-translate-y-0.5 rounded-2xl cursor-pointer transition-all flex items-center gap-4 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-fun-blue/10 flex items-center justify-center text-fun-blue font-black shrink-0 transition-all group-hover:scale-110">
                        <Wand2 className="w-5 h-5 animate-pulse" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <h4 className="font-extrabold text-slate-800 text-sm sm:text-base leading-tight">English Dictionary</h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 font-bold mt-0.5">Check and remember CEFR words.</p>
                      </div>
                      <ChevronRight className="text-slate-400 group-hover:text-fun-blue group-hover:translate-x-1 transition-all" size={18} />
                    </div>
                  </div>
                )}

                {/* 2. PLAY SUB OPTIONS */}
                {activeCategory === 'play' && (
                  <div className="flex flex-col gap-3.5">
                    {/* Word Rush Button */}
                    <div 
                      onClick={() => { setActiveCategory(null); navigate('/vocab'); }}
                      className="p-4 sm:p-4.5 bg-slate-50 border-2 border-slate-100 hover:border-fun-blue hover:bg-fun-blue/5 hover:-translate-y-0.5 rounded-2xl cursor-pointer transition-all flex items-center gap-4 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-fun-blue/10 flex items-center justify-center text-fun-blue font-black shrink-0 transition-all group-hover:scale-110">
                        <Zap className="w-5 h-5 text-fun-yellow fill-current" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <h4 className="font-extrabold text-slate-800 text-sm sm:text-base leading-tight">Word Rush</h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 font-bold mt-0.5">High speed CEFR matching countdown!</p>
                      </div>
                      <ChevronRight className="text-slate-400 group-hover:text-fun-blue group-hover:translate-x-1 transition-all" size={18} />
                    </div>

                    {/* Scramble Master Button */}
                    <div 
                      onClick={() => { setActiveCategory(null); navigate('/game/scramble'); }}
                      className="p-4 sm:p-4.5 bg-slate-50 border-2 border-slate-100 hover:border-fun-orange hover:bg-fun-orange/5 hover:-translate-y-0.5 rounded-2xl cursor-pointer transition-all flex items-center gap-4 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-fun-orange/10 flex items-center justify-center text-fun-orange font-black shrink-0 transition-all group-hover:scale-110">
                        <Brain className="w-5 h-5" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <h4 className="font-extrabold text-slate-800 text-sm sm:text-base leading-tight">Scramble Master</h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 font-bold mt-0.5">Tackle puzzles to arrange perfect sentences.</p>
                      </div>
                      <ChevronRight className="text-slate-400 group-hover:text-fun-orange group-hover:translate-x-1 transition-all" size={18} />
                    </div>
                  </div>
                )}

                {/* 3. SPEAK & LISTEN SUB OPTIONS */}
                {activeCategory === 'speak' && (
                  <div className="flex flex-col gap-3.5">
                    {/* Speaking Practice Button */}
                    <div 
                      onClick={() => { setActiveCategory(null); navigate('/pronunciation'); }}
                      className="p-4 sm:p-4.5 bg-slate-50 border-2 border-slate-100 hover:border-fun-green hover:bg-fun-green/5 hover:-translate-y-0.5 rounded-2xl cursor-pointer transition-all flex items-center gap-4 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-fun-green/10 flex items-center justify-center text-fun-green font-black shrink-0 transition-all group-hover:scale-110">
                        <Mic className="w-5 h-5 text-fun-green" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <h4 className="font-extrabold text-slate-800 text-sm sm:text-base leading-tight">Speaking Practice</h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 font-bold mt-0.5">Talk with voice characters, test pronunciation!</p>
                      </div>
                      <ChevronRight className="text-slate-400 group-hover:text-fun-green group-hover:translate-x-1 transition-all" size={18} />
                    </div>

                    {/* Watch Movie Clips Button */}
                    <div 
                      onClick={() => { setActiveCategory(null); navigate('/videos'); }}
                      className="p-4 sm:p-4.5 bg-slate-50 border-2 border-slate-100 hover:border-fun-pink hover:bg-fun-pink/5 hover:-translate-y-0.5 rounded-2xl cursor-pointer transition-all flex items-center gap-4 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-fun-pink/10 flex items-center justify-center text-fun-pink font-black shrink-0 transition-all group-hover:scale-110">
                        <MonitorPlay className="w-5 h-5" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <h4 className="font-extrabold text-slate-800 text-sm sm:text-base leading-tight">Watch Movie Clips</h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 font-bold mt-0.5">Learn English expressions from films.</p>
                      </div>
                      <ChevronRight className="text-slate-400 group-hover:text-fun-pink group-hover:translate-x-1 transition-all" size={18} />
                    </div>
                  </div>
                )}

                {/* 4. COMMUNITY SUB OPTIONS */}
                {activeCategory === 'community' && !showSocialSubView && (
                  <div className="flex flex-col gap-3">
                    {/* Badge Trading Post Button */}
                    <div 
                      onClick={() => { setActiveCategory(null); navigate('/trading'); }}
                      className="p-4 sm:p-4.5 bg-slate-50 border-2 border-slate-100 hover:border-fun-pink hover:bg-fun-pink/5 hover:-translate-y-0.5 rounded-2xl cursor-pointer transition-all flex items-center gap-4 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-fun-pink/10 flex items-center justify-center text-fun-pink font-black shrink-0 transition-all group-hover:scale-110">
                        <Award className="w-5 h-5 text-fun-pink fill-current" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <h4 className="font-extrabold text-slate-800 text-sm sm:text-base leading-tight">Badge Trading Post</h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 font-bold mt-0.5">Trade double badges for new rewards!</p>
                      </div>
                      <ChevronRight className="text-slate-400 group-hover:text-fun-pink group-hover:translate-x-1 transition-all" size={18} />
                    </div>

                    {/* Leaderboards Button */}
                    <div 
                      onClick={() => { setActiveCategory(null); navigate('/leaderboard'); }}
                      className="p-4 sm:p-4.5 bg-slate-50 border-2 border-slate-100 hover:border-fun-yellow hover:bg-fun-yellow/5 hover:-translate-y-0.5 rounded-2xl cursor-pointer transition-all flex items-center gap-4 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-fun-yellow/10 flex items-center justify-center text-fun-yellow font-black shrink-0 transition-all group-hover:scale-110">
                        <Flag className="w-5 h-5 text-amber-500" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <h4 className="font-extrabold text-slate-800 text-sm sm:text-base leading-tight">Leaderboards</h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 font-bold mt-0.5">Compare scores globally on weekly league ranks.</p>
                      </div>
                      <ChevronRight className="text-slate-400 group-hover:text-fun-yellow group-hover:translate-x-1 transition-all" size={18} />
                    </div>

                    {/* Friends and Teams Inner Toggle */}
                    <div 
                      onClick={() => setShowSocialSubView(true)}
                      className="p-4 sm:p-4.5 bg-slate-50 border-2 border-slate-100 hover:border-fun-blue hover:bg-fun-blue/5 hover:-translate-y-0.5 rounded-2xl cursor-pointer transition-all flex items-center gap-4 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-fun-blue/10 flex items-center justify-center text-fun-blue font-black shrink-0 transition-all group-hover:scale-110">
                        <Users className="w-5 h-5 text-fun-blue" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <h4 className="font-extrabold text-slate-800 text-sm sm:text-base leading-tight">Friends & Teams</h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 font-bold mt-0.5">Send gifts, check streaks, and join squads!</p>
                      </div>
                      <ChevronRight className="text-slate-400 group-hover:text-fun-blue group-hover:translate-x-1 transition-all" size={18} />
                    </div>
                  </div>
                )}

                {/* 4b. FRIENDS & TEAMS SOCIAL SUB-VIEW */}
                {activeCategory === 'community' && showSocialSubView && (
                  <div className="space-y-4 pt-1">
                    {giftMessage && (
                      <div className="p-3 bg-fun-green/10 text-fun-green border border-fun-green/20 rounded-xl text-center text-xs font-black animate-bounce animate-duration-100">
                        {giftMessage}
                      </div>
                    )}

                    {/* Team League Info */}
                    <div className="p-4 bg-gradient-to-r from-amber-500 to-fun-orange text-white rounded-2xl flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                        <Medal className="w-5 h-5 text-yellow-200 fill-current animate-wiggle" />
                      </div>
                      <div className="text-left min-w-0 flex-1">
                        <h5 className="font-black text-xs uppercase text-white/90">Super Squad Rank</h5>
                        <p className="font-extrabold text-sm leading-tight mt-0.5 text-white">#4 Gold League (23,450 XP cumulative)</p>
                      </div>
                    </div>

                    {/* Friends Card Lists */}
                    <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                      {mockFriends.map((f, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 border border-slate-150 rounded-xl flex items-center gap-3">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${f.seed}`} alt={f.name} className="w-9 h-9 rounded-full bg-slate-200 shrink-0" referrerPolicy="no-referrer" />
                          <div className="flex-1 text-left text-xs">
                            <h5 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5 leading-none">
                              {f.name}
                              {f.status === 'Online' ? (
                                <span className="w-2 h-2 rounded-full bg-fun-green inline-block animate-pulse" />
                              ) : (
                                <span className="text-[9px] font-black tracking-wide text-fun-purple animate-pulse inline-block">{f.status}</span>
                              )}
                            </h5>
                            <p className="text-slate-400 font-bold mt-0.5 truncate">{f.level} • {f.xp}</p>
                          </div>
                          
                          <button
                            disabled={!!giftedFriends[f.name]}
                            onClick={() => handleSendGift(f.name)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all flex items-center gap-1 ${
                              giftedFriends[f.name] 
                                ? 'bg-slate-200 text-slate-400 border border-slate-200 cursor-not-allowed'
                                : 'bg-fun-pink hover:bg-fun-pink/90 text-white shadow-sm border-b-2 border-pink-700 active:scale-95'
                            }`}
                          >
                            {giftedFriends[f.name] ? 'Gift Sent' : 'Gift 🎁'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
