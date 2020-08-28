const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const app = express();
const axios = require('axios');

const exec = require("child_process").execSync;
const { wordsToNumbers } = require("words-to-numbers");
const util = require("util");
const fs = require("fs");
const request = require("request");

// Bodyparser setup
const bp = require("body-parser");
app.use(bp.urlencoded({ extended: true }));


let port = process.env.PORT || 8000;

async function getTranscription(recordingUrl) {
    return new Promise(function(resolve, reject) {
        request
        .get(recordingUrl)
        .pipe(fs.createWriteStream("audio.wav"))
        .on("finish", () => {
            resolve(wordsToNumbers(exec("python3 speech.py").toString("utf8")));
        });
    }
)};

// Route triggers on phone call
app.post('/voice', (req, res) => {
    const twiml = new VoiceResponse();
    twiml.say('Hello welcome to Super Eats! Please state your name, address and order.');
    twiml.record({ transcribe: true, transcribeCallback: '/transcribe' });
    twiml.hangup();
    res.type('text/xml');
    res.send(twiml.toString());
});

app.post('/transcribe', async (req, res) => {
    var recordingUrl = req.body.RecordingUrl;
    recordingUrl = recordingUrl.concat(".wav");
    var transcription = "";
    transcription = await getTranscription(recordingUrl);
    var transcriptionText = transcription;
    console.log(transcriptionText);
    transcription = encodeURIComponent(transcription);
    var from = req.body.From;
    var luisquery = "AZURE_LUIS_QUERY";
    luisquery = luisquery.concat(transcription);
    console.log(luisquery);

    axios.get(luisquery)
        .then((res) => {
            var name = res.data.prediction.entities.Name[0];
            var address = res.data.prediction.entities.$instance.Address[0].text;
            
            itemsJson = res.data.prediction.entities.Item;
            var items = [];
            for(var i = 0; i < itemsJson.length; i++) {
                var form = itemsJson[i].Form == undefined ? "" : itemsJson[i].Form[0];
                var weight = itemsJson[i].Weight == undefined ? "" : itemsJson[i].Weight[0];
                var quantity = itemsJson[i].Quantity == undefined ? 1 : Number(itemsJson[i].Quantity[0]);

                if (itemsJson[i].Product == undefined) {
                    continue;
                } else {
                    var product = itemsJson[i].Product[0];
                }

                items.push({quantity: quantity, product: product, form: form, weight: weight});
            }
            axios.post("https://supereatsserver.azurewebsites.net/orders/", {name: name, address: address, phone: from, transcription: transcriptionText, recordingUrl: recordingUrl, items: items})
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
