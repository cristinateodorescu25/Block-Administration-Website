<?php
require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');

$contact_messages = ORM::for_table('contact_messages')->find_many();

$contact_msg_list = [];

foreach ($contact_messages as $c) {

    if (!is_null($c->message)) {
        array_push($contact_msg_list, array(
            "id" => $c->id,
            "sender" => $c->sender,
            "email" => $c->email,
            "message" => $c->message
        ));
    }
}

echo json_encode($contact_msg_list);