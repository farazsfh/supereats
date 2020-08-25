const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const fs = require("fs");

const rs = fs.createReadStream(process.argv[2]);
const textArr = [];

rs.on("data", (data) => {
  textArr.push(data.toString());
})
rs.on("error", (error) => {
  console.log(error);
})
rs.on("close", () => {
  // console.log(textArr.join(''));
  const analyzeParams = {
    'text': textArr.join(''),
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
});

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2019-07-12',
  authenticator: new IamAuthenticator({
    apikey: '75UBdQj40_pZuSpMLgzTN7hsXLsFzqhs7AYoRR-y7zJu',
  }),
  url: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/e58783ce-347c-4533-8e3c-a005a255b1e0',
});

