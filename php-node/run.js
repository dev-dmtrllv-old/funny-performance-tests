const { execSync } = require("child_process");
const { existsSync, unlinkSync } = require("fs");
const { resolve } = require("path");

const timerPath = resolve(__dirname, "./timers.json");

if (existsSync(timerPath))
	unlinkSync(timerPath);

let [, , l = 1, loopCount = 1000, fullinfo = false] = process.argv;

console.log(`running ${loopCount} loops ${l} times`);

for (let i = 0; i < l; i++)
{
	execSync("C:\\php\\php-7.3.7\\php.exe ./loops.php " + loopCount);
	execSync("node ./loops " + loopCount);
}

console.clear();

const timers = require("./timers.json");

if (fullinfo)
	console.log(timers);
else
	console.log(timers.perf);