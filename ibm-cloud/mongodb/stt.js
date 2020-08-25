const fs = require('fs');
const { IamAuthenticator } = require('ibm-watson/auth');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { wordsToNumbers } = require('words-to-numbers');
const request = require("request");
const axios = require("axios");

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

var params = {
    objectMode: false,
    contentType: 'audio/mp3',
  };

// Create the stream.
var recognizeStream = speechToText.recognizeUsingWebSocket(params);
recognizeStream.setEncoding('utf8');

// Pipe in the audio.
request.get(process.argv[2])
  .pipe(fs.createWriteStream('audio.mp3'))
  .on("finish", () => {

    fs.createReadStream("audio.mp3").pipe(recognizeStream);
    const textArr = [];

    // Listen for events.
    recognizeStream.on('data', function(event) { 
        textArr.push(event);
    });

    recognizeStream.on('error', function(event) {
        console.log(event);
    });

    recognizeStream.on('close', function(event) { 
        console.log(textArr.join('')) ;
    });


  });


