<?php
require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');
 
ORM::get_db()->exec('DROP TABLE IF EXISTS flats;');
ORM::get_db()->exec(
    'CREATE TABLE flats (' .
        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' .
        'number INTEGER, ' .
        'water_consumption FLOAT, ' .
        'gas_consumption FLOAT, ' .
        'price FLOAT, ' .
        'user TEXT,' .
        'pass TEXT,' .
        'email TEXT, ' .
        'name TEXT)'
);
 
function create_flat($number, $name, $water_consumption,
                        $gas_consumption, $price, $user, $pass, $email) {
    $flat = ORM::for_table('flats')->create();
    $flat->name = $name;
    $flat->number = $number;
    $flat->water_consumption = $water_consumption;
    $flat->gas_consumption = $gas_consumption;
    $flat->price = $price;
    $flat->user = $user;
    $flat->pass = $pass;
    $flat->email = $email;
    $flat->save();
    return $flat;
}
 
$flat_list = array(
    create_flat(10, 'Sebastian Grey', 28.8, 70.5, 257.24, "10sg", "password", ''),
    create_flat(11, 'Dora Parker, James Parker', 60.46, 190.45, 488.90, "11dpjp", "password", ''),
    create_flat(12, 'Minnie Xiu', 28.8, 70.5, 300.64, "12mx", "password", ''),
    create_flat(13, '', 0, 0, 0, '', '', ''),
    create_flat(14, '', 0, 0, 0, '', '', ''),
    create_flat(15, '', 0, 0, 0, '', '', ''),
    create_flat(16, 'Jasmine Smith', 12.45, 106.7, 230.12, "16js", "password", ''),
    create_flat(17, '', 0, 0, 0, '', '', ''),
    create_flat(18, 'Ricko Yasumi, Rob Boss', 49.92, 133.56, 570.98, "18ryrb", "password", ''),
    create_flat(19, '', 0, 0, 0, '', '', ''),
    create_flat(20, '', 0, 0, 0, '', '', ''),
    create_flat(21, '', 0, 0, 0, '', '', ''),
    create_flat(0, 'Admin', 0, 0, 0, 'admin', 'password', ''),
);
 

echo('<br>');
echo('Flats: ' . ORM::for_table('flats')->count() . '<br>');

ORM::get_db()->exec('DROP TABLE IF EXISTS contact_messages;');
ORM::get_db()->exec(
    'CREATE TABLE contact_messages (' .
        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' .
        'sender TEXT, ' .
        'email TEXT, ' .
        'message TEXT)'
);
 
function create_contact_message($sender, $email, $message) {
    $contact_msg = ORM::for_table('contact_messages')->create();
    $contact_msg->sender = $sender;
    $contact_msg->email = $email;
    $contact_msg->message = $message;
    $contact_msg->save();
    return $contact_msg;
}
 
$contact_msg_list = array(
    create_contact_message('Sebastian Grey', 'sebgray@gmail.com', 'Thank you for inviting me!'),
    create_contact_message('Rick Johnson', 'rickjohnson@yahoo.com', 'Please contact me at the above mentioned e-mail address regarding a commercial business opportunity for your flats.'),
);
 

echo('<br>');
echo('Contact Messages: ' . ORM::for_table('contact_messages')->count() . '<br>');


ORM::get_db()->exec('DROP TABLE IF EXISTS chat_messages;');
ORM::get_db()->exec(
    'CREATE TABLE chat_messages (' .
        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' .
        'sender NUMBER, ' .
        'reciever NUMBER, ' .
        'date TEXT, ' .
        'time TEXT, ' .
        'message TEXT)'
);

function create_chat_message($sender, $reciever, $message, $date, $time) {
    $chat_msg = ORM::for_table('chat_messages')->create();
    $chat_msg->sender = $sender;
    $chat_msg->reciever = $reciever;
    $chat_msg->date = $date;
    $chat_msg->time = $time;
    $chat_msg->message = $message;
    $chat_msg->save();
    return $chat_msg;
}

$contact_msg_list = array(
    create_chat_message(10, 11, 'Hi', '10-Jan-2019', '11:10'),
    create_chat_message(11, 10, 'Hello', '10-Jan-2019', '11:12'),
    create_chat_message(10, 11, 'How are you today?', '10-Jan-2019', '11:13'),
    create_chat_message(11, 10, `We're great, thank you.`, '10-Jan-2019', '11:13'),
    create_chat_message(11, 10, 'And how are you?', '10-Jan-2019', '11:13'),
    create_chat_message(10, 11, `I'm doing amazing. Would you like to come for dinner tomorrow evening?`, '10-Jan-2019', '11:14'),
    create_chat_message(11, 10, 'Sure thing! Thank you so much for inviting us.', '10-Jan-2019', '11:14'),
    create_chat_message(11, 10, 'See you at 8.', '10-Jan-2019', '11:14'),
    create_chat_message(16, 10, `Hey! I am sorry to bother you, I need a huge favor`, '10-Jan-2019', '17:40'),
    create_chat_message(10, 16, `It's alright, let's hear what it's about`, '10-Jan-2019', '17:41'),
    create_chat_message(16, 10, `Are you free this weekend?`, '10-Jan-2019', '17:41'),
    create_chat_message(10, 16, `Yes, why?`, '10-Jan-2019', '17:42'),
    create_chat_message(16, 10, `Well, I have a conference and there's no one I can let Mr. Muffins with. Would you mind taking care of him?`, '10-Jan-2019', '17:42'),
    create_chat_message(10, 16, `Of course, leave it all to me!`, '10-Jan-2019', '17:43'),
    create_chat_message(16, 10, `Thank you so much!`, '10-Jan-2019', '17:43'),
    create_chat_message(10, 16, `No problem!`, '10-Jan-2019', '17:41'),
    create_chat_message(12, 18, `Clubbing this weekend?`, '10-Jan-2019', '17:41'),
    create_chat_message(18, 12, `Sure thing!`, '10-Jan-2019', '17:41'),
);

echo('<br>');
echo('Chat Messages: ' . ORM::for_table('chat_messages')->count() . '<br>');



?>
