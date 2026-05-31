import React from 'react';
import { motion } from 'motion/react';

interface AnimatedMascotProps {
  isSpeaking: boolean;
  isListening: boolean;
}

const AnimatedMascot: React.FC<AnimatedMascotProps> = ({ isSpeaking, isListening }) => {
  return (
    <div className="relative w-full h-48 sm:h-56 mx-auto flex items-center justify-center bg-slate-50 border-b-4 border-slate-100 shrink-0">
      {/* Character body */}
      <motion.div 
        animate={{ 
          y: isSpeaking ? [-3, 3, -3] : [0, -2, 0],
          scale: isListening ? [1, 1.05, 1] : 1
        }}
        transition={{ 
          repeat: Infinity, 
          duration: isSpeaking ? 0.4 : isListening ? 1.5 : 3,
          ease: "easeInOut"
        }}
        className={`w-32 h-32 sm:w-40 sm:h-40 rounded-[2.5rem] shadow-xl relative border-8 border-white flex flex-col items-center justify-center transition-colors duration-500 ${
          isListening ? 'bg-fun-pink' : 'bg-fun-purple'
        }`}
      >
        {/* Antennas */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-6 z-[-1]">
          <div className="w-2 h-10 bg-white rounded-full relative">
            <div className="absolute -top-2 -translate-x-1 w-4 h-4 rounded-full bg-fun-yellow animate-pulse" />
          </div>
        </div>

        {/* Eyes container */}
        <div className="flex gap-6 sm:gap-8 mb-2 sm:mb-4">
          <motion.div 
            animate={
              isSpeaking ? { scaleY: [1, 0.1, 1], scaleX: [1, 1.1, 1] } :
              { scaleY: [1, 0.1, 1] }
            } 
            transition={
              isSpeaking ? { repeat: Infinity, duration: 4, times: [0, 0.05, 0.1], repeatDelay: 1 } :
              { repeat: Infinity, duration: 4, times: [0, 0.05, 0.1], repeatDelay: Math.random() * 2 + 2 }
            }
            className="w-5 h-7 sm:w-6 sm:h-8 bg-white rounded-full shadow-inner" 
          />
          <motion.div 
            animate={
              isSpeaking ? { scaleY: [1, 0.1, 1], scaleX: [1, 1.1, 1] } :
              { scaleY: [1, 0.1, 1] }
            } 
            transition={
              isSpeaking ? { repeat: Infinity, duration: 4, times: [0, 0.05, 0.1], repeatDelay: 1 } :
              { repeat: Infinity, duration: 4, times: [0, 0.05, 0.1], repeatDelay: Math.random() * 2 + 2 }
            }
            className="w-5 h-7 sm:w-6 sm:h-8 bg-white rounded-full shadow-inner" 
          />
        </div>

        {/* Mouth */}
        <motion.div 
          animate={
            isSpeaking ? { height: [8, 20, 8], width: [24, 30, 24], borderRadius: ['12px', '20px', '12px'] } : 
            isListening ? { height: 16, width: 16, borderRadius: '50%' } :
            { height: 8, width: 24, borderRadius: '12px' }
          }
          transition={isSpeaking ? { repeat: Infinity, duration: 0.25 } : { duration: 0.3 }}
          className="bg-slate-900 shadow-inner"
          style={{ minHeight: '8px' }}
        />

        {/* Cheeks */}
        {(isSpeaking || isListening) && (
           <div className="absolute top-16 sm:top-20 w-full flex justify-between px-4 sm:px-6 opacity-60">
             <div className="w-3 h-3 sm:w-4 sm:h-4 bg-pink-400 rounded-full blur-[2px]" />
             <div className="w-3 h-3 sm:w-4 sm:h-4 bg-pink-400 rounded-full blur-[2px]" />
           </div>
        )}
      </motion.div>
    </div>
  );
};

export default AnimatedMascot;
