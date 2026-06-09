import React from 'react';

export type Exercise = {
  id: string;
  type: 'multiple-choice' | 'fill-in-blank';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
};

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type LessonTranslation = {
  title: string;
  explanation: React.ReactNode;
  explanationParts?: React.ReactNode[];
};

export type Lesson = {
  id: string;
  level: Level;
  title: string;
  topic: string;
  explanation: React.ReactNode;
  explanationParts?: React.ReactNode[];
  rawExplanation?: string;
  exercises: Exercise[];
  translations?: Record<string, LessonTranslation>;
  imageUrl?: string;
};

const createLesson = (
  id: string, 
  level: Level, 
  title: string, 
  topic: string, 
  desc: string, 
  q1: string, 
  a1: string, 
  opts1: string[],
  translations?: Record<string, { title: string; desc: string; rule: string }>,
  imageUrl?: string
): Lesson => {
  const processedTranslations: Record<string, LessonTranslation> = {};
  
  if (translations) {
    Object.keys(translations).forEach(lang => {
      const t = translations[lang];
      processedTranslations[lang] = {
        title: t.title,
        explanation: (
          <div className="space-y-4 text-slate-700 text-lg">
            <p>{t.desc}</p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-4">
              <h4 className="font-bold text-slate-800 mb-2">Key Rule ({lang}):</h4>
              <p>{t.rule}</p>
            </div>
          </div>
        )
      };
    });
  }

  return {
    id,
    level,
    title,
    topic,
    rawExplanation: desc,
    imageUrl,
    explanation: (
      <div className="space-y-4 text-slate-700 text-lg">
        <p>{desc}</p>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-4">
          <h4 className="font-bold text-slate-800 mb-2">Key Rule:</h4>
          <p>Remember the pattern for {title}.</p>
        </div>
      </div>
    ),
    exercises: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: q1,
        options: opts1,
        correctAnswer: a1,
        explanation: `The correct answer is "${a1}".`
      },
      {
        id: 'q2',
        type: 'fill-in-blank',
        question: q1.replace('_____', '...'),
        correctAnswer: a1,
        explanation: `The correct form is "${a1}".`
      }
    ],
    translations: processedTranslations
  };
};

