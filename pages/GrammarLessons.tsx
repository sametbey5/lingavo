import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  CheckCircle, 
  ChevronRight, 
  ArrowLeft, 
  Award, 
  Sparkles, 
  Lock, 
  Star, 
  Globe, 
  LifeBuoy,
  Play,
  Tv,
  Clock,
  ArrowRight,
  Check,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactPlayer from 'react-player';
import Button from '../components/Button';
import { useGamification } from '../context/GamificationContext';
import Confetti from '../components/Confetti';
import { UI_TRANSLATIONS } from '../translations';

import { LESSONS, Lesson, Level, Exercise } from '../components/grammarLessonsData';

const LEVELS: { id: Level; title: string; desc: string; color: string }[] = [
  { id: 'A1', title: 'Beginner', desc: 'Essential foundations', color: 'bg-green-500' },
  { id: 'A2', title: 'Elementary', desc: 'Basic communication', color: 'bg-teal-500' },
  { id: 'B1', title: 'Intermediate', desc: 'Everyday fluency', color: 'bg-blue-500' },
  { id: 'B2', title: 'Upper Int.', desc: 'Complex ideas', color: 'bg-indigo-500' },
  { id: 'C1', title: 'Advanced', desc: 'Professional mastery', color: 'bg-purple-500' },
  { id: 'C2', title: 'Proficiency', desc: 'Native-like nuance', color: 'bg-pink-500' },
];

interface GrammarVideo {
  id: string;
  title: string;
  topic: string;
  level: Level;
  duration: string;
  videoUrl: string;
  tutor: string;
  tutorAvatar: string;
  views: string;
  description: string;
  keyPoints: string[];
}

/**
 * =========================================================================
 * 🎬 CUSTOMIZABLE VIDEO LESSON REGISTRY
 * =========================================================================
 * You want to add custom video guides to explain some or all grammar units?
 * Simply add or overwrite any lesson's ID (e.g., 'a1-1', 'b1-4' or 'c2-2')
 * here! Point 'videoUrl' to your YouTube link, Vimeo, or direct video file (e.g. mp4).
 *
 * Missing values will automatically fallback safely with beautiful, high-quality
 * educational background media and clear configuration hints.
 * =========================================================================
 */
interface VideoOverride {
  title?: string;
  duration?: string;
  videoUrl: string;
  tutor?: string;
  views?: string;
  description?: string;
  keyPoints?: string[];
}

