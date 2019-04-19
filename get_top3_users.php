<?php
require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');

$chat_messages = ORM::for_table('chat_messages')->find_many();

$usr_messages = [];

for ($i = 0; $i <= 11; $i++) {
    $usr_messages[i] = -INF;
}

foreach ($chat_messages as $c) {
    $usr_messages[$c->sender-10]++;
}

$top_list = [];

for ($i = 0; $i <= 11; $i++) {
    array_push($top_list, array(
        "flat" => $i+10,
        "value" => $usr_messages[$i]
    ));
}

$top_list.rsort();
$sliced_array = array_slice($top_list, 0, 3);

echo json_encode($sliced_array);

