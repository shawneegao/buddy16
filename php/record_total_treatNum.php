<?php
$new_treatNum = $_POST['data'];
echo($new_treatNum);

$totalTreatsFile = fopen('total_treats.txt', 'w');
fwrite($totalTreatsFile, $new_treatNum);
fclose($totalTreatsFile);
?>
