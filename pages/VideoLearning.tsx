
import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Share2, BookOpen, Bookmark, Music2, Volume2, VolumeX, ArrowLeft, Star, Sparkles, Users, User, Loader2, ChevronRight } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';
import ReactPlayer from 'react-player';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/db';
import smartClipsLogo from '../src/assets/images/smartclips_logo_1779575804023.png';

interface Video {
  id: string;
  title: string;
  category: string;
  color: string;
  url: string;
  author: string;
  description: string;
  likes: string;
  comments: string;
  channellink?: string;
  avatar?: string;
  lessonId?: string;
}

const FALLBACK_VIDEOS: Video[] = [
  { 
    id: 'movie-1', 
    title: 'The Great Gatsby - "I am Gatsby"', 
    category: 'Movies', 
    color: 'bg-fun-pink', 
    url: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    author: '@CinemaEnglish',
    description: 'Listen closely to how Gatsby introduces himself using the Present Simple "To Be".',
    likes: '45.1K',
    comments: '3.4K',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cinema',
    lessonId: 'a1-1'
  },
  { 
    id: 'movie-2', 
    title: 'Interstellar - "We are explorers"', 
    category: 'Movies', 
    color: 'bg-fun-blue', 
    url: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    author: '@SciFiLearner',
    description: 'A powerful use of the verb "to be" with "we" to talk about identity.',
    likes: '89.2K',
    comments: '5.1K',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SciFi',
    lessonId: 'a1-1'
  }
];

const VIDEO_VOCABULARY: Record<string, { words: string[]; phrases: string[] }> = {
  'movie-1': {
    words: ['About', 'Actor', 'Activity', 'Address'],
    phrases: ['Hello, how are you today?', 'Nice to meet you.']
  },
  'movie-2': {
    words: ['Above', 'Across', 'Action', 'Adult'],
    phrases: ['Good morning, everyone.', 'It is important to practice speaking every day.']
  }
};

const getVocabularyForVideo = (video: Video) => {
  if (VIDEO_VOCABULARY[video.id]) {
    return VIDEO_VOCABULARY[video.id];
  }
  return {
    words: ['About', 'Action', 'Activity', 'Actor'],
    phrases: ['Hello, how are you today?', 'It is important to practice speaking every day.']
  };
};

