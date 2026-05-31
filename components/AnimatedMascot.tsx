import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const imageModules = import.meta.glob("../src/assets/mascot/**/*.png", {
  eager: true,
  import: "default",
});

const getImage = (assistantId: string, filename: string) => {
  const path = `../src/assets/mascot/${assistantId}/${filename}`;
  if (imageModules[path]) {
    return imageModules[path] as string;
  }
  return imageModules[`../src/assets/mascot/hamdi/${filename}`] as string;
};

interface AnimatedMascotProps {
  isSpeaking: boolean;
  isListening: boolean;
  assistantId?: string;
}

const AnimatedMascot: React.FC<AnimatedMascotProps> = ({
  isSpeaking,
  isListening,
  assistantId = "hamdi",
}) => {
  const [blink, setBlink] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const triggerBlink = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150); // Eye close duration
      const nextBlink = Math.random() * 3000 + 3000; // 3 to 6 seconds
      timeoutRef.current = window.setTimeout(triggerBlink, nextBlink);
    };

    timeoutRef.current = window.setTimeout(
      triggerBlink,
      Math.random() * 3000 + 3000,
    );

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const bgImg = getImage(assistantId, "background.png");
  const personImg = getImage(assistantId, "person.png");
  const openEyesImg = getImage(assistantId, "openeyes.png");
  const closedEyesImg = getImage(assistantId, "closedeyes.png");
  const mouthSpeakingImg = getImage(assistantId, "mouthspeaking.png");
  const eyebrowsNeutralImg = getImage(assistantId, "eyebrowsneutral.png");

  return (
    <div className="relative w-full h-64 sm:h-72 mx-auto flex items-center justify-center bg-slate-50 border-b-4 border-slate-100 shrink-0 overflow-hidden">
      {/* Container for the layered images */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Background layer */}
        {bgImg && (
          <img
            src={bgImg}
            alt="background"
            className="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none"
          />
        )}

        {/* Character layer */}
        <motion.div
          animate={{
            y: isListening ? [0, -2, 0] : 0,
          }}
          transition={{
            repeat: Infinity,
            duration: isListening ? 1.5 : 3,
            ease: "easeInOut",
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none origin-bottom"
        >
          {personImg && (
            <img
              src={personImg}
              alt="person"
              className="absolute inset-0 w-full h-full object-contain object-bottom"
            />
          )}

          {eyebrowsNeutralImg && (
            <img
              src={eyebrowsNeutralImg}
              alt="eyebrows"
              className="absolute inset-0 w-full h-full object-contain object-bottom"
            />
          )}

          {/* Eyes Layer */}
          {(blink ? closedEyesImg : openEyesImg) && (
            <img
              src={blink ? closedEyesImg : openEyesImg}
              alt="eyes"
              className="absolute inset-0 w-full h-full object-contain object-bottom"
            />
          )}

          {/* Mouth Layer */}
          <AnimatePresence>
            {isSpeaking && mouthSpeakingImg && (
              <motion.img
                key="mouth-speaking"
                src={mouthSpeakingImg}
                alt="mouth"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.3 }}
                className="absolute inset-0 w-full h-full object-contain object-bottom"
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedMascot;
