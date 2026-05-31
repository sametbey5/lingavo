
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageCircle, BookOpen, PenTool, Trophy, Gamepad2, Briefcase, Zap, Sword, Brain, MonitorPlay, BarChart3, Settings, Mic, Crown, Store, ArrowRightLeft, LogOut, User, ShieldCheck, HelpCircle, Globe, ChevronDown, GraduationCap, Volume2, Bell, Flag } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';
import { SUPPORTED_LANGUAGES } from '../constants';

import UserRoleBadge from './UserRoleBadge';

const Sidebar: React.FC = () => {
  const { userId, logout, isAdmin, setIsContactOpen, preferredLanguage, updateProfile, stats, isPremium, wordBank } = useGamification();
  const isKids = true; // Forced to kids mode
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const dueCount = wordBank.filter(w => w.nextReviewAt.split('T')[0] <= today).length;

  const navItems: { name: React.ReactNode; path: string; icon: React.ReactNode; color: string; badge?: number }[] = [
    { name: 'Arcade Home', path: '/', icon: <LayoutDashboard size={24} />, color: 'text-fun-blue' },
    { name: 'Movie Clips', path: '/videos', icon: <MonitorPlay size={24} />, color: 'text-[#00F798]' },
    { name: 'News', path: '/notifications', icon: <Bell size={24} />, color: 'text-fun-orange' },
    { name: 'Dictionary', path: '/wordbank', icon: <BookOpen size={24} />, color: 'text-fun-pink' },
    { name: 'Speak Clear', path: '/pronunciation', icon: <Mic size={24} />, color: 'text-fun-blue' },
    { name: 'Word Rush', path: '/vocab', icon: <Zap size={24} />, color: 'text-fun-yellow' },
    { name: 'Grammar Coach', path: '/grammar', icon: <GraduationCap size={24} />, color: 'text-fun-purple' },
    { name: 'Scramble', path: '/game/scramble', icon: <Brain size={24} />, color: 'text-fun-purple' },
    { name: 'Trading Post', path: '/trading', icon: <Store size={24} />, color: 'text-teal-500' },
    { name: 'Leaderboard', path: '/leaderboard', icon: <Trophy size={24} />, color: 'text-fun-green' },
  ];

  const handleLanguageChange = (langName: string) => {
    updateProfile({ preferredLanguage: langName });
    
    // Trigger google translate
    let code = 'en';
    if (langName !== 'English') {
      const match = SUPPORTED_LANGUAGES.find(l => l.name === langName);
      if (match) code = match.code;
    }

    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event('change'));
    }

    setIsLangMenuOpen(false);
  };

  // Original Fun Sidebar for Kids
  return (
    <div className={`w-72 bg-white hidden md:flex flex-col h-screen fixed left-0 top-0 z-10 border-r-4 border-slate-100 shadow-lg rounded-r-[3rem]`}>
      <div className="p-8 flex items-center justify-center">
        <img 
          src="https://i.ibb.co/TMMP1KYB/smart.png" 
          alt="Lingavo Logo" 
          className="h-12 w-auto object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-4 transition-all duration-200 group text-lg font-black rounded-3xl border-2 ${
                isActive ? 'bg-blue-50 text-fun-blue border-fun-blue shadow-sm' : 'text-slate-400 border-transparent hover:bg-slate-50 hover:scale-105'
              }`
            }
          >
            <span className={`mr-4 ${item.color}`}>
              {item.icon}
            </span>
            {item.name}
            {item.badge && (
              <span className="ml-auto bg-fun-pink text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
        
        <button
            onClick={() => setIsContactOpen(true)}
            className={`w-full flex items-center px-6 py-4 transition-all duration-200 group text-lg font-black rounded-3xl border-4 border-transparent text-slate-400 hover:bg-slate-50 hover:text-slate-500 hover:scale-105`}
          >
            <span className="mr-4">
              <HelpCircle size={24} />
            </span>
            ASK FOR HELP
        </button>

        <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center px-6 py-4 transition-all duration-200 group text-lg font-black rounded-3xl border-4 ${
                isActive 
                  ? 'bg-slate-50 text-slate-800 border-slate-200 shadow-sm' 
                  : 'text-slate-400 border-transparent hover:bg-slate-50 hover:text-slate-500 hover:scale-105'
              }`
            }
          >
            <span className="mr-4">
              <Settings size={24} />
            </span>
            SETTINGS
        </NavLink>

        {isAdmin && (
           <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center px-6 py-4 transition-all duration-200 group text-lg font-black rounded-3xl border-4 ${
                  isActive 
                    ? 'bg-red-50 text-red-500 border-red-400 shadow-sm' 
                    : 'text-red-400 border-red-200 bg-red-50/50 hover:bg-red-100 hover:scale-105'
                }`
              }
            >
              <span className="mr-4">
                <ShieldCheck size={24} />
              </span>
              ADMIN ZONE
          </NavLink>
        )}

      </nav>

      <div className="p-8 border-t-4 border-slate-50 space-y-4">
        {/* Language Switcher */}
        <div className="relative">
          <button 
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="w-full flex items-center justify-between px-6 py-3 rounded-3xl bg-slate-50 border-2 border-slate-200 text-slate-500 font-black text-xs hover:bg-slate-100 transition-all"
          >
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-fun-blue" />
              <span>{preferredLanguage || 'Turkish'}</span>
            </div>
            <ChevronDown size={16} className={`transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isLangMenuOpen && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-white border-4 border-slate-100 rounded-[2rem] shadow-2xl overflow-hidden z-50 max-h-48 overflow-y-auto">
              {SUPPORTED_LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.name)}
                  className="w-full px-6 py-3 text-left text-sm font-black text-slate-500 hover:bg-blue-50 hover:text-fun-blue flex items-center gap-3 transition-colors"
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-4">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden relative">
                 <img 
                   src={stats.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} 
                   alt="User" 
                   className="w-full h-full object-cover"
                   referrerPolicy="no-referrer"
                 />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-black text-slate-400 text-xs truncate max-w-[100px]">{userId}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {isAdmin && <UserRoleBadge role="admin" size="sm" showText={true} />}
                  {isPremium && <UserRoleBadge role="premium" size="sm" showText={true} />}
                </div>
              </div>
           </div>
           <button onClick={logout} className="text-slate-400 hover:text-red-400 font-bold text-xs flex items-center gap-1 transition-colors">
              <LogOut size={14} /> Logout
           </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
