const util = require("util");
const fs = require("fs");
const request = require("request");

request
	.get(process.argv[2])
	.pipe(fs.createWriteStream("audio.wav"))
	.on("finish", () => {
		const spawn = require("child_process").spawn;
		const process = spawn("python", ["speech.py"]);

		let transcript = "";

		process.stdout.on("data", function (chunk) {
			transcript = chunk.toString("utf8"); // buffer to string
			console.log(transcript);
		});
	});
