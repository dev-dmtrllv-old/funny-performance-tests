const { execSync } = require("child_process");
const { existsSync, unlinkSync, writeFile } = require("fs");
const { resolve } = require("path");

console.clear();

const timerPath = resolve(__dirname, "./timers.json");

let [, , ...args] = process.argv;

const getArg = (arg, def) =>
{
	const i = args.indexOf(arg);
	return i > -1 ? args[i + 1] : def;
}

const showLastTest = args.indexOf("show-last-test") !== -1;
const tests = getArg("tests", 10);
const loops = getArg("loops", 1000);
const simple = args.indexOf("simple") !== -1;
const minimal = args.indexOf("minimal") !== -1;

if (showLastTest && !existsSync(timerPath))
{
	console.log("You need to run a test before you can see the last test results!");
	process.exit();
}
else if (showLastTest)
{
	console.log(`The last test ran`, +loops, `loops,`, +tests, `times...`);
}
else
{
	if (existsSync(timerPath))
		unlinkSync(timerPath);
	console.log(`running`, +loops, `loops,`, +tests, `times, with ${simple ? "simple" : minimal ? "minimal" : "extended"} information...`);
}

if (!showLastTest)
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
