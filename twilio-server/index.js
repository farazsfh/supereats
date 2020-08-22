const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const app = express();
const axios = require('axios');

// Bodyparser setup
const bp = require("body-parser");
app.use(bp.urlencoded({ extended: true }));

let port = process.env.PORT || 8000;

// Route triggers on phone call
app.post('/voice', (req, res) => {
    const twiml = new VoiceResponse();
    twiml.say('Hello welcome to Super Eats! Please state your name, address and order.');
    twiml.record({ transcribe: true, transcribeCallback: '/transcribe' });
    twiml.hangup();
    res.type('text/xml');
    res.send(twiml.toString());
});

app.post('/transcribe', (req, res) => {
    var transcription = encodeURIComponent(req.body.TranscriptionText);
    var from = req.body.From;
    var luisquery = "https://pandemicphoneline-authoring.cognitiveservices.azure.com/luis/prediction/v3.0/apps/be6a92b3-6bb1-4f19-bb84-d4d47439186a/slots/production/predict?subscription-key=dede97f65f9d4b49ad1911601aca2467&verbose=true&show-all-intents=true&log=true&query=";
    luisquery = luisquery.concat(transcription);
    console.log(luisquery);

    axios.get(luisquery)
        .then((res) => {
            var name = res.data.prediction.entities.Name[0];
            var address = res.data.prediction.entities.$instance.Address[0].text;
            
            itemsJson = res.data.prediction.entities.Item;
            var items = [];
            for(var i = 0; i < itemsJson.length; i++) {
                items.push({quantity: Number(itemsJson[i].Quantity[0]), product: itemsJson[i].Product[0]});
            }

            axios.post("http://localhost:5000/orders/add", {name: name, address: address, items: items})
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

app.get('/', (req, res) => {
    res.send("SuperEats Twilio Server is running.");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});