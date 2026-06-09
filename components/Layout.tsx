
import React, { ReactNode, useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard, MessageCircle, BookOpen, PenTool, Trophy, Gamepad2, Briefcase, MonitorPlay, Crown, Store, ArrowRightLeft, LogOut, User, HelpCircle, Globe, ChevronDown, Bell, Flag, ShieldCheck, Zap, Gift, Award, Sparkles, Star, Mic, Target, Home } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';
import ContactModal from './ContactModal';
import { SUPPORTED_LANGUAGES } from '../constants';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { mode, userId, logout, setIsContactOpen, preferredLanguage, updateProfile, isAdmin, notification, showLevelUp, stats, closeLevelUp } = useGamification();
  const isKids = mode === 'kids';

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Inject Google Translate only if not present
    if (!document.getElementById('google-translate-script')) {
      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: 'en', autoDisplay: false },
          'google_translate_element'
        );
      };
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    }
  }, []);

  const triggerGoogleTranslate = (langName: string) => {
    // English is 'en', otherwise find the matching code
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
  };

  const handleLanguageChange = async (lang: string) => {
    await updateProfile({ preferredLanguage: lang });
    triggerGoogleTranslate(lang);
    setIsLangMenuOpen(false);
  };


  const navItems = [
    { name: isKids ? 'My Dashboard' : 'Dashboard', path: '/', icon: <LayoutDashboard size={24} />, color: isKids ? 'text-fun-blue' : 'text-slate-600' },
    { name: 'Movie Clips', path: '/videos', icon: <MonitorPlay size={24} />, color: 'text-[#00F798]' },
    { name: isKids ? 'News' : 'Notifications', path: '/notifications', icon: <Bell size={24} />, color: isKids ? 'text-fun-orange' : 'text-slate-600' },
    { name: 'Dictionary', path: '/wordbank', icon: <BookOpen size={24} />, color: isKids ? 'text-fun-pink' : 'text-slate-600' },
    { name: isKids ? 'Live Race' : 'Competitive Race', path: '/race', icon: <Flag size={24} />, color: 'text-red-500' },
    { name: isKids ? 'Word Cards' : 'Vocabulary', path: '/vocab', icon: <BookOpen size={24} />, color: isKids ? 'text-fun-green' : 'text-slate-600' },
    { name: isKids ? 'Word Fixer' : 'Grammar', path: isKids ? '/grammar' : '/grammar-lessons', icon: <PenTool size={24} />, color: isKids ? 'text-fun-purple' : 'text-slate-600' },
    { name: isKids ? 'Trading Post' : 'Exchange', path: '/trading', icon: isKids ? <Store size={24} /> : <ArrowRightLeft size={24} />, color: isKids ? 'text-teal-500' : 'text-slate-600' },
    { name: isKids ? 'Winners' : 'Leaderboard', path: '/leaderboard', icon: <Trophy size={24} />, color: isKids ? 'text-fun-yellow' : 'text-slate-600' },
    { name: isKids ? 'Super Pass' : 'Premium', path: '/premium', icon: <Crown size={24} />, color: isKids ? 'text-amber-500' : 'text-amber-600' },
  ];

  if (isAdmin) {
    navItems.push({ name: 'Admin Zone', path: '/admin', icon: <ShieldCheck size={24} />, color: 'text-red-600' });
  }

  return (
    <div className={`h-[100dvh] overflow-hidden flex flex-col ${isKids ? 'font-sans bg-white' : 'font-adult bg-slate-50 text-slate-900'}`}>
      <div id="google_translate_element" className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden"></div>
      <style>
        {isKids ? `
          body {
            background-image: radial-gradient(#e0f7fa 2px, transparent 2px);
            background-size: 30px 30px;
            background-color: #ffffff;
            top: 0 !important;
          }
          .goog-te-banner-frame { display: none !important; }
          .skiptranslate { display: none !important; }
        ` : `
          body {
            background-image: none;
            background-color: #f8fafc;
            top: 0 !important;
          }
          .goog-te-banner-frame { display: none !important; }
          .skiptranslate { display: none !important; }
        `}
      </style>
      <ContactModal />
      
      {/* Mobile Header */}
      <div className={`px-4 py-3 flex items-center justify-between sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.03)]`}>
        <div className="flex items-center gap-3">
            <img 
              src="https://i.ibb.co/TMMP1KYB/smart.png" 
              alt="Lingavo Logo" 
              className="h-8 w-auto object-contain drop-shadow-sm"
              referrerPolicy="no-referrer"
            />
        </div>
        
        <div className="flex-1 px-2 flex justify-center flex-col items-center overflow-hidden relative min-h-[40px]">
           {notification && (
              <div className="absolute inset-0 flex items-center justify-center animate-fade-in z-50">
                 <div className={`text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/20 whitespace-nowrap overflow-hidden bg-slate-800/90 backdrop-blur-md`}>
                    {notification.type === 'xp' && <Zap className="text-yellow-400 fill-current shrink-0" size={12} />}
                    {notification.type === 'reward' && <Gift className="text-fun-pink fill-current shrink-0" size={12} />}
                    {notification.type === 'badge' && <Award className="text-fun-green fill-current shrink-0" size={12} />}
                    {notification.type === 'trade' && <ArrowRightLeft className="text-fun-blue fill-current shrink-0" size={12} />}
                    <span className="font-bold text-[10px] tracking-wide truncate max-w-[120px]">{notification.text}</span>
                 </div>
              </div>
           )}
           
           {showLevelUp && !notification && (
              <div className="absolute inset-0 flex items-center justify-center animate-bounce-slow z-50">
                 <div onClick={closeLevelUp} className="bg-gradient-to-r from-fun-blue to-cyan-400 text-white px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/20 cursor-pointer hover:scale-105 transition-transform">
                    <Star className="text-fun-yellow fill-current animate-pulse shrink-0" size={14} />
                    <span className="font-black text-[10px] tracking-wider whitespace-nowrap">LEVEL {stats.level}!</span>
                 </div>
              </div>
           )}
        </div>
        
        <div className="flex items-center gap-1.5 ml-auto">
            {/* Language Switch */}
            <button 
              onClick={() => handleLanguageChange(preferredLanguage === 'English' ? 'Turkish' : 'English')}
              className={`p-2 rounded-2xl transition-all shadow-sm flex items-center justify-center ${preferredLanguage !== 'English' && preferredLanguage ? 'bg-blue-50 text-fun-blue border border-blue-100' : 'text-slate-400 bg-white border border-slate-100 hover:bg-slate-50'}`}
              title="Translate"
            >
              <Globe size={18} />
            </button>

            {/* Notifications */}
            <NavLink 
                to="/notifications"
                className="p-2 text-fun-orange bg-white border border-slate-100 hover:bg-orange-50 hover:border-orange-100 rounded-2xl transition-all shadow-sm relative"
            >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-fun-orange rounded-full border border-white animate-pulse" />
            </NavLink>
        </div>
      </div>

      {/* Main Content Area */}
      <main className={`${location.pathname === '/videos' ? 'p-0 pb-0' : 'p-3 pb-24'} w-full flex-1 min-h-0 overflow-y-auto`}>
        {children}
      </main>

      {/* Floating Bottom Navigation */}
      {location.pathname !== '/videos' && (
      <div className="fixed bottom-3 left-3 right-3 z-[60]">
         <div className="bg-white/95 backdrop-blur-xl border border-slate-200/50 p-1.5 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center justify-between">
             {[
                { id: 'home', icon: Home, label: 'Home', path: '/' },
                { id: 'lessons', icon: BookOpen, label: 'Grammar', path: '/grammar-lessons' },
                { id: 'movies', icon: MonitorPlay, label: 'Movies', path: '/videos' },
                { id: 'speaking', icon: Mic, label: 'Speak', path: '/pronunciation' },
                { id: 'quests', icon: Target, label: 'Progress', path: '/your-progress' },
                { id: 'profile', icon: User, label: 'Profile', path: '/my-style' },
             ].map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                const Icon = item.icon;
                return (
                   <button
                      key={item.id}
                      onClick={() => {
                         if (location.pathname !== item.path) navigate(item.path);
                      }}
                      className={`flex flex-col items-center justify-center w-12 h-12 rounded-[1rem] relative transition-all duration-300 ${isActive ? 'text-fun-blue scale-105' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                   >
                      {isActive && (
                         <div className="absolute inset-0 bg-fun-blue/10 rounded-[1rem] -z-10" />
                      )}
                      <Icon size={isActive ? 22 : 20} className={isActive ? 'fill-fun-blue/20' : ''} />
                      <span className={`text-[9px] font-bold mt-0.5 ${isActive ? 'text-fun-blue' : 'text-slate-400'}`}>{item.label}</span>
                   </button>
                )
             })}
         </div>
      </div>
      )}
    </div>
  );
};

export default Layout;
