<?php
require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');

$name = $_POST["name"];
$surname = $_POST["surname"];
$flat_number = $_POST["flat_number"];
$password = $_POST["password"];
$email = $_POST["email"];

$name = stripcslashes($name);
$surname = stripcslashes($surname);
$flat_number = stripcslashes($flat_number);
$password = stripcslashes($password);
$email = stripcslashes($email);

process_signup($name, $surname, $flat_number, $password, $email);

function process_signup($name, $surname, $flat_number, $password, $email) {

    $flats = ORM::for_table('flats')->find_many();

    foreach ($flats as $f) {

        if ($f->number . "" == $flat_number)
            break;
    }

    $f->set(array(
        'name' => $name . " " . $surname,
        'number' => (int)$flat_number,
        'water_consumption' => 0,
        'gas_consumption' => 0,
        'price' => 0,
        'email' => $email,
        'user' => $flat_number . strtolower($name[0]) . strtolower($surname[0]),
        'pass' => $password
    ));

    $f->save();
}