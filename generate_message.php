<?php
require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');

$sender = $_POST["sender"];
$reciever = $_POST["reciever"];
$message = $_POST["message"];
create_message($sender, $reciever, $message);

function create_message($sender, $reciever, $message) {

    $msg = ORM::for_table('chat_messages')->create();
    $msg->sender = $sender;
	$msg->reciever = $reciever;
    $msg->message = $message;
    $msg->date = date("j-M-Y", time());
    $msg->time = date("h:i", time());
    $msg->save();
    return $msg;
}