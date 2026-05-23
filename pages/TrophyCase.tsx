import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, ArrowLeft, Wand2 } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';
import { BadgeDisplayKids } from '../components/BadgeDisplay';
import MysteryBox from '../components/MysteryBox';
import { ALL_BADGES } from '../constants/badges';

const TrophyCase: React.FC = () => {
  const navigate = useNavigate();
  const { badges, awardPoints, grantBadge } = useGamification();
  const [showMysteryBox, setShowMysteryBox] = useState(false);
  const [isBoxClaimed, setIsBoxClaimed] = useState(false);

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

  return (
    <div className="space-y-4 animate-fade-in pb-10 p-4">
      {showMysteryBox && (
        <MysteryBox 
          onClose={() => setShowMysteryBox(false)} 
          onRewardClaimed={handleRewardClaimed}
          availableBadges={ALL_BADGES}
        />
      )}
      
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

      {/* Daily Loot */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-5 sm:p-6 rounded-2xl text-center shadow-md relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
         <h3 className="text-white font-black text-lg sm:text-lg mb-4 flex items-center justify-center gap-2 uppercase tracking-wide">
            <Wand2 className="text-fun-pink w-5 h-5" /> Daily Loot
         </h3>
         
         <div 
           onClick={() => !isBoxClaimed && setShowMysteryBox(true)}
           className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto flex items-center justify-center text-3xl sm:text-4xl cursor-pointer transition-all ${!isBoxClaimed ? 'hover:scale-110 active:scale-95 animate-float' : 'opacity-50 grayscale'}`}
         >
            {isBoxClaimed ? '✨' : '🎁'}
         </div>
         
         <p className="text-white font-bold text-xs sm:text-sm mt-3">
            {isBoxClaimed ? 'Come back tomorrow!' : 'Win XP or Rare Badges!'}
         </p>
         
         {!isBoxClaimed && (
           <button onClick={() => setShowMysteryBox(true)} className="bg-fun-pink text-white px-6 py-2 rounded-xl font-black text-xs sm:text-sm shadow-md border-b-2 border-pink-800 hover:bg-pink-500 mt-4 uppercase tracking-widest">
              Open Box
           </button>
         )}
      </div>

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
