const { existsSync, writeFileSync } = require("fs");
const { resolve } = require("path");
var microtime = require('microtime');

const timerPath = resolve(__dirname, "./timers.json");

if (!existsSync(timerPath))
	writeFileSync(timerPath, JSON.stringify({
		node: {
			timers: [],
			average: 0
		},
		php: {
			timers: [],
			average: 0
		},
		perf: {
			faster: null,
			diff: 0
		}
	}), "utf-8");

const timers = require("./timers.json");

const start = microtime.nowDouble();

let counter = 0;

for (let i = 0; i <= 10000; i++)
	counter += i;

const time = (microtime.nowDouble() - start) * 1000;

timers.node.timers.push(time);

timers.node.total += time;
timers.node.average = timers.node.total / timers.node.timers.length;

writeFileSync(timerPath, JSON.stringify(timers, null, 4), "utf-8");