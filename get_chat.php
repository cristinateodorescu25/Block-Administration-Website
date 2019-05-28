<?php

require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');

$current_user = 0;

session_start();

if (isset($_SESSION['username'])) {
    $current_user = $_SESSION['username'];
}

$chat = ORM::for_table('chat_messages')->find_many();

$flat_number = intval($current_user);
$chat_msgs = [];

foreach ($chat as $f) {
    
    if ($f->sender == $flat_number || $f->reciever == $flat_number) {
        array_push($chat_msgs, array(
            "sender" => $f->sender,
            "reciever" => $f->reciever,
            "date" => $f->date,
            "time" => $f->time,
            "message" => $f->message
        ));
    }
    
}

echo json_encode($chat_msgs);

?>