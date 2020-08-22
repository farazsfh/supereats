const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const app = express();
const axios = require('axios');
app.use(express.json())

let port = process.env.PORT || 3000;

app.post('/voice', (req, res) => {
    const twiml = new VoiceResponse();
    twiml.say('Hello welcome to Super Eats! Please state your name, address and order.');
    twiml.record({ transcribe: true, transcribeCallback: '/transcribe' });
    twiml.hangup();
    res.type('text/xml');
    res.send(twiml.toString());
});

app.post('/transcribe', (req, res) => {
    var transcription = req.body.TranscriptionText;
    var from = req.body.From;
    var to = req.body.To;
});

app.get('/', (req, res) => {
    res.send("SuperEats Twilio Server is running.");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});