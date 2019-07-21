<?

if(!file_exists("./timers.json"))
	file_put_contents("./timers.json", json_encode((object)array(
		"node" => array(
			"timers" => array(),
			"average" => 0,
			"total" => 0
		),
		"php" => array(
			"timers" => array(),
			"average" => 0,
			"total" => 0
		)
	), JSON_PRETTY_PRINT));

$timers = json_decode(file_get_contents("./timers.json"));

$start_time = microtime(true);

$counter = 0;

for($i = 1; $i <= 10000; $i++)
	$counter += $i;

$end_time = microtime(true);

$time = ($end_time - $start_time) * 1000;

array_push($timers->php->timers, $time);

$timers->php->total += $time;
$timers->php->average = $timers->php->total / count($timers->php->timers);

file_put_contents("./timers.json", json_encode($timers, JSON_PRETTY_PRINT));

?>