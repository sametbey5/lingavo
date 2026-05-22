import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Smile, Settings } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';

const THEME_COLORS = [
  'bg-fun-blue', 'bg-fun-green', 'bg-fun-yellow', 'bg-fun-orange', 'bg-fun-pink', 'bg-fun-purple',
  'bg-fun-red', 'bg-fun-teal', 'bg-fun-indigo', 'bg-fun-lime', 'bg-fun-amber',
  'bg-slate-800', 'bg-emerald-500', 'bg-rose-500', 'bg-violet-600',
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

const MyStyle: React.FC = () => {
  const navigate = useNavigate();
  const { stats, setThemeColor, setAvatar } = useGamification();
  const [tab, setTab] = useState<'avatar' | 'color'>('avatar');

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
          <Smile className="text-fun-purple w-6 h-6" />
          <h1 className="text-xl font-black text-slate-800 uppercase tracking-tight">My Style</h1>
        </div>
        {/* Current avatar preview */}
        <div className={`ml-auto w-10 h-10 rounded-xl ${stats.themeColor || 'bg-fun-blue'} border-2 border-slate-200 overflow-hidden shrink-0`}>
          <img
            src={stats.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'}
            alt="Current avatar"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </header>

      {/* Tab switcher */}
      <div className="flex gap-2 bg-white rounded-2xl border-2 border-slate-100 p-1.5 shadow-sm">
        <button
          onClick={() => setTab('avatar')}
          className={`flex-1 py-2.5 rounded-xl font-black text-sm transition-all ${tab === 'avatar' ? 'bg-fun-purple text-white shadow-sm' : 'text-slate-400 hover:bg-slate-50'}`}
        >
          Presets
        </button>
        <button
          onClick={() => setTab('color')}
          className={`flex-1 py-2.5 rounded-xl font-black text-sm transition-all ${tab === 'color' ? 'bg-fun-purple text-white shadow-sm' : 'text-slate-400 hover:bg-slate-50'}`}
        >
          Theme Color
        </button>
      </div>

      {/* Avatar grid */}
      {tab === 'avatar' && (
        <div className="bg-white rounded-2xl border-2 border-slate-100 p-4 shadow-sm">
          <div className="grid grid-cols-4 gap-3">
            {AVATAR_OPTIONS.map(imgUrl => (
              <button
                key={imgUrl}
                onClick={() => { setAvatar(imgUrl); navigate(-1); }}
                className={`relative aspect-square rounded-2xl border-4 transition-all hover:scale-105 active:scale-95 overflow-hidden ${
                  stats.avatar === imgUrl
                    ? 'border-fun-purple ring-4 ring-purple-100'
                    : 'border-slate-100 hover:border-slate-200 bg-slate-50'
                }`}
              >
                <img
                  src={imgUrl}
                  alt="Avatar option"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color grid */}
      {tab === 'color' && (
        <div className="bg-white rounded-2xl border-2 border-slate-100 p-4 shadow-sm">
          <div className="grid grid-cols-3 gap-3">
            {THEME_COLORS.map(color => (
              <button
                key={color}
                onClick={() => { setThemeColor(color); navigate(-1); }}
                className={`h-20 rounded-2xl border-4 transition-all hover:scale-105 active:scale-95 ${color} ${
                  stats.themeColor === color
                    ? 'border-slate-800 shadow-lg scale-105'
                    : 'border-white shadow-sm'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Manage account */}
      <button
        onClick={() => navigate('/settings')}
        className="w-full flex items-center justify-center gap-2 py-3 bg-white border-2 border-slate-100 rounded-2xl text-slate-500 font-black text-sm shadow-sm hover:bg-slate-50 transition-all"
      >
        <Settings size={16} /> MANAGE ACCOUNT
      </button>
    </div>
  );
};

export default MyStyle;
