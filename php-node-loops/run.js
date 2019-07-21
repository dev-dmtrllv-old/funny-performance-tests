const { execSync } = require("child_process");
const { existsSync, unlinkSync, writeFile } = require("fs");
const { resolve } = require("path");

const timerPath = resolve(__dirname, "./timers.json");

if (existsSync(timerPath))
	unlinkSync(timerPath);

let [, , ...args] = process.argv;

const getArg = (arg, def) =>
{
	const i = args.indexOf(arg);
	return i > -1 ? args[i + 1] : def;
}

let tests = getArg("tests", 10);
let loops = getArg("loops", 1000);
let simple = args.indexOf("simple") !== -1;
let minimal = args.indexOf("minimal") !== -1;

console.clear();
console.log(`running ${loops} loops, ${tests} times, with ${simple ? "simple" : minimal ? "minimal" : "extended"} information...`);

for (let i = 0; i < tests; i++)
{
	execSync("php.exe ./loops.php " + loops);
	execSync("node ./loops " + loops);
}


const timers = require(timerPath);

const totalDiff = Math.abs(timers.node.total - timers.php.total);
const faster = timers.node.total < timers.php.total ? "node" : "php";
const averageDiff = Math.abs(timers.node.average - timers.php.average);

const endCalculation = {
	...timers,
	comparison: {
		faster,
		averageDiff,
		totalDiff
	}
};

writeFile(timerPath, JSON.stringify(endCalculation, null, 4), "utf-8", (err) => { if (err) throw err; });

if (!simple && !minimal)
{
	console.log(endCalculation);
	console.log();
}
else if (simple && !minimal)
{
	console.log();
	console.log(`node:`);
	console.log(`  total:\t`, timers.node.total, `ms`);
	console.log(`  average:\t`, timers.node.average, `ms`);
	console.log();
	console.log(`php:`);
	console.log(`  total:\t`, timers.php.total, `ms`);
	console.log(`  average:\t`, timers.php.average, `ms`);
	console.log();
}
console.log(`${faster} was`, averageDiff, `ms faster in average and`, totalDiff, `ms faster in total!`);