const CUSTOM_LESSON_VIDEOS: Record<string, VideoOverride> = {
  // --- LEVEL A1 BEGINNER ---
  'a1-1': {
    title: 'Mastering the present verb "To Be" (am, is, are)',
    duration: '3:15',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4', // Overwrite with your custom link!
    tutor: 'Emma Mitchell',
    views: '1.2k views',
    description: 'Learn when to use am, is, and are with fun interactive real-life examples!',
    keyPoints: ['Use "am" ONLY with I', 'Use "is" with singular subjects (He, She, It)', 'Use "are" with plural subjects (You, We, They)']
  },
  'a1-2': {
    title: 'Secret Hack to Present Simple Verbs',
    duration: '4:20',
    videoUrl: 'https://videos.pexels.com/video-files/3196122/3196122-hd_1920_1080_25fps.mp4',
    tutor: 'Tutor David',
    views: '984 views',
    description: 'Learn how to describe daily routines and use the third person "-s" rule.',
    keyPoints: ['Use base verbs with plural subjects', 'Add "-s" or "-es" with He, She, It', 'Differentiate routines from current actions']
  },
  'a1-3': {
    title: 'Subject Pronouns Demystified',
    duration: '2:50',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Liam Parker',
    views: '840 views',
    description: 'Never mix up "I", "He", "They", or "We" again! Essential for sentence syntax.',
    keyPoints: ['Subject pronouns replace nouns doing actions', 'Maintain singular/plural alignment', 'Always capitalize "I"']
  },
  'a1-4': {
    title: 'Object Pronouns in Action',
    duration: '3:05',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Sophie Collins',
    views: '1.5k views',
    description: 'Learn object pronouns (me, him, her, us, them) and discover when to apply them after verbs.',
    keyPoints: ['Used as direct/indirect objects', 'Crucial after prepositions like to/with/for', 'Match with subject counterparts']
  },
  'a1-5': {
    title: 'Possessive Adjectives Made Fast & Simple',
    duration: '2:40',
    videoUrl: 'https://videos.pexels.com/video-files/3196122/3196122-hd_1920_1080_25fps.mp4',
    tutor: 'Tutor David',
    description: 'My, Your, His, Her, Its, Our, Their. Learn possession grammar rules.',
    keyPoints: ['Always place before nouns', 'Shows connection or ownership', 'Its vs It\'s distinction']
  },
  'a1-6': {
    title: 'Plural Nouns Made Easy',
    duration: '3:10',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Emma Mitchell',
    description: 'Detailed spelling guide for regular plural nouns adding -s and -es.',
    keyPoints: ['Add -s for normal nouns', 'Add -es for nouns ending with -ch, -sh, -x, -s, -o', 'Change -y to -ies when consonant precedes']
  },
  'a1-7': {
    title: 'Demonstratives (This, That, These, Those)',
    duration: '4:15',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Liam Parker',
    description: 'Understand physical and chronological distance using demonstrative pronouns.',
    keyPoints: ['This/These represent near proximity', 'That/Those represent far proximity', 'Match singular/plural nouns']
  },
  'a1-8': {
    title: 'Mastering "There is" and "There are"',
    duration: '3:30',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Sophie Collins',
    description: 'How to state the existence of singular and plural objects.',
    keyPoints: ['Use "There is" for singular objects or uncountable nouns', 'Use "There are" for plural lists', 'Learn common contraction rules (There\'s)']
  },
  'a1-9': {
    title: 'Countable vs Uncountable Nouns',
    duration: '4:00',
    videoUrl: 'https://videos.pexels.com/video-files/3196122/3196122-hd_1920_1080_25fps.mp4',
    tutor: 'Tutor David',
    description: 'Master the core difference between count nouns like apples and mass nouns like water.',
    keyPoints: ['Countables take plural forms', 'Uncountables remain singular', 'Use correct measure indicators']
  },
  'a1-10': {
    title: 'Using "Some" and "Any" Flawlessly',
    duration: '3:25',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Emma Mitchell',
    description: 'The definitive article-like guide to selecting some or any in sentences.',
    keyPoints: ['Use "some" in positive sentences and requests', 'Use "any" in negative statements and questions', 'Works with plurals and uncountables']
  },
  'a1-11': {
    title: 'Secret Hack to Articles: A, An, or The?',
    duration: '2:40',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Tutor David',
    views: '984 views',
    description: 'Uncover the subtle difference between specific versus general noun references in English.',
    keyPoints: ['A + Consonant sound (a dog)', 'An + Vowel sound (an apple)', 'The is for specific, unique objects']
  },
  'a1-12': {
    title: 'Prepositions of Place (In, On, At)',
    duration: '4:05',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Sophie Collins',
    views: '2.5k views',
    description: 'Never mix up "in", "on", or "at" again! Visual spatial guides for daily conversations.',
    keyPoints: ['In: 3D spaces, boxes, cities, rooms', 'On: Surfaces, walls, screens, tables', 'At: Precise locations, bus stops, coordinates']
  },
  'a1-13': {
    title: 'Prepositions of Time (In, On, At)',
    duration: '3:50',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Liam Parker',
    description: 'Visual guides for time periods, days, and exact clock times.',
    keyPoints: ['At: Specific times (at 3 o\'clock, at noon)', 'On: Days and dates (on Monday, on July 4th)', 'In: Months, seasons, years, decades']
  },
  'a1-14': {
    title: 'Ability Modals: Can vs Can\'t',
    duration: '2:30',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Emma Mitchell',
    description: 'Learn how to declare abilities and ask permission nicely.',
    keyPoints: ['Can + Verb base form', 'Never add "s" for third person (He can speak)', 'Pronunciation rules for negative contraction']
  },
  'a1-15': {
    title: 'Present Continuous Action Walkthrough',
    duration: '4:25',
    videoUrl: 'https://videos.pexels.com/video-files/3196122/3196122-hd_1920_1080_25fps.mp4',
    tutor: 'Tutor David',
    description: 'Learn how to describe what you are doing in this very moment.',
    keyPoints: ['Structure: Be + Verb-ing', 'Double consonants for short vowel roots', 'Never use continuous form with stative verbs']
  },
  'a1-16': {
    title: 'Past Simple: Verb "To Be" (Was / Were)',
    duration: '3:10',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Sophie Collins',
    description: 'Transform subject/predicate statements to describe yesterday or last year.',
    keyPoints: ['Use "was" for I, He, She, It', 'Use "were" for You, We, They', 'Structure negatives and past queries']
  },
  'a1-17': {
    title: 'Past Simple of Regular Verbs',
    duration: '3:40',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Liam Parker',
    description: 'How to form the past tense by adding the "-ed" suffix.',
    keyPoints: ['Standard spelling: add -ed', 'Double consonants for CVC verbs', 'Three distinct pronunciations of -ed (/t/, /d/, /id/)']
  },
  'a1-18': {
    title: 'Irregular Past Simple Verbs',
    duration: '5:20',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Liam Parker',
    views: '1.8k views',
    description: 'Master English past action descriptions with simple memory matrices for irregular verbs.',
    keyPoints: ['Regular verbs add -ed', 'Irregular verbs change completely (go -> went)', 'Use did/did not for past negative and questions']
  },
  'a1-19': {
    title: 'Five Ws: Question Words In English',
    duration: '3:45',
    videoUrl: 'https://videos.pexels.com/video-files/3196122/3196122-hd_1920_1080_25fps.mp4',
    tutor: 'Emma Mitchell',
    description: 'Who, What, Where, When, Why, and How. Construct essential interrogative sentences.',
    keyPoints: ['Start queries with question markers', 'Subject-verb inversion logic', 'Match correct markers to correct targets']
  },
  'a1-20': {
    title: 'Adverbs of Frequency',
    duration: '3:15',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Sophie Collins',
    description: 'Always, Usually, Often, Sometimes, Seldom, Never. Position them correctly.',
    keyPoints: ['Place BEFORE main verbs', 'Place AFTER "to be" verb', 'Determine percent values for frequency levels']
  },
  'a1-21': {
    title: 'Imperatives: Giving Orders & Directions',
    duration: '2:20',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Liam Parker',
    description: 'Use base verb forms to make strong commands and directions.',
    keyPoints: ['Direct root form with no subject pronoun', 'Add "please" for polite requests', 'Negative commands start with "Don\'t"']
  },
  'a1-22': {
    title: 'Verbs of Preference: Like + -ing',
    duration: '2:55',
    videoUrl: 'https://videos.pexels.com/video-files/3196122/3196122-hd_1920_1080_25fps.mp4',
    tutor: 'Tutor David',
    description: 'Talking about hobbies and activities using the gerund form after like, love, and hate.',
    keyPoints: ['"Like" acts as the active verb, hobby takes -ing', 'Applies to hate, love, enjoy', 'Maintain subject agreement on "like/likes"']
  },
  'a1-23': {
    title: 'Polite Desires: Want vs Would Like',
    duration: '3:10',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Emma Mitchell',
    description: 'Learn how to express wishes politely in restaurants and social gathering areas.',
    keyPoints: ['"Would like" is much more polite than "want"', 'Add infinitives with "to" (I would like to order)', 'Contracted form: "I\'d like"']
  },
  'a1-24': {
    title: 'Quantity Queries: How Much vs How Many',
    duration: '3:40',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Sophie Collins',
    description: 'Choose the correct query phrase based on noun count status.',
    keyPoints: ['"How many" + plural countable nouns', '"How much" + uncountable nouns', 'Understand price query conventions']
  },
  'a1-25': {
    title: 'Comparatives - Comparing People & Things',
    duration: '4:05',
    videoUrl: 'https://videos.pexels.com/video-files/3196122/3196122-hd_1920_1080_25fps.mp4',
    tutor: 'Liam Parker',
    description: 'How to add "-er" suffix or lead with "more" to draw structured comparisons.',
    keyPoints: ['Short adjectives: add -er', 'Long adjectives (2+ syllables): use "more"', 'Use "than" to link the companion noun']
  },
  'a1-26': {
    title: 'Superlatives - Spotlighting the Best',
    duration: '3:50',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Emma Mitchell',
    description: 'Construct extreme comparisons to identify the number one choice in a group.',
    keyPoints: ['Use "the" + "-est" for single syllable types', 'Use "the most" for long adjectives', 'Irregular stem exceptions (good -> the best, bad -> the worst)']
  },
  'a1-27': {
    title: 'Future Intentions with "Going to"',
    duration: '3:35',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Tutor David',
    description: 'Formulate expressions of pre-planned actions or firm predictions.',
    keyPoints: ['Structure: Be + going to + Base Verb', 'Shows evidence-based prediction', 'Contrast against sudden decisions']
  },
  'a1-28': {
    title: 'Linking Sentences: And, But, Or, So',
    duration: '2:45',
    videoUrl: 'https://videos.pexels.com/video-files/3196122/3196122-hd_1920_1080_25fps.mp4',
    tutor: 'Sophie Collins',
    description: 'Conjunction masterclass for joining phrases together.',
    keyPoints: ['"And" adds information', '"But" contrasts details', '"Or" offers alternatives', '"So" links cause and effect']
  },
  'a1-29': {
    title: 'Possessive \'s (Showing Ownership)',
    duration: '2:50',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Liam Parker',
    description: 'A beautiful visual map for placing apostrophes correctly to show ownership.',
    keyPoints: ['Singular nouns: add "\'s"', 'Plural nouns ending in s: add only "\'"', 'Shows personal ownership vs descriptive status']
  },
  'a1-30': {
    title: 'Basic Sentence Structure (SVO)',
    duration: '3:12',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Emma Mitchell',
    description: 'The golden rule of English syntax: Subject, Verb, Object.',
    keyPoints: ['SVO is the default building block of sentences', 'Adjectives strictly precede nouns', 'Place indicators come before time markers']
  },

  // --- LEVEL A2 ELEMENTARY ---
  'a2-1': {
    title: 'Past Continuous Interactive Class',
    duration: '4:50',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Emma Mitchell',
    description: 'Describe ongoing actions that were taking place during past scenarios.',
    keyPoints: ['Formed with was/were + Verb-ing', 'Describes interrupted past events', 'Paired with Past Simple using "when" / "while"']
  },
  'a2-2': {
    title: 'Introduction to Present Perfect (Experience)',
    duration: '5:10',
    videoUrl: 'https://videos.pexels.com/video-files/3196122/3196122-hd_1920_1080_25fps.mp4',
    tutor: 'Tutor David',
    description: 'Talk about major life events without mentioning precise dates.',
    keyPoints: ['Structure: Have/Has + Past Participle (V3)', 'Refers to unspecified times', 'Common triggers: "ever" and "never"']
  },
  'a2-3': {
    title: 'Present Perfect vs Past Simple Showdown',
    duration: '5:45',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Liam Parker',
    description: 'Learn when to declare exact finished times (yesterday) vs unfinished timelines.',
    keyPoints: ['Use Past Simple for specific, finished moments', 'Use Present Perfect for ongoing connection to now']
  },
  'a2-4': {
    title: 'Talking Future with "Will"',
    duration: '3:20',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Sophie Collins',
    description: 'Understand predictions, rapid decisions, and polite promises.',
    keyPoints: ['Rapid on-the-spot decisions', 'Firm declarations about general future states', 'Structure is always Will + Base Verb']
  },
  'a2-5': {
    title: 'Firm Plans vs Decisions: Going To vs Will',
    duration: '4:12',
    videoUrl: 'https://videos.pexels.com/video-files/3196122/3196122-hd_1920_1080_25fps.mp4',
    tutor: 'Tutor David',
    description: 'Solve the ultimate future choice scenario in daily travel planning.',
    keyPoints: ['"Going to" is for prior arrangements & intent', '"Will" is for immediate decisions & promises']
  },

  // --- LEVEL B1 INTERMEDIATE ---
  'b1-1': {
    title: 'Present Perfect Continuous Tense Explained',
    duration: '5:10',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Liam Parker',
    description: 'Express ongoing activities starting from the past up to the present moment.',
    keyPoints: ['Structure: Have/Has + been + Verb-ing', 'Emphasizes duration and ongoing activity', 'Uses "for" (length) and "since" (start item)']
  },
  'b1-4': {
    title: 'Second Conditional - Unreal Dreams',
    duration: '4:45',
    videoUrl: 'https://videos.pexels.com/video-files/3196122/3196122-hd_1920_1080_25fps.mp4',
    tutor: 'Emma Mitchell',
    description: 'Talk about imaginary, hypothetical, or impossible current states.',
    keyPoints: ['Use if + Past Simple', 'Use would + Base Verb in main clause', 'Standardized "If I were you..." for advice']
  },

  // --- LEVEL B2 UPPER INTERMEDIATE ---
  'b2-1': {
    title: 'Future Perfect Tense Mastery',
    duration: '4:30',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Sophie Collins',
    description: 'Looking back from a future point to describe completed tasks.',
    keyPoints: ['Structure: Will + have + Past Participle (V3)', 'Often accompanied by "by" or "by the time"', 'Frames logical milestones perfectly']
  },

  // --- LEVEL C1 ADVANCED ---
  'c1-1': {
    title: 'Advanced Inversions - Speaking Like a Pro',
    duration: '6:15',
    videoUrl: 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4',
    tutor: 'Liam Parker',
    description: 'Unlock formal English writing models using negative adverbial inversions.',
    keyPoints: ['Little did he know, Seldom have we, No sooner had...', 'Inverts auxiliary verb and active subject', 'Highly valuable for essay writing and storytelling']
  },

  // --- LEVEL C2 PROFICIENCY ---
  'c2-1': {
    title: 'Shedding Light on Archaic and Literary English',
    duration: '7:20',
    videoUrl: 'https://videos.pexels.com/video-files/3196122/3196122-hd_1920_1080_25fps.mp4',
    tutor: 'Sophia Collins',
    description: 'Understand Shakespearean remnants and literary devices in current high-register prose.',
    keyPoints: ['Observe historical register markers', 'Analyze archaic conjugations in poetic quotes', 'Explore emotional resonance in advanced speech']
  }
};

