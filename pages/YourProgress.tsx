import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Star, Flame, Zap, CheckCircle2 } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';

const YourProgress: React.FC = () => {
  const navigate = useNavigate();
  const { stats, quests } = useGamification();

  const pointsPerLevel = 500;
  const currentLevelPoints = stats.points % pointsPerLevel;
  const progressPercent = Math.min((currentLevelPoints / pointsPerLevel) * 100, 100);

  const completedQuests = quests.filter(q => q.isCompleted);
  const activeQuests = quests.filter(q => !q.isCompleted);

  return (
    <div className="space-y-4 animate-fade-in pb-10 p-4">
      {/* Header */}
      <header className="flex items-center gap-3 bg-white rounded-2xl border-2 border-slate-100 p-4 shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all text-slate-500 shrink-0"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          <Target className="text-fun-blue w-6 h-6" />
          <h1 className="text-xl font-black text-slate-800 uppercase tracking-tight">Your Progress</h1>
        </div>
      </header>

      {/* Level & XP card */}
      <div className="bg-white rounded-2xl border-2 border-slate-100 p-4 shadow-sm">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Level</p>
        <div className="flex items-end gap-2 mb-3">
          <span className="text-4xl font-black text-slate-800 leading-none">{stats.level}</span>
          <span className="text-slate-400 font-bold text-sm mb-1">/ Next level in {pointsPerLevel - currentLevelPoints} XP</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-fun-blue rounded-full transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-[10px] font-bold text-slate-400">
          <span>{currentLevelPoints} XP</span>
          <span>{pointsPerLevel} XP</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-yellow-50 border-2 border-yellow-100 rounded-2xl p-3 flex flex-col items-center gap-1">
          <Star className="text-fun-yellow fill-current w-5 h-5" />
          <span className="text-xl font-black text-slate-800 leading-none">{stats.points}</span>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide">Total XP</span>
        </div>
        <div className="bg-orange-50 border-2 border-orange-100 rounded-2xl p-3 flex flex-col items-center gap-1">
          <Flame className="text-orange-500 fill-current w-5 h-5" />
          <span className="text-xl font-black text-slate-800 leading-none">{stats.streakDays}</span>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide">Day Streak</span>
        </div>
        <div className="bg-green-50 border-2 border-green-100 rounded-2xl p-3 flex flex-col items-center gap-1">
          <CheckCircle2 className="text-fun-green w-5 h-5" />
          <span className="text-xl font-black text-slate-800 leading-none">{completedQuests.length}</span>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide">Quests Done</span>
        </div>
      </div>

      {/* Progress Tracker component */}

      {/* Active Quests */}
      {activeQuests.length > 0 && (
        <div className="bg-white rounded-2xl border-2 border-slate-100 p-4 shadow-sm">
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">
            ⚡ Active Quests
          </h2>
          <div className="space-y-2">
            {activeQuests.map(quest => (
              <div key={quest.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <Zap className="text-fun-yellow w-4 h-4 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm text-slate-800 leading-tight truncate">{quest.title}</p>
                  <p className="text-[10px] font-bold text-slate-400 truncate">{quest.description}</p>
                </div>
                <span className="px-2 py-0.5 bg-fun-blue/10 text-fun-blue font-black text-[10px] rounded-lg shrink-0">
                  +{quest.xpReward} XP
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Quests */}
      {completedQuests.length > 0 && (
        <div className="bg-white rounded-2xl border-2 border-slate-100 p-4 shadow-sm">
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">
            ✅ Completed Quests
          </h2>
          <div className="space-y-2">
            {completedQuests.map(quest => (
              <div key={quest.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 opacity-60">
                <CheckCircle2 className="text-fun-green w-4 h-4 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm text-slate-500 line-through leading-tight truncate">{quest.title}</p>
                </div>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-400 font-black text-[10px] rounded-lg shrink-0">
                  +{quest.xpReward} XP
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default YourProgress;
