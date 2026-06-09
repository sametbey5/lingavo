import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Globe, Bell, ChevronRight, Volume2, Bookmark, Puzzle, VolumeX } from 'lucide-react';
import Button from './Button';

export interface LessonTemplateProps {
  // 1. Header Card
  title: string;
  subtitle: string;
  category: string;
  level?: string;
  lessonNumber?: number;
  illustrationUrl?: string;
  themeColor?: { from: string; to: string; text: string; bg: string; hex?: string };

  // 2. Learning Objectives
  objectives: { icon: React.FC<any> | JSX.Element; title: string; desc: string }[];

  // 3. Key Rule
  keyRule: { title: string; text: string; colorClass?: string };

  // 4. Interactive Examples
  examples: { visual: string; text: string; subtext?: string }[];

  // 5. Lesson Content Chunks
  chunks?: { explanation: string; visual?: string }[];

  // 6. Sticky Footer
  onContinue: () => void;
  onBack: () => void;
  continueLabel?: string;
  costText?: string;
}

const LessonTemplate: React.FC<LessonTemplateProps> = ({
  title,
  subtitle,
  category,
  level,
  lessonNumber,
  illustrationUrl,
  themeColor = { from: 'from-[#5a3cf3]', to: 'to-[#8050ff]', text: 'text-[#6b42f6]', bg: 'bg-[#6b42f6]' },
  objectives,
  keyRule,
  examples,
  chunks = [],
  onContinue,
  onBack,
  continueLabel = 'Continue',
  costText
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const playAudio = () => {
     try {
       const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
       const osc = audioCtx.createOscillator();
       const gainNode = audioCtx.createGain();
       osc.type = 'sine';
       osc.frequency.setValueAtTime(400, audioCtx.currentTime);
       osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
       gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
       gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
       osc.connect(gainNode);
       gainNode.connect(audioCtx.destination);
       osc.start();
       osc.stop(audioCtx.currentTime + 0.15);
     } catch(e) {}
  };

  return (
    <div className="fixed inset-0 z-[100] w-full h-[100dvh] flex flex-col font-sans bg-white sm:bg-[#fafafa] pb-6 overflow-hidden">
      {/* Top Bar */}
      <div className="px-5 py-4 flex items-center justify-between shrink-0 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] md:shadow-none z-10 relative">
         <button onClick={onBack} className="text-slate-800 hover:text-slate-600 transition-colors p-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
               <line x1="18" y1="6" x2="6" y2="18"></line>
               <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
         </button>
         <div className="flex-1 flex justify-center">
             <div className="text-slate-600 font-bold text-[13px] uppercase tracking-widest flex gap-1.5 items-center">
                <span className="text-slate-800">{level || 'A1'}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{category || 'FIRST ENGLISH'}</span>
             </div>
         </div>
         <div className="w-8">
         </div>
      </div>

      {/* Progress Bar under header */}
      <div className="px-5 py-3 md:py-4 bg-white/50 backdrop-blur-sm shrink-0 flex justify-center sticky top-0 z-[5] pointer-events-none">
          <div className="w-full max-w-sm h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
             <div className={`w-[30%] h-full bg-gradient-to-r ${themeColor.from} ${themeColor.to} rounded-full`}></div>
          </div>
      </div>

      <div className="flex-1 px-4 sm:px-6 md:px-8 max-w-2xl mx-auto w-full flex flex-col shrink-0 py-2 relative overflow-y-auto pb-28 scrollbar-hide">

        {/* 1. Header Card */}
        <div 
           className={`relative w-full rounded-[32px] p-5 sm:p-7 pb-20 flex flex-col items-start gap-2 shadow-sm overflow-hidden shrink-0 ${themeColor.hex ? '' : `bg-gradient-to-b ${themeColor.from} ${themeColor.to}`}`}
           style={themeColor.hex ? { backgroundColor: themeColor.hex } : {}}
        >
           
           {!illustrationUrl && (
              <div className="absolute -bottom-6 -right-6 w-48 h-48 sm:w-64 sm:h-64 opacity-20 pointer-events-none">
                 <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                 </svg>
              </div>
           )}
           
           <div className={`rounded-full px-3 py-1 font-bold text-[10px] uppercase tracking-widest relative z-10 backdrop-blur-sm shadow-sm inline-block ${themeColor.textHex ? '' : 'bg-white/20 text-white'}`} style={themeColor.textHex ? { color: themeColor.textHex, backgroundColor: `${themeColor.textHex}20` } : {}}>
              {category}
           </div>

           <div className={`relative z-10 w-full space-y-1 ${themeColor.textHex ? '' : 'text-white'}`} style={themeColor.textHex ? { color: themeColor.textHex } : {}}>
              <h1 className="text-[28px] sm:text-[34px] font-bold leading-none tracking-tight">{title}</h1>
              <p className={`text-[13px] sm:text-[15px] leading-snug tracking-wide pt-1 ${themeColor.textHex ? 'opacity-90' : 'text-white/90'}`}>
                 {subtitle}
              </p>
           </div>
           
           {illustrationUrl && (
              <div className="w-full flex justify-center mt-6 mb-2 relative z-10">
                 <img src={illustrationUrl} alt="Lesson illustration" className="w-[180px] sm:w-[220px] object-contain drop-shadow-xl" />
              </div>
           )}
        </div>

        {/* 2. Learning Objectives Card */}
        {objectives.length > 0 && (
           <div className="bg-white rounded-[24px] sm:rounded-[32px] p-4 sm:p-5 border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.06)] shrink-0 relative z-20 -mt-16 mx-0 sm:mx-4 w-full mb-6">
               <h3 className="font-bold text-slate-800 tracking-tight text-[14px] mb-2 px-1">In this lesson you will:</h3>
               <div className="flex flex-col gap-2.5 px-1">
                  {objectives.slice(0, 5).map((obj, idx) => (
                     <div key={idx} className={`flex items-center gap-3`}>
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-[10px] flex items-center justify-center shrink-0 ${
                            idx === 0 ? 'bg-[#f0ebff] text-[#6b42f6]' : 
                            idx === 1 ? 'bg-[#e2fae8] text-[#22c55e]' : 
                            idx === 2 ? 'bg-[#fff0e6] text-[#ff8f3d]' : 
                            idx === 3 ? 'bg-[#e6f4ff] text-[#3b82f6]' : 
                            'bg-[#fce7f3] text-[#ec4899]'
                        }`}>
                           {typeof obj.icon === 'function' ? <obj.icon size={16} className="opacity-90" /> : obj.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                           <h4 className="font-bold text-slate-800 text-[13px] sm:text-[14px] leading-tight">{obj.title}</h4>
                           {obj.desc && <p className="text-[#8492a6] font-medium text-[11px] sm:text-[12px] leading-snug mt-0.5">{obj.desc}</p>}
                        </div>
                     </div>
                  ))}
               </div>
           </div>
        )}
      </div>

      {/* 6. Sticky Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-white via-white/100 to-transparent pointer-events-none z-50 flex flex-col items-center pb-8 pt-12">
         <div className="max-w-[400px] w-full pointer-events-auto space-y-3">
            <button onClick={onContinue} className={`w-full py-4 bg-gradient-to-r from-[#4438f6] to-[#794efd] hover:opacity-90 shadow-[0_4px_15px_rgba(68,56,246,0.3)] active:shadow-none active:translate-y-1 transition-all rounded-full flex items-center justify-center text-white border-0`}>
               <span className="font-semibold text-[17px] tracking-wide">{continueLabel}</span>
            </button>
            {costText && (
               <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-slate-500 hidden">
                  <span className="text-orange-400">⚡</span> 
                  {costText}
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default LessonTemplate;
