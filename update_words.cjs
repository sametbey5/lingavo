const fs = require('fs');
let content = fs.readFileSync('pages/GrammarLessons.tsx', 'utf8');

const isNumSrc = `    if (isStandard10ItemLesson) {
      let numberList = [];
      if (isNumbers) {
         numberList = [
            { letter: '1', pron: '/wʌn/', word: 'One', wordSuffix: 'ne' },
            { letter: '2', pron: '/tuː/', word: 'Two', wordSuffix: 'wo' },
            { letter: '3', pron: '/θriː/', word: 'Three', wordSuffix: 'hree' },
            { letter: '4', pron: '/fɔːr/', word: 'Four', wordSuffix: 'our' },
            { letter: '5', pron: '/faɪv/', word: 'Five', wordSuffix: 'ive' },
            { letter: '6', pron: '/sɪks/', word: 'Six', wordSuffix: 'ix' },
            { letter: '7', pron: '/ˈsɛvən/', word: 'Seven', wordSuffix: 'even' },
            { letter: '8', pron: '/eɪt/', word: 'Eight', wordSuffix: 'ight' },
            { letter: '9', pron: '/naɪn/', word: 'Nine', wordSuffix: 'ine' },
            { letter: '10', pron: '/tɛn/', word: 'Ten', wordSuffix: 'en' }
         ];
      } else if (isBasicVocab) {
         numberList = [
            { letter: '🍎', pron: '/ˈæpəl/', word: 'Apple', wordSuffix: 'pple' },
            { letter: '💧', pron: '/ˈwɔːtər/', word: 'Water', wordSuffix: 'ater' },
            { letter: '🍞', pron: '/brɛd/', word: 'Bread', wordSuffix: 'read' },
            { letter: '🏠', pron: '/haʊs/', word: 'House', wordSuffix: 'ouse' },
            { letter: '🚗', pron: '/kɑːr/', word: 'Car', wordSuffix: 'ar' },
            { letter: '🐕', pron: '/dɒɡ/', word: 'Dog', wordSuffix: 'og' },
            { letter: '🐈', pron: '/kæt/', word: 'Cat', wordSuffix: 'at' },
            { letter: '☀️', pron: '/sʌn/', word: 'Sun', wordSuffix: 'un' },
            { letter: '📖', pron: '/bʊk/', word: 'Book', wordSuffix: 'ook' },
            { letter: '🌳', pron: '/triː/', word: 'Tree', wordSuffix: 'ree' }
         ];
      } else if (isNationalities) {
         numberList = [
            { letter: '🇺🇸', pron: '/əˈmɛrɪkən/', word: 'American', wordSuffix: 'merican' },
            { letter: '🇬🇧', pron: '/ˈbrɪtɪʃ/', word: 'British', wordSuffix: 'ritish' },
            { letter: '🇪🇸', pron: '/ˈspænɪʃ/', word: 'Spanish', wordSuffix: 'panish' },
            { letter: '🇫🇷', pron: '/frɛntʃ/', word: 'French', wordSuffix: 'rench' },
            { letter: '🇩🇪', pron: '/ˈdʒɜːrmən/', word: 'German', wordSuffix: 'erman' },
            { letter: '🇮🇹', pron: '/ɪˈtæljən/', word: 'Italian', wordSuffix: 'talian' },
            { letter: '🇯🇵', pron: '/ˌdʒæpəˈniːz/', word: 'Japanese', wordSuffix: 'apanese' },
            { letter: '🇨🇳', pron: '/tʃaɪˈniːz/', word: 'Chinese', wordSuffix: 'hinese' },
            { letter: '🇧🇷', pron: '/brəˈzɪljən/', word: 'Brazilian', wordSuffix: 'razilian' },
            { letter: '🇮🇳', pron: '/ˈɪndiən/', word: 'Indian', wordSuffix: 'ndian' }
         ];
      } else if (isPersonalInfo) {
         numberList = [
            { letter: '📛', pron: '/neɪm/', word: 'Name', wordSuffix: 'ame' },
            { letter: '🎂', pron: '/eɪdʒ/', word: 'Age', wordSuffix: 'ge' },
            { letter: '📍', pron: '/əˈdrɛs/', word: 'Address', wordSuffix: 'ddress' },
            { letter: '☎️', pron: '/foʊn/', word: 'Phone', wordSuffix: 'hone' },
            { letter: '📧', pron: '/ˈiːmeɪl/', word: 'Email', wordSuffix: 'mail' },
            { letter: '⚙️', pron: '/dʒɒb/', word: 'Job', wordSuffix: 'ob' },
            { letter: '🏙️', pron: '/ˈsɪti/', word: 'City', wordSuffix: 'ity' },
            { letter: '🌎', pron: '/ˈkʌntri/', word: 'Country', wordSuffix: 'ountry' },
            { letter: '👪', pron: '/ˈfæmɪli/', word: 'Family', wordSuffix: 'amily' },
            { letter: '👬', pron: '/frɛnd/', word: 'Friend', wordSuffix: 'riend' }
         ];
      } else if (isDailyRoutines) {
         numberList = [
            { letter: '🌅', pron: '/weɪk/', word: 'Wake', wordSuffix: 'ake' },
            { letter: '🛏️', pron: '/sliːp/', word: 'Sleep', wordSuffix: 'leep' },
            { letter: '🚿', pron: '/ˈʃaʊər/', word: 'Shower', wordSuffix: 'hower' },
            { letter: '🦷', pron: '/brʌʃ/', word: 'Brush', wordSuffix: 'rush' },
            { letter: '🍳', pron: '/kʊk/', word: 'Cook', wordSuffix: 'ook' },
            { letter: '🍽️', pron: '/iːt/', word: 'Eat', wordSuffix: 'at' },
            { letter: '🚶', pron: '/wɔːk/', word: 'Walk', wordSuffix: 'alk' },
            { letter: '👔', pron: '/wɜːrk/', word: 'Work', wordSuffix: 'ork' },
            { letter: '📚', pron: '/ˈstʌdi/', word: 'Study', wordSuffix: 'tudy' },
            { letter: '📺', pron: '/wɒtʃ/', word: 'Watch', wordSuffix: 'atch' }
         ];
      } else if (isLikesDislikes) {
         numberList = [
            { letter: '❤️', pron: '/lʌv/', word: 'Love', wordSuffix: 'ove' },
            { letter: '👍', pron: '/laɪk/', word: 'Like', wordSuffix: 'ike' },
            { letter: '👎', pron: '/dɪsˈlaɪk/', word: 'Dislike', wordSuffix: 'islike' },
            { letter: '😡', pron: '/heɪt/', word: 'Hate', wordSuffix: 'ate' },
            { letter: '😊', pron: '/ɪnˈdʒɔɪ/', word: 'Enjoy', wordSuffix: 'njoy' },
            { letter: '⚽', pron: '/spɔːrt/', word: 'Sport', wordSuffix: 'port' },
            { letter: '🎵', pron: '/ˈmjuːzɪk/', word: 'Music', wordSuffix: 'usic' },
            { letter: '🌮', pron: '/fuːd/', word: 'Food', wordSuffix: 'ood' },
            { letter: '🎬', pron: '/ˈmuːvi/', word: 'Movie', wordSuffix: 'ovie' },
            { letter: '🎮', pron: '/ɡeɪm/', word: 'Game', wordSuffix: 'ame' }
         ];
      } else if (isHomeVocab) {
         numberList = [
            { letter: '🚪', pron: '/dɔːr/', word: 'Door', wordSuffix: 'oor' },
            { letter: '🪟', pron: '/ˈwɪndoʊ/', word: 'Window', wordSuffix: 'indow' },
            { letter: '🛏️', pron: '/bɛd/', word: 'Bed', wordSuffix: 'ed' },
            { letter: '🪑', pron: '/tʃɛər/', word: 'Chair', wordSuffix: 'hair' },
            { letter: '🛋️', pron: '/ˈsoʊfə/', word: 'Sofa', wordSuffix: 'ofa' },
            { letter: '📺', pron: '/ˌtiːˈviː/', word: 'TV', wordSuffix: 'V' },
            { letter: '🍳', pron: '/kɪtʃɪn/', word: 'Kitchen', wordSuffix: 'itchen' },
            { letter: '🛁', pron: '/ˈbæθruːm/', word: 'Bathroom', wordSuffix: 'athroom' },
            { letter: '🪴', pron: '/plænt/', word: 'Plant', wordSuffix: 'lant' },
            { letter: '💡', pron: '/læmp/', word: 'Lamp', wordSuffix: 'amp' }
         ];
      } else if (isPlacesInTown) {
         numberList = [
            { letter: '🏫', pron: '/skuːl/', word: 'School', wordSuffix: 'chool' },
            { letter: '🏥', pron: '/ˈhɒspɪtl/', word: 'Hospital', wordSuffix: 'ospital' },
            { letter: '🏦', pron: '/bæŋk/', word: 'Bank', wordSuffix: 'ank' },
            { letter: '🏬', pron: '/stɔːr/', word: 'Store', wordSuffix: 'tore' },
            { letter: '☕', pron: '/kæˈfeɪ/', word: 'Cafe', wordSuffix: 'afe' },
            { letter: '🌳', pron: '/pɑːrk/', word: 'Park', wordSuffix: 'ark' },
            { letter: '🎬', pron: '/ˈsɪnəmə/', word: 'Cinema', wordSuffix: 'inema' },
            { letter: '✈️', pron: '/ˈɛərpɔːrt/', word: 'Airport', wordSuffix: 'irport' },
            { letter: '🚉', pron: '/ˈsteɪʃən/', word: 'Station', wordSuffix: 'tation' },
            { letter: '🏨', pron: '/hoʊˈtɛl/', word: 'Hotel', wordSuffix: 'otel' }
         ];
      } else if (isHobbies) {
         numberList = [
            { letter: '📖', pron: '/riːd/', word: 'Read', wordSuffix: 'ead' },
            { letter: '🎨', pron: '/peɪnt/', word: 'Paint', wordSuffix: 'aint' },
            { letter: '✍️', pron: '/draɪv/', word: 'Draw', wordSuffix: 'raw' },
            { letter: '🏃', pron: '/rʌn/', word: 'Run', wordSuffix: 'un' },
            { letter: '🏊', pron: '/swɪm/', word: 'Swim', wordSuffix: 'wim' },
            { letter: '🚴', pron: '/saɪkəl/', word: 'Cycle', wordSuffix: 'ycle' },
            { letter: '🍳', pron: '/bɛɪk/', word: 'Bake', wordSuffix: 'ake' },
            { letter: '🎤', pron: '/sɪŋ/', word: 'Sing', wordSuffix: 'ing' },
            { letter: '💃', pron: '/dæns/', word: 'Dance', wordSuffix: 'ance' },
            { letter: '📷', pron: '/foʊtoʊ/', word: 'Photo', wordSuffix: 'hoto' }
         ];
      } else if (isShopping) {
         numberList = [
            { letter: '🛒', pron: '/ʃɒp/', word: 'Shop', wordSuffix: 'hop' },
            { letter: '💵', pron: '/mʌni/', word: 'Money', wordSuffix: 'oney' },
            { letter: '🏷️', pron: '/praɪs/', word: 'Price', wordSuffix: 'rice' },
            { letter: '🛍️', pron: '/bæɡ/', word: 'Bag', wordSuffix: 'ag' },
            { letter: '👕', pron: '/ʃɜːrt/', word: 'Shirt', wordSuffix: 'hirt' },
            { letter: '👖', pron: '/pænts/', word: 'Pants', wordSuffix: 'ants' },
            { letter: '👟', pron: '/ʃuː/', word: 'Shoe', wordSuffix: 'hoe' },
            { letter: '👗', pron: '/drɛs/', word: 'Dress', wordSuffix: 'ress' },
            { letter: '💳', pron: '/kɑːrd/', word: 'Card', wordSuffix: 'ard' },
            { letter: '🧾', pron: '/bɪl/', word: 'Bill', wordSuffix: 'ill' }
         ];
      }`;

