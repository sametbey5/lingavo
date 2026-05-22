export interface DictionaryWord {
  word: string;
  definition: string;
  exampleSentence: string;
  pronunciation: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  category: string;
}

export const CAMBRIDGE_DICTIONARY: DictionaryWord[] = [
  // A1 Words
  {
    word: "A / An",
    definition: "Used before singular nouns that are countable.",
    exampleSentence: "I have a dog and an elephant.",
    pronunciation: "/ə/, /æn/",
    level: "A1",
    category: "Determiner"
  },
  {
    word: "About",
    definition: "On the subject of, or near to.",
    exampleSentence: "Let's talk about our school day.",
    pronunciation: "/əˈbaʊt/",
    level: "A1",
    category: "Preposition & Adverb"
  },
  {
    word: "Above",
    definition: "In or to a higher place than something.",
    exampleSentence: "They live in the apartment above us.",
    pronunciation: "/əˈbʌv/",
    level: "A1",
    category: "Preposition"
  },
  {
    word: "Across",
    definition: "From one side to the other side.",
    exampleSentence: "We walked across the long bridge.",
    pronunciation: "/əˈkrɒs/",
    level: "A1",
    category: "Preposition"
  },
  {
    word: "Action",
    definition: "The process of doing something or behaving.",
    exampleSentence: "This exciting action film stars a famous actor.",
    pronunciation: "/ˈæk.ʃən/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Activity",
    definition: "Something that you do for enjoyment or learning.",
    exampleSentence: "Swimming is a very healthy activity.",
    pronunciation: "/ækˈtɪv.ə.ti/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Actor",
    definition: "A person who performs in a play or movie.",
    exampleSentence: "He wants to be a professional actor.",
    pronunciation: "/ˈæk.tər/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Actress",
    definition: "A female actor.",
    exampleSentence: "She is a talented and famous actress.",
    pronunciation: "/ˈæk.trəs/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Add",
    definition: "To put something together with something else.",
    exampleSentence: "Shall I add more sugar to your tea?",
    pronunciation: "/æd/",
    level: "A1",
    category: "Verb"
  },
  {
    word: "Address",
    definition: "The details of where a building is located.",
    exampleSentence: "Write your home address on this card.",
    pronunciation: "/əˈdres/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Adult",
    definition: "A person who is fully grown or of legal age.",
    exampleSentence: "He is a grown adult",
    pronunciation: "/ˈæd.ʌlt/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Afraid",
    definition: "Feeling fear, worry, or anxiety.",
    exampleSentence: "The little boy is afraid of the dark.",
    pronunciation: "/əˈfreɪd/",
    level: "A1",
    category: "Adjective"
  },
  {
    word: "After",
    definition: "Later in time or behind in place.",
    exampleSentence: "We can play basketball after school.",
    pronunciation: "/ˈɑːf.tər/",
    level: "A1",
    category: "Preposition"
  },
  {
    word: "Afternoon",
    definition: "The period on a day between noon and evening.",
    exampleSentence: "Let's meet at the cafe this afternoon.",
    pronunciation: "/ˌɑːf.təˈnuːn/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Again",
    definition: "One more time or back as before.",
    exampleSentence: "Could you say that interesting story again?",
    pronunciation: "/əˈɡen/",
    level: "A1",
    category: "Adverb"
  },
  {
    word: "Age",
    definition: "The number of years someone has lived.",
    exampleSentence: "Our teacher asked for our name and age.",
    pronunciation: "/eɪdʒ/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Ago",
    definition: "In the past, back in time.",
    exampleSentence: "We arrived at the airport two hours ago.",
    pronunciation: "/əˈɡəʊ/",
    level: "A1",
    category: "Adverb"
  },
  {
    word: "Air",
    definition: "The mixture of gases that surrounds the earth.",
    exampleSentence: "I love breathing the fresh morning air.",
    pronunciation: "/eər/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Airport",
    definition: "A place where airplanes fly from.",
    exampleSentence: "The taxi drove us safely to the airport.",
    pronunciation: "/ˈeə.pɔːt/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "All",
    definition: "The whole quantity or every single one.",
    exampleSentence: "All the students passed their final exams.",
    pronunciation: "/ɔːl/",
    level: "A1",
    category: "Determiner & Pronoun"
  },
  {
    word: "All right",
    definition: "Safe, well, or acceptable.",
    exampleSentence: "Don't worry, everything is going to be all right.",
    pronunciation: "/ɔːl raɪt/",
    level: "A1",
    category: "Adjective & Adverb"
  },
  {
    word: "Also",
    definition: "In addition to, too.",
    exampleSentence: "She plays piano, and she also sings.",
    pronunciation: "/ˈɔːl.səʊ/",
    level: "A1",
    category: "Adverb"
  },
  {
    word: "Always",
    definition: "At all times or every single time.",
    exampleSentence: "He always completes his English homework.",
    pronunciation: "/ˈɔːl.weɪz/",
    level: "A1",
    category: "Adverb"
  },
  {
    word: "Amazing",
    definition: "Extremely surprising, excellent, or wonderful.",
    exampleSentence: "This garden is absolutely amazing!",
    pronunciation: "/əˈmeɪ.zɪŋ/",
    level: "A1",
    category: "Adjective"
  },
  {
    word: "And",
    definition: "Used to join words or phrases together.",
    exampleSentence: "I bought a red apple and a banana.",
    pronunciation: "/ænd/",
    level: "A1",
    category: "Conjunction"
  },
  {
    word: "Angry",
    definition: "Feeling extreme annoyance or madness.",
    exampleSentence: "He was angry because he lost his new pen.",
    pronunciation: "/ˈæŋ.ɡri/",
    level: "A1",
    category: "Adjective"
  },
  {
    word: "Animal",
    definition: "A living creature that can move around.",
    exampleSentence: "A lion is a very dangerous animal.",
    pronunciation: "/ˈæn.ɪ.məl/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Another",
    definition: "One more or a different one.",
    exampleSentence: "Would you like another cup of tea?",
    pronunciation: "/əˈnʌð.ər/",
    level: "A1",
    category: "Determiner & Pronoun"
  },
  {
    word: "Answer",
    definition: "To respond to a question or phone call.",
    exampleSentence: "Please answer the phone.",
    pronunciation: "/ˈɑːn.sər/",
    level: "A1",
    category: "Noun & Verb"
  },
  {
    word: "Any",
    definition: "Some or even a single quantity of.",
    exampleSentence: "Do you have any questions for the teacher?",
    pronunciation: "/ˈen.i/",
    level: "A1",
    category: "Determiner & Pronoun"
  },
  {
    word: "Anyone",
    definition: "Any person at all.",
    exampleSentence: "Is anyone home? Hello?",
    pronunciation: "/ˈen.i.wʌn/",
    level: "A1",
    category: "Pronoun"
  },
  {
    word: "Anything",
    definition: "Any event, occurrence, or thing.",
    exampleSentence: "Is there anything sweet inside this box?",
    pronunciation: "/ˈen.i.θɪŋ/",
    level: "A1",
    category: "Pronoun"
  },
  {
    word: "Apartment",
    definition: "A set of rooms to live in on one floor.",
    exampleSentence: "They live in a beautiful historic apartment.",
    pronunciation: "/əˈpɑːt.mənt/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Apple",
    definition: "A sweet round fruit with crisp flesh.",
    exampleSentence: "She had a red apple in the afternoon.",
    pronunciation: "/ˈæp.əl/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "April",
    definition: "The fourth month of the year.",
    exampleSentence: "My brother's birthday is in April.",
    pronunciation: "/ˈeɪ.prəl/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Area",
    definition: "A particular geographical region or space.",
    exampleSentence: "We live in a very quiet suburban area.",
    pronunciation: "/ˈeə.ri.ə/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Arm",
    definition: "The human limb between the shoulder and hand.",
    exampleSentence: "He raised his left arm to ask a question.",
    pronunciation: "/ɑːm/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Around",
    definition: "On all sides or in a circle.",
    exampleSentence: "We walked around the lake before sunset.",
    pronunciation: "/əˈraʊnd/",
    level: "A1",
    category: "Preposition"
  },
  {
    word: "Arrive",
    definition: "To reach a place at the end of a trip.",
    exampleSentence: "What time will the bus arrive at the airport?",
    pronunciation: "/əˈraɪv/",
    level: "A1",
    category: "Verb"
  },
  {
    word: "Art",
    definition: "Creative expressions like paintings or sculptures.",
    exampleSentence: "We have an art museum in our district.",
    pronunciation: "/ɑːt/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Article",
    definition: "A piece of writing in a newspaper or blog.",
    exampleSentence: "I read an article about space science.",
    pronunciation: "/ˈɑː.tɪ.kəl/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Artist",
    definition: "A person who creates paintings or drawings.",
    exampleSentence: "She wants to become a famous modern artist.",
    pronunciation: "/ˈɑː.tɪst/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "As",
    definition: "Used to describe a role or comparison.",
    exampleSentence: "He works as a friendly fireman.",
    pronunciation: "/æz/",
    level: "A1",
    category: "Preposition"
  },
  {
    word: "Ask",
    definition: "To request information or a favor.",
    exampleSentence: "Can I ask you for some expert advice?",
    pronunciation: "/ɑːsk/",
    level: "A1",
    category: "Verb"
  },
  {
    word: "At",
    definition: "Expressing location, arrival, or exact time.",
    exampleSentence: "Let's meet at seven o'clock.",
    pronunciation: "/æt/",
    level: "A1",
    category: "Preposition"
  },
  {
    word: "August",
    definition: "The eighth month of the year.",
    exampleSentence: "We are traveling abroad in August.",
    pronunciation: "/ɔːˈɡʌst/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Aunt",
    definition: "The sister of one's father or mother.",
    exampleSentence: "My aunt gave me a birthday card with cash.",
    pronunciation: "/ɑːnt/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Autumn",
    definition: "The cool season between summer and winter.",
    exampleSentence: "Leaves turn orange and yellow in autumn.",
    pronunciation: "/ˈɔː.təm/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Away",
    definition: "To or at a distance from a place.",
    exampleSentence: "The birds flew away into the sky.",
    pronunciation: "/əˈweɪ/",
    level: "A1",
    category: "Adverb"
  },
  {
    word: "Baby",
    definition: "A very young child or newborn.",
    exampleSentence: "The healthy baby is sleeping in her bed.",
    pronunciation: "/ˈbeɪ.bi/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Back",
    definition: "To the rear or returning to a place.",
    exampleSentence: "The children sit at the back of the car.",
    pronunciation: "/bæk/",
    level: "A1",
    category: "Adverb & Noun"
  },
  {
    word: "Bad",
    definition: "Of poor, low quality or unpleasant.",
    exampleSentence: "I feel bad today.",
    pronunciation: "/bæd/",
    level: "A1",
    category: "Adjective"
  },
  {
    word: "Bag",
    definition: "A container used to hold and carry items.",
    exampleSentence: "Put your books and pencil case in your bag.",
    pronunciation: "/bæɡ/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Ball",
    definition: "A round object used in football and games.",
    exampleSentence: "They are playing with a yellow ball on the grass.",
    pronunciation: "/bɔːl/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Banana",
    definition: "A long curved tropical yellow fruit.",
    exampleSentence: "Eating a banana can give you instant energy.",
    pronunciation: "/bəˈnɑː.nə/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Band",
    definition: "A group of musicians playing pop or rock together.",
    exampleSentence: "The school rock band gave an amazing show.",
    pronunciation: "/bænd/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Bank",
    definition: "An institution where you keep your money.",
    exampleSentence: "She opened a savings bank account yesterday.",
    pronunciation: "/bæŋk/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Bar",
    definition: "A place serving drinks, or a block of something.",
    exampleSentence: "He bought a sweet bar of chocolate.",
    pronunciation: "/bɑːr/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Bath",
    definition: "An act of washing in a tub of water.",
    exampleSentence: "A busy working day ends with a warm bath.",
    pronunciation: "/bɑːθ/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Bathroom",
    definition: "A room with a sink and a toilet.",
    exampleSentence: "Is the bathroom located upstairs or downstairs?",
    pronunciation: "/ˈbɑːθ.ruːm/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Be",
    definition: "To exist or represent a state of being.",
    exampleSentence: "I want to be an articulate presenter.",
    pronunciation: "/biː/",
    level: "A1",
    category: "Verb"
  },
  {
    word: "Beach",
    definition: "A sandy shore near the ocean.",
    exampleSentence: "We had a picnic on the beach last Saturday.",
    pronunciation: "/biːtʃ/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Beautiful",
    definition: "Pleasing the senses aesthetically.",
    exampleSentence: "What a beautiful peacock!",
    pronunciation: "/ˈbjuː.tɪ.fəl/",
    level: "A1",
    category: "Adjective"
  },
  {
    word: "Because",
    definition: "For the reason that, due to.",
    exampleSentence: "I slept early because I was extremely tired.",
    pronunciation: "/bɪˈkɒz/",
    level: "A1",
    category: "Conjunction"
  },
  {
    word: "Become",
    definition: "To begin to be or develop into.",
    exampleSentence: "We hope to become best friends soon.",
    pronunciation: "/bɪˈkʌm/",
    level: "A1",
    category: "Verb"
  },
  {
    word: "Bed",
    definition: "A piece of furniture used for sleeping.",
    exampleSentence: "He went straight to bed after midnight.",
    pronunciation: "/bed/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Bedroom",
    definition: "A room structured specifically for sleeping in.",
    exampleSentence: "My bedroom has a tiny desk and a window.",
    pronunciation: "/ˈbed.ruːm/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Beer",
    definition: "A common alcoholic drink made from yeast.",
    exampleSentence: "The adults had cold beer at the cafe.",
    pronunciation: "/bɪər/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Before",
    definition: "At an earlier time or space than.",
    exampleSentence: "Wash your dirty hands before lunch, please.",
    pronunciation: "/bɪˈfɔːr/",
    level: "A1",
    category: "Preposition"
  },
  {
    word: "Begin",
    definition: "To start doing something or initiate.",
    exampleSentence: "When does the morning class begin?",
    pronunciation: "/bɪˈɡɪn/",
    level: "A1",
    category: "Verb"
  },
  {
    word: "Beginning",
    definition: "The start or first part of some occurrence.",
    exampleSentence: "I missed the beginning of the film.",
    pronunciation: "/bɪˈɡɪn.ɪŋ/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Behind",
    definition: "At the back of or on the far side.",
    exampleSentence: "The cat is hiding behind the armchair.",
    pronunciation: "/bɪˈhaɪnd/",
    level: "A1",
    category: "Preposition"
  },
  {
    word: "Believe",
    definition: "To accept something as true.",
    exampleSentence: "I believe everything you told me.",
    pronunciation: "/bɪˈliːv/",
    level: "A1",
    category: "Verb"
  },
  {
    word: "Below",
    definition: "At a lower level or line than.",
    exampleSentence: "Please read the sentence written below.",
    pronunciation: "/bɪˈlgʊ/",
    level: "A1",
    category: "Preposition"
  },
  {
    word: "Best",
    definition: "Of the most excellent kind or quality.",
    exampleSentence: "This is the best bakery in our town.",
    pronunciation: "/best/",
    level: "A1",
    category: "Adjective"
  },
  {
    word: "Better",
    definition: "Improved or more excellent than before.",
    exampleSentence: "Consistent practice will make your English better.",
    pronunciation: "/ˈbet.ər/",
    level: "A1",
    category: "Adjective"
  },
  {
    word: "Between",
    definition: "In the middle of two distinct points.",
    exampleSentence: "Sit down between Sam and John.",
    pronunciation: "/bɪˈtwiːn/",
    level: "A1",
    category: "Preposition"
  },
  {
    word: "Bicycle",
    definition: "A two-wheeled vehicle propelled with pedals.",
    exampleSentence: "On warm sunny days, I ride my bicycle.",
    pronunciation: "/ˈbaɪ.sɪ.kəl/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Big",
    definition: "Large in physical scale or size.",
    exampleSentence: "They live in a big house with a garden.",
    pronunciation: "/bɪɡ/",
    level: "A1",
    category: "Adjective"
  },
  {
    word: "Bike",
    definition: "An informal short word for a bicycle.",
    exampleSentence: "He bought a new mountain bike last week.",
    pronunciation: "/baɪk/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Bill",
    definition: "A written list showing how much you owe.",
    exampleSentence: "We requested the electricity bill this morning.",
    pronunciation: "/bɪl/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Bird",
    definition: "A feathered creature that can fly.",
    exampleSentence: "A beautiful bird is singing outside my window.",
    pronunciation: "/bɜːd/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Birthday",
    definition: "The exact anniversary of a person's birth.",
    exampleSentence: "Happy birthday to my lovely sister!",
    pronunciation: "/ˈbɜːθ.deɪ/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Black",
    definition: "The darkest visual color.",
    exampleSentence: "She wore a black dress to the party.",
    pronunciation: "/blæk/",
    level: "A1",
    category: "Adjective"
  },
  {
    word: "Blog",
    definition: "An online platform with regular articles.",
    exampleSentence: "She started writing a travel blog.",
    pronunciation: "/blɒɡ/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Blonde",
    definition: "Having light-coloured, yellow-gold hair.",
    exampleSentence: "She has long blonde hair and blue eyes.",
    pronunciation: "/blɒnd/",
    level: "A1",
    category: "Adjective"
  },
  {
    word: "Blue",
    definition: "The colour of the clear sky.",
    exampleSentence: "I bought a gorgeous blue shirt yesterday.",
    pronunciation: "/bluː/",
    level: "A1",
    category: "Adjective"
  },
  {
    word: "Boat",
    definition: "A watercraft constructed for travelling on water.",
    exampleSentence: "Let's rent a small fishing boat.",
    pronunciation: "/bəʊt/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Body",
    definition: "The complete physical structures of a living being.",
    exampleSentence: "Water is essential for a healthy body.",
    pronunciation: "/ˈbɒd.i/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Book",
    definition: "A written literary piece made of papers.",
    exampleSentence: "He loves to read an engaging history book.",
    pronunciation: "/bʊk/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Boot",
    definition: "A sturdy leather shoe covering the ankle.",
    exampleSentence: "She bought a pair of warm winter boots.",
    pronunciation: "/buːt/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Bored",
    definition: "Feeling weary and restless through lack of interest.",
    exampleSentence: "I feel so bored, let's play a game.",
    pronunciation: "/bɔːd/",
    level: "A1",
    category: "Adjective"
  },
  {
    word: "Boring",
    definition: "Teasingly dry, dull, or uninteresting.",
    exampleSentence: "The lecture became extremely boring after an hour.",
    pronunciation: "/ˈbɔː.rɪŋ/",
    level: "A1",
    category: "Adjective"
  },
  {
    word: "Born",
    definition: "Brought forth by birth or created.",
    exampleSentence: "My older brother was born in London.",
    pronunciation: "/bɔːn/",
    level: "A1",
    category: "Verb (Participle)"
  },
  {
    word: "Both",
    definition: "The two together, or one and the other.",
    exampleSentence: "Both students agreed to collaborate.",
    pronunciation: "/bəʊθ/",
    level: "A1",
    category: "Determiner & Pronoun"
  },
  {
    word: "Bottle",
    definition: "A narrow-necked container for liquid.",
    exampleSentence: "Could I have a bottle of mineral water?",
    pronunciation: "/ˈbɒt.əl/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Bottom",
    definition: "The lowest surface or part of something.",
    exampleSentence: "Write your signature at the bottom of the page.",
    pronunciation: "/ˈbɒt.əm/",
    level: "A1",
    category: "Noun & Adjective"
  },
  {
    word: "Box",
    definition: "A square cardboard or wooden container.",
    exampleSentence: "He placed the old documents inside a box.",
    pronunciation: "/bɒks/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Boy",
    definition: "A male child or young man.",
    exampleSentence: "The boy rode his bicycle around the block.",
    pronunciation: "/bɔɪ/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Boyfriend",
    definition: "A regular male companion in a relationship.",
    exampleSentence: "Her boyfriend bought her a beautiful necklace.",
    pronunciation: "/ˈbɔɪ.frend/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Bread",
    definition: "A common baked food made of flour and water.",
    exampleSentence: "We bought some fresh bread from the baker.",
    pronunciation: "/bred/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Break",
    definition: "To fracture, or a pause between activities.",
    exampleSentence: "Let's take a ten-minute coffee break.",
    pronunciation: "/breɪk/",
    level: "A1",
    category: "Noun & Verb"
  },
  {
    word: "Breakfast",
    definition: "The very first meal of the day, eaten in the morning.",
    exampleSentence: "He ate eggs and bread for breakfast.",
    pronunciation: "/ˈbrek.fəst/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Bring",
    definition: "To carry something with you to a place.",
    exampleSentence: "Please bring your dictionary to class.",
    pronunciation: "/brɪŋ/",
    level: "A1",
    category: "Verb"
  },
  {
    word: "Brother",
    definition: "A male sibling shared with common parents.",
    exampleSentence: "My older brother is studying engineering.",
    pronunciation: "/ˈbrʌð.ər/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Brown",
    definition: "The warm colour of wood or dark chocolate.",
    exampleSentence: "The brown leaves fell during autumn.",
    pronunciation: "/braʊn/",
    level: "A1",
    category: "Adjective"
  },
  {
    word: "Build",
    definition: "To construct something with materials.",
    exampleSentence: "They plan to build a new library.",
    pronunciation: "/bɪld/",
    level: "A1",
    category: "Verb"
  },
  {
    word: "Building",
    definition: "A structure like a house or a school.",
    exampleSentence: "That apartment building is brand new.",
    pronunciation: "/ˈbɪl.dɪŋ/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Bus",
    definition: "A large road vehicle for passenger transport.",
    exampleSentence: "We waited at the bus stop for twenty minutes.",
    pronunciation: "/bʌs/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Business",
    definition: "The activity of buying or selling goods or services.",
    exampleSentence: "She runs a very successful local business.",
    pronunciation: "/ˈbɪz.nɪs/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Busy",
    definition: "Fully occupied with work or activities.",
    exampleSentence: "He is too busy to join us for dinner.",
    pronunciation: "/ˈbɪz.i/",
    level: "A1",
    category: "Adjective"
  },
  {
    word: "But",
    definition: "Used to introduce an contrasting statement.",
    exampleSentence: "I wanted to go, but I was too busy.",
    pronunciation: "/bʌt/",
    level: "A1",
    category: "Conjunction"
  },
  {
    word: "Butter",
    definition: "A solid yellow dairy product made from milk.",
    exampleSentence: "Spread some fresh butter on your warm bread.",
    pronunciation: "/ˈbʌt.ər/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Buy",
    definition: "To acquire something by paying money.",
    exampleSentence: "I want to buy a ticket for the concert.",
    pronunciation: "/baɪ/",
    level: "A1",
    category: "Verb"
  },
  {
    word: "By",
    definition: "In proximity to, or showing the agent of action.",
    exampleSentence: "The book was written by a famous author.",
    pronunciation: "/baɪ/",
    level: "A1",
    category: "Preposition"
  },
  {
    word: "Bye",
    definition: "An informal greeting used when departing.",
    exampleSentence: "Bye! See you tomorrow morning.",
    pronunciation: "/baɪ/",
    level: "A1",
    category: "Interjection"
  },
  {
    word: "Cafe",
    definition: "A small restaurant serving coffee and light meals.",
    exampleSentence: "Let's meet at the local cafe around noon.",
    pronunciation: "/ˈkæf.eɪ/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Cake",
    definition: "A sweet food made from flour, sugar, and baking.",
    exampleSentence: "I ate a slice of chocolate birthday cake.",
    pronunciation: "/keɪk/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Call",
    definition: "To contact on a phone, or name aloud.",
    exampleSentence: "Please call me when you arrive at the airport.",
    pronunciation: "/kɔːl/",
    level: "A1",
    category: "Verb & Noun"
  },
  {
    word: "Camera",
    definition: "A hardware device used to capture photos.",
    exampleSentence: "She took great pictures with her digital camera.",
    pronunciation: "/ˈkæm.rə/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Can",
    definition: "To be able or permitted to do.",
    exampleSentence: "I can speak three languages fluently.",
    pronunciation: "/kæn/",
    level: "A1",
    category: "Verb"
  },
  {
    word: "Cannot",
    definition: "To be unable or not permitted to do.",
    exampleSentence: "He cannot swim across the deep lake.",
    pronunciation: "/ˈkæn.ɒt/",
    level: "A1",
    category: "Verb"
  },
  {
    word: "Capital",
    definition: "The most important city in a country.",
    exampleSentence: "Rome is the capital of beautiful Italy.",
    pronunciation: "/ˈkæp.ɪ.təl/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Car",
    definition: "A road vehicle with four wheels.",
    exampleSentence: "She drove her new blue car to work.",
    pronunciation: "/kɑːr/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Card",
    definition: "Thick, stiff paper used for graphics.",
    exampleSentence: "I wrote a sweet message on her greeting card.",
    pronunciation: "/kɑːd/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Carrot",
    definition: "An orange root vegetable eaten cooked or raw.",
    exampleSentence: "She chopped some fresh carrots for the salad.",
    pronunciation: "/ˈkær.ət/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Carry",
    definition: "To hold and transport from one place to another.",
    exampleSentence: "Can you carry this heavy box downstairs?",
    pronunciation: "/ˈkær.i/",
    level: "A1",
    category: "Verb"
  },
  {
    word: "Cat",
    definition: "A small domesticated furry pet.",
    exampleSentence: "The cat is sleeping on the warm carpet.",
    pronunciation: "/kæt/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "CD",
    definition: "A circular compact disc storing digital audio.",
    exampleSentence: "I listened to classical music on a CD.",
    pronunciation: "/ˌsiːˈdiː/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Clean",
    definition: "Free from dirty marks, dust, or bacteria.",
    exampleSentence: "Keep your study desk clean and tidy.",
    pronunciation: "/kliːn/",
    level: "A1",
    category: "Adjective & Verb"
  },
  {
    word: "Climb",
    definition: "To go up something using hands and feet.",
    exampleSentence: "We climbed up the steep forest path.",
    pronunciation: "/klaɪm/",
    level: "A1",
    category: "Verb"
  },
  {
    word: "Clock",
    definition: "An instrument displaying the current time.",
    exampleSentence: "There is a large clock in the living room.",
    pronunciation: "/klɒk/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Close",
    definition: "To shut an opening, or near in distance.",
    exampleSentence: "Please close the window before sleeping.",
    pronunciation: "/kləʊz/",
    level: "A1",
    category: "Verb"
  },
  {
    word: "Clothes",
    definition: "Things worn to cover and protect the body.",
    exampleSentence: "She folded all of her clean clothes.",
    pronunciation: "/kləʊðz/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Club",
    definition: "An association composed of like-minded members.",
    exampleSentence: "Let's join the local swimming club.",
    pronunciation: "/klʌb/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Coat",
    definition: "A warm outer garment covering the arms.",
    exampleSentence: "Wear your winter coat, it's very cold.",
    pronunciation: "/kəʊt/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Coffee",
    definition: "A hot brown beverage made from roasted beans.",
    exampleSentence: "I drink coffee every day in the morning.",
    pronunciation: "/ˈkɒf.i/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Cold",
    definition: "A very low temperature, or viral infection.",
    exampleSentence: "I stayed in bed because of a bad cold.",
    pronunciation: "/kəʊld/",
    level: "A1",
    category: "Adjective & Noun"
  },
  {
    word: "College",
    definition: "An institute built for higher education.",
    exampleSentence: "My older sister is starting her college life.",
    pronunciation: "/ˈkɒl.ɪdʒ/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Colour",
    definition: "Visual hues like red, green, or blue.",
    exampleSentence: "What is your favorite colour representing autumn?",
    pronunciation: "/ˈkʌl.ər/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Come",
    definition: "To move towards or arrive at a place.",
    exampleSentence: "Come here and read this beautiful poem.",
    pronunciation: "/kʌm/",
    level: "A1",
    category: "Verb"
  },
  {
    word: "Company",
    definition: "An organization engaged in business operations.",
    exampleSentence: "He works for a multinational design company.",
    pronunciation: "/ˈkʌm.pə.ni/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Hello",
    definition: "A greeting used when meeting someone.",
    exampleSentence: "Hello! Nice to meet you.",
    pronunciation: "/həˈləʊ/",
    level: "A1",
    category: "Greeting"
  },
  {
    word: "Family",
    definition: "A group of parents and children living together.",
    exampleSentence: "I love spending weekend time with my family.",
    pronunciation: "/ˈfæm.əl.i/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Journey",
    definition: "An act of traveling from one place to another.",
    exampleSentence: "We began our journey across the country.",
    pronunciation: "/ˈdʒɜː.ni/",
    level: "A1",
    category: "Noun"
  },
  {
    word: "Bright",
    definition: "Giving out or reflecting much light.",
    exampleSentence: "The sun is very bright today.",
    pronunciation: "/braɪt/",
    level: "A1",
    category: "Adjective"
  },

  // A2 Words
  {
    word: "Adventure",
    definition: "An unusual and exciting, typically hazardous, experience or activity.",
    exampleSentence: "Climbing the mountain was a real adventure.",
    pronunciation: "/ədˈven.tʃər/",
    level: "A2",
    category: "Noun"
  },
  {
    word: "Celebrate",
    definition: "Acknowledge a significant event with a social gathering.",
    exampleSentence: "We will celebrate your birthday tonight!",
    pronunciation: "/ˈsel.ə.breɪt/",
    level: "A2",
    category: "Verb"
  },
  {
    word: "Curious",
    definition: "Eager to know or learn something.",
    exampleSentence: "Cats are very curious animals and love exploring.",
    pronunciation: "/ˈkjʊə.ri.əs/",
    level: "A2",
    category: "Adjective"
  },
  {
    word: "Delicious",
    definition: "Highly pleasant to the taste.",
    exampleSentence: "This chocolate cake is delicious!",
    pronunciation: "/dɪˈlɪʃ.əs/",
    level: "A2",
    category: "Adjective"
  },
  {
    word: "Explore",
    definition: "Travel through an unfamiliar area to learn about it.",
    exampleSentence: "Let's explore the old forest path this morning.",
    pronunciation: "/ɪkˈsplɔːr/",
    level: "A2",
    category: "Verb"
  },
  {
    word: "Abroad",
    definition: "In or to a foreign country or countries.",
    exampleSentence: "She wants to travel abroad after finishing high school.",
    pronunciation: "/əˈbrɔːd/",
    level: "A2",
    category: "Adverb"
  },
  {
    word: "Accident",
    definition: "An unfortunate incident that happens unexpectedly, typically resulting in damage or injury.",
    exampleSentence: "He had a minor accident on his bike, but he is alright.",
    pronunciation: "/ˈæk.sɪ.dənt/",
    level: "A2",
    category: "Noun"
  },
  {
    word: "Ache",
    definition: "A continuous or prolonged dull pain in a part of one's body.",
    exampleSentence: "Too much staring at the screen gave him a bad headache.",
    pronunciation: "/eɪk/",
    level: "A2",
    category: "Noun & Verb"
  },
  {
    word: "Adult",
    definition: "A person who is fully grown or developed.",
    exampleSentence: "Children must be accompanied by a responsible adult.",
    pronunciation: "/ˈæd.ʌlt/",
    level: "A2",
    category: "Noun & Adjective"
  },
  {
    word: "Advice",
    definition: "Guidance or recommendations offered with regard to prudent future action.",
    exampleSentence: "Take my advice and save some money in advance.",
    pronunciation: "/ədˈvaɪs/",
    level: "A2",
    category: "Noun"
  },
  {
    word: "Assistant",
    definition: "A person who ranks below another and whose job is to assist them.",
    exampleSentence: "She works as a shop assistant in the city bookstore.",
    pronunciation: "/əˈsɪs.tənt/",
    level: "A2",
    category: "Noun"
  },
  {
    word: "Attractive",
    definition: "Pleasing or appealing to the senses; physically beautiful.",
    exampleSentence: "The historic city castle is highly attractive to tourists.",
    pronunciation: "/əˈtræk.tɪv/",
    level: "A2",
    category: "Adjective"
  },
  {
    word: "Background",
    definition: "The area or scenery behind the main object of contemplation.",
    exampleSentence: "She customized her computer screen with a forest background.",
    pronunciation: "/ˈbæk.ɡraʊnd/",
    level: "A2",
    category: "Noun"
  },
  {
    word: "Basket",
    definition: "A container used for carrying or holding things, typically made directly from cane or wire.",
    exampleSentence: "She carried a large picnic basket containing fruits and bread.",
    pronunciation: "/ˈbɑː.skɪt/",
    level: "A2",
    category: "Noun"
  },
  {
    word: "Boring",
    definition: "Not interesting; tedious.",
    exampleSentence: "The lecture became so boring that people began to leave.",
    pronunciation: "/ˈbɔː.rɪŋ/",
    level: "A2",
    category: "Adjective"
  },
  {
    word: "Breeze",
    definition: "A gentle wind.",
    exampleSentence: "A cool sea breeze brought relief on the hot sunny afternoon.",
    pronunciation: "/briːz/",
    level: "A2",
    category: "Noun"
  },

  // B1 Words
  {
    word: "Collaborate",
    definition: "Work jointly on an activity or project.",
    exampleSentence: "Our teams will collaborate to finish the project.",
    pronunciation: "/kəˈlæb.ə.reɪt/",
    level: "B1",
    category: "Verb"
  },
  {
    word: "Essential",
    definition: "Absolutely necessary; extremely important.",
    exampleSentence: "Water is essential for life.",
    pronunciation: "/ɪˈsen.ʃəl/",
    level: "B1",
    category: "Adjective"
  },
  {
    word: "Challenge",
    definition: "A task or situation that tests someone's abilities.",
    exampleSentence: "Learning a new language is a great challenge.",
    pronunciation: "/ˈtʃæl.ɪndʒ/",
    level: "B1",
    category: "Noun"
  },
  {
    word: "Patience",
    definition: "The capacity to accept or tolerate delay or trouble without getting angry.",
    exampleSentence: "Teaching kids requires a lot of patience.",
    pronunciation: "/ˈpeɪ.ʃəns/",
    level: "B1",
    category: "Noun"
  },
  {
    word: "Navigate",
    definition: "Plan and direct the course of a ship, aircraft, or other form of transport.",
    exampleSentence: "We used a map to navigate the narrow city streets.",
    pronunciation: "/ˈnæv.ɪ.ɡeɪt/",
    level: "B1",
    category: "Verb"
  },
  {
    word: "Ability",
    definition: "Possession of the means or skill to do something.",
    exampleSentence: "She showed an extraordinary ability to learn languages quickly.",
    pronunciation: "/əˈbɪl.ə.ti/",
    level: "B1",
    category: "Noun"
  },
  {
    word: "Absent",
    definition: "Not present in a place, at an occasion, or as part of something.",
    exampleSentence: "Several students were absent because of the heavy snow storm.",
    pronunciation: "/ˈæb.sənt/",
    level: "B1",
    category: "Adjective"
  },
  {
    word: "Absolutely",
    definition: "With no qualification, restriction, or limitation; totally or completely.",
    exampleSentence: "The movie we watched yesterday was absolutely awful.",
    pronunciation: "/ˌæb.səˈluːt.li/",
    level: "B1",
    category: "Adverb"
  },
  {
    word: "Accommodation",
    definition: "A room, group of rooms, or building in which someone may live or stay.",
    exampleSentence: "The travel agency booked our hotel accommodation in advance.",
    pronunciation: "/əˌkɒm.əˈdeɪ.ʃən/",
    level: "B1",
    category: "Noun"
  },
  {
    word: "According to",
    definition: "As stated by or in on the authority of.",
    exampleSentence: "According to the weather forecast, it will rain tomorrow.",
    pronunciation: "/əˈkɔː.dɪŋ ˌtuː/",
    level: "B1",
    category: "Prepositional Phrase"
  },
  {
    word: "Achieve",
    definition: "Successfully bring about or reach a desired objective, level, or result by effort.",
    exampleSentence: "If you study daily, you will achieve your learning goals.",
    pronunciation: "/əˈtʃiːv/",
    level: "B1",
    category: "Verb"
  },
  {
    word: "Advise",
    definition: "Offer suggestions about the best course of action to someone.",
    exampleSentence: "The coach advised him to practice swimming every weekend.",
    pronunciation: "/ədˈvaɪz/",
    level: "B1",
    category: "Verb"
  },
  {
    word: "Afford",
    definition: "Have enough money to pay for; manage to spare.",
    exampleSentence: "They cannot afford to go abroad for holiday this year.",
    pronunciation: "/əˈfɔːd/",
    level: "B1",
    category: "Verb"
  },
  {
    word: "Atmosphere",
    definition: "The envelope of gases surrounding the earth or another planet; the pervading tone or mood of a place.",
    exampleSentence: "This cozy local cafe has a very friendly atmosphere.",
    pronunciation: "/ˈæt.məs.fɪər/",
    level: "B1",
    category: "Noun"
  },
  {
    word: "Available",
    definition: "Able to be used or obtained; at anyone's disposal.",
    exampleSentence: "Free internet access is available throughout the airport.",
    pronunciation: "/əˈveɪ.lə.bəl/",
    level: "B1",
    category: "Adjective"
  },

  // B2 Words
  {
    word: "Perspective",
    definition: "A particular attitude toward or way of regarding something; a point of view.",
    exampleSentence: "Traveling opens up a brand new perspective on life.",
    pronunciation: "/pəˈspek.tɪv/",
    level: "B2",
    category: "Noun"
  },
  {
    word: "Resilient",
    definition: "Able to withstand or recover quickly from difficult conditions.",
    exampleSentence: "The young plants are very resilient to the cold winter.",
    pronunciation: "/rɪˈzɪl.i.ənt/",
    level: "B2",
    category: "Adjective"
  },
  {
    word: "Analyse",
    definition: "Examine methodically and in detail the structure of something.",
    exampleSentence: "We need to analyse the test results before deciding.",
    pronunciation: "/ˈæn.ə.laɪz/",
    level: "B2",
    category: "Verb"
  },
  {
    word: "Accomplish",
    definition: "Achieve or complete successfully.",
    exampleSentence: "If we work together, we can accomplish anything.",
    pronunciation: "/əˈkʌm.plɪʃ/",
    level: "B2",
    category: "Verb"
  },
  {
    word: "Significant",
    definition: "Sufficiently great or important to be worthy of attention.",
    exampleSentence: "He made a significant contribution to the research.",
    pronunciation: "/sɪɡˈnɪf.ɪ.kənt/",
    level: "B2",
    category: "Adjective"
  },
  {
    word: "Accurate",
    definition: "Correct in all details; exact.",
    exampleSentence: "Please make sure your translation fits the accurate meaning.",
    pronunciation: "/ˈæk.jə.rət/",
    level: "B2",
    category: "Adjective"
  },
  {
    word: "Behavior",
    definition: "The way in which one acts or conducts oneself, especially toward others.",
    exampleSentence: "The children were rewarded with points for good behavior.",
    pronunciation: "/bɪˈheɪ.vjər/",
    level: "B2",
    category: "Noun"
  },
  {
    word: "Collaborative",
    definition: "Produced or conducted by two or more parties working together.",
    exampleSentence: "The students participated in a collaborative learning session.",
    pronunciation: "/kəˈlæb.ər.ə.tɪv/",
    level: "B2",
    category: "Adjective"
  },
  {
    word: "Consistent",
    definition: "Acting or done in the same way over time, especially so as to be fair or accurate.",
    exampleSentence: "Consistent practice is key to mastering correct pronunciation.",
    pronunciation: "/kənˈsɪs.tənt/",
    level: "B2",
    category: "Adjective"
  },
  {
    word: "Development",
    definition: "The process of developing or being developed; growth.",
    exampleSentence: "English study leads to great personal and career development.",
    pronunciation: "/dɪˈvel.əp.mənt/",
    level: "B2",
    category: "Noun"
  },
  {
    word: "Efficient",
    definition: "Achieving maximum productivity with minimum wasted effort or expense.",
    exampleSentence: "Compact air conditioning systems are highly energy efficient.",
    pronunciation: "/ɪˈfɪʃ.ənt/",
    level: "B2",
    category: "Adjective"
  },

  // C1 Words
  {
    word: "Pragmatic",
    definition: "Dealing with things sensibly and realistically in a way that is based on practical considerations.",
    exampleSentence: "We need a pragmatic solution to this financial issue.",
    pronunciation: "/præɡˈmæt.ɪk/",
    level: "C1",
    category: "Adjective"
  },
  {
    word: "Eloquent",
    definition: "Fluent or persuasive in speaking or writing.",
    exampleSentence: "The president gave an eloquent speech about unity.",
    pronunciation: "/ˈel.ə.kwənt/",
    level: "C1",
    category: "Adjective"
  },
  {
    word: "Ambiguous",
    definition: "Open to more than one interpretation; not having one obvious meaning.",
    exampleSentence: "The ending of the movie was mysterious and ambiguous.",
    pronunciation: "/æmˈbɪɡ.ju.əs/",
    level: "C1",
    category: "Adjective"
  },
  {
    word: "Benevolent",
    definition: "Well meaning and kindly.",
    exampleSentence: "A benevolent donor gifted computers to the school library.",
    pronunciation: "/bəˈnev.əl.ənt/",
    level: "C1",
    category: "Adjective"
  },
  {
    word: "Superfluous",
    definition: "Unnecessary, especially through being more than enough.",
    exampleSentence: "Avoid adding superfluous words to your simple sentences.",
    pronunciation: "/suːˈpɜː.flu.əs/",
    level: "C1",
    category: "Adjective"
  },
  {
    word: "Accumulate",
    definition: "Gather together or acquire an increasing number or quantity of.",
    exampleSentence: "With every lesson, you accumulate crucial learning practice.",
    pronunciation: "/əˈkjuː.mjə.leɪt/",
    level: "C1",
    category: "Verb"
  },
  {
    word: "Articulate",
    definition: "Having or showing the ability to speak fluently and coherently.",
    exampleSentence: "She is an articulate speaker who can express complex ideas with ease.",
    pronunciation: "/ɑːˈtɪk.jə.lət/",
    level: "C1",
    category: "Adjective & Verb"
  },
  {
    word: "Comprehensive",
    definition: "Complete and including all or nearly all elements or aspects of something.",
    exampleSentence: "Our library has a comprehensive list of PET vocabulary books.",
    pronunciation: "/ˌkɒm.prɪˈhen.sɪv/",
    level: "C1",
    category: "Adjective"
  },

  // C2 Words
  {
    word: "Pristine",
    definition: "In its original condition; unspoiled, clean, and fresh.",
    exampleSentence: "The snowy mountain peaks looked absolutely pristine.",
    pronunciation: "/pɪsˈtiːn/",
    level: "C2",
    category: "Adjective"
  },
  {
    word: "Idiosyncrasy",
    definition: "A mode of behavior or way of thought peculiar to an individual.",
    exampleSentence: "One of his idiosyncrasies was wearing mismatching socks.",
    pronunciation: "/ˌɪd.i.əˈsɪŋ.krə.si/",
    level: "C2",
    category: "Noun"
  },
  {
    word: "Capricious",
    definition: "Given to sudden and unaccountable changes of mood or behavior.",
    exampleSentence: "The weather in this country is notorious for being capricious.",
    pronunciation: "/kəˈprɪʃ.əs/",
    level: "C2",
    category: "Adjective"
  },
  {
    word: "Quintessential",
    definition: "Representing the most perfect or typical example of a quality or class.",
    exampleSentence: "This quaint cafe is the quintessential British experience.",
    pronunciation: "/ˌkwɪn.tɪˈsen.ʃəl/",
    level: "C2",
    category: "Adjective"
  },
  {
    word: "Ineffable",
    definition: "Too great or extreme to be expressed or described in words.",
    exampleSentence: "Standing at the edge of the sky-scraping canyon filled them with ineffable awe.",
    pronunciation: "/ɪnˈef.ə.bəl/",
    level: "C2",
    category: "Adjective"
  },
  {
    word: "Acumen",
    definition: "The ability to make good judgments and quick decisions, typically in a particular domain.",
    exampleSentence: "His business acumen helped him lead the company to absolute success.",
    pronunciation: "/ˈæk.jə.mən/",
    level: "C2",
    category: "Noun"
  },
  {
    word: "Ethereal",
    definition: "Extremely delicate and light in a way that seems too perfect for this world.",
    exampleSentence: "The forest path at sunrise had an ethereal, magical atmosphere.",
    pronunciation: "/iˈθɪə.ri.əl/",
    level: "C2",
    category: "Adjective"
  },
  {
    word: "Spontaneous",
    definition: "Performed or occurring as a result of a sudden inner impulse or inclination without premeditation.",
    exampleSentence: "They made a spontaneous decision to celebrate right then and there.",
    pronunciation: "/spɒnˈteɪ.ni.əs/",
    level: "C2",
    category: "Adjective"
  }
];
