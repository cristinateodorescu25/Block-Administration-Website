<?php
require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');

$question = $_POST["question"];
$type = $_POST["type"];
$shortlong = $_POST["shortlong"];
$o1 = $_POST["o1"];
$o2 = $_POST["o2"];
$o3 = $_POST["o3"];
$o4 = $_POST["o4"];
$o5 = $_POST["o5"];
create_form_entry($question, $type, $shortlong, $o1, $o2, $o3, $o4, $o5);

function create_form_entry($question, $type, $shortlong, $o1, $o2, $o3, $o4, $o5) {
    sleep(5);
    $form_entry = ORM::for_table('form')->create();
    $form_entry->question = $question;
	$form_entry->type = $type;
    $form_entry->shortlong = $shortlong;
    $form_entry->o1 = $o1;
    $form_entry->o2 = $o2;
    $form_entry->o3 = $o3;
    $form_entry->o4 = $o4;
    $form_entry->o5 = $o5;
    $form_entry->save();
    return $form_entry;
}