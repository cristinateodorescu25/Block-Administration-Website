<?php

session_start();

if (isset($_SESSION['username'])) {
    $current_user = $_SESSION['username'];
}

$current = [];
array_push($current, array("current_user" => intval($current_user)));

echo json_encode($current);

?>