const optimizedReplacement = `    if (isStandard10ItemLesson) {
      let numberList = [];
      if (isNumbers) {
         numberList = [
            { letter: '1', emoji: '🔢', pron: '/wʌn/', word: 'One', wordSuffix: 'ne' },
            { letter: '2', emoji: '🔢', pron: '/tuː/', word: 'Two', wordSuffix: 'wo' },
            { letter: '3', emoji: '🔢', pron: '/θriː/', word: 'Three', wordSuffix: 'hree' },
            { letter: '4', emoji: '🔢', pron: '/fɔːr/', word: 'Four', wordSuffix: 'our' },
            { letter: '5', emoji: '🔢', pron: '/faɪv/', word: 'Five', wordSuffix: 'ive' },
            { letter: '6', emoji: '🔢', pron: '/sɪks/', word: 'Six', wordSuffix: 'ix' },
            { letter: '7', emoji: '🔢', pron: '/ˈsɛvən/', word: 'Seven', wordSuffix: 'even' },
            { letter: '8', emoji: '🔢', pron: '/eɪt/', word: 'Eight', wordSuffix: 'ight' },
            { letter: '9', emoji: '🔢', pron: '/naɪn/', word: 'Nine', wordSuffix: 'ine' },
            { letter: '10', emoji: '🔟', pron: '/tɛn/', word: 'Ten', wordSuffix: 'en' }
         ];
      } else if (isBasicVocab) {
         numberList = [
            { letter: 'A', emoji: '🍎', pron: '/ˈæpəl/', word: 'Apple', wordSuffix: 'pple' },
            { letter: 'W', emoji: '💧', pron: '/ˈwɔːtər/', word: 'Water', wordSuffix: 'ater' },
            { letter: 'B', emoji: '🍞', pron: '/brɛd/', word: 'Bread', wordSuffix: 'read' },
            { letter: 'H', emoji: '🏠', pron: '/haʊs/', word: 'House', wordSuffix: 'ouse' },
            { letter: 'C', emoji: '🚗', pron: '/kɑːr/', word: 'Car', wordSuffix: 'ar' },
            { letter: 'D', emoji: '🐕', pron: '/dɒɡ/', word: 'Dog', wordSuffix: 'og' },
            { letter: 'C', emoji: '🐈', pron: '/kæt/', word: 'Cat', wordSuffix: 'at' },
            { letter: 'S', emoji: '☀️', pron: '/sʌn/', word: 'Sun', wordSuffix: 'un' },
            { letter: 'B', emoji: '📖', pron: '/bʊk/', word: 'Book', wordSuffix: 'ook' },
            { letter: 'T', emoji: '🌳', pron: '/triː/', word: 'Tree', wordSuffix: 'ree' }
         ];
      } else if (isNationalities) {
         numberList = [
            { letter: 'A', emoji: '🇺🇸', pron: '/əˈmɛrɪkən/', word: 'American', wordSuffix: 'merican' },
            { letter: 'B', emoji: '🇬🇧', pron: '/ˈbrɪtɪʃ/', word: 'British', wordSuffix: 'ritish' },
            { letter: 'S', emoji: '🇪🇸', pron: '/ˈspænɪʃ/', word: 'Spanish', wordSuffix: 'panish' },
            { letter: 'F', emoji: '🇫🇷', pron: '/frɛntʃ/', word: 'French', wordSuffix: 'rench' },
            { letter: 'G', emoji: '🇩🇪', pron: '/ˈdʒɜːrmən/', word: 'German', wordSuffix: 'erman' },
            { letter: 'I', emoji: '🇮🇹', pron: '/ɪˈtæljən/', word: 'Italian', wordSuffix: 'talian' },
            { letter: 'J', emoji: '🇯🇵', pron: '/ˌdʒæpəˈniːz/', word: 'Japanese', wordSuffix: 'apanese' },
            { letter: 'C', emoji: '🇨🇳', pron: '/tʃaɪˈniːz/', word: 'Chinese', wordSuffix: 'hinese' },
            { letter: 'B', emoji: '🇧🇷', pron: '/brəˈzɪljən/', word: 'Brazilian', wordSuffix: 'razilian' },
            { letter: 'I', emoji: '🇮🇳', pron: '/ˈɪndiən/', word: 'Indian', wordSuffix: 'ndian' }
         ];
      } else if (isPersonalInfo) {
         numberList = [
            { letter: 'N', emoji: '📛', pron: '/neɪm/', word: 'Name', wordSuffix: 'ame' },
            { letter: 'A', emoji: '🎂', pron: '/eɪdʒ/', word: 'Age', wordSuffix: 'ge' },
            { letter: 'A', emoji: '📍', pron: '/əˈdrɛs/', word: 'Address', wordSuffix: 'ddress' },
            { letter: 'P', emoji: '☎️', pron: '/foʊn/', word: 'Phone', wordSuffix: 'hone' },
            { letter: 'E', emoji: '📧', pron: '/ˈiːmeɪl/', word: 'Email', wordSuffix: 'mail' },
            { letter: 'J', emoji: '⚙️', pron: '/dʒɒb/', word: 'Job', wordSuffix: 'ob' },
            { letter: 'C', emoji: '🏙️', pron: '/ˈsɪti/', word: 'City', wordSuffix: 'ity' },
            { letter: 'C', emoji: '🌎', pron: '/ˈkʌntri/', word: 'Country', wordSuffix: 'ountry' },
            { letter: 'F', emoji: '👪', pron: '/ˈfæmɪli/', word: 'Family', wordSuffix: 'amily' },
            { letter: 'F', emoji: '👬', pron: '/frɛnd/', word: 'Friend', wordSuffix: 'riend' }
         ];
      } else if (isDailyRoutines) {
         numberList = [
            { letter: 'W', emoji: '🌅', pron: '/weɪk/', word: 'Wake', wordSuffix: 'ake' },
            { letter: 'S', emoji: '🛏️', pron: '/sliːp/', word: 'Sleep', wordSuffix: 'leep' },
            { letter: 'S', emoji: '🚿', pron: '/ˈʃaʊər/', word: 'Shower', wordSuffix: 'hower' },
            { letter: 'B', emoji: '🦷', pron: '/brʌʃ/', word: 'Brush', wordSuffix: 'rush' },
            { letter: 'C', emoji: '🍳', pron: '/kʊk/', word: 'Cook', wordSuffix: 'ook' },
            { letter: 'E', emoji: '🍽️', pron: '/iːt/', word: 'Eat', wordSuffix: 'at' },
            { letter: 'W', emoji: '🚶', pron: '/wɔːk/', word: 'Walk', wordSuffix: 'alk' },
            { letter: 'W', emoji: '👔', pron: '/wɜːrk/', word: 'Work', wordSuffix: 'ork' },
            { letter: 'S', emoji: '📚', pron: '/ˈstʌdi/', word: 'Study', wordSuffix: 'tudy' },
            { letter: 'W', emoji: '📺', pron: '/wɒtʃ/', word: 'Watch', wordSuffix: 'atch' }
         ];
      } else if (isLikesDislikes) {
         numberList = [
            { letter: 'L', emoji: '❤️', pron: '/lʌv/', word: 'Love', wordSuffix: 'ove' },
            { letter: 'L', emoji: '👍', pron: '/laɪk/', word: 'Like', wordSuffix: 'ike' },
            { letter: 'D', emoji: '👎', pron: '/dɪsˈlaɪk/', word: 'Dislike', wordSuffix: 'islike' },
            { letter: 'H', emoji: '😡', pron: '/heɪt/', word: 'Hate', wordSuffix: 'ate' },
            { letter: 'E', emoji: '😊', pron: '/ɪnˈdʒɔɪ/', word: 'Enjoy', wordSuffix: 'njoy' },
            { letter: 'S', emoji: '⚽', pron: '/spɔːrt/', word: 'Sport', wordSuffix: 'port' },
            { letter: 'M', emoji: '🎵', pron: '/ˈmjuːzɪk/', word: 'Music', wordSuffix: 'usic' },
            { letter: 'F', emoji: '🌮', pron: '/fuːd/', word: 'Food', wordSuffix: 'ood' },
            { letter: 'M', emoji: '🎬', pron: '/ˈmuːvi/', word: 'Movie', wordSuffix: 'ovie' },
            { letter: 'G', emoji: '🎮', pron: '/ɡeɪm/', word: 'Game', wordSuffix: 'ame' }
         ];
      } else if (isHomeVocab) {
         numberList = [
            { letter: 'D', emoji: '🚪', pron: '/dɔːr/', word: 'Door', wordSuffix: 'oor' },
            { letter: 'W', emoji: '🪟', pron: '/ˈwɪndoʊ/', word: 'Window', wordSuffix: 'indow' },
            { letter: 'B', emoji: '🛏️', pron: '/bɛd/', word: 'Bed', wordSuffix: 'ed' },
            { letter: 'C', emoji: '🪑', pron: '/tʃɛər/', word: 'Chair', wordSuffix: 'hair' },
            { letter: 'S', emoji: '🛋️', pron: '/ˈsoʊfə/', word: 'Sofa', wordSuffix: 'ofa' },
            { letter: 'T', emoji: '📺', pron: '/ˌtiːˈviː/', word: 'TV', wordSuffix: 'V' },
            { letter: 'K', emoji: '🍳', pron: '/kɪtʃɪn/', word: 'Kitchen', wordSuffix: 'itchen' },
            { letter: 'B', emoji: '🛁', pron: '/ˈbæθruːm/', word: 'Bathroom', wordSuffix: 'athroom' },
            { letter: 'P', emoji: '🪴', pron: '/plænt/', word: 'Plant', wordSuffix: 'lant' },
            { letter: 'L', emoji: '💡', pron: '/læmp/', word: 'Lamp', wordSuffix: 'amp' }
         ];
      } else if (isPlacesInTown) {
         numberList = [
            { letter: 'S', emoji: '🏫', pron: '/skuːl/', word: 'School', wordSuffix: 'chool' },
            { letter: 'H', emoji: '🏥', pron: '/ˈhɒspɪtl/', word: 'Hospital', wordSuffix: 'ospital' },
            { letter: 'B', emoji: '🏦', pron: '/bæŋk/', word: 'Bank', wordSuffix: 'ank' },
            { letter: 'S', emoji: '🏬', pron: '/stɔːr/', word: 'Store', wordSuffix: 'tore' },
            { letter: 'C', emoji: '☕', pron: '/kæˈfeɪ/', word: 'Cafe', wordSuffix: 'afe' },
            { letter: 'P', emoji: '🌳', pron: '/pɑːrk/', word: 'Park', wordSuffix: 'ark' },
            { letter: 'C', emoji: '🎬', pron: '/ˈsɪnəmə/', word: 'Cinema', wordSuffix: 'inema' },
            { letter: 'A', emoji: '✈️', pron: '/ˈɛərpɔːrt/', word: 'Airport', wordSuffix: 'irport' },
            { letter: 'S', emoji: '🚉', pron: '/ˈsteɪʃən/', word: 'Station', wordSuffix: 'tation' },
            { letter: 'H', emoji: '🏨', pron: '/hoʊˈtɛl/', word: 'Hotel', wordSuffix: 'otel' }
         ];
      } else if (isHobbies) {
         numberList = [
            { letter: 'R', emoji: '📖', pron: '/riːd/', word: 'Read', wordSuffix: 'ead' },
            { letter: 'P', emoji: '🎨', pron: '/peɪnt/', word: 'Paint', wordSuffix: 'aint' },
            { letter: 'D', emoji: '✍️', pron: '/draɪv/', word: 'Draw', wordSuffix: 'raw' },
            { letter: 'R', emoji: '🏃', pron: '/rʌn/', word: 'Run', wordSuffix: 'un' },
            { letter: 'S', emoji: '🏊', pron: '/swɪm/', word: 'Swim', wordSuffix: 'wim' },
            { letter: 'C', emoji: '🚴', pron: '/saɪkəl/', word: 'Cycle', wordSuffix: 'ycle' },
            { letter: 'B', emoji: '🍳', pron: '/bɛɪk/', word: 'Bake', wordSuffix: 'ake' },
            { letter: 'S', emoji: '🎤', pron: '/sɪŋ/', word: 'Sing', wordSuffix: 'ing' },
            { letter: 'D', emoji: '💃', pron: '/dæns/', word: 'Dance', wordSuffix: 'ance' },
            { letter: 'P', emoji: '📷', pron: '/foʊtoʊ/', word: 'Photo', wordSuffix: 'hoto' }
         ];
      } else if (isShopping) {
         numberList = [
            { letter: 'S', emoji: '🛒', pron: '/ʃɒp/', word: 'Shop', wordSuffix: 'hop' },
            { letter: 'M', emoji: '💵', pron: '/mʌni/', word: 'Money', wordSuffix: 'oney' },
            { letter: 'P', emoji: '🏷️', pron: '/praɪs/', word: 'Price', wordSuffix: 'rice' },
            { letter: 'B', emoji: '🛍️', pron: '/bæɡ/', word: 'Bag', wordSuffix: 'ag' },
            { letter: 'S', emoji: '👕', pron: '/ʃɜːrt/', word: 'Shirt', wordSuffix: 'hirt' },
            { letter: 'P', emoji: '👖', pron: '/pænts/', word: 'Pants', wordSuffix: 'ants' },
            { letter: 'S', emoji: '👟', pron: '/ʃuː/', word: 'Shoe', wordSuffix: 'hoe' },
            { letter: 'D', emoji: '👗', pron: '/drɛs/', word: 'Dress', wordSuffix: 'ress' },
            { letter: 'C', emoji: '💳', pron: '/kɑːrd/', word: 'Card', wordSuffix: 'ard' },
            { letter: 'B', emoji: '🧾', pron: '/bɪl/', word: 'Bill', wordSuffix: 'ill' }
         ];
      }`;

