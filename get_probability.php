<?php
require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');

$probs = ORM::for_table('probability')->find_many();

$prob_list = [];

foreach ($probs as $f) {
    
    array_push($prob_list, array(
        "string" => $f->string
    ));
    
}

echo json_encode($prob_list);

