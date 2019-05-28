<?php
require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');

$chat_messages = ORM::for_table('chat_messages')->find_many();

$usr_messages = [];
$i = 0;

for ($i = 0; $i <= 11; $i++) {
    $usr_messages[$i] = 0;
}

foreach ($chat_messages as $c) {
    // echo $c->message . "<br>";
    $usr_messages[$c->sender-10]++;
}

$top_list = [];

// $something = array(
//     "flat" => 1+10,
//     "value" => $usr_messages[0]
// );

for ($i = 0; $i <= 11; $i++) {

    array_push($top_list, array(
        "flat" => $i+10,
        "value" => $usr_messages[$i]
    ));

}

function sortByOrder($a, $b) {

    return $b['value'] - $a['value'];
}

usort($top_list, 'sortByOrder');

$sliced_array = array_slice($top_list, 0, 3);

echo json_encode($sliced_array);

