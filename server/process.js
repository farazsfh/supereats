const util = require("util");
const fs = require("fs");
const request = require("request");
const { wordsToNumbers } = require("words-to-numbers");

request
	.get(process.argv[2])
	.pipe(fs.createWriteStream("audio.wav"))
	.on("finish", () => {
		const spawn = require("child_process").spawn;
		const process = spawn("python", ["speech.py"]);

		let transcript = "";

		process.stdout.on("data", function (chunk) {
			transcript = wordsToNumbers(chunk.toString("utf8")); // buffer to string
			return transcript;
		});
	});
