<?php
require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');

$user = $_POST["username"];
$pass = $_POST["password"];

//prevent mysql injection
$user = stripcslashes($user);
$pass = stripcslashes($pass);

process_login($user, $pass);

function process_login($user, $pass) {

    $found = false;
    $flats = ORM::for_table('flats')->find_many();

    foreach ($flats as $f) {

        if ($f->user == $user) {

            if ($f->pass == $pass) {
                
                $found = $user;
            }
        }
    }

    echo $found;
}


