<?php
$csv = array_map('str_getcsv', file('donateInfo.csv'));
echo (json_encode($csv));
?>
