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
        <div className="grid grid-cols-3 gap-1 border-t border-slate-100 pt-2.5">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <Star className="text-fun-yellow fill-current w-3.5 h-3.5" />
              <span className="text-xs sm:text-sm font-black text-slate-800 leading-none">{points}</span>
            </div>
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider mt-0.5">Total XP</span>
          </div>

          <div className="flex flex-col items-center border-x border-slate-100">
            <div className="flex items-center gap-1">
              <Flame className="text-orange-500 fill-current w-3.5 h-3.5" />
              <span className="text-xs sm:text-sm font-black text-slate-800 leading-none">{streakDays}d</span>
            </div>
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider mt-0.5">Streak</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="text-fun-green w-3.5 h-3.5" />
              <span className="text-xs sm:text-sm font-black text-slate-800 leading-none">{completedQuests.length}</span>
            </div>
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider mt-0.5">Completed</span>
          </div>
        </div>
      </div>

      {/* Progress Tracker Grid of 4 Skills with custom background images */}
      <ProgressTracker hideHeader={true} />

      {/* Accordion Toggle for Quests */}
      <div className="bg-white rounded-2xl border-2 border-slate-100 overflow-hidden shadow-sm">
        <button
          onClick={() => setShowQuests(!showQuests)}
          className="w-full px-4 py-2.5 sm:py-3 flex items-center justify-between text-slate-600 hover:text-slate-800 transition-colors bg-slate-50/50"
        >
          <div className="flex items-center gap-1.5">
            <Zap className="text-fun-yellow w-4 h-4 fill-current" />
            <span className="text-xs font-black uppercase tracking-wider">
              Quests & Challenges ({activeQuests.length + completedQuests.length})
            </span>
          </div>
          {showQuests ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showQuests && (
          <div className="p-3 border-t-2 border-slate-100 space-y-4 max-h-48 overflow-y-auto animate-fade-in">
            {/* Active Quests */}
            {activeQuests.length > 0 && (
              <div className="space-y-1.5">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  ⚡ Active
                </h3>
                <div className="space-y-1.5">
                  {activeQuests.map(quest => (
                    <div key={quest.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                      <Zap className="text-fun-yellow w-3.5 h-3.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-xs text-slate-800 leading-tight truncate">{quest.title}</p>
                        <p className="text-[9px] font-bold text-slate-400 truncate">{quest.description}</p>
                      </div>
                      <span className="px-1.5 py-0.5 bg-fun-blue/10 text-fun-blue font-black text-[9px] rounded-lg shrink-0">
                        +{quest.xpReward} XP
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Quests */}
            {completedQuests.length > 0 && (
              <div className="space-y-1.5">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  ✅ Completed
                </h3>
                <div className="space-y-1.5">
                  {completedQuests.map(quest => (
                    <div key={quest.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100 opacity-60">
                      <CheckCircle2 className="text-fun-green w-3.5 h-3.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-xs text-slate-500 line-through leading-tight truncate">{quest.title}</p>
                      </div>
                      <span className="px-1.5 py-0.5 bg-slate-100 text-slate-400 font-black text-[9px] rounded-lg shrink-0">
                        +{quest.xpReward} XP
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeQuests.length === 0 && completedQuests.length === 0 && (
              <p className="text-center text-xs text-slate-400 py-3 font-bold">No quests available today.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default YourProgress;