const VideoItem: React.FC<{ video: Video, isActive: boolean }> = ({ video, isActive }) => {
  const { awardPoints } = useGamification();
  const [hasAwarded, setHasAwarded] = useState(false);
  const [showVocab, setShowVocab] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isActive && !hasAwarded) {
      awardPoints(10, 'Watched Learning Clip');
      setHasAwarded(true);
    }
  }, [isActive, hasAwarded, awardPoints]);

  return (
    <div className="relative h-full w-full bg-black flex items-center justify-center overflow-hidden snap-start">
      {/* Video Layer - Strictly non-interactive */}
      <div className="absolute inset-0 pointer-events-none">
        <ReactPlayer
          url={video.url}
          playing={isActive}
          loop={true}
          muted={false}
          width="100%"
          height="100%"
          playsinline
          controls={false}
          config={{
            file: {
              attributes: {
                style: { objectFit: 'cover', width: '100%', height: '100%', pointerEvents: 'none' },
                disablePictureInPicture: true,
                controlsList: 'nodownload noplaybackrate',
              }
            }
          }}
        />
      </div>

      {/* Right Side Actions - z-20 to sit above interaction layer */}
      <div className="absolute right-4 bottom-32 z-20 flex flex-col items-center gap-6" onClick={(e) => e.stopPropagation()}>
        {/* Vocabulary Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); setShowVocab(true); }}
          className="flex flex-col items-center gap-1 group"
        >
          <div className="p-3.5 rounded-full bg-black/40 backdrop-blur-md text-[#9cb6d4] ring-2 ring-[#9cb6d4]/40 hover:scale-105 hover:bg-black/60 active:scale-95 transition-all">
            <BookOpen size={28} />
          </div>
          <span className="text-white text-xs font-black shadow-sm uppercase tracking-wide">Vocab</span>
        </button>

        {/* Share Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); if (navigator.share) { navigator.share({ title: video.title, text: video.description, url: window.location.href }).catch(() => {}); } else { alert("Link copied to clipboard!"); } }}
          className="flex flex-col items-center gap-1 group"
        >
          <div className="p-3.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:scale-105 hover:bg-black/60 active:scale-95 transition-all">
            <Share2 size={28} />
          </div>
          <span className="text-white text-xs font-black shadow-sm uppercase tracking-wide">Share</span>
        </button>
      </div>


      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="space-y-3 max-w-[80%]">
          <h3 className="text-white font-black text-xl">{video.author}</h3>
          
          <p className="text-white/90 text-sm font-medium line-clamp-2">
            {video.description}
          </p>

          <div className="flex flex-wrap gap-2.5 mt-2.5">
            {video.lessonId && (
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  navigate(`/grammar?lessonId=${video.lessonId}`); 
                }}
                className="bg-fun-blue/80 hover:bg-fun-blue text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 backdrop-blur-md transition-all shadow-xl"
              >
                <BookOpen size={14} />
                Learn Topic
              </button>
            )}

            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                setShowVocab(true);
              }}
              className="bg-[#9cb6d4] hover:bg-[#9cb6d4]/90 text-black px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 backdrop-blur-md transition-all shadow-xl"
            >
              <Sparkles size={14} />
              vocabulary
            </button>
          </div>

          <div className="flex items-center gap-2 text-white/80 text-sm mt-3">
            <Music2 size={14} className="animate-spin-slow" />
            <div className="overflow-hidden whitespace-nowrap">
              <div className="animate-marquee inline-block">
                {video.title} • Original Sound - {video.author}
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* Vocabulary Modal/Sheet Overlay */}
      <AnimatePresence>
        {showVocab && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVocab(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md z-40 flex flex-col justify-end"
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-t-4 border-slate-100 rounded-t-[2.5rem] p-6 max-h-[75vh] overflow-y-auto space-y-6 font-sans"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <div>
                  <span className="text-xs font-black text-slate-500 tracking-widest uppercase">Clip Vocabulary</span>
                  <h3 className="text-base font-black text-slate-800 line-clamp-1">{video.title}</h3>
                </div>
                <button 
                  onClick={() => setShowVocab(false)}
                  className="text-slate-600 font-black bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full text-xs uppercase tracking-wider"
                >
                  Close
                </button>
              </div>

              {/* Words Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="flex items-center gap-2"><BookOpen size={14} className="text-fun-pink" /> Key Words (Dictionary)</span>
                </h4>
                <div className="grid grid-cols-2 gap-3.5">
                  {getVocabularyForVideo(video).words.map(word => (
                    <button
                      key={word}
                      onClick={() => {
                        setShowVocab(false);
                        navigate(`/wordbank?search=${encodeURIComponent(word)}`);
                      }}
                      className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 border border-slate-200 rounded-2xl text-left transition-all group shadow-sm"
                    >
                      <div>
                        <p className="font-extrabold text-slate-800 text-sm">{word}</p>
                        <p className="text-[10px] text-slate-500">View in Dictionary</p>
                      </div>
                      <ChevronRight size={14} className="text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Phrases Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="flex items-center gap-2"><MessageCircle size={14} className="text-fun-blue" /> Key Phrases</span>
                </h4>
                <div className="space-y-2.5">
                  {getVocabularyForVideo(video).phrases.map(phrase => (
                    <button
                      key={phrase}
                      onClick={() => {
                        setShowVocab(false);
                        navigate(`/pronunciation?search=${encodeURIComponent(phrase)}`);
                      }}
                      className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 border border-slate-200 rounded-2xl text-left transition-all group shadow-sm"
                    >
                      <div className="flex-1 pr-3">
                        <p className="font-extrabold text-slate-800 text-sm italic group-hover:text-fun-purple transition-colors">"{phrase}"</p>
                        <p className="text-[10px] text-slate-500 mt-1">Practice Pronunciation</p>
                      </div>
                      <ChevronRight size={14} className="text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const VideoLearning: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      try {
        const dbVideos = await db.getLingavoLearnsVideos();
        if (dbVideos && dbVideos.length > 0) {
          setVideos(dbVideos);
        } else {
          setVideos(FALLBACK_VIDEOS);
        }
      } catch (error) {
        console.error("Failed to fetch videos", error);
        setVideos(FALLBACK_VIDEOS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollPos = containerRef.current.scrollTop;
    const height = containerRef.current.clientHeight;
    const index = Math.round(scrollPos / height);
    setActiveIndex(index);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col font-sans">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-40 p-6 flex items-center justify-between bg-gradient-to-b from-slate-900/60 to-transparent">
        <button 
          onClick={() => navigate('/')}
          className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        
        <div className="flex flex-col items-center">
          <img 
            src={smartClipsLogo} 
            alt="smartclips" 
            className="h-8 sm:h-10 object-contain drop-shadow-md"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Video Feed Container */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-scroll snap-y snap-mandatory scrollbar-hide relative"
      >
        {isLoading ? (
          <div className="h-full w-full flex flex-col items-center justify-center text-white gap-4">
            <Loader2 size={48} className="animate-spin text-[#9cb6d4]" />
            <p className="font-black animate-pulse text-sm uppercase tracking-widest text-slate-400">Loading Clips...</p>
          </div>
        ) : (
          videos.map((video, index) => (
            <VideoItem 
              key={video.id} 
              video={video} 
              isActive={activeIndex === index} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default VideoLearning;
