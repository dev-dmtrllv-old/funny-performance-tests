const { execSync } = require("child_process");
const { existsSync, unlinkSync } = require("fs");
const { resolve } = require("path");

const timerPath = resolve(__dirname, "./timers.json");

if (existsSync(timerPath))
	unlinkSync(timerPath);

let [, , l = 10, loopCount = 1000, fullinfo = "true"] = process.argv;

console.clear();
console.log(`running ${loopCount} loops ${l} times:`);

for (let i = 0; i < l; i++)
{
	execSync("C:\\php\\php-7.3.7\\php.exe ./loops.php " + loopCount);
	execSync("node ./loops " + loopCount);
}

const timers = require("./timers.json");


const faster = timers.node.average < timers.php.average ? "node" : "php";
const averageDiff = Math.abs(timers.node.average - timers.php.average);
const totalDiff = Math.abs(timers.node.total - timers.php.total);

if (fullinfo == "true")
{
	console.log({
		...timers, comparison: {
			faster,
			averageDiff,
			totalDiff
		}
	});
	console.log();
}
else
{
	console.log(`node:`);
	console.log(`  total: ${timers.node.total}`)
	console.log(`  average: ${timers.node.average}`);
	console.log();
	console.log(`php:`);
	console.log(`  total: ${timers.php.total}`);
	console.log(`  average: ${timers.php.average}`);
	console.log();
}
console.log(`${faster} is ${averageDiff} ms faster in average and ${totalDiff} ms faster in total!`);
console.log();