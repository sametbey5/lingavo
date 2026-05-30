export interface Phrase {
  text: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

export const PHRASES: Phrase[] = [
  { text: "Hello, how are you today?", difficulty: 'Beginner', category: 'Greetings' },
  { text: "Nice to meet you.", difficulty: 'Beginner', category: 'Greetings' },
  { text: "Good morning, everyone.", difficulty: 'Beginner', category: 'Greetings' },
  
  { text: "I would like to order a cup of coffee.", difficulty: 'Beginner', category: 'Food & Drink' },
  { text: "Could I see the menu, please?", difficulty: 'Beginner', category: 'Food & Drink' },
  { text: "The food was delicious, thank you.", difficulty: 'Intermediate', category: 'Food & Drink' },
  
  { text: "Where is the nearest train station?", difficulty: 'Beginner', category: 'Travel' },
  { text: "I have a reservation for two nights.", difficulty: 'Intermediate', category: 'Travel' },
  { text: "Could you please tell me where the nearest station is?", difficulty: 'Intermediate', category: 'Travel' },
  
  { text: "Let's schedule a meeting for next week.", difficulty: 'Intermediate', category: 'Business' },
  { text: "The entrepreneurial spirit is essential for innovation.", difficulty: 'Advanced', category: 'Business' },
  { text: "We need to focus on our core competencies.", difficulty: 'Advanced', category: 'Business' },
  
  { text: "She sells seashells by the seashore.", difficulty: 'Advanced', category: 'Tongue Twister' },
  { text: "Peter Piper picked a peck of pickled peppers.", difficulty: 'Advanced', category: 'Tongue Twister' },
  { text: "How much wood would a woodchuck chuck?", difficulty: 'Advanced', category: 'Tongue Twister' },

  { text: "The weather is very nice this afternoon.", difficulty: 'Beginner', category: 'Weather' },
  { text: "I have been studying English for three months.", difficulty: 'Intermediate', category: 'Education' },
  { text: "It is important to practice speaking every day.", difficulty: 'Intermediate', category: 'General' },
  { text: "The phenomenon was particularly fascinating to the researchers.", difficulty: 'Advanced', category: 'Science' },
];
