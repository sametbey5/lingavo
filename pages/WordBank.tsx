import React, { useState, useMemo, useEffect } from 'react';
import { useGamification } from '../context/GamificationContext';
import { 
  BookOpen, CheckCircle, XCircle, RefreshCw, Sparkles, Brain, 
  Volume2, Lock, Unlock, Search, Plus, Trash2, ArrowRight,
  Bookmark, Award, Star, Compass, Info, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Button from '../components/Button';
import Confetti from '../components/Confetti';

// -------------------------------------------------------------
// NATIVE LEVEL-BASED DICTIONARY DATABASE (A1 - C2)
// -------------------------------------------------------------
interface DictionaryWord {
  word: string;
  pronunciation: string;
  definition: string;
  exampleSentence: string;
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  theme: string;
}

const DICTIONARY_DATA: DictionaryWord[] = [
  // --- A1 Level Words ---
  {
    word: "Hello",
    pronunciation: "[həˈləʊ]",
    definition: "Used as a greeting when you meet someone.",
    exampleSentence: "Hello, how are you today?",
    cefrLevel: "A1",
    theme: "Conversation"
  },
  {
    word: "Book",
    pronunciation: "[bʊk]",
    definition: "A written or printed work consisting of pages glued or sewn together.",
    exampleSentence: "She read an interesting book about dinosaurs.",
    cefrLevel: "A1",
    theme: "Learning"
  },
  {
    word: "Friend",
    pronunciation: "[frend]",
    definition: "A person whom one knows and with whom one has a bond of mutual affection.",
    exampleSentence: "My friend invited me to play video games.",
    cefrLevel: "A1",
    theme: "Social"
  },
  {
    word: "House",
    pronunciation: "[haʊs]",
    definition: "A building for human habitation, especially one that is lived in by a family.",
    exampleSentence: "They bought a small, beautiful house.",
    cefrLevel: "A1",
    theme: "Living"
  },
  {
    word: "Water",
    pronunciation: "[ˈwɔːtə]",
    definition: "A colorless, transparent, odorless liquid essential for living things.",
    exampleSentence: "I always drink a glass of water after running.",
    cefrLevel: "A1",
    theme: "Survival"
  },
  {
    word: "Family",
    pronunciation: "[ˈfæmɪli]",
    definition: "A group of one or more parents and their children living together as a unit.",
    exampleSentence: "I love spending weekends with my family.",
    cefrLevel: "A1",
    theme: "Social"
  },
  {
    word: "Apple",
    pronunciation: "[ˈæpl]",
    definition: "A round fruit with red, green, or yellow skin and crisp white flesh.",
    exampleSentence: "An apple a day keeps the doctor away.",
    cefrLevel: "A1",
    theme: "Food"
  },
  {
    word: "Happy",
    pronunciation: "[ˈhæpi]",
    definition: "Feeling or showing pleasure or contentment.",
    exampleSentence: "The kids were very happy on their holiday.",
    cefrLevel: "A1",
    theme: "Emotion"
  },
  {
    word: "School",
    pronunciation: "[skuːl]",
    definition: "An institution for educating children.",
    exampleSentence: "We walk to school together every morning.",
    cefrLevel: "A1",
    theme: "Learning"
  },
  {
    word: "Cat",
    pronunciation: "[kæt]",
    definition: "A small domesticated carnivorous mammal with soft fur.",
    exampleSentence: "The cute cat fell asleep on the sofa.",
    cefrLevel: "A1",
    theme: "Nature"
  },
  {
    word: "Time",
    pronunciation: "[taɪm]",
    definition: "The indefinite continued progress of existence and events.",
    exampleSentence: "What time does the lesson start?",
    cefrLevel: "A1",
    theme: "General"
  },
  {
    word: "Morning",
    pronunciation: "[ˈmɔːnɪŋ]",
    definition: "The period of time between midnight and noon.",
    exampleSentence: "The morning sun is very bright today.",
    cefrLevel: "A1",
    theme: "General"
  },
  {
    word: "Smile",
    pronunciation: "[smaɪl]",
    definition: "Form one's features into a pleased or kind expression.",
    exampleSentence: "A big smile appeared on his face.",
    cefrLevel: "A1",
    theme: "Emotion"
  },
  {
    word: "Food",
    pronunciation: "[fuːd]",
    definition: "Any nutritious substance that people or animals eat or drink.",
    exampleSentence: "Pizza is my favorite Italian food.",
    cefrLevel: "A1",
    theme: "Food"
  },
  {
    word: "Day",
    pronunciation: "[deɪ]",
    definition: "A period of twenty-four hours.",
    exampleSentence: "I hope you have a wonderful day.",
    cefrLevel: "A1",
    theme: "General"
  },

  // --- A2 Level Words ---
  {
    word: "Bicycle",
    pronunciation: "[ˈbaɪsɪkl]",
    definition: "A vehicle consisting of two wheels held in a frame one behind the other.",
    exampleSentence: "He rode his bicycle to the park.",
    cefrLevel: "A2",
    theme: "Transport"
  },
  {
    word: "Famous",
    pronunciation: "[ˈfeɪməs]",
    definition: "Known about by many people.",
    exampleSentence: "Eiffel Tower is a famous monument.",
    cefrLevel: "A2",
    theme: "General"
  },
  {
    word: "Dinner",
    pronunciation: "[ˈdɪnə]",
    definition: "The main meal of the day, taken either at midday or in the evening.",
    exampleSentence: "We had fish and chips for dinner.",
    cefrLevel: "A2",
    theme: "Food"
  },
  {
    word: "Journey",
    pronunciation: "[ˈdʒɜːni]",
    definition: "An act of traveling from one place to another.",
    exampleSentence: "The train journey took three hours.",
    cefrLevel: "A2",
    theme: "Travel"
  },
  {
    word: "Holiday",
    pronunciation: "[ˈhɒlədeɪ]",
    definition: "A day of festivity or recreation when no work is done.",
    exampleSentence: "They went to France for their summer holiday.",
    cefrLevel: "A2",
    theme: "Travel"
  },
  {
    word: "Kitchen",
    pronunciation: "[ˈkɪtʃɪn]",
    definition: "A room or area where food is prepared and cooked.",
    exampleSentence: "My mother is baking a cake in the kitchen.",
    cefrLevel: "A2",
    theme: "Living"
  },
  {
    word: "Neighbor",
    pronunciation: "[ˈneɪbə]",
    definition: "A person living next door to or very near to the speaker.",
    exampleSentence: "Our neighbor helped us carry the groceries.",
    cefrLevel: "A2",
    theme: "Social"
  },
  {
    word: "Simple",
    pronunciation: "[ˈsɪmpl]",
    definition: "Easily understood or done; presenting no difficulty.",
    exampleSentence: "The grammar lesson was surprisingly simple to follow.",
    cefrLevel: "A2",
    theme: "Learning"
  },
  {
    word: "Weather",
    pronunciation: "[ˈweðə]",
    definition: "The state of the temporary atmosphere at a place and time.",
    exampleSentence: "Nice weather today, isn't it?",
    cefrLevel: "A2",
    theme: "Nature"
  },
  {
    word: "Pocket",
    pronunciation: "[ˈpɒkɪt]",
    definition: "A small bag sewn into or on clothing, used for carrying small articles.",
    exampleSentence: "I found some coins inside his jacket pocket.",
    cefrLevel: "A2",
    theme: "Living"
  },
  {
    word: "Bored",
    pronunciation: "[bɔːd]",
    definition: "Feeling weary and restless through lack of interest.",
    exampleSentence: "The movie was too long, and we got bored.",
    cefrLevel: "A2",
    theme: "Emotion"
  },
  {
    word: "Comfortable",
    pronunciation: "[ˈkʌmftəbl]",
    definition: "Providing physical ease and relaxation.",
    exampleSentence: "This new armchair is extremely comfortable.",
    cefrLevel: "A2",
    theme: "Living"
  },
  {
    word: "Language",
    pronunciation: "[ˈlæŋɡwɪdʒ]",
    definition: "The principal method of human communication using words.",
    exampleSentence: "Learning a new language opens up many global doors.",
    cefrLevel: "A2",
    theme: "Learning"
  },
  {
    word: "Message",
    pronunciation: "[ˈmesɪdʒ]",
    definition: "A verbal, written, or recorded communication sent to someone.",
    exampleSentence: "She left a voice message explaining her delay.",
    cefrLevel: "A2",
    theme: "Social"
  },
  {
    word: "Yesterday",
    pronunciation: "[ˈjestədeɪ]",
    definition: "On the day before today.",
    exampleSentence: "Yesterday was a beautiful sunny day.",
    cefrLevel: "A2",
    theme: "General"
  },

  // --- B1 Level Words ---
  {
    word: "Achieve",
    pronunciation: "[əˈtʃiːv]",
    definition: "Successfully reach a desired objective or result by effort and skill.",
    exampleSentence: "With hard work, you can achieve your learning goals.",
    cefrLevel: "B1",
    theme: "Success"
  },
  {
    word: "Behavior",
    pronunciation: "[bɪˈheɪvjə]",
    definition: "The way in which one acts or conducts oneself, especially toward others.",
    exampleSentence: "His polite behavior impressed the teachers.",
    cefrLevel: "B1",
    theme: "Social"
  },
  {
    word: "Century",
    pronunciation: "[ˈsentʃəri]",
    definition: "A period of one hundred years.",
    exampleSentence: "This castle was built back in the sixteenth century.",
    cefrLevel: "B1",
    theme: "History"
  },
  {
    word: "Decision",
    pronunciation: "[dɪˈsɪʒn]",
    definition: "A conclusion or resolution reached after consideration.",
    exampleSentence: "Choosing which language to study was a big decision.",
    cefrLevel: "B1",
    theme: "General"
  },
  {
    word: "Encourage",
    pronunciation: "[ɪnˈkʌrɪdʒ]",
    definition: "Give support, confidence, or hope to someone.",
    exampleSentence: "My tutor always encourages me to speak without fear.",
    cefrLevel: "B1",
    theme: "Social"
  },
  {
    word: "Immediate",
    pronunciation: "[ɪˈmiːdiət]",
    definition: "Occurring or done at once; instant.",
    exampleSentence: "The system gives immediate feedback for your quiz answers.",
    cefrLevel: "B1",
    theme: "General"
  },
  {
    word: "Knowledge",
    pronunciation: "[ˈnɒlɪdʒ]",
    definition: "Facts, information, and skills acquired through experience or education.",
    exampleSentence: "Reading keeps your mind sharp and expands your general knowledge.",
    cefrLevel: "B1",
    theme: "Learning"
  },
  {
    word: "Modern",
    pronunciation: "[ˈmɒdn]",
    definition: "Relating to the present or recent times as opposed to the remote past.",
    exampleSentence: "The office was equipped with modern computers.",
    cefrLevel: "B1",
    theme: "Living"
  },
  {
    word: "Opportunity",
    pronunciation: "[ˌɒpəˈtjuːnɪti]",
    definition: "A set of circumstances that makes it possible to do something.",
    exampleSentence: "Studying abroad is a fantastic opportunity to practice speaking.",
    cefrLevel: "B1",
    theme: "Success"
  },
  {
    word: "Suggest",
    pronunciation: "[səˈdʒest]",
    definition: "Put forward an idea or plan for consideration.",
    exampleSentence: "I suggest review-studying the list at least once a day.",
    cefrLevel: "B1",
    theme: "Communication"
  },
  {
    word: "Avoid",
    pronunciation: "[əˈvɔɪd]",
    definition: "Keep away from or stop oneself from doing something.",
    exampleSentence: "You should try to avoid making the same spelling mistake twice.",
    cefrLevel: "B1",
    theme: "Survival"
  },
  {
    word: "Challenge",
    pronunciation: "[ˈtʃælɪndʒ]",
    definition: "A task or situation that tests someone's abilities.",
    exampleSentence: "Solving this grammar scramble is an enjoyable challenge.",
    cefrLevel: "B1",
    theme: "Success"
  },
  {
    word: "Curious",
    pronunciation: "[ˈkjʊəriəs]",
    definition: "Eager to know or learn something.",
    exampleSentence: "Children are naturally curious about everything around them.",
    cefrLevel: "B1",
    theme: "Emotion"
  },
  {
    word: "Focus",
    pronunciation: "[ˈfəʊkəs]",
    definition: "The center of interest, attention, or activity.",
    exampleSentence: "You need to maintain your focus during deep listening exercises.",
    cefrLevel: "B1",
    theme: "Success"
  },
  {
    word: "Regular",
    pronunciation: "[ˈreɡjʊlə]",
    definition: "Done or happening frequently on an ongoing basis.",
    exampleSentence: "Regular practice is key to developing high fluency.",
    cefrLevel: "B1",
    theme: "General"
  },

  // --- B2 Level Words ---
  {
    word: "Ambition",
    pronunciation: "[æmˈbɪʃn]",
    definition: "A strong desire to do or to achieve something, requiring determination.",
    exampleSentence: "Her lifelong ambition was to become a professional translator.",
    cefrLevel: "B2",
    theme: "Success"
  },
  {
    word: "Boundary",
    pronunciation: "[ˈbaʊndri]",
    definition: "A line that marks the limits of an area; a dividing line.",
    exampleSentence: "Good relationships require setting clear personal boundaries.",
    cefrLevel: "B2",
    theme: "Social"
  },
  {
    word: "Consequence",
    pronunciation: "[ˈkɒnsɪkwəns]",
    definition: "A result or effect of an action or condition.",
    exampleSentence: "Losing streaks is a direct consequence of missing daily reviews.",
    cefrLevel: "B2",
    theme: "Philosophy"
  },
  {
    word: "Delicate",
    pronunciation: "[ˈdelɪkət]",
    definition: "Very fine in texture or structure; easily broken or damaged.",
    exampleSentence: "Please be careful with that antique vase; it is extremely delicate.",
    cefrLevel: "B2",
    theme: "Art"
  },
  {
    word: "Empathy",
    pronunciation: "[ˈempəθi]",
    definition: "The ability to understand and share the feelings of another.",
    exampleSentence: "Active listening requires showing deep empathy for the speaker.",
    cefrLevel: "B2",
    theme: "Social"
  },
  {
    word: "Frustrate",
    pronunciation: "[frʌˈstreɪt]",
    definition: "Cause someone to feel annoyed or impatient due to dynamic failure.",
    exampleSentence: "Complex vocabulary can frustrate beginners if not explained clearly.",
    cefrLevel: "B2",
    theme: "Emotion"
  },
  {
    word: "Guarantee",
    pronunciation: "[ˌɡærənˈtiː]",
    definition: "A formal promise or assurance that certain conditions will be fulfilled.",
    exampleSentence: "There is no absolute guarantee of success without persistent practice.",
    cefrLevel: "B2",
    theme: "Business"
  },
  {
    word: "Hypothesize",
    pronunciation: "[haɪˈpɒθəsaɪz]",
    definition: "Put forward a hypothesis or scientific conjecture.",
    exampleSentence: "Scientists hypothesize that multi-lingualism slows down cognitive decline.",
    cefrLevel: "B2",
    theme: "Science"
  },
  {
    word: "Inevitable",
    pronunciation: "[ɪnˈevɪtəbl]",
    definition: "Certain to happen; completely unavoidable.",
    exampleSentence: "Making occasional mistakes is an inevitable part of learning.",
    cefrLevel: "B2",
    theme: "Philosophy"
  },
  {
    word: "Justify",
    pronunciation: "[ˈdʒʌstɪfaɪ]",
    definition: "Show or prove to be right, logical, or reasonable.",
    exampleSentence: "Can you justify your grammar correction using the standard syntax rule?",
    cefrLevel: "B2",
    theme: "Logic"
  },
  {
    word: "Maintain",
    pronunciation: "[meɪnˈteɪn]",
    definition: "Cause or enable an existing condition or state of affairs to continue.",
    exampleSentence: "You must practice talking regularly to maintain high verbal speed.",
    cefrLevel: "B2",
    theme: "Success"
  },
  {
    word: "Navigate",
    pronunciation: "[ˈnævɪɡeɪt]",
    definition: "Plan and direct the exact route or travel sequence dynamically.",
    exampleSentence: "The app's sidebar helps you seamlessly navigate between core pages.",
    cefrLevel: "B2",
    theme: "Travel"
  },
  {
    word: "Obstacle",
    pronunciation: "[ˈɒbstəkl]",
    definition: "A thing that blocks one's way or prevents or hinders progress.",
    exampleSentence: "Fear of making mistakes is the biggest obstacle to speaking.",
    cefrLevel: "B2",
    theme: "Success"
  },
  {
    word: "Persuade",
    pronunciation: "[pəˈsweɪd]",
    definition: "Convince someone to do something through sound reasoning.",
    exampleSentence: "She managed to persuade her community to fund her research.",
    cefrLevel: "B2",
    theme: "Communication"
  },
  {
    word: "Resilience",
    pronunciation: "[rɪˈzɪliəns]",
    definition: "The capacity to recover quickly from intense difficulties; toughness.",
    exampleSentence: "Failing tests is normal; showing resilient learning is what counts.",
    cefrLevel: "B2",
    theme: "Success"
  },

  // --- C1 Level Words ---
  {
    word: "Accumulate",
    pronunciation: "[əˈkjuːmjəleɪt]",
    definition: "Gather together or acquire an increasing number or quantity of things.",
    exampleSentence: "To clear high prestige levels, you need to accumulate XP.",
    cefrLevel: "C1",
    theme: "Success"
  },
  {
    word: "Benevolent",
    pronunciation: "[bəˈnevələnt]",
    definition: "Well meaning and extremely kindly toward others.",
    exampleSentence: "A benevolent tutor makes students feel safe to express themselves.",
    cefrLevel: "C1",
    theme: "Social"
  },
  {
    word: "Cognitive",
    pronunciation: "[ˈkɒɡnətɪv]",
    definition: "Relating to deep mental processes of perception, memory, and judgment.",
    exampleSentence: "Solving word scrambles stimulates vital cognitive pathways.",
    cefrLevel: "C1",
    theme: "Science"
  },
  {
    word: "Discrepancy",
    pronunciation: "[dɪsˈkrepənsi]",
    definition: "A severe lack of compatibility or similarity between multiple facts.",
    exampleSentence: "We noticed a slight discrepancy between standard and dialect versions.",
    cefrLevel: "C1",
    theme: "Science"
  },
  {
    word: "Eloquent",
    pronunciation: "[ˈeləkwənt]",
    definition: "Fluent, persuasive, and beautifully artistic in speaking or writing.",
    exampleSentence: "His eloquent delivery kept the audience completely spellbound.",
    cefrLevel: "C1",
    theme: "Communication"
  },
  {
    word: "Fluctuate",
    pronunciation: "[ˈflʌktʃueɪt]",
    definition: "Rise and fall deeply and irregularly in number, value, or amount.",
    exampleSentence: "Your daily study time might fluctuate depending on school workload.",
    cefrLevel: "C1",
    theme: "General"
  },
  {
    word: "Gregarious",
    pronunciation: "[ɡrɪˈɡeəriəs]",
    definition: "Extremely fond of social company; sociable and community-centered.",
    exampleSentence: "A gregarious learner thrives inside interactive online chat arenas.",
    cefrLevel: "C1",
    theme: "Social"
  },
  {
    word: "Hypothetical",
    pronunciation: "[ˌhaɪpəˈθetɪkl]",
    definition: "Serving as a logical hypothesis; proposed or assumed rather than real.",
    exampleSentence: "The teacher set up a hypothetical negotiation meeting for practice.",
    cefrLevel: "C1",
    theme: "Philosophy"
  },
  {
    word: "Indigenous",
    pronunciation: "[ɪnˈdɪdʒənəs]",
    definition: "Originating or occurring naturally in a particular ancient place; native.",
    exampleSentence: "The linguists are documenting several indigenous forest dialects.",
    cefrLevel: "C1",
    theme: "Nature"
  },
  {
    word: "Juxtapose",
    pronunciation: "[ˌdʒʌkstəˈpəʊz]",
    definition: "Place or deal with close together specifically for contrasting effect.",
    exampleSentence: "The design juxtaposes playful illustrations with a professional layout.",
    cefrLevel: "C1",
    theme: "Art"
  },
  {
    word: "Lucid",
    pronunciation: "[ˈluːsɪd]",
    definition: "Expressed clearly in high detail; extremely easy to understand.",
    exampleSentence: "Even the most complex grammar rule was explained in a lucid manner.",
    cefrLevel: "C1",
    theme: "Success"
  },
  {
    word: "Mitigate",
    pronunciation: "[ˈmɪtɪɡeɪt]",
    definition: "Make a negative impact less severe, serious, or painful.",
    exampleSentence: "Regular review schedules help mitigate vocabulary memory decay.",
    cefrLevel: "C1",
    theme: "Success"
  },
  {
    word: "Nuance",
    pronunciation: "[ˈnjuːɑːns]",
    definition: "A tiny, subtle difference in meaning, expression, or phonetic sound.",
    exampleSentence: "An advanced speaker appreciates the tiny nuances between synonyms.",
    cefrLevel: "C1",
    theme: "Learning"
  },
  {
    word: "Omnipotent",
    pronunciation: "[ɒmˈnɪpətənt]",
    definition: "Having unlimited power and infinite control over everything.",
    exampleSentence: "No single language software is omnipotent; use eclectic approaches.",
    cefrLevel: "C1",
    theme: "Philosophy"
  },
  {
    word: "Pragmatic",
    pronunciation: "[præɡˈmætɪk]",
    definition: "Dealing with things sensibly based on practical calculations rather than theories.",
    exampleSentence: "Taking structured notes is a pragmatic approach to study-review.",
    cefrLevel: "C1",
    theme: "Logic"
  },

  // --- C2 Level Words ---
  {
    word: "Aberration",
    pronunciation: "[ˌæbəˈreɪʃn]",
    definition: "A departure from what is normal or expected, typically an unwelcome one.",
    exampleSentence: "The spelling error was a minor aberration in her pristine report.",
    cefrLevel: "C2",
    theme: "General"
  },
  {
    word: "Cacophony",
    pronunciation: "[kəˈkɒfəni]",
    definition: "A harsh, chaotic, discordant and confusing mixture of noises.",
    exampleSentence: "A cacophony of street horns woke us up early in London.",
    cefrLevel: "C2",
    theme: "Nature"
  },
  {
    word: "Ephemeral",
    pronunciation: "[ɪˈfemərəl]",
    definition: "Lasting for a extremely short, beautiful phase of time.",
    exampleSentence: "Memory is ephemeral unless reinforced by active SRS practice.",
    cefrLevel: "C2",
    theme: "Philosophy"
  },
  {
    word: "Grandiloquent",
    pronunciation: "[ɡrænˈdɪləkwənt]",
    definition: "Pompous, over-extravagant, or artificial in language to impress people.",
    exampleSentence: "The speech was overly grandiloquent and lacked human sincerity.",
    cefrLevel: "C2",
    theme: "Art"
  },
  {
    word: "Iconoclast",
    pronunciation: "[aɪˈkɒnəklæst]",
    definition: "A strong person who attacks or deconstructs cherished common beliefs.",
    exampleSentence: "The radical researcher was hailed as a brilliant iconoclast.",
    cefrLevel: "C2",
    theme: "Philosophy"
  },
  {
    word: "Mellifluous",
    pronunciation: "[meˈlɪfluəs]",
    definition: "Sweet, fluid, or musical, presenting an extremely pleasant sound to hear.",
    exampleSentence: "The reading instructor had a beautiful, mellifluous voice.",
    cefrLevel: "C2",
    theme: "Art"
  },
  {
    word: "Nefarious",
    pronunciation: "[nɪˈfeəriəs]",
    definition: "Extremely wicked, criminal, or villainous.",
    exampleSentence: "The villain in the Gotham simulation hatched a nefarious plot.",
    cefrLevel: "C2",
    theme: "Social"
  },
  {
    word: "Obsequious",
    pronunciation: "[əbˈsiːkwiəs]",
    definition: "Obedient or excessively attentive to an obsequious/servile degree.",
    exampleSentence: "He was annoyed by the obsequious behavior of the premium merchant.",
    cefrLevel: "C2",
    theme: "Social"
  },
  {
    word: "Paradigm",
    pronunciation: "[ˈpærədaɪm]",
    definition: "A fundamental example, typical pattern, or absolute model of something.",
    exampleSentence: "This immersive tutor is a paradigm shift in language pedagogy.",
    cefrLevel: "C2",
    theme: "Learning"
  },
  {
    word: "Quintessential",
    pronunciation: "[ˌkwɪntɪˈsenʃl]",
    definition: "Representing the most perfect or typical form of a class or quality.",
    exampleSentence: "The quiet tea garden is the quintessential British setting.",
    cefrLevel: "C2",
    theme: "Art"
  },
  {
    word: "Recalcitrant",
    pronunciation: "[rɪˈkælsɪtrənt]",
    definition: "Having an obstinately uncooperative, rebellious attitude toward order.",
    exampleSentence: "The recalcitrant student refused to perform any verbal exercises.",
    cefrLevel: "C2",
    theme: "Social"
  },
  {
    word: "Serendipity",
    pronunciation: "[ˌserənˈdɪpəti]",
    definition: "The occurrence of highly beneficial events entirely by a happy accident.",
    exampleSentence: "Finding this excellent learning app was a stroke of serendipity.",
    cefrLevel: "C2",
    theme: "Philosophy"
  },
  {
    word: "Sycophant",
    pronunciation: "[ˈsɪkəfænt]",
    definition: "A servile flatterer who works only to gain custom advantages.",
    exampleSentence: "The politician was surrounded by yes-men and sycophants.",
    cefrLevel: "C2",
    theme: "Social"
  },
  {
    word: "Ubiquitous",
    pronunciation: "[juːˈbɪkwɪtəs]",
    definition: "Present, appearing, or found absolutely everywhere.",
    exampleSentence: "English is a ubiquitous language in modern international commerce.",
    cefrLevel: "C2",
    theme: "Living"
  },
  {
    word: "Vociferous",
    pronunciation: "[vəʊˈsɪfərəs]",
    definition: "Vehement, clamorous, or expressing forceful public opinions loudly.",
    exampleSentence: "There were vociferous objections to changing the exam pattern.",
    cefrLevel: "C2",
    theme: "Communication"
  }
];

// Level mapping details
const LEVEL_CONFIG = {
  A1: { label: "Novice (A1)", color: "bg-fun-green text-white", border: "border-fun-green", badge: "A1", reqLevel: 1, reqPoints: 0 },
  A2: { label: "Elementary (A2)", color: "bg-fun-blue text-white", border: "border-fun-blue", badge: "A2", reqLevel: 1, reqPoints: 0 },
  B1: { label: "Intermediate (B1)", color: "bg-fun-pink text-white", border: "border-fun-pink", badge: "B1", reqLevel: 2, reqPoints: 250 },
  B2: { label: "Upper Intermediate (B2)", color: "bg-fun-purple text-white", border: "border-fun-purple", badge: "B2", reqLevel: 3, reqPoints: 500 },
  C1: { label: "Advanced (C1)", color: "bg-fun-yellow text-slate-800", border: "border-fun-yellow", badge: "C1", reqLevel: 4, reqPoints: 1000 },
  C2: { label: "Mastery (C2)", color: "bg-slate-800 text-white", border: "border-slate-800", badge: "C2", reqLevel: 5, reqPoints: 2000 }
};

const CEFR_ORDER: Array<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'> = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const WordBank: React.FC = () => {
  const { 
    wordBank, 
    updateWordBankEntry, 
    addToWordBank, 
    awardPoints, 
    stats, 
    cefrLevel, 
    updateProfile 
  } = useGamification();

  // Navigation tab: 'practice' | 'dictionary' | 'vault'
  const [activeTab, setActiveTab] = useState<'practice' | 'dictionary' | 'vault'>('practice');

  // Interactive Level selection in Dictionary Tab
  const [selectedDictLevel, setSelectedDictLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'>('A1');

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");

  // Practice session states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isBonusDeck, setIsBonusDeck] = useState(false);

  // Confetti triggering when level unlocks
  const [showUnlockConfetti, setShowUnlockConfetti] = useState(false);
  const [unlockMessage, setUnlockMessage] = useState<string | null>(null);

  // Modal / Confirm state for XP unlock
  const [lockPrompt, setLockPrompt] = useState<{ level: 'B1' | 'B2' | 'C1' | 'C2'; cost: number } | null>(null);

  const today = new Date().toISOString().split('T')[0];

  // Map user's current highest level index
  const userHighestCEFRIndex = useMemo(() => {
    return CEFR_ORDER.indexOf(cefrLevel || 'A1');
  }, [cefrLevel]);

  // Determine standard reviews due today
  const dueWords = useMemo(() => {
    return wordBank.filter(entry => {
      const nextReview = entry.nextReviewAt.split('T')[0];
      return nextReview <= today;
    });
  }, [wordBank, today]);

  // Words list used for practice (due list, or fallback total list if they want a bonus)
  const practiceWordsList = useMemo(() => {
    if (isBonusDeck) {
      return wordBank; // Consolidate all words in bank
    }
    return dueWords;
  }, [dueWords, wordBank, isBonusDeck]);

  const currentPracticeWord = practiceWordsList[currentIndex];

  // Native Text to Speech speaker
  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      
      const voices = window.speechSynthesis.getVoices();
      const preferredTutorVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural'))) ||
                                  voices.find(v => v.lang.startsWith('en')) || 
                                  voices[0];
      if (preferredTutorVoice) {
        utterance.voice = preferredTutorVoice;
      }
      window.speechSynthesis.speak(utterance);
    }
  };

  // Play word on card entrance or display
  useEffect(() => {
    if (activeTab === 'practice' && currentPracticeWord) {
      // Auto-pronounce word elegantly when user navigates next
      handleSpeak(currentPracticeWord.word);
    }
  }, [currentIndex, activeTab, isBonusDeck]);

  // Check if a specific CEFR level is unlocked
  const isLevelUnlocked = (lvl: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2') => {
    const levelIndex = CEFR_ORDER.indexOf(lvl);
    if (levelIndex <= 1) return true; // A1 and A2 are open by default
    
    // Unlocked if user's profile cefrLevel represents an equal or higher index
    if (levelIndex <= userHighestCEFRIndex) return true;
    
    // Or unlocked if they meet the Vocabulary Skill Tree Level requirement
    const reqLevel = LEVEL_CONFIG[lvl].reqLevel;
    if (stats.skills.vocabulary.level >= reqLevel) return true;

    return false;
  };

  // Trigger XP points immediate unlock
  const handleUnlockLevelByPoints = async (lvl: 'B1' | 'B2' | 'C1' | 'C2') => {
    const cost = 100;
    if (stats.points < cost) {
      alert("You need at least 100 XP to instantly bypass and unlock this level. Keep training to earn points!");
      return;
    }

    // Deduct points
    awardPoints(-cost, `Instant Unlock Dict Level ${lvl}`, 'vocabulary');
    
    // Update profile CEFR level
    await updateProfile({ cefrLevel: lvl });
    setLockPrompt(null);
    setSelectedDictLevel(lvl);
    
    // Celebration
    setUnlockMessage(`CONGRATULATIONS! You unlocked the ${lvl} Level Vocabulary Matrix! 🎉`);
    setShowUnlockConfetti(true);
    handleSpeak(`Congratulations! Level ${lvl} unlocked.`);
    
    setTimeout(() => {
      setShowUnlockConfetti(false);
      setUnlockMessage(null);
    }, 4000);
  };

  // Manage Practice action
  const handlePracticeNext = (isCorrect: boolean) => {
    if (!currentPracticeWord) return;

    updateWordBankEntry(currentPracticeWord.word, isCorrect);
    
    if (isCorrect) {
      awardPoints(15, 'SRS Vocab Review Corrected', 'vocabulary');
    } else {
      awardPoints(2, 'SRS Review Streak Check', 'vocabulary');
    }

    if (currentIndex < practiceWordsList.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      setIsFinished(true);
    }
  };

  // Clean trigger deletion from Personal Vault
  const handleRemoveFromVault = (wordText: string) => {
    // Custom soft confirmation inside modern React iframe
    if (window.confirm(`Are you sure you want to remove '${wordText}' from your active Word Bank review deck?`)) {
      // Set word bank state directly through local filter mapping
      // Note: GamificationContext is backed by updates to current user, we can trigger update with a filtered array or simulated service path
      const freshBank = wordBank.filter(w => w.word.toLowerCase() !== wordText.toLowerCase());
      updateProfile({ wordBank: freshBank });
    }
  };

  // Handle immediate custom entry into SRS review from level dictionary
  const handleAddWordToReview = (item: DictionaryWord) => {
    const vocabWordMapped = {
      word: item.word,
      definition: item.definition,
      exampleSentence: item.exampleSentence,
      pronunciation: item.pronunciation,
      cefrLevel: item.cefrLevel
    };
    addToWordBank(vocabWordMapped, `Level Dictionary: ${item.cefrLevel}`);
    handleSpeak(`Added ${item.word}`);
  };

  // Filter dictionary items based on chosen level & queries
  const filteredDictWords = useMemo(() => {
    return DICTIONARY_DATA.filter(item => {
      if (item.cefrLevel !== selectedDictLevel) return false;
      if (searchQuery.trim() === "") return true;
      
      const query = searchQuery.toLowerCase();
      return (
        item.word.toLowerCase().includes(query) ||
        item.definition.toLowerCase().includes(query) ||
        item.theme.toLowerCase().includes(query)
      );
    });
  }, [selectedDictLevel, searchQuery]);

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Confetti celebration rendering */}
      {showUnlockConfetti && (
        <>
          <Confetti />
          <div className="fixed inset-0 z-[250] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-[3rem] p-8 max-w-md w-full text-center shadow-2xl border-4 border-fun-yellow"
            >
              <div className="w-20 h-20 bg-fun-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Star size={44} className="text-fun-yellow fill-current" />
              </div>
              <h2 className="text-3xl font-black text-slate-800 uppercase mb-2">Level Promoted!</h2>
              <p className="text-slate-600 font-bold mb-6 text-lg">
                {unlockMessage}
              </p>
              <Button onClick={() => setShowUnlockConfetti(false)} className="bg-fun-yellow hover:bg-yellow-500 text-slate-900 border-yellow-700 w-full text-xl py-4">
                AWESOME!
              </Button>
            </motion.div>
          </div>
        </>
      )}

      {/* Lock Level XP Modal Prompt */}
      {lockPrompt && (
        <div className="fixed inset-0 z-[250] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl border-b-[8px] border-fun-pink"
          >
            <h3 className="text-2xl font-black text-slate-800 uppercase flex items-center gap-2 mb-2">
              <Lock size={24} className="text-fun-pink" /> Level Dictionary Locked
            </h3>
            <p className="text-slate-500 font-bold text-sm mb-4 leading-relaxed">
              The vocabulary matrix for <span className="text-fun-pink">{LEVEL_CONFIG[lockPrompt.level].label}</span> is currently locked! 
              You can automatically unlock this tier by advancing your Vocabulary Skill Tree to level <span className="text-blue-600">{LEVEL_CONFIG[lockPrompt.level].reqLevel}</span>.
            </p>

            <div className="bg-slate-50 rounded-2xl p-4 border-2 border-slate-100 space-y-3 mb-6">
              <div className="flex justify-between items-center text-sm font-black text-slate-400">
                <span>YOUR BALANCE:</span>
                <span className="text-fun-yellow flex items-center gap-1">
                  ⭐ {stats.points} XP
                </span>
              </div>
              <div className="h-px bg-slate-200" />
              <div className="flex justify-between items-center text-sm font-black text-slate-600">
                <span>BYPASS COST:</span>
                <span className="text-fun-pink">100 XP</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setLockPrompt(null)}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleUnlockLevelByPoints(lockPrompt.level)}
                disabled={stats.points < lockPrompt.cost}
                className={`flex-1 py-3 px-4 rounded-xl font-black text-white flex items-center justify-center gap-1.5 shadow-md active:translate-y-0.5 transition-all
                  ${stats.points >= lockPrompt.cost 
                    ? 'bg-fun-pink hover:bg-pink-500 border-b-4 border-pink-700' 
                    : 'bg-slate-300 cursor-not-allowed'
                  }`}
              >
                <Sparkles size={16} /> Unlock (100 XP)
              </button>
            </div>
            {stats.points < lockPrompt.cost && (
              <p className="text-center text-xs font-black text-red-400 uppercase mt-3">
                ⚠️ Insufficient XP Points to bypass
              </p>
            )}
          </motion.div>
        </div>
      )}

      {/* Hero Header Section */}
      <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-[8px] border-blue-600 border-2 border-slate-100 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-48 h-48 bg-blue-50 rounded-full -z-10" />
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-1">
              <Compass size={12} fill="currentColor" /> Vocabulary Deck
            </span>
            <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full font-black text-xs uppercase tracking-widest">
              CEFR: {cefrLevel || 'A1'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
            <Brain className="text-fun-pink fill-current" /> Learner Dictionary
          </h1>
          <p className="text-slate-500 font-bold max-w-lg text-sm sm:text-base leading-relaxed">
            Expand your vocabulary with level-appropriate terms. As you gain skill, bypass with points, or master lessons, new advanced words unfold!
          </p>
        </div>

        {/* Global Progress Widget */}
        <div className="bg-slate-50 border-2 border-slate-100 p-4 rounded-3xl min-w-[200px] space-y-2.5">
          <div className="flex items-center justify-between text-xs font-black text-slate-400">
            <span>VOCAB SKILL</span>
            <span className="text-blue-600">LVL {stats.skills.vocabulary.level}</span>
          </div>
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${stats.skills.vocabulary.progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1 text-fun-yellow">⭐ {stats.points} XP</span>
            <span>{stats.skills.vocabulary.progress}% to next unlocked word</span>
          </div>
        </div>
      </div>

      {/* Navigation tabs row */}
      <div className="flex p-1.5 bg-slate-100 rounded-2xl gap-1">
        <button
          onClick={() => {
            setActiveTab('practice');
            setIsFinished(false);
          }}
          className={`flex-1 py-3 text-center rounded-xl font-black text-xs sm:text-sm transition-all uppercase flex items-center justify-center gap-2
            ${activeTab === 'practice' 
              ? 'bg-white text-blue-600 shadow-md' 
              : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'}`}
        >
          <Award size={16} /> 🎯 Practice Deck ({dueWords.length})
        </button>
        <button
          onClick={() => setActiveTab('dictionary')}
          className={`flex-1 py-3 text-center rounded-xl font-black text-xs sm:text-sm transition-all uppercase flex items-center justify-center gap-2
            ${activeTab === 'dictionary' 
              ? 'bg-white text-blue-600 shadow-md' 
              : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'}`}
        >
          <BookOpen size={16} /> 📖 Dictionary Browser
        </button>
        <button
          onClick={() => setActiveTab('vault')}
          className={`flex-1 py-3 text-center rounded-xl font-black text-xs sm:text-sm transition-all uppercase flex items-center justify-center gap-2
            ${activeTab === 'vault' 
              ? 'bg-white text-blue-600 shadow-md' 
              : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'}`}
        >
          <Bookmark size={16} /> Personal Vault ({wordBank.length})
        </button>
      </div>

      {/* Content Rendering Tab Area */}
      <div className="min-h-[450px]">
        {/* TAB 1: PRACTICE DECK */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            {practiceWordsList.length === 0 ? (
              <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 text-center shadow-xl border-b-[12px] border-fun-blue border-2 border-slate-100 max-w-2xl mx-auto space-y-6">
                <div className="w-20 h-20 bg-fun-blue/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={44} className="text-fun-blue" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-800 uppercase">You're All Caught Up!</h2>
                  <p className="text-slate-500 font-bold mt-2">
                    No vocabulary spaced-repetition reviews are scheduled for today. Great performance!
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto bg-slate-50 p-4 rounded-2xl border-2 border-slate-100">
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase">Total Words Saved</p>
                    <p className="text-xl font-black text-slate-800">{wordBank.length}</p>
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase font-mono">My Level</p>
                    <p className="text-xl font-black text-blue-600">{cefrLevel || 'A1'}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <Button 
                    onClick={() => setActiveTab('dictionary')} 
                    variant="outline"
                    className="flex justify-center items-center gap-1"
                  >
                    Browse Level Dictionary <Compass size={18} />
                  </Button>
                  {wordBank.length > 0 && (
                    <Button 
                      onClick={() => {
                        setIsBonusDeck(true);
                        setCurrentIndex(0);
                        setIsFinished(false);
                      }}
                      variant="success"
                      className="flex justify-center items-center gap-1"
                    >
                      Consolidation Run (All {wordBank.length} Words) <RefreshCw size={18} />
                    </Button>
                  )}
                </div>
              </div>
            ) : isFinished ? (
              <div className="bg-white rounded-[2.5rem] p-12 text-center shadow-xl border-b-[12px] border-fun-green border-2 border-slate-100 max-w-2xl mx-auto space-y-6">
                <div className="w-20 h-20 bg-fun-green/10 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles size={44} className="text-fun-green" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-800 uppercase">Interactive Review Complete!</h2>
                  <p className="text-slate-500 font-bold mt-2">
                    Amazing perseverance. You have completed your review streak goals today and earned active knowledge credit!
                  </p>
                </div>
                <div className="flex justify-center gap-3">
                  <Button
                    onClick={() => {
                      setIsFinished(false);
                      setCurrentIndex(0);
                      setIsFlipped(false);
                      setIsBonusDeck(false);
                    }}
                    className="bg-fun-green hover:bg-green-500 border-green-700 font-black text-white px-8 py-3.5"
                  >
                    Review Again
                  </Button>
                  <Button
                    onClick={() => setActiveTab('dictionary')}
                    variant="outline"
                  >
                    Explore New Dictionary Words
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center px-2">
                  <div className="space-y-1">
                    <span className="bg-blue-50 border border-blue-100 text-blue-700 font-black text-xs px-2.5 py-1 rounded-lg">
                      {isBonusDeck ? "Consolidation Run (Non-SRS)" : "SRS Space Repetition Deck"}
                    </span>
                    <p className="text-xs text-slate-400 font-bold">
                      Tip: Tap card to flip. Listen to speech guide!
                    </p>
                  </div>
                  <span className="font-extrabold text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {currentIndex + 1} / {practiceWordsList.length} words
                  </span>
                </div>

                <div className="relative h-[380px] w-full perspective-1000">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPracticeWord.word}
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <div 
                        className={`relative w-full h-full transition-all duration-500 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
                        onClick={() => setIsFlipped(!isFlipped)}
                      >
                        {/* Word card Front side */}
                        <div className="absolute inset-0 backface-hidden bg-white rounded-[3rem] p-8 flex flex-col items-center justify-between text-center shadow-xl border-l-[3px] border-r-[3px] border-b-[12px] border-fun-blue border-slate-100 border-2">
                          <div className="w-full flex justify-between items-center">
                            <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
                              Review Item
                            </span>
                            {currentPracticeWord.cefrLevel && (
                              <span className="bg-fun-blue text-white px-2.5 py-1 rounded-lg text-xs font-black">
                                {currentPracticeWord.cefrLevel}
                              </span>
                            )}
                          </div>

                          <div className="space-y-4">
                            <h2 className="text-4xl sm:text-6xl font-black text-slate-800 tracking-tight">
                              {currentPracticeWord.word}
                            </h2>
                            {currentPracticeWord.pronunciation && (
                              <p className="text-md sm:text-lg font-bold text-blue-500 font-mono flex items-center justify-center gap-1">
                                {currentPracticeWord.pronunciation}
                              </p>
                            )}
                          </div>

                          <div className="w-full flex justify-center gap-4 items-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // prevent flipping the card
                                handleSpeak(currentPracticeWord.word);
                              }}
                              className="w-12 h-12 rounded-full bg-slate-50 border-2 border-slate-200 text-blue-600 flex items-center justify-center hover:bg-slate-100 hover:scale-110 active:scale-95 transition-all"
                              title="Listen to phonetic voice pronunciation pointer"
                            >
                              <Volume2 size={20} />
                            </button>
                            <span className="text-slate-400 font-bold text-xs animate-pulse flex items-center gap-1.5">
                              Tap Card to Reveal Definition <RefreshCw size={12} />
                            </span>
                          </div>
                        </div>

                        {/* Word card Back side */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 rounded-[3rem] p-6 sm:p-10 flex flex-col items-center justify-between text-center shadow-xl border-l-[3px] border-r-[3px] border-b-[12px] border-fun-pink border-slate-800 border-2 text-white">
                          <div className="w-full flex justify-between items-center text-white/40 text-xs font-black tracking-widest uppercase">
                            <span>EXPLANATION REVEAL</span>
                            <span className="text-fun-pink font-extrabold flex items-center gap-1">
                              <Sparkles size={12} /> {currentPracticeWord.source || "Dictionary"}
                            </span>
                          </div>

                          <div className="space-y-5 max-w-xl">
                            <div>
                              <p className="text-xs font-black text-white/30 uppercase tracking-widest mb-1">
                                Meaning
                              </p>
                              <p className="text-xl sm:text-2xl font-black text-white leading-snug">
                                {currentPracticeWord.definition}
                              </p>
                            </div>

                            <div className="h-px bg-white/10" />

                            <div>
                              <p className="text-xs font-black text-white/30 uppercase tracking-widest mb-1">
                                Context Sentence
                              </p>
                              <p className="text-md sm:text-lg italic text-slate-300 font-medium">
                                "{currentPracticeWord.exampleSentence}"
                              </p>
                            </div>
                          </div>

                          <span className="text-white/40 text-xs font-black flex items-center gap-1">
                            Click to Flip back <RefreshCw size={12} />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Score rating button indicators */}
                <div className="flex gap-4 max-w-md mx-auto">
                  <button
                    onClick={() => handlePracticeNext(false)}
                    className="flex-1 bg-white border-2 border-red-100 hover:border-red-200 text-red-500 py-3.5 px-4 rounded-2xl font-black flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all active:translate-y-0.5 group"
                  >
                    <XCircle className="group-hover:scale-110 transition-transform text-red-500" /> MISSED IT
                  </button>
                  <button
                    onClick={() => handlePracticeNext(true)}
                    className="flex-1 bg-fun-green text-white py-3.5 px-4 rounded-2xl font-black flex items-center justify-center gap-1.5 border-b-[6px] border-green-800 hover:bg-green-500 active:border-b-0 hover:shadow-lg transition-all active:translate-y-1 group"
                  >
                    <CheckCircle className="group-hover:scale-110 transition-transform" /> GOT IT
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: LEVEL DICTIONARY BROWSER */}
        {activeTab === 'dictionary' && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              {/* Horizontal pills with unlock status */}
              <div className="flex bg-white border-2 border-slate-100 p-2 rounded-2xl shadow-sm overflow-x-auto gap-2 scrollbar-none">
                {CEFR_ORDER.map((lvl) => {
                  const unlocked = isLevelUnlocked(lvl);
                  const isCurrent = lvl === selectedDictLevel;
                  const config = LEVEL_CONFIG[lvl];

                  return (
                    <button
                      key={lvl}
                      onClick={() => {
                        if (unlocked) {
                          setSelectedDictLevel(lvl);
                        } else {
                          setLockPrompt({ level: lvl as any, cost: 100 });
                        }
                      }}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm uppercase transition-all whitespace-nowrap
                        ${isCurrent 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : unlocked 
                            ? 'bg-slate-50 text-slate-700 hover:bg-slate-100' 
                            : 'bg-slate-100 text-slate-400 border border-slate-200 hover:bg-slate-200/60'
                        }`}
                    >
                      <span>{lvl}</span>
                      {unlocked ? (
                        <Check size={12} className={isCurrent ? "text-white" : "text-fun-green"} />
                      ) : (
                        <Lock size={12} className="text-slate-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Advanced Search filter */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder={`Search words in level ${selectedDictLevel} dictionary (e.g., Apple, Simple, Empathy...)`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border-2 border-slate-100 pl-11 pr-4 py-3 rounded-2xl font-semibold text-slate-800 shadow-sm focus:border-blue-400 focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* List browser matching criteria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDictWords.length === 0 ? (
                <div className="col-span-1 md:col-span-2 bg-slate-50 rounded-2xl p-12 text-center border-2 border-slate-100">
                  <p className="text-slate-400 font-bold text-lg">No dictionary search matches found for "{searchQuery}".</p>
                  <button 
                    onClick={() => setSearchQuery("")} 
                    className="text-blue-600 font-black mt-2 underline"
                  >
                    Clear Filter
                  </button>
                </div>
              ) : (
                filteredDictWords.map((item) => {
                  const alreadySaved = wordBank.some(w => w.word.toLowerCase() === item.word.toLowerCase());
                  
                  return (
                    <motion.div
                      layout
                      key={item.word}
                      className="bg-white rounded-3xl p-5 border-2 border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        {/* Upper theme category labels */}
                        <div className="flex justify-between items-center">
                          <span className="bg-blue-50 text-blue-700 font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            {item.theme}
                          </span>
                          <span className="font-semibold text-slate-400 text-xs font-mono">
                            {LEVEL_CONFIG[item.cefrLevel].label}
                          </span>
                        </div>

                        {/* Title word representation */}
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="text-2xl font-black text-slate-800">{item.word}</h3>
                            <button
                              onClick={() => handleSpeak(item.word)}
                              className="text-blue-600 hover:text-blue-800 p-1 rounded-lg bg-blue-50 hover:bg-blue-100 active:scale-90 transition-all"
                              title="Listen voice guides pointer"
                            >
                              <Volume2 size={16} />
                            </button>
                          </div>
                          <p className="text-xs text-slate-400 font-mono font-medium">{item.pronunciation}</p>
                        </div>

                        {/* Explanation description */}
                        <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                          {item.definition}
                        </p>

                        {/* Inline context example sentence */}
                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-0.5">Example Context</p>
                          <p className="text-xs italic text-slate-500 font-medium">"{item.exampleSentence}"</p>
                        </div>
                      </div>

                      {/* Controls options */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                        {alreadySaved ? (
                          <div className="bg-fun-green/10 text-fun-green font-black text-xs px-3 py-2 rounded-xl flex items-center gap-1">
                            <Check size={14} className="stroke-[3px]" /> Added to Review Deck
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAddWordToReview(item)}
                            className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 active:scale-95 transition-all border border-blue-100"
                          >
                            <Plus size={14} className="stroke-[3px]" /> Add to Word Bank
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 3: PERSONAL VAULT DISPLAY */}
        {activeTab === 'vault' && (
          <div className="space-y-6">
            {wordBank.length === 0 ? (
              <div className="bg-slate-50 rounded-[2.5rem] p-12 text-center border-2 border-slate-100 max-w-xl mx-auto space-y-4">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto">
                  <Bookmark size={30} className="text-slate-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-700 uppercase">Your Personal Vault of Words is Empty!</h3>
                  <p className="text-slate-400 font-bold mt-1 text-sm">
                    Browse the level dictionary or complete roleplay quests to collect and save vocabulary into your dynamic review cards.
                  </p>
                </div>
                <Button 
                  onClick={() => setActiveTab('dictionary')}
                  className="bg-blue-600 hover:bg-blue-500 border-blue-700 py-2.5 text-sm"
                >
                  Visit Dictionary to Add Words
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-black text-slate-400 uppercase tracking-widest px-2">
                  <span>Vocabulary Word Card</span>
                  <span>SRS Streak Check</span>
                </div>

                <div className="space-y-3">
                  {wordBank.map((entry) => {
                    const daysLeft = Math.max(0, Math.ceil((new Date(entry.nextReviewAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
                    
                    return (
                      <div 
                        key={entry.word}
                        className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-slate-100 hover:border-slate-200 transition-colors shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1 sm:max-w-md">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-extrabold text-slate-850 text-lg sm:text-xl">{entry.word}</span>
                            {entry.cefrLevel && (
                              <span className="bg-slate-100 text-slate-650 text-[10px] font-black px-2 py-0.5 rounded-md">
                                {entry.cefrLevel}
                              </span>
                            )}
                            <button
                              onClick={() => handleSpeak(entry.word)}
                              className="text-blue-600 hover:text-blue-800 p-0.5 rounded"
                              title="Listen voice pronouncing guide"
                            >
                              <Volume2 size={14} />
                            </button>
                          </div>
                          <p className="text-xs text-slate-500 font-semibold leading-relaxed line-clamp-2">
                            {entry.definition}
                          </p>
                        </div>

                        {/* Retainment rating telemetry */}
                        <div className="flex items-center justify-between sm:justify-end gap-6 border-t pt-3 sm:border-0 sm:pt-0">
                          <div className="text-left sm:text-right space-y-0.5">
                            <span className="text-[10px] font-black uppercase text-slate-400 block">Review Due Status</span>
                            {daysLeft === 0 ? (
                              <span className="bg-red-50 text-red-500 px-2.5 py-0.5 rounded-lg text-xs font-black animate-pulse">
                                Due Today!
                              </span>
                            ) : (
                              <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-lg text-xs font-black whitespace-nowrap">
                                in {daysLeft} days
                              </span>
                            )}
                          </div>

                          <div className="text-left sm:text-right space-y-0.5">
                            <span className="text-[10px] font-black uppercase text-slate-400 block">Mastery Correct</span>
                            <span className="font-bold text-sm text-slate-700 flex items-center justify-end gap-1">
                              💪 {entry.timesCorrect} correct
                            </span>
                          </div>

                          {/* Delete from active word bank review lists */}
                          <button
                            onClick={() => handleRemoveFromVault(entry.word)}
                            className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all active:scale-95"
                            title="Remove from vocab bank"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WordBank;
