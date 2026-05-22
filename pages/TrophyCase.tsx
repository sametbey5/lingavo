import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, ArrowLeft } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';
import { BadgeDisplayKids } from '../components/BadgeDisplay';

const TrophyCase: React.FC = () => {
  const navigate = useNavigate();
  const { badges } = useGamification();

  const earned = badges.filter(b => b.earnedAt);
  const byCategory = earned.reduce<Record<string, typeof badges>>((acc, badge) => {
    const cat = badge.category ?? 'general';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(badge);
    return acc;
  }, {});

  const categoryLabels: Record<string, string> = {
    chat: '💬 Chat',
    vocab: '📖 Vocabulary',
    grammar: '✏️ Grammar',
    general: '⭐ General',
    rare: '💎 Rare',
  };

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
          <Award className="text-fun-yellow fill-current w-6 h-6" />
          <h1 className="text-xl font-black text-slate-800 uppercase tracking-tight">Trophy Case</h1>
        </div>
        <span className="ml-auto px-2.5 py-1 bg-yellow-100 text-yellow-700 font-black text-xs rounded-xl">
          {earned.length} earned
        </span>
      </header>

      {/* Empty state */}
      {earned.length === 0 && (
        <div className="bg-white rounded-2xl border-2 border-slate-100 p-8 text-center shadow-sm">
          <div className="text-4xl mb-3">🏆</div>
          <p className="font-black text-slate-600 text-sm">No badges yet!</p>
          <p className="text-slate-400 font-bold text-xs mt-1">Play games and complete quests to earn badges.</p>
        </div>
      )}

      {/* Badges by category */}
      {Object.entries(byCategory).map(([cat, catBadges]) => (
        <div key={cat} className="bg-white rounded-2xl border-2 border-slate-100 p-4 shadow-sm">
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">
            {categoryLabels[cat] ?? cat}
          </h2>
          <div className="flex flex-wrap gap-3">
            {catBadges.map((badge, i) => (
              <BadgeDisplayKids key={`${badge.id}_${i}`} badge={badge} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrophyCase;