export const LESSONS: Lesson[] = [
  createLesson('a1-m1-l1', 'A1', 'Alphabet', 'First English', 'Learn about Alphabet.', 'What is the correct form for Alphabet?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m1-l2', 'A1', 'Greetings', 'First English', 'Learn about Greetings.', 'What is the correct form for Greetings?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/greetings.jpg'),
  createLesson('a1-m1-l3', 'A1', 'Numbers', 'First English', 'Learn about Numbers.', 'What is the correct form for Numbers?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m1-l4', 'A1', 'Days & Months', 'First English', 'Learn about Days & Months.', 'What is the correct form for Days & Months?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m1-l5', 'A1', 'Basic Vocabulary', 'First English', 'Learn about Basic Vocabulary.', 'What is the correct form for Basic Vocabulary?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m2-l1', 'A1', 'To Be', 'Identity', 'Learn about To Be.', 'What is the correct form for To Be?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m2-l2', 'A1', 'Subject Pronouns', 'Identity', 'Learn about Subject Pronouns.', 'What is the correct form for Subject Pronouns?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m2-l3', 'A1', 'Possessive Adjectives', 'Identity', 'Learn about Possessive Adjectives.', 'What is the correct form for Possessive Adjectives?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m2-l4', 'A1', 'Nationalities', 'Identity', 'Learn about Nationalities.', 'What is the correct form for Nationalities?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m2-l5', 'A1', 'Personal Information', 'Identity', 'Learn about Personal Information.', 'What is the correct form for Personal Information?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m3-l1', 'A1', 'Articles', 'Building Sentences', 'Learn about Articles.', 'What is the correct form for Articles?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m3-l2', 'A1', 'Singular/Plural', 'Building Sentences', 'Learn about Singular/Plural.', 'What is the correct form for Singular/Plural?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m3-l3', 'A1', 'Demonstratives', 'Building Sentences', 'Learn about Demonstratives.', 'What is the correct form for Demonstratives?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m3-l4', 'A1', 'Basic Questions', 'Building Sentences', 'Learn about Basic Questions.', 'What is the correct form for Basic Questions?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m4-l1', 'A1', 'Present Simple', 'Everyday Life', 'Learn about Present Simple.', 'What is the correct form for Present Simple?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m4-l2', 'A1', 'Daily Routines', 'Everyday Life', 'Learn about Daily Routines.', 'What is the correct form for Daily Routines?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m4-l3', 'A1', 'Frequency Adverbs', 'Everyday Life', 'Learn about Frequency Adverbs.', 'What is the correct form for Frequency Adverbs?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m4-l4', 'A1', 'Likes & Dislikes', 'Everyday Life', 'Learn about Likes & Dislikes.', 'What is the correct form for Likes & Dislikes?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m5-l1', 'A1', 'There Is/Are', 'Around Me', 'Learn about There Is/Are.', 'What is the correct form for There Is/Are?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m5-l2', 'A1', 'Prepositions', 'Around Me', 'Learn about Prepositions.', 'What is the correct form for Prepositions?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m5-l3', 'A1', 'Home Vocabulary', 'Around Me', 'Learn about Home Vocabulary.', 'What is the correct form for Home Vocabulary?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m5-l4', 'A1', 'Places in Town', 'Around Me', 'Learn about Places in Town.', 'What is the correct form for Places in Town?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m6-l1', 'A1', 'Present Continuous', 'Action Time', 'Learn about Present Continuous.', 'What is the correct form for Present Continuous?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m6-l2', 'A1', 'Can/Can’t', 'Action Time', 'Learn about Can/Can’t.', 'What is the correct form for Can/Can’t?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m6-l3', 'A1', 'Hobbies', 'Action Time', 'Learn about Hobbies.', 'What is the correct form for Hobbies?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m6-l4', 'A1', 'Shopping', 'Action Time', 'Learn about Shopping.', 'What is the correct form for Shopping?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m7-l1', 'A1', 'Was/Were', 'Time & Plans', 'Learn about Was/Were.', 'What is the correct form for Was/Were?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m7-l2', 'A1', 'Simple Past Basics', 'Time & Plans', 'Learn about Simple Past Basics.', 'What is the correct form for Simple Past Basics?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m7-l3', 'A1', 'Going To Future', 'Time & Plans', 'Learn about Going To Future.', 'What is the correct form for Going To Future?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m8-l1', 'A1', 'Directions', 'Communication Basics', 'Learn about Directions.', 'What is the correct form for Directions?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m8-l2', 'A1', 'Restaurant English', 'Communication Basics', 'Learn about Restaurant English.', 'What is the correct form for Restaurant English?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m8-l3', 'A1', 'Classroom English', 'Communication Basics', 'Learn about Classroom English.', 'What is the correct form for Classroom English?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a1-m8-l4', 'A1', 'Asking for Help', 'Communication Basics', 'Learn about Asking for Help.', 'What is the correct form for Asking for Help?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m1-l1', 'A2', 'Past Simple', 'Expanding Grammar', 'Learn about Past Simple.', 'What is the correct form for Past Simple?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m1-l2', 'A2', 'Irregular Verbs', 'Expanding Grammar', 'Learn about Irregular Verbs.', 'What is the correct form for Irregular Verbs?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m1-l3', 'A2', 'Comparatives', 'Expanding Grammar', 'Learn about Comparatives.', 'What is the correct form for Comparatives?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m1-l4', 'A2', 'Superlatives', 'Expanding Grammar', 'Learn about Superlatives.', 'What is the correct form for Superlatives?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m2-l1', 'A2', 'Invitations', 'Real Conversations', 'Learn about Invitations.', 'What is the correct form for Invitations?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m2-l2', 'A2', 'Suggestions', 'Real Conversations', 'Learn about Suggestions.', 'What is the correct form for Suggestions?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m2-l3', 'A2', 'Requests', 'Real Conversations', 'Learn about Requests.', 'What is the correct form for Requests?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m2-l4', 'A2', 'Opinions', 'Real Conversations', 'Learn about Opinions.', 'What is the correct form for Opinions?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m3-l1', 'A2', 'Travel', 'Life Situations', 'Learn about Travel.', 'What is the correct form for Travel?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m3-l2', 'A2', 'Health', 'Life Situations', 'Learn about Health.', 'What is the correct form for Health?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m3-l3', 'A2', 'Transportation', 'Life Situations', 'Learn about Transportation.', 'What is the correct form for Transportation?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m3-l4', 'A2', 'Hotels', 'Life Situations', 'Learn about Hotels.', 'What is the correct form for Hotels?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m4-l1', 'A2', 'Adjectives', 'Describing the World', 'Learn about Adjectives.', 'What is the correct form for Adjectives?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m4-l2', 'A2', 'Adverbs', 'Describing the World', 'Learn about Adverbs.', 'What is the correct form for Adverbs?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m4-l3', 'A2', 'Quantity', 'Describing the World', 'Learn about Quantity.', 'What is the correct form for Quantity?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m4-l4', 'A2', 'Countable/Uncountable', 'Describing the World', 'Learn about Countable/Uncountable.', 'What is the correct form for Countable/Uncountable?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m5-l1', 'A2', 'Will', 'Future English', 'Learn about Will.', 'What is the correct form for Will?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m5-l2', 'A2', 'Future Plans', 'Future English', 'Learn about Future Plans.', 'What is the correct form for Future Plans?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m5-l3', 'A2', 'Predictions', 'Future English', 'Learn about Predictions.', 'What is the correct form for Predictions?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m5-l4', 'A2', 'Promises', 'Future English', 'Learn about Promises.', 'What is the correct form for Promises?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m6-l1', 'A2', 'Present Perfect Basics', 'Experiences', 'Learn about Present Perfect Basics.', 'What is the correct form for Present Perfect Basics?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m6-l2', 'A2', 'Ever/Never', 'Experiences', 'Learn about Ever/Never.', 'What is the correct form for Ever/Never?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m6-l3', 'A2', 'Already/Yet', 'Experiences', 'Learn about Already/Yet.', 'What is the correct form for Already/Yet?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m7-l1', 'A2', 'Should', 'Problem Solving', 'Learn about Should.', 'What is the correct form for Should?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m7-l2', 'A2', 'Advice', 'Problem Solving', 'Learn about Advice.', 'What is the correct form for Advice?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m7-l3', 'A2', 'Obligation', 'Problem Solving', 'Learn about Obligation.', 'What is the correct form for Obligation?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m7-l4', 'A2', 'Permission', 'Problem Solving', 'Learn about Permission.', 'What is the correct form for Permission?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m8-l1', 'A2', 'Phone Calls', 'Speaking Confidence', 'Learn about Phone Calls.', 'What is the correct form for Phone Calls?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m8-l2', 'A2', 'Social Situations', 'Speaking Confidence', 'Learn about Social Situations.', 'What is the correct form for Social Situations?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m8-l3', 'A2', 'Small Talk', 'Speaking Confidence', 'Learn about Small Talk.', 'What is the correct form for Small Talk?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('a2-m8-l4', 'A2', 'Storytelling Basics', 'Speaking Confidence', 'Learn about Storytelling Basics.', 'What is the correct form for Storytelling Basics?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m1-l1', 'B1', 'Present Perfect vs Past Simple', 'Intermediate Grammar', 'Learn about Present Perfect vs Past Simple.', 'What is the correct form for Present Perfect vs Past Simple?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m1-l2', 'B1', 'Past Continuous', 'Intermediate Grammar', 'Learn about Past Continuous.', 'What is the correct form for Past Continuous?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m1-l3', 'B1', 'Used To', 'Intermediate Grammar', 'Learn about Used To.', 'What is the correct form for Used To?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m1-l4', 'B1', 'Future Forms', 'Intermediate Grammar', 'Learn about Future Forms.', 'What is the correct form for Future Forms?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m2-l1', 'B1', 'Relative Clauses', 'Complex Sentences', 'Learn about Relative Clauses.', 'What is the correct form for Relative Clauses?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m2-l2', 'B1', 'First Conditional', 'Complex Sentences', 'Learn about First Conditional.', 'What is the correct form for First Conditional?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m2-l3', 'B1', 'Second Conditional', 'Complex Sentences', 'Learn about Second Conditional.', 'What is the correct form for Second Conditional?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m2-l4', 'B1', 'Time Clauses', 'Complex Sentences', 'Learn about Time Clauses.', 'What is the correct form for Time Clauses?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m3-l1', 'B1', 'Opinions', 'Expressing Ideas', 'Learn about Opinions.', 'What is the correct form for Opinions?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m3-l2', 'B1', 'Agreement/Disagreement', 'Expressing Ideas', 'Learn about Agreement/Disagreement.', 'What is the correct form for Agreement/Disagreement?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m3-l3', 'B1', 'Debate Basics', 'Expressing Ideas', 'Learn about Debate Basics.', 'What is the correct form for Debate Basics?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m3-l4', 'B1', 'Giving Reasons', 'Expressing Ideas', 'Learn about Giving Reasons.', 'What is the correct form for Giving Reasons?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m4-l1', 'B1', 'Emails', 'Work & Study', 'Learn about Emails.', 'What is the correct form for Emails?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m4-l2', 'B1', 'Meetings', 'Work & Study', 'Learn about Meetings.', 'What is the correct form for Meetings?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m4-l3', 'B1', 'Interviews', 'Work & Study', 'Learn about Interviews.', 'What is the correct form for Interviews?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m4-l4', 'B1', 'Academic English', 'Work & Study', 'Learn about Academic English.', 'What is the correct form for Academic English?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m5-l1', 'B1', 'News', 'Media & Technology', 'Learn about News.', 'What is the correct form for News?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m5-l2', 'B1', 'Social Media', 'Media & Technology', 'Learn about Social Media.', 'What is the correct form for Social Media?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m5-l3', 'B1', 'Technology Vocabulary', 'Media & Technology', 'Learn about Technology Vocabulary.', 'What is the correct form for Technology Vocabulary?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m5-l4', 'B1', 'Internet Discussions', 'Media & Technology', 'Learn about Internet Discussions.', 'What is the correct form for Internet Discussions?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m6-l1', 'B1', 'Narratives', 'Storytelling', 'Learn about Narratives.', 'What is the correct form for Narratives?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m6-l2', 'B1', 'Sequencing', 'Storytelling', 'Learn about Sequencing.', 'What is the correct form for Sequencing?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m6-l3', 'B1', 'Emotions', 'Storytelling', 'Learn about Emotions.', 'What is the correct form for Emotions?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m6-l4', 'B1', 'Descriptions', 'Storytelling', 'Learn about Descriptions.', 'What is the correct form for Descriptions?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m7-l1', 'B1', 'Modals', 'Problem & Solution', 'Learn about Modals.', 'What is the correct form for Modals?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m7-l2', 'B1', 'Suggestions', 'Problem & Solution', 'Learn about Suggestions.', 'What is the correct form for Suggestions?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m7-l3', 'B1', 'Complaints', 'Problem & Solution', 'Learn about Complaints.', 'What is the correct form for Complaints?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m7-l4', 'B1', 'Negotiation', 'Problem & Solution', 'Learn about Negotiation.', 'What is the correct form for Negotiation?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m8-l1', 'B1', 'Long Conversations', 'Fluency Builder', 'Learn about Long Conversations.', 'What is the correct form for Long Conversations?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m8-l2', 'B1', 'Real-Life Dialogues', 'Fluency Builder', 'Learn about Real-Life Dialogues.', 'What is the correct form for Real-Life Dialogues?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m8-l3', 'B1', 'Fast Listening', 'Fluency Builder', 'Learn about Fast Listening.', 'What is the correct form for Fast Listening?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b1-m8-l4', 'B1', 'Speaking Challenges', 'Fluency Builder', 'Learn about Speaking Challenges.', 'What is the correct form for Speaking Challenges?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m1-l1', 'B2', 'Perfect Continuous', 'Advanced Tenses', 'Learn about Perfect Continuous.', 'What is the correct form for Perfect Continuous?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m1-l2', 'B2', 'Mixed Tenses', 'Advanced Tenses', 'Learn about Mixed Tenses.', 'What is the correct form for Mixed Tenses?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m1-l3', 'B2', 'Narrative Tenses', 'Advanced Tenses', 'Learn about Narrative Tenses.', 'What is the correct form for Narrative Tenses?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m2-l1', 'B2', 'Third Conditional', 'Advanced Conditionals', 'Learn about Third Conditional.', 'What is the correct form for Third Conditional?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m2-l2', 'B2', 'Mixed Conditionals', 'Advanced Conditionals', 'Learn about Mixed Conditionals.', 'What is the correct form for Mixed Conditionals?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m2-l3', 'B2', 'Wish Structures', 'Advanced Conditionals', 'Learn about Wish Structures.', 'What is the correct form for Wish Structures?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m3-l1', 'B2', 'Passive Voice', 'Passive & Reported Speech', 'Learn about Passive Voice.', 'What is the correct form for Passive Voice?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m3-l2', 'B2', 'Reporting Verbs', 'Passive & Reported Speech', 'Learn about Reporting Verbs.', 'What is the correct form for Reporting Verbs?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m3-l3', 'B2', 'Indirect Questions', 'Passive & Reported Speech', 'Learn about Indirect Questions.', 'What is the correct form for Indirect Questions?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m4-l1', 'B2', 'Formal Writing', 'Academic Communication', 'Learn about Formal Writing.', 'What is the correct form for Formal Writing?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m4-l2', 'B2', 'Essays', 'Academic Communication', 'Learn about Essays.', 'What is the correct form for Essays?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m4-l3', 'B2', 'Arguments', 'Academic Communication', 'Learn about Arguments.', 'What is the correct form for Arguments?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m4-l4', 'B2', 'Presentations', 'Academic Communication', 'Learn about Presentations.', 'What is the correct form for Presentations?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m5-l1', 'B2', 'Business Meetings', 'Professional English', 'Learn about Business Meetings.', 'What is the correct form for Business Meetings?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m5-l2', 'B2', 'Negotiation', 'Professional English', 'Learn about Negotiation.', 'What is the correct form for Negotiation?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m5-l3', 'B2', 'Leadership Communication', 'Professional English', 'Learn about Leadership Communication.', 'What is the correct form for Leadership Communication?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m6-l1', 'B2', 'Idioms', 'Nuanced English', 'Learn about Idioms.', 'What is the correct form for Idioms?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m6-l2', 'B2', 'Phrasal Verbs', 'Nuanced English', 'Learn about Phrasal Verbs.', 'What is the correct form for Phrasal Verbs?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m6-l3', 'B2', 'Collocations', 'Nuanced English', 'Learn about Collocations.', 'What is the correct form for Collocations?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m6-l4', 'B2', 'Tone', 'Nuanced English', 'Learn about Tone.', 'What is the correct form for Tone?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m7-l1', 'B2', 'Persuasive Language', 'Debate & Persuasion', 'Learn about Persuasive Language.', 'What is the correct form for Persuasive Language?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m7-l2', 'B2', 'Counterarguments', 'Debate & Persuasion', 'Learn about Counterarguments.', 'What is the correct form for Counterarguments?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m7-l3', 'B2', 'Advanced Opinions', 'Debate & Persuasion', 'Learn about Advanced Opinions.', 'What is the correct form for Advanced Opinions?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m8-l1', 'B2', 'Native-like Conversations', 'Real World Fluency', 'Learn about Native-like Conversations.', 'What is the correct form for Native-like Conversations?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m8-l2', 'B2', 'Humor', 'Real World Fluency', 'Learn about Humor.', 'What is the correct form for Humor?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m8-l3', 'B2', 'Sarcasm', 'Real World Fluency', 'Learn about Sarcasm.', 'What is the correct form for Sarcasm?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('b2-m8-l4', 'B2', 'Cultural Context', 'Real World Fluency', 'Learn about Cultural Context.', 'What is the correct form for Cultural Context?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m1-l1', 'C1', 'Inversion', 'Precision Grammar', 'Learn about Inversion.', 'What is the correct form for Inversion?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m1-l2', 'C1', 'Emphasis Structures', 'Precision Grammar', 'Learn about Emphasis Structures.', 'What is the correct form for Emphasis Structures?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m1-l3', 'C1', 'Advanced Modals', 'Precision Grammar', 'Learn about Advanced Modals.', 'What is the correct form for Advanced Modals?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m2-l1', 'C1', 'Reports', 'Sophisticated Writing', 'Learn about Reports.', 'What is the correct form for Reports?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m2-l2', 'C1', 'Research Summaries', 'Sophisticated Writing', 'Learn about Research Summaries.', 'What is the correct form for Research Summaries?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m2-l3', 'C1', 'Advanced Essays', 'Sophisticated Writing', 'Learn about Advanced Essays.', 'What is the correct form for Advanced Essays?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m3-l1', 'C1', 'Public Speaking', 'High-Level Speaking', 'Learn about Public Speaking.', 'What is the correct form for Public Speaking?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m3-l2', 'C1', 'Persuasive Speaking', 'High-Level Speaking', 'Learn about Persuasive Speaking.', 'What is the correct form for Persuasive Speaking?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m3-l3', 'C1', 'Advanced Discussion', 'High-Level Speaking', 'Learn about Advanced Discussion.', 'What is the correct form for Advanced Discussion?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m4-l1', 'C1', 'Formal Meetings', 'Academic & Business Fluency', 'Learn about Formal Meetings.', 'What is the correct form for Formal Meetings?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m4-l2', 'C1', 'Professional Presentations', 'Academic & Business Fluency', 'Learn about Professional Presentations.', 'What is the correct form for Professional Presentations?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m4-l3', 'C1', 'Leadership Language', 'Academic & Business Fluency', 'Learn about Leadership Language.', 'What is the correct form for Leadership Language?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m5-l1', 'C1', 'Fast Native Audio', 'Deep Comprehension', 'Learn about Fast Native Audio.', 'What is the correct form for Fast Native Audio?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m5-l2', 'C1', 'Complex Articles', 'Deep Comprehension', 'Learn about Complex Articles.', 'What is the correct form for Complex Articles?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m5-l3', 'C1', 'Abstract Topics', 'Deep Comprehension', 'Learn about Abstract Topics.', 'What is the correct form for Abstract Topics?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m6-l1', 'C1', 'Register', 'Style & Tone', 'Learn about Register.', 'What is the correct form for Register?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m6-l2', 'C1', 'Nuance', 'Style & Tone', 'Learn about Nuance.', 'What is the correct form for Nuance?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m6-l3', 'C1', 'Humor', 'Style & Tone', 'Learn about Humor.', 'What is the correct form for Humor?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m6-l4', 'C1', 'Subtext', 'Style & Tone', 'Learn about Subtext.', 'What is the correct form for Subtext?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m7-l1', 'C1', 'Analysis', 'Critical Thinking', 'Learn about Analysis.', 'What is the correct form for Analysis?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m7-l2', 'C1', 'Interpretation', 'Critical Thinking', 'Learn about Interpretation.', 'What is the correct form for Interpretation?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m7-l3', 'C1', 'Evaluation', 'Critical Thinking', 'Learn about Evaluation.', 'What is the correct form for Evaluation?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m8-l1', 'C1', 'Natural Expressions', 'Near-Native Communication', 'Learn about Natural Expressions.', 'What is the correct form for Natural Expressions?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m8-l2', 'C1', 'Cultural Fluency', 'Near-Native Communication', 'Learn about Cultural Fluency.', 'What is the correct form for Cultural Fluency?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c1-m8-l3', 'C1', 'Advanced Interaction', 'Near-Native Communication', 'Learn about Advanced Interaction.', 'What is the correct form for Advanced Interaction?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m1-l1', 'C2', 'Rare Grammar', 'Native-Level Structures', 'Learn about Rare Grammar.', 'What is the correct form for Rare Grammar?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m1-l2', 'C2', 'Advanced Syntax', 'Native-Level Structures', 'Learn about Advanced Syntax.', 'What is the correct form for Advanced Syntax?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m1-l3', 'C2', 'Literary Structures', 'Native-Level Structures', 'Learn about Literary Structures.', 'What is the correct form for Literary Structures?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m2-l1', 'C2', 'Debate Mastery', 'Master Communication', 'Learn about Debate Mastery.', 'What is the correct form for Debate Mastery?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m2-l2', 'C2', 'Negotiation Mastery', 'Master Communication', 'Learn about Negotiation Mastery.', 'What is the correct form for Negotiation Mastery?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m2-l3', 'C2', 'Persuasion', 'Master Communication', 'Learn about Persuasion.', 'What is the correct form for Persuasion?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m3-l1', 'C2', 'Editorial Writing', 'Elite Writing', 'Learn about Editorial Writing.', 'What is the correct form for Editorial Writing?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m3-l2', 'C2', 'Academic Research', 'Elite Writing', 'Learn about Academic Research.', 'What is the correct form for Academic Research?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m3-l3', 'C2', 'Creative Writing', 'Elite Writing', 'Learn about Creative Writing.', 'What is the correct form for Creative Writing?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m4-l1', 'C2', 'Idiomatic Mastery', 'Cultural Intelligence', 'Learn about Idiomatic Mastery.', 'What is the correct form for Idiomatic Mastery?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m4-l2', 'C2', 'Humor & Irony', 'Cultural Intelligence', 'Learn about Humor & Irony.', 'What is the correct form for Humor & Irony?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m4-l3', 'C2', 'Regional Differences', 'Cultural Intelligence', 'Learn about Regional Differences.', 'What is the correct form for Regional Differences?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m5-l1', 'C2', 'Legal English', 'Specialized English', 'Learn about Legal English.', 'What is the correct form for Legal English?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m5-l2', 'C2', 'Scientific English', 'Specialized English', 'Learn about Scientific English.', 'What is the correct form for Scientific English?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m5-l3', 'C2', 'Technical English', 'Specialized English', 'Learn about Technical English.', 'What is the correct form for Technical English?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m6-l1', 'C2', 'Native-Speed Listening', 'High-Speed Fluency', 'Learn about Native-Speed Listening.', 'What is the correct form for Native-Speed Listening?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m6-l2', 'C2', 'Real-Time Response', 'High-Speed Fluency', 'Learn about Real-Time Response.', 'What is the correct form for Real-Time Response?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m6-l3', 'C2', 'Accent Adaptation', 'High-Speed Fluency', 'Learn about Accent Adaptation.', 'What is the correct form for Accent Adaptation?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m7-l1', 'C2', 'Storytelling', 'Expression Mastery', 'Learn about Storytelling.', 'What is the correct form for Storytelling?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m7-l2', 'C2', 'Emotion', 'Expression Mastery', 'Learn about Emotion.', 'What is the correct form for Emotion?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m7-l3', 'C2', 'Tone Manipulation', 'Expression Mastery', 'Learn about Tone Manipulation.', 'What is the correct form for Tone Manipulation?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m8-l1', 'C2', 'Real Simulations', 'Final Mastery', 'Learn about Real Simulations.', 'What is the correct form for Real Simulations?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m8-l2', 'C2', 'Long Discussions', 'Final Mastery', 'Learn about Long Discussions.', 'What is the correct form for Long Discussions?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
  createLesson('c2-m8-l3', 'C2', 'Full Fluency Challenges', 'Final Mastery', 'Learn about Full Fluency Challenges.', 'What is the correct form for Full Fluency Challenges?', 'Option 1', ['Option 1', 'Option 2', 'Option 3'], undefined, '/src/assets/images/alphabet.jpg'),
];