content = content.replace(isNumSrc, optimizedReplacement);

// Fix Day/Months display phase 2
// Replace the big text logic in Phase 1 and 2 to show emojis!
content = content.replace(
  '<div className="text-[80px] xs:text-[100px] sm:text-[120px] font-black leading-none text-[#5d8ef7] mb-1">{item.letter}</div>',
  '<div className="text-[80px] xs:text-[100px] sm:text-[120px] font-black leading-none text-[#5d8ef7] mb-1">{item.emoji || item.letter}</div>'
);

content = content.replace(
  '<span className="text-4xl font-bold">{item.letter}</span>',
  '<span className="text-4xl font-bold">{item.letter}</span>' // keep it same, wait actually Phase 1 has a circle? Let's use emoji if available.
);
content = content.replace(
  '<span className="text-[50px] sm:text-[70px] font-bold">{currentItem.letter}</span>',
  '<span className="text-[50px] sm:text-[70px] font-bold">{currentItem.emoji || currentItem.letter}</span>'
);

content = content.replace(
  '<button onClick={playAudio} className={`w-28 h-28 sm:w-32 sm:h-32 mb-10 bg-white hover:bg-slate-50',
  '<button onClick={playAudio} className={`w-28 h-28 sm:w-32 sm:h-32 mb-10 bg-white hover:bg-slate-50'
);

fs.writeFileSync('pages/GrammarLessons.tsx', content);
console.log("Done");
