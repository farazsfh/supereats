const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2019-07-12',
  authenticator: new IamAuthenticator({
    apikey: '75UBdQj40_pZuSpMLgzTN7hsXLsFzqhs7AYoRR-y7zJu',
  }),
  url: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/e58783ce-347c-4533-8e3c-a005a255b1e0',
});

const analyzeParams = {
  'text': 'Hi Please provide your full name Vijender please please give your order black gram 2 kg onions 1 kg flour 2 kg and Dettol Please provide your address house number 101 Vasant Vihar New Delhi Thanks will you and bring you home',
  'features': {
    'entities': {
      'model': '30a92200-7b6f-46fe-8cee-83bf345f76d8',
      'limit': 10
    }
  }
};

naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });