<?php
require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');

$logtime = ORM::for_table('usrdates')->find_many();

$log_table = [];

foreach ($logtime as $f) {

    array_push($log_table, array(
        "log_times" => $f->log_times,
        "day" => $f->day,
        "month" => $f->month
    ));
}

echo json_encode($log_table);

