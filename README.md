# Funny Performance Tests

**This is just a fun project to write some scripts to check which languages are faster at which point.s**
<br/>

### PHP vs NodeJS (loops)

The first little project checks loops between php and nodejs and gives extended information about the execution times.
<br/>
run: `npm run php-node-loops (?tests[number] = 10) (?loops[number] = 1000) (?simple) (?minimal) (?show-last-test)`.
- `tests`: the number of tests you want to run.
- `loops`: the number of loops it should run inside each test.
- `minimal`: only show the end calculation of average difference and total difference.
- `simple`: show all the calculations in simple form. (like minimal but also with the total and average time for each language).
- `show-last-test`: show the last test results. (can be used in combination with `minimal` or `simple`).
<br/>

## TODO:

- add c++ c# and java test to the (php-node-loops) loop performance test.
- add a test for reading/writing/deleting/streams files and folders.
- add a test for http requests and responses (GET, POST, PUT, DELETE).
- add a test for object manipulation/cloning.
- add a test for heavy calculations.
- add a little project that will execute php and nodejs scripts and keeps track of the execution time.
- add a test for web (canvas) rendering (clearing screen, image data/pixel manipulation, double buffered).