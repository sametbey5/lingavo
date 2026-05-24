import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Star, Flame, Zap, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';
import ProgressTracker from '../components/ProgressTracker';

const YourProgress: React.FC = () => {
  const navigate = useNavigate();
  const { stats, quests = [] } = useGamification();
  const [showQuests, setShowQuests] = useState(false);

  const pointsPerLevel = 500;
  const points = stats?.points ?? 0;
  const level = stats?.level ?? 1;
  const streakDays = stats?.streakDays ?? 0;

  const currentLevelPoints = points % pointsPerLevel;
  const progressPercent = Math.min((currentLevelPoints / pointsPerLevel) * 100, 100);

  const completedQuests = (quests || []).filter(q => q && q.isCompleted);
  const activeQuests = (quests || []).filter(q => q && !q.isCompleted);

  return (
    <div className="space-y-3 sm:space-y-4 animate-fade-in pb-4 p-3 sm:p-4 max-w-xl mx-auto">
      {/* Compact Header: Nav + Small Title */}
      <header className="flex items-center justify-between bg-white rounded-2xl border-2 border-slate-100 p-2 sm:p-3 shadow-sm">
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 bg-slate-100 hover:bg-slate-205 rounded-xl transition-all text-slate-500 shrink-0"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="flex items-center gap-1.5 min-w-0">
            <Target className="text-fun-blue w-5 h-5 shrink-0" />
            <h1 className="text-sm sm:text-base font-black text-slate-800 uppercase tracking-tight truncate">Your Progress</h1>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-fun-blue/10 px-2.5 py-0.5 rounded-lg border border-fun-blue/20 shrink-0">
          <span className="text-[10px] font-black text-fun-blue uppercase tracking-wide">Level {level}</span>
        </div>
      </header>

      {/* Unified Compact Stats & XP Progress Card */}
      <div className="bg-white rounded-2xl border-2 border-slate-100 p-3 shadow-sm space-y-3">
        {/* XP Level progress bar */}
        <div>
          <div className="flex justify-between items-center text-[9px] font-black text-slate-500 uppercase tracking-wider mb-1">
            <span>Global XP Progress</span>
            <span className="text-fun-blue">{currentLevelPoints} / {pointsPerLevel} XP</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden p-[1px] shadow-inner">
            <div
              className="h-full bg-fun-blue rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5">
              <Star className="text-fun-yellow fill-current w-5 h-5" />
              <span className="text-base sm:text-lg font-black text-slate-800 leading-none">{points}</span>
            </div>
            <span className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-wider mt-1">Total XP</span>
          </div>

          <div className="flex flex-col items-center justify-center border-l border-slate-100">
            <div className="flex items-center gap-1.5">
              <Flame className="text-orange-500 fill-current w-5 h-5 animate-pulse" />
              <span className="text-base sm:text-lg font-black text-slate-800 leading-none">{streakDays}d</span>
            </div>
            <span className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-wider mt-1">Streak</span>
          </div>
        </div>
      </div>

      {/* Progress Tracker Grid of 4 Skills with custom background images */}
      <ProgressTracker hideHeader={true} />
    </div>
  );
};

export default YourProgress;
