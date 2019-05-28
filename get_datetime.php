<?php
require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');

$pagetime = ORM::for_table('pagetime')->find_many();

$page_table = [];

foreach ($pagetime as $f) {

    if ($f->user != "") {
        array_push($page_table, array(
            "user" => $f->user,
            "chat_time" => $f->chat_time,
            "home_time" => $f->home_time
        ));
    }   
}

echo json_encode($page_table);

