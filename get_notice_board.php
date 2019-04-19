<?php
require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');

$flats = ORM::for_table('flats')->find_many();

$board_table = [];

foreach ($flats as $f) {

    if ($f->number != 0) {
        array_push($board_table, array(
            "number" => $f->number,
            "name" => $f->name,
            "water_consumption" => $f->water_consumption,
            "gas_consumption" => $f->gas_consumption,
            "price" => $f->price
        ));
    }
    
}

echo json_encode($board_table);

