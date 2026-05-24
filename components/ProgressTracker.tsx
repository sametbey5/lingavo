import React from 'react';
import { useGamification } from '../context/GamificationContext';
import { BookOpen, Mic, Ear, PenTool } from 'lucide-react';

import learnImg from '../src/assets/images/vocabulary.png';
import speakImg from '../src/assets/images/speaking.png';
import playImg from '../src/assets/images/listening.png';
import watchImg from '../src/assets/images/grammar.png';

interface ProgressTrackerProps {
  hideHeader?: boolean;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = () => {
  const { stats } = useGamification();

  const skills = [
    { 
      id: 'vocabulary', 
      label: 'Vocabulary', 
      icon: <BookOpen size={16} />, 
      bgImage: learnImg, 
      barColor: 'bg-amber-600'
    },
    { 
      id: 'speaking', 
      label: 'Speaking', 
      icon: <Mic size={16} />, 
      bgImage: speakImg, 
      barColor: 'bg-emerald-600'
    },
    { 
      id: 'listening', 
      label: 'Listening', 
      icon: <Ear size={16} />, 
      bgImage: playImg, 
      barColor: 'bg-rose-600'
    },
    { 
      id: 'grammar', 
      label: 'Grammar', 
      icon: <PenTool size={16} />, 
      bgImage: watchImg, 
      barColor: 'bg-sky-600'
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {skills.map((skill) => {
        // @ts-ignore
        const skillData = stats?.skills?.[skill.id];
        if (!skillData) return null;
        
        return (
          <div 
            key={skill.id} 
            className="relative rounded-2xl border-[3px] border-slate-100 p-3 overflow-hidden shadow-sm flex flex-col justify-between h-28 sm:h-32 hover:scale-[1.02] hover:shadow-md transition-all duration-300 group"
          >
            {/* Background image covering card */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
              style={{ backgroundImage: `url(${skill.bgImage})` }}
            />
            {/* Soft tint overlay to make text pop while keeping original vibes */}
            <div className="absolute inset-0 bg-white/15 backdrop-blur-[0.5px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col justify-between h-full min-w-0">
              {/* Top part: Icon + Name and Level Badge */}
              <div className="flex justify-between items-start gap-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="p-1.5 rounded-lg bg-white/90 shadow-sm border border-slate-100/50 text-slate-800 shrink-0">
                    {skill.icon}
                  </div>
                  <span className="font-black text-[12px] sm:text-sm text-slate-800 tracking-tight truncate">
                    {skill.label}
                  </span>
                </div>
                <span className="font-extrabold text-[9px] sm:text-[10px] bg-slate-800 text-white px-1.5 py-0.5 rounded-md shadow-sm shrink-0">
                  Lvl {skillData.level}
                </span>
              </div>
              
              {/* Bottom part: Stats & Progress bar */}
              <div className="space-y-1.5 mt-auto">
                <div className="flex justify-between text-[9px] font-black text-slate-700 bg-white/80 backdrop-blur-sm px-1.5 py-0.5 rounded-md border border-white/50">
                  <span>{Math.floor(skillData.totalXp)} XP</span>
                  <span>{Math.floor(skillData.progress)}%</span>
                </div>
                
                <div className="w-full bg-slate-900/10 h-2 rounded-full overflow-hidden p-[1px] shadow-inner">
                  <div 
                    className={`h-full ${skill.barColor} rounded-full transition-all duration-1000 ease-out`} 
                    style={{ width: `${skillData.progress}%` }} 
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressTracker;
