
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import VocabBuilder from './pages/VocabBuilder';
import GrammarCoach from './pages/GrammarCoach';
import ScrambleMaster from './pages/ScrambleMaster';
import GrammarLessons from './pages/GrammarLessons';
import Leaderboard from './pages/Leaderboard';
import VideoLearning from './pages/VideoLearning';
import GrammarGalaxy from './pages/GrammarGalaxy';
import BossBattle from './pages/BossBattle';
import SpeedRacer from './pages/SpeedRacer';
import WordWhack from './pages/WordWhack';
import BadgeTrading from './pages/BadgeTrading';
import AdminPanel from './pages/AdminPanel';
import UserProfileView from './pages/UserProfileView';
import AccountSettings from './pages/AccountSettings';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import StoryMode from './pages/StoryMode';
import PronunciationPractice from './pages/PronunciationPractice';
import Notifications from './pages/Notifications';
import RaceMode from './pages/RaceMode';
import Teachers from './pages/Teachers';
import TeacherPanel from './pages/TeacherPanel';
import WordBank from './pages/WordBank';
import MyStyle from './pages/MyStyle';
import TrophyCase from './pages/TrophyCase';
import YourProgress from './pages/YourProgress';
import { GamificationProvider, useGamification } from './context/GamificationContext';

// Auth Wrapper Component
const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userId, focusArea, isLoading } = useGamification();
  
  if (isLoading) {
    return null;
  }

  if (!userId) {
    return <Login />;
  }
  
  // If user hasn't completed onboarding (no focus area selected), redirect them
  if (!focusArea || focusArea.length === 0) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <Layout>{children}</Layout>;
};

const AppRoutes: React.FC = () => {
  const { userId } = useGamification();

  return (
    <Routes>
      <Route path="/onboarding" element={userId ? <Onboarding /> : <Login />} />
      <Route path="/story" element={<AuthWrapper><StoryMode /></AuthWrapper>} />
      <Route path="/" element={<AuthWrapper><Dashboard /></AuthWrapper>} />
      <Route path="/pronunciation" element={<AuthWrapper><PronunciationPractice /></AuthWrapper>} />
      <Route path="/vocab" element={<AuthWrapper><VocabBuilder /></AuthWrapper>} />
      <Route path="/wordbank" element={<AuthWrapper><WordBank /></AuthWrapper>} />
      <Route path="/grammar" element={<AuthWrapper><GrammarCoach /></AuthWrapper>} />
      <Route path="/grammar-lessons" element={<AuthWrapper><GrammarLessons /></AuthWrapper>} />
      <Route path="/game/scramble" element={<AuthWrapper><ScrambleMaster /></AuthWrapper>} />
      <Route path="/videos" element={<AuthWrapper><VideoLearning /></AuthWrapper>} />
      <Route path="/leaderboard" element={<AuthWrapper><Leaderboard /></AuthWrapper>} />
      <Route path="/profile/:userId" element={<AuthWrapper><UserProfileView /></AuthWrapper>} />
      <Route path="/trading" element={<AuthWrapper><BadgeTrading /></AuthWrapper>} />
      <Route path="/settings" element={<AuthWrapper><AccountSettings /></AuthWrapper>} />
      <Route path="/notifications" element={<AuthWrapper><Notifications /></AuthWrapper>} />
      <Route path="/admin" element={<AuthWrapper><AdminPanel /></AuthWrapper>} />
      <Route path="/teachers" element={<AuthWrapper><Teachers /></AuthWrapper>} />
      <Route path="/teacher-panel" element={<AuthWrapper><TeacherPanel /></AuthWrapper>} />
      
      {/* Game Routes */}
      <Route path="/game/galaxy" element={<AuthWrapper><GrammarGalaxy /></AuthWrapper>} />
      <Route path="/game/boss" element={<AuthWrapper><BossBattle /></AuthWrapper>} />
      <Route path="/game/racer" element={<AuthWrapper><SpeedRacer /></AuthWrapper>} />
      <Route path="/game/whack" element={<AuthWrapper><WordWhack /></AuthWrapper>} />
      <Route path="/race" element={<AuthWrapper><RaceMode /></AuthWrapper>} />
      <Route path="/my-style" element={<AuthWrapper><MyStyle /></AuthWrapper>} />
      <Route path="/trophy-case" element={<AuthWrapper><TrophyCase /></AuthWrapper>} />
      <Route path="/your-progress" element={<AuthWrapper><YourProgress /></AuthWrapper>} />
    </Routes>
  );
};

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const playClickSound = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.08);
    
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.09);
  } catch (error) {
    // Ignore autoplay restriction errors gracefully
  }
};

const App: React.FC = () => {
  React.useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target) return;
      
      const isClickable = target.closest('button') || 
                          target.closest('a') || 
                          target.closest('[role="button"]') ||
                          target.closest('.cursor-pointer') ||
                          (target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'submit') ||
                          (target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'button');
                          
      if (isClickable) {
        playClickSound();
      }
    };
    
    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, []);

  return (
    <GamificationProvider>
      <Router>
        <ScrollToTop />
        <AppRoutes />
      </Router>
    </GamificationProvider>
  );
};

export default App;
