<?php
require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');

$str = $_POST["string"];

$probs = ORM::for_table('probability')->find_many();

foreach ($probs as $p) {
    $p->string = $p->string . $str;
    $p->save();
}

?>