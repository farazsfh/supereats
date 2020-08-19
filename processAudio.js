const fs = require('fs');
const { IamAuthenticator } = require('ibm-watson/auth');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { wordsToNumbers } = require('words-to-numbers');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2019-07-12',
  authenticator: new IamAuthenticator({
    apikey: '75UBdQj40_pZuSpMLgzTN7hsXLsFzqhs7AYoRR-y7zJu',
  }),
  url: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/e58783ce-347c-4533-8e3c-a005a255b1e0',
});

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: '0kBZ5-4ylUhx2EJkTQszDJv88y6O91Mdqj0Y8mpFoZVt',
  }),
  url: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/18574efe-d618-4e84-8989-9d28882ee212',
});

// var params = {
//   objectMode: true,
//   contentType: 'audio/flac',
//   model: 'en-US_BroadbandModel',
//   keywords: ['colorado', 'tornado', 'tornadoes'],
//   keywordsThreshold: 0.5,
//   maxAlternatives: 3
// };

var params = {
    objectMode: false,
    contentType: 'audio/mp3',
    // model: 'en-US_BroadbandModel',
    // keywords: ['colorado', 'tornado', 'tornadoes'],
    // keywordsThreshold: 0.5,
    // maxAlternatives: 3
  };

// Create the stream.
var recognizeStream = speechToText.recognizeUsingWebSocket(params);

// Pipe in the audio.
fs.createReadStream(process.argv[2]).pipe(recognizeStream);

/*
 * Uncomment the following two lines of code ONLY if `objectMode` is `false`.
 *
 * WHEN USED TOGETHER, the two lines pipe the final transcript to the named
 * file and produce it on the console.
 *
 * WHEN USED ALONE, the following line pipes just the final transcript to
 * the named file but produces numeric values rather than strings on the
 * console.
 */
recognizeStream.pipe(fs.createWriteStream('transcription.txt'));

/*
 * WHEN USED ALONE, the following line produces just the final transcript
 * on the console.
 */
recognizeStream.setEncoding('utf8');

const textArr = [];

const analyzeParams = {
    'text': 'Test String',
    'features': {
      'entities': {
        'model': '30a92200-7b6f-46fe-8cee-83bf345f76d8',
        'limit': 10
      }
    }
  };

// Listen for events.
recognizeStream.on('data', function(event) { 
    // onEvent('Data:', event); 
    textArr.push(event);
});

recognizeStream.on('error', function(event) { 
    // onEvent('Error:', event); 
    console.log(error);
});

recognizeStream.on('close', function(event) { 
    // onEvent('Close:', event);
    // console.log(textArr.join('')) 
    analyzeParams.text = wordsToNumbers(textArr.join('').toString());
    // console.log(wordsToNumbers(analyzeParams.text));

    naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
    })
    .catch(err => {
        console.log('error:', err);
    });
});

// Display events on the console.
// function onEvent(name, event) {
//     console.log(name, JSON.stringify(event, null, 2));
//     console.log(textArr);
// };



// analyzeParams.text = "Hello"
