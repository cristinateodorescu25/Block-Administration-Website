<?php
require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');

$form_entries = ORM::for_table('form')->find_many();

$form_list = [];

foreach ($form_entries as $c) {

    if ($c->question == "Check2") {
       $c->delete();
    }
}

echo json_encode($form_list);