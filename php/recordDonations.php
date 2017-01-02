<?php
/* Converts donation object to associative array and write it to a csv file*/
$donateInfo = $_POST['data'];
$infoArray = json_decode($donateInfo, true);
$fp = fopen('donateInfo.csv', 'a');
fputcsv($fp, $infoArray);
fclose($fp);
?>
