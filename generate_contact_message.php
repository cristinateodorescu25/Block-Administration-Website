<?php
require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');

$sender = $_POST["sender"];
$email = $_POST["email"];
$message = $_POST["message"];
create_contact_msg($sender, $email, $message);

function create_contact_msg($sender, $email, $message) {
	sleep(5);
    $contact_msg = ORM::for_table('contact_messages')->create();
    $contact_msg->sender = $sender;
	$contact_msg->email = $email;
	$contact_msg->message = $message;
    $contact_msg->save();
    return $contact_msg;
}