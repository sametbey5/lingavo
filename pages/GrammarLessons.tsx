import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { 
  BookOpen, 
  CheckCircle,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
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
  AlertCircle,
  Flame,
  Zap,
  Bell,
  MessageSquare,
  Mail,
  PlayCircle,
  Trophy,
  LayoutGrid,
  TrendingUp,
  MapPin,
  SearchCheck,
  Mic,
  Volume2,
  Bookmark,
  XCircle,
  ThumbsUp,
  ThumbsDown,
  Star as StarIcon,
  Puzzle,
  Search,
  Edit2,
  Brain,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactPlayer from 'react-player';
import Button from '../components/Button';
import { useGamification } from '../context/GamificationContext';
import Confetti from '../components/Confetti';
import { UI_TRANSLATIONS } from '../translations';

import defaultLessonImage from '../src/assets/images/alphabettitle.png';
import { LESSONS, Lesson, Level, Exercise } from '../components/grammarLessonsData';

const firstScreenImages = import.meta.glob('../src/assets/images/*firstscreen*.{png,jpg,jpeg,svg}', { eager: true, import: 'default' });

const LEVELS: { id: Level; title: string; desc: string; color: string; hex: string }[] = [
  { id: 'A1', title: 'Beginner', desc: 'Essential foundations', color: 'bg-blue-500', hex: '#5D8EF7' },
  { id: 'A2', title: 'Elementary', desc: 'Basic communication', color: 'bg-blue-500', hex: '#5FB2E2' },
  { id: 'B1', title: 'Intermediate', desc: 'Everyday fluency', color: 'bg-cyan-500', hex: '#5FBF9B' },
  { id: 'B2', title: 'Upper Int.', desc: 'Complex ideas', color: 'bg-indigo-500', hex: '#D3B15A' },
  { id: 'C1', title: 'Advanced', desc: 'Professional mastery', color: 'bg-purple-500', hex: '#D7915D' },
  { id: 'C2', title: 'Proficiency', desc: 'Native-like nuance', color: 'bg-pink-500', hex: '#D16B6B' },
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
    title: 'Unit 1 — Present “to be” (am, is, are)',
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

import LessonTemplate from '../components/LessonTemplate';

const InteractiveExplanationScreen: React.FC<{
  lesson: Lesson;
  onNext: () => void; 
  onBack: () => void;
  stats: any;
  t: (k: string) => string;
  preferredLanguage: string;
  awardPoints: (amt: number, desc: string, category: 'grammar'|'vocabulary'|'speaking'|'listening'|'realLife') => void;
}> = ({lesson, onNext, onBack, t, preferredLanguage, awardPoints}) => {
  const [pageIndex, setPageIndex] = useState(0);
  const totalPages = 10;
  
  // Custom theme colors by level
  const themeColors: Record<Level, {from: string; to: string; shadow: string; bg: string; text: string; hex?: string; textHex?: string}> = {
    'A1': {from: 'from-[#8FB8FF]', to: 'to-[#8FB8FF]', shadow: 'shadow-[#8FB8FF]/30', bg: 'bg-[#5D8EF7]', text: 'text-[#ffffff]', hex: '#5D8EF7', textHex: '#ffffff'},
    'A2': {from: 'from-[#7FD6FF]', to: 'to-[#7FD6FF]', shadow: 'shadow-[#7FD6FF]/30', bg: 'bg-[#5FB2E2]', text: 'text-[#ffffff]', hex: '#5FB2E2', textHex: '#ffffff'},
    'B1': {from: 'from-[#8DE0C1]', to: 'to-[#8DE0C1]', shadow: 'shadow-[#8DE0C1]/30', bg: 'bg-[#5FBF9B]', text: 'text-[#ffffff]', hex: '#5FBF9B', textHex: '#ffffff'},
    'B2': {from: 'from-[#FFE38A]', to: 'to-[#FFE38A]', shadow: 'shadow-[#FFE38A]/30', bg: 'bg-[#D3B15A]', text: 'text-[#ffffff]', hex: '#D3B15A', textHex: '#ffffff'},
    'C1': {from: 'from-[#FFC48C]', to: 'to-[#FFC48C]', shadow: 'shadow-[#FFC48C]/30', bg: 'bg-[#D7915D]', text: 'text-[#ffffff]', hex: '#D7915D', textHex: '#ffffff'},
    'C2': {from: 'from-[#FF8A7A]', to: 'to-[#FF8A7A]', shadow: 'shadow-[#FF8A7A]/30', bg: 'bg-[#D16B6B]', text: 'text-[#ffffff]', hex: '#D16B6B', textHex: '#ffffff'},
  };
  
  const theme = themeColors[lesson.level] || themeColors['A1'];

  // Subpages handling
  if (pageIndex > 0) {
    const isAnimal = lesson.title === 'Alphabet' || lesson.title === 'Animals';
    const words = isAnimal ? ['Dog', 'Cat', 'Elephant', 'Lion', 'Tiger', 'Bear', 'Monkey', 'Rabbit', 'Fox', 'Deer'] :
       ['Hello', 'Goodbye', 'Please', 'Thank you', 'Yes', 'No', 'Water', 'Food', 'Help', 'Friend'];
    const emojis = isAnimal ? ['🐶', '🐱', '🐘', '🦁', '🐯', '🐻', '🐵', '🐰', '🦊', '🦌'] :
       ['👋', '👋', '🙏', '🙏', '👍', '👎', '💧', '🍔', '🆘', '🤝'];
    const word = words[pageIndex - 1];
    const emoji = emojis[pageIndex - 1];

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
       <div className="fixed inset-0 z-[100] w-full h-[100dvh] flex flex-col font-sans bg-slate-50 pb-6 overflow-hidden">
         {/* Top Bar with progress */}
         <div className="px-5 py-4 flex items-center justify-between shrink-0 bg-transparent z-10 relative">
            <button onClick={() => setPageIndex(pageIndex - 1)} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
               </svg>
            </button>
            <div className="flex-1 flex justify-center px-4">
                <div className="w-full max-w-[200px] h-3 bg-slate-200/60 rounded-full overflow-hidden flex">
                   <div className={`h-full bg-gradient-to-r ${theme.from} ${theme.to} rounded-full transition-all duration-300`} style={{width: `${((pageIndex) / totalPages) * 100}%`}}></div>
                </div>
            </div>
            <div className="flex items-center">
                <div className="w-6 h-6"></div> {/* Spacer for perfect centering */}
            </div>
         </div>

         {/* Content */}
         <div className="flex-1 px-4 sm:px-6 md:px-8 max-w-xl mx-auto w-full flex flex-col items-center justify-center shrink-0 py-8 relative">
             <motion.div 
               key={`page-${pageIndex}`}
               initial={{ opacity: 0, scale: 0.95, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               className="w-full aspect-square max-h-[340px] bg-white rounded-[48px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] flex items-center justify-center border border-slate-100 relative group mb-10"
             >
                 <button onClick={playAudio} className={`absolute top-6 right-6 w-14 h-14 bg-slate-50 hover:bg-slate-100 ${theme.text} rounded-full flex items-center justify-center transition-colors shadow-sm`}>
                     <Volume2 size={26} fill="currentColor" />
                 </button>
                 <span className="text-[140px] leading-none select-none filter drop-shadow-sm">{emoji}</span>
             </motion.div>
             
             <motion.div 
               key={`text-${pageIndex}`}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-center"
             >
                 <h2 className="text-[44px] sm:text-[52px] font-bold text-slate-800 mb-3 tracking-tight leading-none">{word}</h2>
                 <p className="text-xl text-slate-400 font-medium tracking-wide uppercase">{lesson.topic}</p>
             </motion.div>
         </div>

         {/* Footer */}
         <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-slate-50 via-slate-50/100 to-transparent pointer-events-none z-50 flex flex-col items-center pb-8 pt-12">
            <div className="max-w-[400px] w-full pointer-events-auto">
               <button onClick={() => {
                  if (pageIndex < totalPages) {
                      setPageIndex(pageIndex + 1);
                      awardPoints(5, "Word learned", "vocabulary");
                  } else {
                      onNext();
                  }
               }} className={`w-full py-4 bg-gradient-to-r ${theme.from} ${theme.to} hover:opacity-90 shadow-[0_4px_15px_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-1 transition-all rounded-full flex items-center justify-center text-white border-0`}>
                  <span className="font-semibold text-[17px] tracking-wide">{pageIndex === totalPages ? 'Finish' : 'Continue'}</span>
               </button>
            </div>
         </div>
       </div>
    );
  }

  // 1. Objectives (matching structure from new image)
  const isAlphabet = lesson.id === 'a1-m1-l1' || lesson.title === 'Alphabet';
  
  const customAlphabetObjectives = [
     { icon: <BookOpen size={24} fill="currentColor" />, title: "Learn all 26 letters", desc: "Discover every English letter" },
     { icon: <Volume2 size={24} fill="currentColor" />, title: "Listen to the sounds", desc: "Improve your hearing" },
     { icon: <Search size={24} fill="currentColor" />, title: "Recognize letters", desc: "Identify them in words" },
     { icon: <Edit2 size={24} fill="currentColor" />, title: "Practice spelling", desc: "Form simple words" },
  ];

  const objectives = isAlphabet ? customAlphabetObjectives : [
     { icon: <BookOpen size={24} fill="currentColor" />, title: "Learn new words", desc: `Discover new ${lesson.topic.toLowerCase()} terms` },
     { icon: <Volume2 size={24} fill="currentColor" />, title: "Listen & repeat", desc: "Improve pronunciation" },
     { icon: <Puzzle size={24} fill="currentColor" />, title: "Practice", desc: "Use words in exercises" },
     { icon: <Brain size={24} fill="currentColor" />, title: "Remember", desc: "Review and strengthen" }
  ];

  // 2. Key Rule
  let ruleText = lesson.translations && lesson.translations[preferredLanguage] && lesson.translations[preferredLanguage].title 
        ? `${lesson.title}\n(${lesson.translations[preferredLanguage].title})`
        : `Vowels\nEvery English word must have at least one vowel.`;

  // 3. Examples
  const examples = lesson.exercises && lesson.exercises.length > 0 
      ? lesson.exercises.slice(0, 4).map((ex, i) => ({
         visual: ex.correctAnswer.charAt(0).toUpperCase() || ['A', 'B', 'C', 'D'][i % 4],
         text: ex.correctAnswer,
         subtext: ex.question.replace('_____', '...').replace('...', '_____')
      }))
      : [
         { visual: "🐱", text: "Cat" },
         { visual: "🐶", text: "Dog" },
         { visual: "🐘", text: "Elephant" }
      ];

  // Choose illustration
  let illustration = defaultLessonImage;
  const lessonIdLower = lesson.id.toLowerCase(); // e.g. "a1-m1-l1"
  
  // Try to find a custom image matching: a1-m1-l1firstscreen or a1-1firstscreen
  // Usually m1 = unit 1, l1 = lesson 1, so a1-1firstscreen might be meant for a1-m1-l1.
  const match = lessonIdLower.match(/^([a-z0-9]+)-m(\d+)-l(\d+)$/);
  const possibleNames = [
     `${lessonIdLower}firstscreen`,
     `${lessonIdLower}-firstscreen`
  ];
  if (match) {
     possibleNames.push(`${match[1]}-${match[3]}firstscreen`);
     possibleNames.push(`${match[1]}-${match[3]}-firstscreen`);
     possibleNames.push(`${match[1]}-m${match[2]}-l${match[3]}firstscreen`);
  }

  const foundKey = Object.keys(firstScreenImages).find(path => {
     const filename = path.split('/').pop()?.split('.')[0].toLowerCase() || '';
     return possibleNames.includes(filename);
  });

  if (foundKey) {
     illustration = firstScreenImages[foundKey] as string;
  }

  return (
    <LessonTemplate
       title={isAlphabet ? "Alphabet" : lesson.title}
       subtitle={isAlphabet ? "Learn the 26 English letters and their sounds." : (lesson.rawExplanation || `Learn 15 common animal names.`)}
       category={isAlphabet ? "ALPHABET" : lesson.topic}
       level={lesson.level}
       lessonNumber={parseInt(lesson.id.split('l')[1] || '1')}
       themeColor={theme}
       illustrationUrl={illustration}
       objectives={objectives}
       keyRule={null as any}
       examples={[]}
       chunks={[]}
       onContinue={() => setPageIndex(1)}
       onBack={onBack}
       continueLabel="Continue"
    />
  );
};

const GrammarLessons: React.FC = () => {
  const { awardPoints, cefrLevel, updateProfile, preferredLanguage, stats, markGrammarLessonCompleted } = useGamification();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const playNextSound = () => {
    try { new Audio('https://actions.google.com/sounds/v1/ui/button_click.ogg').play().catch(() => {}); } catch(e) {}
  };

  const playWinSound = () => {
    try { new Audio('https://actions.google.com/sounds/v1/cartoon/cartoon_success_fanfare.ogg').play().catch(() => {}); } catch(e) {}
  };

  const t = (key: string) => UI_TRANSLATIONS[preferredLanguage]?.[key] || UI_TRANSLATIONS['Turkish']?.[key] || key;

  const [selectedLevel, setSelectedLevel] = useState<Level>(cefrLevel || 'A1');
  const [currentLessonPage, setCurrentLessonPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'lessons' | 'videos'>('lessons');
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);
  const [showOtherLevels, setShowOtherLevels] = useState(false);
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

  useEffect(() => {
    const lessonIdParam = searchParams.get('lessonId');
    if (lessonIdParam) {
      const lesson = LESSONS.find(l => l.id === lessonIdParam);
      if (lesson) {
        setSelectedLevel(lesson.level);
        setSelectedLesson(lesson);
        setPhase('explanation');
        setExplanationMode('text');
        setCurrentExerciseIndex(0);
        setCurrentExplanationPartIndex(0);
        setFeedback(null);
        setUserAnswer('');
        setIsHelpRequested(false);
      }
    }
  }, [searchParams]);
  
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
  const [completedLessons, setCompletedLessons] = useState<string[]>(stats?.completedGrammar || []);

  useEffect(() => {
    if (stats?.completedGrammar) {
      setCompletedLessons(stats.completedGrammar);
    }
  }, [stats?.completedGrammar]);

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

  const handleNextExercise = async () => {
    playNextSound();
    if (!selectedLesson) return;
    
    if (currentExerciseIndex < selectedLesson.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setUserAnswer('');
      setFeedback(null);
    } else {
      playWinSound();
      setPhase('completed');
      if (!completedLessons.includes(selectedLesson.id)) {
        const nextCompleted = [...completedLessons, selectedLesson.id];
        setCompletedLessons(nextCompleted);
        
        markGrammarLessonCompleted(selectedLesson.id);
        
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
    
    // Determine overall progress for the selected module
    const levelCompletedCount = filteredLessons.filter(l => completedLessons.includes(l.id)).length;
    const levelProgressScore = filteredLessons.length > 0 ? Math.round((levelCompletedCount / filteredLessons.length) * 100) : 0;
    
    const getTopicIcon = (topic: string) => {
      const lower = topic.toLowerCase();
      if (lower.includes('verb') || lower.includes('continuous') || lower.includes('action') || lower.includes('tense')) return <Zap size={20} />;
      if (lower.includes('pronoun') || lower.includes('conversation')) return <MessageSquare size={20} />;
      if (lower.includes('article') || lower.includes('writing') || lower.includes('email')) return <Mail size={20} />;
      if (lower.includes('time') || lower.includes('past') || lower.includes('future')) return <PlayCircle size={20} />;
      if (lower.includes('place') || lower.includes('location')) return <MapPin size={20} />;
      if (lower.includes('noun')) return <LayoutGrid size={20} />;
      return <BookOpen size={20} />;
    };

    const getTopicColor = (topic: string) => {
      const lower = topic.toLowerCase();
      if (lower.includes('verb') || lower.includes('action') || lower.includes('tense')) return 'bg-orange-100 text-orange-600 border border-orange-200';
      if (lower.includes('pronoun') || lower.includes('conversation')) return 'bg-purple-100 text-purple-600 border border-purple-200';
      if (lower.includes('article') || lower.includes('writing') || lower.includes('email')) return 'bg-blue-100 text-blue-600 border border-blue-200';
      if (lower.includes('time') || lower.includes('future') || lower.includes('past')) return 'bg-pink-100 text-pink-600 border border-pink-200';
      if (lower.includes('noun')) return 'bg-teal-100 text-teal-600 border border-teal-200';
      return 'bg-emerald-100 text-emerald-600 border border-emerald-200';
    };

    return (
      <div className="h-full bg-[#F7F9FC] pb-24 font-sans selection:bg-fun-blue/20">
<div className="max-w-6xl mx-auto px-4 py-2 sm:py-4 lg:flex lg:gap-10 justify-center">
           {/* MAIN LEARNING AREA */}
           <div className="flex-1 max-w-3xl space-y-8">
               
               {/* TITLE SECTION */}
               <div className="text-center sm:text-left space-y-1 mt-0 px-2">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight uppercase drop-shadow-sm">
                     Grammar Academy
                  </h1>
                  <p className="text-slate-500 font-bold text-sm sm:text-base">
                     Master English grammar step by step
                  </p>
               </div>

               {/* LEVEL PROGRESS CARD */}
               {(() => {
                 const currentLevelDetails = LEVELS.find(l => l.id === selectedLevel);
                 const lvlLessons = LESSONS.filter(l => l.level === selectedLevel);
                 const completedCount = lvlLessons.filter(l => completedLessons.includes(l.id)).length;
                 const progressPercentage = lvlLessons.length > 0 ? Math.round((completedCount / lvlLessons.length) * 100) : 0;
                 
                 return (
                   <div className="flex flex-col gap-3">
                     <div className="bg-white rounded-[1.5rem] p-5 sm:p-6 border-2 border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10 mx-1">
                        <div className="flex items-center gap-4">
                           <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 text-white font-black text-2xl shadow-inner border-2 border-white" style={{ backgroundColor: currentLevelDetails?.hex }}>
                             {selectedLevel}
                           </div>
                           <div>
                              <h3 className="text-xl sm:text-2xl font-black text-slate-800">{currentLevelDetails?.title} Level</h3>
                              <p className="text-slate-500 font-bold text-sm">{currentLevelDetails?.desc}</p>
                           </div>
                        </div>
                        <div className="w-full sm:w-48 bg-slate-100 rounded-full h-3 overflow-hidden shadow-inner">
                           <div 
                             className="h-full rounded-full transition-all duration-1000" 
                             style={{ width: `${Math.max(5, progressPercentage)}%`, backgroundColor: currentLevelDetails?.hex }}
                           />
                        </div>
                     </div>
                     <button
                        onClick={() => setShowOtherLevels(!showOtherLevels)}
                        className="self-center px-6 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 bg-white border-2 border-slate-200 rounded-full hover:bg-slate-50 transition-colors flex items-center justify-center shadow-sm z-10"
                     >
                        {showOtherLevels ? 'Hide other levels' : 'Show other levels'}
                        <ChevronDown size={16} className={`ml-1 transform transition-transform ${showOtherLevels ? 'rotate-180' : ''}`} />
                     </button>
                   </div>
                 );
               })()}

               {/* OTHER LEVELS (CONDITIONAL) */}
               {showOtherLevels && (
                 <div className="px-1 relative z-10 w-full mt-4">
                   <div className="grid grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 w-full">
                        {LEVELS.map((lvl) => {
                          const locked = isLevelLocked(lvl.id);
                          const isActive = selectedLevel === lvl.id;
                          const lvlLessons = LESSONS.filter(l => l.level === lvl.id);
                          const completedCount = lvlLessons.filter(l => completedLessons.includes(l.id)).length;
                          const progressPercentage = lvlLessons.length > 0 ? Math.round((completedCount / lvlLessons.length) * 100) : 0;
                          
                          return (
                            <div key={lvl.id} className={`flex flex-col gap-2 w-full ${locked ? 'opacity-50 grayscale' : ''}`}>
                              <button
                                onClick={() => {
                                  if (!locked) {
                                    setSelectedLevel(lvl.id);
                                    setCurrentLessonPage(1);
                                    setShowOtherLevels(false);
                                  }
                                }}
                                disabled={locked}
                                style={isActive ? { backgroundColor: lvl.hex, borderColor: lvl.hex, color: 'white' } : {}}
                                className={`flex flex-col justify-center items-center py-2.5 rounded-xl transition-all duration-300 w-full border-2 shadow-sm ${
                                  isActive 
                                    ? 'scale-105 shadow-md ring-2 ring-offset-2' 
                                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-bold'
                                } ${locked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                              >
                                 <div className="flex items-center gap-1.5">
                                   <span className="text-sm sm:text-base font-black">{lvl.id}</span>
                                   {locked && <Lock size={12} className={isActive ? "text-white" : "text-slate-400"} />}
                                 </div>
                              </button>
                              
                              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden hidden sm:block">
                                 <div 
                                   className={`h-full rounded-full transition-all duration-1000 ${!isActive ? 'bg-slate-400' : ''}`} 
                                   style={{ width: `${Math.max(5, progressPercentage)}%`, ...(isActive ? { backgroundColor: lvl.hex } : {}) }}
                                 />
                              </div>
                            </div>
                          );
                        })}
                   </div>
                 </div>
               )}

               {/* VISUAL PROGRESSION PATH */}
               <div className="relative pt-8 pb-12 sm:pt-10 ml-4 sm:ml-10">
                  <div className="flex flex-col w-full">
                     {filteredLessons.map((lesson, idx) => {
                       const isCompleted = completedLessons.includes(lesson.id);
                       const isExam = lesson.id.includes('exam');
                       const iconProps = getTopicColor(lesson.topic);
                       const isUpNext = !isCompleted && (idx === 0 || completedLessons.includes(filteredLessons[idx - 1]?.id));
                       
                       return (
                         <div key={lesson.id} className="group flex items-stretch gap-5 sm:gap-8 relative z-10 w-full max-w-2xl min-h-[130px] pb-6 sm:pb-8">
                             {/* Path Node */}
                             <div className="relative shrink-0 flex flex-col items-center w-14 sm:w-16">
                                <div className={`w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-full flex items-center justify-center border-[6px] border-[#F7F9FC] shadow-sm transition-all duration-300 transform group-hover:scale-110 relative z-20
                                  ${isCompleted ? 'bg-fun-green text-white border-fun-green-100' : isUpNext ? 'bg-fun-blue text-white shadow-fun-blue/30 ring-4 ring-fun-blue/20' : 'bg-slate-200 text-slate-400 border-slate-300 shadow-inner'}
                                `}>
                                   {isCompleted ? <Check size={28} strokeWidth={4} /> : <div className="font-black text-lg sm:text-xl">{idx + 1}</div>}
                                </div>
                                {isUpNext && (
                                   <div className="absolute top-0 w-14 h-14 sm:w-16 sm:h-16 bg-fun-blue rounded-full animate-ping opacity-20 z-10" />
                                )}
                                {/* Connecting line to next node */}
                                {idx < filteredLessons.length - 1 && (
                                  <div className={`w-2.5 flex-1 rounded-full -mt-2 -mb-8 sm:-mb-10 z-0 ${isCompleted ? 'bg-fun-green' : 'bg-slate-200 shadow-inner border border-slate-300'}`} />
                                )}
                             </div>

                             {/* Lesson Card */}
                             <div 
                               onClick={() => handleStartLesson(lesson)}
                               className={`flex-1 min-w-0 p-4 sm:p-5 rounded-[1.5rem] bg-white transition-all duration-300 cursor-pointer hover:-translate-y-1 relative group w-full flex flex-col sm:flex-row sm:min-h-[130px]
                                 ${isCompleted 
                                   ? 'border-b-[4px] border-slate-300 border-x border-t border-x-slate-200 border-t-slate-200 shadow-sm opacity-90' 
                                   : isUpNext
                                     ? 'border-b-[5px] border-fun-blue border-x-2 border-t-2 border-x-fun-blue/20 border-t-fun-blue/20 shadow-lg shadow-fun-blue/10 transform hover:scale-[1.01]'
                                     : 'border-b-[4px] border-slate-200 border-x-[1px] border-t-[1px] border-x-slate-200 border-t-slate-200 shadow-sm hover:border-b-slate-300'
                                 }
                               `}
                             >
                                <div className="w-full h-32 sm:w-32 sm:h-auto bg-slate-100 rounded-xl shrink-0 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 text-slate-400 mb-3 sm:mb-0 sm:mr-4">
                                   <ImageIcon className="mb-1" size={20} />
                                   <span className="text-[10px] font-bold uppercase tracking-wider">Image Idea</span>
                                </div>
                                <div className="flex-1 flex flex-row items-center justify-between gap-4 w-full min-w-0">
                                  <div className="flex-1 min-w-0 pr-1 space-y-1 sm:space-y-1.5 flex flex-col justify-center">
                                    <div className="flex items-center gap-2">
                                      {isExam && <span className="bg-orange-500 text-white text-[9px] uppercase tracking-wider font-black px-1.5 py-0.5 rounded-sm shadow-sm flex items-center gap-1"><Star size={10} fill="currentColor"/> Exam</span>}
                                      <span className={`text-[10px] sm:text-xs font-black uppercase tracking-widest truncate ${isCompleted ? 'text-fun-green' : isUpNext ? 'text-fun-blue' : 'text-slate-400'}`}>
                                        {lesson.topic}
                                      </span>
                                    </div>
                                    <h3 className={`text-lg sm:text-xl font-black truncate leading-tight ${isUpNext ? 'text-fun-blue' : isCompleted ? 'text-slate-800' : 'text-slate-600'}`}>
                                      {lesson.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm font-bold text-slate-400 truncate pt-0.5">{lesson.desc}</p>
                                  </div>
                                  <div className={`hidden sm:flex w-12 h-12 sm:w-14 sm:h-14 rounded-2xl items-center justify-center shrink-0 shadow-inner border border-black/5 ${isCompleted ? 'bg-fun-green/10 text-fun-green border-fun-green/10' : iconProps} group-hover:scale-110 transition-transform duration-300`}>
                                    {getTopicIcon(lesson.topic)}
                                  </div>
                                </div>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 hidden sm:block">
                                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isUpNext ? 'bg-fun-blue text-white' : 'bg-slate-100 text-slate-400'}`}>
                                     <ChevronRight size={18} strokeWidth={3} />
                                   </div>
                                </div>
                             </div>
                         </div>
                       );
                     })}
                  </div>
               </div>

               {/* MODULE UNLOCK SYSTEM */}
               {levelProgressScore < 100 ? (
                 <div className="bg-white p-4 rounded-2xl shadow-sm border-2 border-slate-100 flex flex-row items-center justify-center text-center gap-3 w-full max-w-sm mx-auto">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 shrink-0">
                       <Lock size={16} />
                    </div>
                    <p className="text-sm font-bold text-slate-500">Complete all lessons for the next level</p>
                 </div>
               ) : (
                 <div className="bg-gradient-to-tr from-fun-green to-emerald-400 p-8 sm:p-10 rounded-[2.5rem] shadow-xl text-white flex flex-col sm:flex-row items-center text-center sm:text-left gap-6 sm:gap-8 border-b-[8px] border-black/10 transition-transform hover:scale-[1.01] duration-300 mx-2 sm:mx-0">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl shadow-inner border-2 border-white/30 backdrop-blur-sm shrink-0">
                       🏆
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-black drop-shadow-md">Module Mastered!</h3>
                      <p className="text-sm sm:text-base font-bold text-white/90">You have completed all lessons in this level. You are ready for the next challenge!</p>
                    </div>
                 </div>
               )}
           </div>

           {/* RIGHT SIDE PANELS - DESKTOP ONLY */}
           <div className="hidden lg:flex w-80 shrink-0 flex-col space-y-6 pt-2 h-fit pb-12">
               
               {/* Daily Challenge */}
               <div className="bg-white rounded-[2rem] border-2 border-slate-100 shadow-sm p-6 space-y-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                     <h3 className="font-black text-slate-800 text-xl tracking-tight">Daily Challenge</h3>
                     <Sparkles size={22} className="text-yellow-500 animate-pulse" fill="currentColor" />
                  </div>
                  <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                     <div className="w-14 h-14 bg-fun-purple/10 text-fun-purple rounded-[1.25rem] flex items-center justify-center shrink-0 shadow-inner">
                        <Trophy size={28} fill="currentColor" />
                     </div>
                     <div className="flex-1 space-y-2 py-0.5">
                        <h4 className="font-bold text-sm text-slate-800 leading-tight">Complete 3 Lessons</h4>
                        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden shadow-inner flex">
                           <div className="h-full bg-gradient-to-r from-fun-purple to-purple-400 w-1/3 rounded-full" />
                        </div>
                        <p className="text-xs font-bold text-slate-500">1 / 3 Completed • <span className="text-fun-purple">+50 XP</span></p>
                     </div>
                  </div>
                  <Button variant="secondary" className="w-full py-3 text-sm font-black bg-white border-2 border-slate-200 hover:border-fun-blue hover:text-fun-blue shadow-sm rounded-xl">
                     Play Now
                  </Button>
               </div>

               {/* XP Summary */}
               <div className="bg-white rounded-[2rem] border-2 border-slate-100 shadow-sm p-6 space-y-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                     <h3 className="font-black text-slate-800 text-xl tracking-tight">XP Summary</h3>
                     <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-1 rounded-md uppercase tracking-widest">This Week</span>
                  </div>
                  <div className="h-32 flex items-end justify-between px-2 gap-2.5 mt-4">
                     {[30, 70, 45, 100, 20, 85, 60].map((h, i) => (
                        <div key={i} className="w-7 bg-slate-50 rounded-t-xl relative group flex flex-col justify-end h-full">
                           <div className={`w-full bg-gradient-to-t ${i === 6 ? 'from-fun-blue to-teal-400' : 'from-slate-200 to-slate-300'} rounded-t-xl transition-all duration-500 border-t border-x border-white/20`} style={{ height: `${h}%` }} />
                           {i === 6 && (
                             <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                               {h} XP
                             </div>
                           )}
                        </div>
                     ))}
                  </div>
                  <div className="flex justify-between text-[11px] font-black text-slate-400 px-2.5 pt-4">
                    <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span className="text-fun-blue drop-shadow-sm">S</span>
                  </div>
               </div>

               {/* Achievements */}
               <div className="bg-white rounded-[2rem] border-2 border-slate-100 shadow-sm p-6 space-y-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                     <h3 className="font-black text-slate-800 text-xl tracking-tight">Badges</h3>
                     <Award size={22} className="text-orange-500" />
                  </div>
                  <div className="space-y-4 pt-2">
                     <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-[1.25rem] border border-slate-100 relative overflow-hidden group hover:border-fun-green/30 transition-colors cursor-pointer">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-fun-green/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-125" />
                        <div className="w-12 h-12 bg-fun-green/10 border border-fun-green/20 text-fun-green rounded-full flex items-center justify-center shadow-inner text-2xl relative z-10 drop-shadow-sm group-hover:scale-110 transition-transform">🔥</div>
                        <div className="flex-1 min-w-0 relative z-10">
                           <h4 className="font-bold text-sm text-slate-800 truncate">On Fire</h4>
                           <p className="text-[11px] font-bold text-slate-400 truncate">Reach a 5 day streak</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-[1.25rem] border border-slate-100 relative overflow-hidden group hover:border-fun-blue/30 transition-colors cursor-pointer">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-fun-blue/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-125" />
                        <div className="w-12 h-12 bg-blue-100 border border-blue-200 text-blue-500 rounded-full flex items-center justify-center shadow-inner text-2xl relative z-10 drop-shadow-sm group-hover:scale-110 transition-transform">🌍</div>
                        <div className="flex-1 min-w-0 relative z-10">
                           <h4 className="font-bold text-sm text-slate-800 truncate">Explorer</h4>
                           <p className="text-[11px] font-bold text-slate-400 truncate">Start your first lesson</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-[1.25rem] border border-slate-100 opacity-60 grayscale cursor-not-allowed">
                        <div className="w-12 h-12 bg-slate-200 text-slate-400 rounded-full flex items-center justify-center shadow-inner text-xl">⭐</div>
                        <div className="flex-1 min-w-0">
                           <h4 className="font-bold text-sm text-slate-800 truncate">Perfection</h4>
                           <p className="text-[11px] font-bold text-slate-400 truncate">100% on a module</p>
                        </div>
                     </div>
                  </div>
                  <button onClick={() => navigate('/trophy-case')} className="w-full text-center text-[11px] font-black text-slate-400 bg-slate-50 rounded-xl py-3.5 uppercase tracking-widest hover:text-fun-blue hover:bg-fun-blue/5 transition-all border border-slate-200 hover:border-fun-blue/30">
                     View All Badges
                  </button>
               </div>
           </div>
        </div>

        {/* The bottom navigation app-like floating bar has been removed */}

        {/* Video Tutorial Modal Overlay */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border-[6px] border-white flex flex-col pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Embedded Player frame */}
                <div className="relative aspect-video w-full bg-slate-950 overflow-hidden rounded-t-[2rem]">
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
                    className="absolute top-4 right-4 z-40 bg-black/50 hover:bg-black/90 text-white rounded-full p-2.5 block font-bold text-sm transition-all shadow-md backdrop-blur-sm"
                  >
                    ✕ Close
                  </button>
                </div>

                {/* Video Info Details */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-100 pb-5">
                    <div>
                      <div className="flex gap-2 mb-2">
                        <span className="px-3 py-1 bg-fun-blue/10 text-fun-blue rounded-full text-[10px] font-black uppercase tracking-wider">
                          {selectedVideo.level} • {selectedVideo.topic}
                        </span>
                        {videoWatchedCompleted.includes(selectedVideo.id) && (
                          <span className="px-3 py-1 bg-fun-green text-white rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                            <CheckCircle2 size={12} strokeWidth={3} /> COMPLETED
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">
                        {selectedVideo.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button 
                        onClick={() => claimVideoPoints(selectedVideo.id)}
                        disabled={videoPointsClaimed.includes(selectedVideo.id)}
                        variant={videoPointsClaimed.includes(selectedVideo.id) ? "success" : "primary"}
                        className={`px-8 py-3.5 font-black text-sm rounded-2xl shadow-md transition-all ${videoPointsClaimed.includes(selectedVideo.id) ? 'opacity-80 scale-95' : 'hover:scale-105'}`}
                        icon={<Sparkles size={18} />}
                      >
                        {videoPointsClaimed.includes(selectedVideo.id) ? "XP Claimed" : "Claim +25 XP"}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-5">
                      <h4 className="font-black text-slate-800 text-xl tracking-tight">About This Lesson</h4>
                      <p className="text-slate-600 font-bold leading-relaxed">{selectedVideo.description}</p>
                      
                      <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border-2 border-slate-100">
                        <div className="w-12 h-12 rounded-full border-2 border-slate-200 overflow-hidden shadow-sm shrink-0 bg-white">
                          <img src={selectedVideo.tutorAvatar} alt="tutor" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-black text-slate-800 text-base">{selectedVideo.tutor}</p>
                          <p className="text-xs font-bold text-slate-400 mt-0.5">Professional ESL Academy Lead • {selectedVideo.views}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50/70 p-6 rounded-[1.5rem] border-2 border-blue-100 space-y-4 shadow-sm">
                      <h4 className="font-black text-fun-blue text-sm uppercase tracking-widest text-center py-1">Key Takeaways</h4>
                      <ul className="space-y-4 pb-2">
                        {selectedVideo.keyPoints.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-xs font-bold text-slate-700 leading-snug">
                            <div className="w-1.5 h-1.5 bg-fun-blue rounded-full mt-1.5 flex-shrink-0 shadow-sm" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Solve Quiz Button */}
                      <div className="pt-4 border-t-2 border-blue-100/60">
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
                          className="w-full text-xs font-black py-3.5 rounded-xl shadow-md"
                        >
                          Start Practice Quiz →
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
    return (
      <InteractiveExplanationScreen
        lesson={selectedLesson}
        onNext={handleStartQuiz}
        onBack={handleBackToList}
        stats={stats}
        t={t}
        preferredLanguage={preferredLanguage!}
        awardPoints={awardPoints}
      />
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
        
        <div className="bg-white p-6 sm:p-8 md:p-12 rounded-[3.5rem] border-4 border-slate-100 shadow-xl">
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
