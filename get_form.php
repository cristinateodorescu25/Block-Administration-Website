<?php
require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');

$form_entries = ORM::for_table('form')->find_many();

$form_list = [];

foreach ($form_entries as $c) {

    if (!is_null($c->question)) {
        array_push($form_list, array(
            "question" => $c->question,
            "type" => $c->type,
            "shortlong" => $c->shortlong,
            "o1" => $c->o1,
            "o2" => $c->o2,
            "o3" => $c->o3,
            "o4" => $c->o4,
            "o5" => $c->o5
        ));
    }
}

echo json_encode($form_list);