/**
 * Helper to dynamically generate a clean companion video for ANY grammar lesson.
 * If the lesson ID exists in CUSTOM_LESSON_VIDEOS, it will pull the custom media details.
 * Otherwise, it builds a fully custom educational placeholder.
 */
const getLessonVideo = (lesson: Lesson): GrammarVideo => {
  const custom = CUSTOM_LESSON_VIDEOS[lesson.id];
  return {
    id: `vid-${lesson.id}`,
    title: custom?.title || `${lesson.title} - Video Lecture`,
    topic: lesson.topic,
    level: lesson.level,
    duration: custom?.duration || '3:45',
    videoUrl: custom?.videoUrl || 'https://videos.pexels.com/video-files/5906253/5906253-hd_1920_1080_25fps.mp4', // Safe, high-quality stock video placeholder
    tutor: custom?.tutor || 'Prof. Alexander',
    tutorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${custom?.tutor || 'Alexander'}`,
    views: custom?.views || '2.4k views',
    description: custom?.description || `A step-by-step video academy lecture covering "${lesson.title}". Master usage rules, grammatical nuances, and common conversational errors in English.`,
    keyPoints: custom?.keyPoints || [
      `Learn context specific rules of "${lesson.title}"`,
      `Identify the standard triggers and formulaic patterns`,
      `Improve active listening and practice corresponding quiz exercises!`
    ]
  };
};

const GrammarLessons: React.FC = () => {
  const { awardPoints, cefrLevel, updateProfile, preferredLanguage } = useGamification();
  const navigate = useNavigate();
  
  const t = (key: string) => UI_TRANSLATIONS[preferredLanguage]?.[key] || UI_TRANSLATIONS['Turkish']?.[key] || key;

  const [selectedLevel, setSelectedLevel] = useState<Level>(cefrLevel || 'A1');
  const [activeTab, setActiveTab] = useState<'lessons' | 'videos'>('lessons');
  const [selectedVideo, setSelectedVideo] = useState<GrammarVideo | null>(null);
  
  const [videoWatchedCompleted, setVideoWatchedCompleted] = useState<string[]>([]);
  const [videoPointsClaimed, setVideoPointsClaimed] = useState<string[]>([]);
  const [explanationMode, setExplanationMode] = useState<'text' | 'video'>('text');

  useEffect(() => {
    const savedWatched = localStorage.getItem('lingavo_grammar_videos_watched');
    if (savedWatched) {
      setVideoWatchedCompleted(JSON.parse(savedWatched));
    }
    const savedClaimed = localStorage.getItem('lingavo_grammar_videos_claimed');
    if (savedClaimed) {
      setVideoPointsClaimed(JSON.parse(savedClaimed));
    }
  }, []);
  
  const levelOrder: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  
  const isLevelLocked = (lvl: Level) => {
      const userLevelIndex = levelOrder.indexOf(cefrLevel || 'A1');
      const targetLevelIndex = levelOrder.indexOf(lvl);
      return targetLevelIndex > userLevelIndex;
  };
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentExplanationPartIndex, setCurrentExplanationPartIndex] = useState(0);
  const [phase, setPhase] = useState<'list' | 'explanation' | 'quiz' | 'completed'>('list');
  const [isHelpRequested, setIsHelpRequested] = useState(false);
  
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const handleStartLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setPhase('explanation');
    setExplanationMode('text'); // default to text mode
    setCurrentExerciseIndex(0);
    setCurrentExplanationPartIndex(0);
    setFeedback(null);
    setUserAnswer('');
    setIsHelpRequested(false);
  };

  const handleStartQuiz = () => {
    setPhase('quiz');
  };

  const handleSubmitAnswer = () => {
    if (!selectedLesson) return;
    
    const currentExercise = selectedLesson.exercises[currentExerciseIndex];
    const isCorrect = userAnswer.toLowerCase().trim() === currentExercise.correctAnswer.toLowerCase();
    
    setFeedback({
      isCorrect,
      message: isCorrect ? 'Correct! Great job!' : `Not quite. ${currentExercise.explanation}`
    });

    if (isCorrect) {
      awardPoints(20, 'Correct Answer', 'grammar');
    }
  };

  const handleNextExercise = () => {
    if (!selectedLesson) return;
    
    if (currentExerciseIndex < selectedLesson.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setUserAnswer('');
      setFeedback(null);
    } else {
      setPhase('completed');
      if (!completedLessons.includes(selectedLesson.id)) {
        setCompletedLessons([...completedLessons, selectedLesson.id]);
        
        // Check if it's an exam
        if (selectedLesson.id.includes('exam')) {
             handleExamPass(selectedLesson.level);
        } else {
             awardPoints(100, 'Lesson Completed', 'grammar');
        }
      }
    }
  };

  const handleExamPass = (passedLevel: Level) => {
      const levelOrder: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
      const currentIndex = levelOrder.indexOf(passedLevel);
      
      if (currentIndex < levelOrder.length - 1) {
          const nextLevel = levelOrder[currentIndex + 1];
          // Only promote if they are currently at the passed level
          if (cefrLevel === passedLevel) {
              updateProfile({ cefrLevel: nextLevel });
              awardPoints(500, `Promoted to ${nextLevel}!`, 'grammar');
          } else {
              awardPoints(200, 'Exam Retaken', 'grammar');
          }
      } else {
          awardPoints(1000, 'Grammar Master!', 'grammar');
      }
  };

  const handleBackToList = () => {
    setPhase('list');
    setSelectedLesson(null);
  };

  const claimVideoPoints = (vidId: string) => {
    if (videoPointsClaimed.includes(vidId)) return;
    const nextClaimed = [...videoPointsClaimed, vidId];
    setVideoPointsClaimed(nextClaimed);
    localStorage.setItem('lingavo_grammar_videos_claimed', JSON.stringify(nextClaimed));
    awardPoints(25, 'Video Lesson Watched', 'grammar');
  };

  const markVideoAsWatched = (vidId: string) => {
    if (videoWatchedCompleted.includes(vidId)) return;
    const nextWatched = [...videoWatchedCompleted, vidId];
    setVideoWatchedCompleted(nextWatched);
    localStorage.setItem('lingavo_grammar_videos_watched', JSON.stringify(nextWatched));
  };

  const getVideoForLesson = (lesson: Lesson | null): GrammarVideo => {
    if (!lesson) {
      const fallbackLesson = LESSONS.find(l => l.level === selectedLevel) || LESSONS[0];
      return getLessonVideo(fallbackLesson);
    }
    return getLessonVideo(lesson);
  };

  // --- RENDER: LEVEL SELECTOR ---
  if (phase === 'list') {
    const filteredLessons = LESSONS.filter(l => l.level === selectedLevel);
    // Dynamically generate a tailored video lesson for EVERY single unit in the course syllabus!
    const filteredVideos = filteredLessons.map(lesson => getLessonVideo(lesson));

    return (
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-20 px-4">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight uppercase">
            Grammar Academy
            {preferredLanguage && preferredLanguage !== 'English' && (
              <span className="block text-2xl text-fun-blue mt-2 opacity-80">
                {t('grammar_academy')}
              </span>
            )}
          </h2>
          <p className="text-xl font-bold text-slate-500">
            Master English from A1 to C2! 🎓
            {preferredLanguage && preferredLanguage !== 'English' && (
              <span className="block text-sm text-slate-400 mt-1">
                {t('master_english')}
              </span>
            )}
          </p>
          {preferredLanguage && (
            <div className="inline-block bg-slate-100 text-slate-500 px-4 py-1 rounded-full text-sm font-bold mt-2">
              🌍 {t('support_language')}: {preferredLanguage}
            </div>
          )}
          <div className="flex justify-center mt-4">
             <Button onClick={() => navigate('/grammar')} variant="secondary" className="px-6 py-2 text-sm">
                Play Scramble Game {preferredLanguage && preferredLanguage !== 'English' && <span className="ml-1 opacity-70">({t('play_scramble')})</span>} 🎮
             </Button>
          </div>
        </div>

        {/* Level Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {LEVELS.map((lvl) => {
            const locked = isLevelLocked(lvl.id);
            return (
            <button
              key={lvl.id}
              onClick={() => !locked && setSelectedLevel(lvl.id)}
              disabled={locked}
              className={`relative px-6 py-4 rounded-2xl border-b-4 transition-all flex flex-col items-center min-w-[100px] ${
                selectedLevel === lvl.id 
                  ? `${lvl.color} border-black/20 text-white shadow-lg scale-110 z-10` 
                  : locked 
                    ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed grayscale'
                    : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50 hover:scale-105'
              }`}
            >
              {locked && <Lock size={16} className="absolute top-2 right-2 opacity-50" />}
              <span className="text-2xl font-black">{lvl.id}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">{lvl.title}</span>
            </button>
          )})}
        </div>

        {/* Current Level Info */}
        <div className="bg-white p-8 rounded-[2rem] border-4 border-slate-100 shadow-sm text-center max-w-2xl mx-auto">
           <h3 className="text-2xl font-black text-slate-800 mb-2">
             {LEVELS.find(l => l.id === selectedLevel)?.title} Level
           </h3>
           <p className="text-slate-500 font-medium">
             {LEVELS.find(l => l.id === selectedLevel)?.desc}
           </p>
        </div>

        {/* Segmented Control to Choose Between Interactive Lessons and Video Lessons */}
        <div className="flex justify-center p-1 bg-slate-100/80 backdrop-blur rounded-2xl max-w-sm sm:max-w-md mx-auto my-6 border-2 border-slate-200/50">
          <button 
            onClick={() => setActiveTab('lessons')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm uppercase tracking-wide transition-all ${
              activeTab === 'lessons' 
                ? 'bg-white shadow-md text-fun-blue scale-[1.02]' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen size={16} />
            Lessons
          </button>
          <button 
            onClick={() => setActiveTab('videos')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm uppercase tracking-wide transition-all relative ${
              activeTab === 'videos' 
                ? 'bg-white shadow-md text-fun-blue scale-[1.02]' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="absolute -top-1 right-2 bg-fun-pink w-2 h-2 rounded-full animate-ping" />
            <Tv size={16} />
            Video Lounge
          </button>
        </div>

        {/* Lessons Tab */}
        {activeTab === 'lessons' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredLessons.map((lesson) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const isExam = lesson.id.includes('exam');
              
              return (
              <div 
                key={lesson.id}
                onClick={() => handleStartLesson(lesson)}
                className={`p-6 rounded-[2rem] border-4 shadow-lg cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden ${
                  isExam 
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 hover:border-yellow-400'
                    : 'bg-white border-slate-100 hover:border-fun-blue'
                }`}
              >
                {isCompleted && (
                  <div className="absolute top-4 right-4 bg-fun-green text-white p-2 rounded-full shadow-md z-10">
                    <CheckCircle size={20} />
                  </div>
                )}
                
                <div className={`w-16 h-16 ${isExam ? 'bg-orange-500' : LEVELS.find(l => l.id === lesson.level)?.color || 'bg-blue-500'} text-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                  {isExam ? <Star size={32} fill="white" /> : <BookOpen size={32} />}
                </div>
                
                <span className={`text-xs font-black uppercase tracking-widest ${isExam ? 'text-orange-600' : 'text-slate-400'}`}>
                  {lesson.topic}
                </span>
                <h3 className={`text-xl font-black mt-1 mb-2 leading-tight ${isExam ? 'text-slate-800' : 'text-slate-800'}`}>
                  {lesson.title}
                </h3>
                {preferredLanguage && preferredLanguage !== 'English' && lesson.translations && lesson.translations[preferredLanguage] && (
                  <p className="text-fun-blue font-bold text-sm flex items-center gap-1 mb-2">
                    <Globe size={14} /> {lesson.translations[preferredLanguage].title}
                  </p>
                )}
                <p className={`font-medium mb-4 text-sm ${isExam ? 'text-orange-700/70' : 'text-slate-500'}`}>
                  {lesson.exercises.length} interactive exercises
                </p>
                
                <div className={`flex items-center font-bold group-hover:translate-x-2 transition-transform text-sm ${isExam ? 'text-orange-600' : 'text-fun-blue'}`}>
                  {isExam ? 'Start Exam' : t('start_lesson')} <ChevronRight size={16} className="ml-1" />
                </div>
              </div>
            )})}
            
            {filteredLessons.length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-400 font-bold">
                <Lock size={48} className="mx-auto mb-4 opacity-50" />
                <p>{t('lessons_coming_soon')}</p>
              </div>
            )}
          </div>
        )}

        {/* Video Lounge Tab */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-[2rem] border-2 border-blue-100 flex flex-col md:flex-row items-center gap-6 shadow-sm">
              <div className="w-16 h-16 bg-fun-blue text-white rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
                <Tv size={36} />
              </div>
              <div className="text-center md:text-left space-y-1">
                <h4 className="text-xl font-black text-slate-800">Learn Grammar with Videos! 🍿</h4>
                <p className="text-sm text-slate-500 font-medium">Watch bitesize animation tutorials. Complete each video to claim instant <span className="font-extrabold text-fun-pink">+25 XP</span>!</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filteredVideos.map((video) => {
                const watched = videoWatchedCompleted.includes(video.id);
                const claimed = videoPointsClaimed.includes(video.id);
                
                return (
                  <div 
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className="bg-white rounded-[2rem] border-4 border-slate-100 overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col cursor-pointer group"
                  >
                    <div className="relative h-48 bg-slate-900 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                      <div className="absolute top-4 left-4 z-20 flex gap-2">
                        <span className="px-3 py-1 bg-fun-blue text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow">
                          {video.level}
                        </span>
                        <span className="px-3 py-1 bg-slate-800 text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow">
                          {video.topic}
                        </span>
                      </div>
                      
                      {watched && (
                        <div className="absolute top-4 right-4 z-20 bg-fun-green text-white px-2.5 py-1 rounded-full text-[10px] font-black shadow flex items-center gap-1">
                          <Check size={12} strokeWidth={3} /> WATCHED
                        </div>
                      )}

                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
                      
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center z-20 ring-4 ring-white/10 group-hover:scale-110 group-hover:bg-white group-hover:text-fun-blue transition-all shadow-lg">
                        <Play size={24} fill="currentColor" className="ml-1" />
                      </div>

                      <div className="absolute bottom-4 right-4 z-20 text-white font-mono text-xs bg-black/60 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                        <Clock size={12} />
                        {video.duration}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-black text-slate-800 leading-tight group-hover:text-fun-blue transition-colors mb-2">
                          {video.title}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium line-clamp-2 mb-4">
                          {video.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t-2 border-slate-50">
                        <div className="flex items-center gap-2">
                          <img src={video.tutorAvatar} alt="tutor" className="w-8 h-8 rounded-full border border-slate-100 shadow-sm" />
                          <div>
                            <p className="font-bold text-xs text-slate-800 leading-none">{video.tutor}</p>
                            <span className="text-[10px] text-slate-450 font-mono">{video.views}</span>
                          </div>
                        </div>
                        <div className={`flex items-center gap-1 font-black text-xs ${claimed ? 'text-fun-green' : 'text-fun-pink animate-pulse'}`}>
                          <Sparkles size={14} />
                          {claimed ? "Claimed!" : "+25 XP"}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredVideos.length === 0 && (
                <div className="col-span-full text-center py-12 text-slate-400 font-bold bg-white rounded-[2rem] border-4 border-dashed border-slate-200">
                  <Tv size={48} className="mx-auto mb-4 opacity-50 text-slate-300" />
                  <p>Check back soon! Video lessons for level {selectedLevel} are being generated by our teachers. 📚</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Video Tutorial Modal Overlay */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-white flex flex-col pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Embedded Player frame */}
                <div className="relative aspect-video w-full bg-slate-950 overflow-hidden rounded-t-[2.2rem]">
                  <ReactPlayer 
                    url={selectedVideo.videoUrl} 
                    controls 
                    playing
                    width="100%"
                    height="100%"
                    onEnded={() => markVideoAsWatched(selectedVideo.id)}
                  />
                  
                  {/* Exit overlay */}
                  <button 
                    onClick={() => setSelectedVideo(null)}
                    className="absolute top-4 right-4 z-40 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 block font-bold text-sm transition-colors"
                  >
                    ✕ Close
                  </button>
                </div>

                {/* Video Info Details */}
                <div className="p-8 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-100 pb-4">
                    <div>
                      <div className="flex gap-2 mb-2">
                        <span className="px-2.5 py-0.5 bg-fun-blue text-white rounded-full text-[10px] font-black uppercase tracking-wider">
                          {selectedVideo.level} • {selectedVideo.topic}
                        </span>
                        {videoWatchedCompleted.includes(selectedVideo.id) && (
                          <span className="px-2.5 py-0.5 bg-fun-green text-white rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                            <Check size={10} strokeWidth={3} /> COMPLETED
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">
                        {selectedVideo.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button 
                        onClick={() => {
                          claimVideoPoints(selectedVideo.id);
                        }}
                        disabled={videoPointsClaimed.includes(selectedVideo.id)}
                        variant={videoPointsClaimed.includes(selectedVideo.id) ? "success" : "primary"}
                        className="px-6 py-3 font-bold text-sm"
                        icon={<Sparkles size={16} />}
                      >
                        {videoPointsClaimed.includes(selectedVideo.id) ? "XP Claimed" : "Claim +25 XP"}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                      <h4 className="font-extrabold text-slate-800 text-lg">About This Concept</h4>
                      <p className="text-slate-600 font-medium leading-relaxed">{selectedVideo.description}</p>
                      
                      <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border-2 border-slate-100">
                        <img src={selectedVideo.tutorAvatar} alt="tutor" className="w-10 h-10 rounded-full border border-slate-200" />
                        <div>
                          <p className="font-black text-slate-800 text-sm">{selectedVideo.tutor}</p>
                          <p className="text-xs text-slate-500">Professional ESL Academy Lead • {selectedVideo.views}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50/50 p-6 rounded-3xl border-2 border-blue-100/60 space-y-3">
                      <h4 className="font-extrabold text-fun-blue text-sm uppercase tracking-wider">Key Takeaways</h4>
                      <ul className="space-y-3">
                        {selectedVideo.keyPoints.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs font-bold text-slate-700">
                            <div className="w-1.5 h-1.5 bg-fun-blue rounded-full mt-1.5 flex-shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Solve Quiz Button */}
                      <div className="pt-4">
                        <Button 
                          onClick={() => {
                            const match = LESSONS.find(l => l.topic === selectedVideo.topic && l.level === selectedVideo.level);
                            if (match) {
                              setSelectedVideo(null);
                              handleStartLesson(match);
                            } else {
                              alert("No direct lesson quiz found for this unit. Start standard lessons instead.");
                            }
                          }}
                          className="w-full text-xs font-black py-2"
                        >
                          Practice Quiz →
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // --- RENDER: EXPLANATION ---
  if (phase === 'explanation' && selectedLesson) {
    const hasParts = selectedLesson.explanationParts && selectedLesson.explanationParts.length > 0;
    const currentPart = hasParts ? selectedLesson.explanationParts![currentExplanationPartIndex] : selectedLesson.explanation;
    const totalParts = hasParts ? selectedLesson.explanationParts!.length : 1;
    
    // Translation handling for parts
    let currentTranslationPart = null;
    if (preferredLanguage && preferredLanguage !== 'English' && selectedLesson.translations && selectedLesson.translations[preferredLanguage]) {
        const trans = selectedLesson.translations[preferredLanguage];
        if (trans.explanationParts && trans.explanationParts.length > currentExplanationPartIndex) {
            currentTranslationPart = trans.explanationParts[currentExplanationPartIndex];
        } else if (currentExplanationPartIndex === 0) {
            currentTranslationPart = trans.explanation;
        }
    }

    const currentVid = getVideoForLesson(selectedLesson);

    const handleNextPart = () => {
        if (hasParts && currentExplanationPartIndex < selectedLesson.explanationParts!.length - 1) {
            setCurrentExplanationPartIndex(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            handleStartQuiz();
        }
    };

    const handlePrevPart = () => {
        if (currentExplanationPartIndex > 0) {
            setCurrentExplanationPartIndex(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
      <div className="max-w-3xl mx-auto animate-fade-in pb-20 px-4">
        <div className="flex items-center justify-between mb-6">
            <button onClick={handleBackToList} className="flex items-center text-slate-400 hover:text-slate-600 font-bold transition-colors">
                <ArrowLeft size={20} className="mr-2" /> Back {preferredLanguage && preferredLanguage !== 'English' && <span className="ml-1 opacity-70">({t('back')})</span>}
            </button>
            {hasParts && (
                <div className="text-slate-400 font-black text-sm uppercase tracking-widest">
                    Part {currentExplanationPartIndex + 1} of {totalParts}
                </div>
            )}
        </div>
        
        <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border-4 border-slate-100 shadow-xl relative overflow-hidden">
          {/* Progress Bar for Parts */}
          {hasParts && (
              <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentExplanationPartIndex + 1) / totalParts) * 100}%` }}
                    className="h-full bg-fun-blue"
                  />
              </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className={`inline-block ${LEVELS.find(l => l.id === selectedLesson.level)?.color} text-white px-4 py-1 rounded-full font-black text-xs uppercase tracking-widest shadow-sm`}>
              {selectedLesson.level} • {selectedLesson.topic}
            </div>
            
            {/* Interactive Mode Toggle */}
            <div className="flex p-0.5 bg-slate-100 rounded-full border border-slate-200">
              <button
                type="button"
                onClick={() => setExplanationMode('text')}
                className={`px-3 py-1.5 rounded-full text-xs font-black transition-all ${
                  explanationMode === 'text' 
                    ? 'bg-white text-slate-800 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                📖 Textbook
              </button>
              <button
                type="button"
                onClick={() => setExplanationMode('video')}
                className={`px-3 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1 ${
                  explanationMode === 'video' 
                    ? 'bg-white text-fun-pink shadow-sm' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <span>🎥 Video Tutor</span>
              </button>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-8">{selectedLesson.title}</h2>
          
          <AnimatePresence mode="wait">
            {explanationMode === 'text' ? (
              <motion.div 
                key="text-explanation"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="prose prose-lg max-w-none min-h-[200px]"
              >
                {currentPart}
              </motion.div>
            ) : (
              <motion.div 
                key="video-explanation"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Embed Video in explanation */}
                <div className="relative aspect-video w-full bg-slate-950 overflow-hidden rounded-[2rem] border-4 border-slate-100 shadow-lg">
                  <ReactPlayer 
                    url={currentVid.videoUrl} 
                    controls 
                    width="100%"
                    height="100%"
                    onEnded={() => {
                      awardPoints(15, `Watched lesson explainer: ${selectedLesson.title}`, 'grammar');
                    }}
                  />
                </div>

                <div className="bg-pink-50/50 p-6 rounded-[2rem] border-2 border-pink-100/60">
                  <h4 className="font-extrabold text-fun-pink mb-2 text-sm uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={16} /> Tutor Highlights • {currentVid.tutor}
                  </h4>
                  <ul className="space-y-2">
                    {currentVid.keyPoints.map((pt, idx) => (
                      <li key={idx} className="text-sm font-bold text-slate-700 flex items-start gap-2">
                        <span className="text-fun-pink">✔</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {currentTranslationPart && explanationMode === 'text' && (
            <div className="mt-8 border-t-2 border-slate-100 pt-8">
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 animate-fade-in">
                    <h4 className="font-bold text-fun-blue mb-4 flex items-center">
                        <Globe size={20} className="mr-2" /> 
                        {t('support_language')}: {selectedLesson.translations![preferredLanguage!].title}
                    </h4>
                    <div className="prose prose-blue max-w-none whitespace-pre-wrap text-slate-700">
                        {currentTranslationPart}
                    </div>
                </div>
            </div>
          )}

          <div className="mt-12 flex justify-between items-center">
            {currentExplanationPartIndex > 0 ? (
                <Button onClick={handlePrevPart} variant="secondary" className="px-6 py-4">
                    Previous
                </Button>
            ) : <div />}

            <Button onClick={handleNextPart} className="px-8 py-4 text-lg" icon={currentExplanationPartIndex === totalParts - 1 ? <Sparkles size={24} /> : <ChevronRight size={24} />}>
              {currentExplanationPartIndex === totalParts - 1 
                ? `Start Practice ${preferredLanguage && preferredLanguage !== 'English' ? `(${t('start_practice')})` : ''}`
                : "Next Part"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: QUIZ ---
  if (phase === 'quiz' && selectedLesson) {
    const exercise = selectedLesson.exercises[currentExerciseIndex];
    const progress = ((currentExerciseIndex) / selectedLesson.exercises.length) * 100;

    return (
      <div className="max-w-3xl mx-auto animate-fade-in pb-20 px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={handleBackToList} className="flex items-center text-slate-400 hover:text-slate-600 font-bold transition-colors font-sans decoration-transparent">
              <ArrowLeft size={20} className="mr-2" /> Quit
            </button>
            <button 
              onClick={() => setIsHelpRequested(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-black transition-all ${
                isHelpRequested 
                  ? 'bg-fun-green text-white shadow-md' 
                  : 'bg-white border-2 border-slate-100 text-slate-400 hover:border-fun-blue hover:text-fun-blue'
              }`}
            >
              <LifeBuoy size={18} />
              {isHelpRequested ? 'Help Requested!' : 'Request Help'}
            </button>
          </div>
          <div className="text-slate-500 font-bold">
            Question {currentExerciseIndex + 1} of {selectedLesson.exercises.length}
          </div>
        </div>

        {isHelpRequested && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-fun-blue/10 border-2 border-fun-blue/20 rounded-2xl flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-fun-blue text-white rounded-full flex items-center justify-center shadow-md">
              <Star size={24} />
            </div>
            <div>
              <p className="font-black text-slate-800">Hang tight! 🚀</p>
              <p className="text-sm text-slate-600 font-medium">A teacher has been notified and will assist you shortly.</p>
            </div>
            <button 
              onClick={() => setIsHelpRequested(false)}
              className="ml-auto text-slate-400 hover:text-slate-600 font-bold text-xs"
            >
              Dismiss
            </button>
          </motion.div>
        )}

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-3 rounded-full mb-8 overflow-hidden">
          <div className="bg-fun-blue h-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        
        <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border-4 border-slate-100 shadow-xl">
          <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-8 leading-tight">
            {exercise.question}
          </h3>

          <div className="space-y-4">
            {exercise.type === 'multiple-choice' && exercise.options ? (
              <div className="grid grid-cols-1 gap-4">
                {exercise.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => !feedback && setUserAnswer(option)}
                    disabled={feedback !== null}
                    className={`p-5 rounded-2xl border-4 text-left font-bold text-xl transition-all ${
                      userAnswer === option 
                        ? 'border-fun-blue bg-blue-50 text-fun-blue' 
                        : 'border-slate-100 hover:border-slate-300 text-slate-700 bg-white'
                    } ${feedback !== null && option === exercise.correctAnswer ? 'border-fun-green bg-green-50 text-fun-green' : ''}
                      ${feedback !== null && userAnswer === option && !feedback.isCorrect ? 'border-red-400 bg-red-50 text-red-500' : ''}
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={feedback !== null}
                  placeholder="Type your answer here..."
                  className="w-full p-5 rounded-2xl border-4 border-slate-200 text-xl font-bold text-slate-800 focus:border-fun-blue focus:outline-none transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && userAnswer.trim() && !feedback) {
                      handleSubmitAnswer();
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* Action Area */}
          <div className="mt-10 min-h-[100px]">
            {!feedback ? (
              <Button 
                onClick={handleSubmitAnswer} 
                disabled={!userAnswer.trim()}
                className="w-full py-4 text-xl"
              >
                Check Answer
              </Button>
            ) : (
              <div className={`p-6 rounded-2xl border-4 animate-fade-in ${feedback.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full ${feedback.isCorrect ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                    {feedback.isCorrect ? <CheckCircle size={24} /> : <span className="font-black text-xl px-2">!</span>}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-black text-xl mb-1 ${feedback.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                      {feedback.isCorrect ? 'Excellent!' : 'Not quite!'}
                    </h4>
                    <p className={feedback.isCorrect ? 'text-green-700' : 'text-red-700'}>
                      {feedback.message}
                    </p>
                  </div>
                  <Button onClick={handleNextExercise} variant={feedback.isCorrect ? 'success' : 'primary'}>
                    {currentExerciseIndex < selectedLesson.exercises.length - 1 ? 'Next' : 'Finish'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: COMPLETED ---
  if (phase === 'completed' && selectedLesson) {
    return (
      <div className="max-w-2xl mx-auto text-center animate-fade-in pb-20 pt-10 px-4">
        <Confetti />
        <div className="w-32 h-32 bg-fun-yellow rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl border-8 border-white animate-bounce-slow">
          <Award size={64} className="text-orange-500" />
        </div>
        <h2 className="text-5xl font-black text-slate-800 mb-4 tracking-tight">Lesson Complete!</h2>
        <p className="text-2xl font-bold text-slate-500 mb-8">You mastered: {selectedLesson.title}</p>
        
        <div className="bg-white p-8 rounded-[3rem] border-4 border-slate-100 shadow-xl mb-10">
          <div className="flex items-center justify-center gap-4 text-fun-blue font-black text-2xl">
            <Sparkles /> +100 XP Earned! <Sparkles />
          </div>
        </div>

        <Button onClick={handleBackToList} className="px-12 py-5 text-xl">
          Back to Lessons
        </Button>
      </div>
    );
  }

  return null;
};

export default GrammarLessons;
