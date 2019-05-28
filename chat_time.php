<?php

session_start();

if (isset($_SESSION['username'])) {

    $current_user = $_SESSION['username'];

    $_SESSION['chat_time'] = time();
    
}

?>