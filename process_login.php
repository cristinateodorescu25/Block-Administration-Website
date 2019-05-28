<?php
require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');

if (isset($_POST['login'])) {

    if (empty($_POST['username']) || empty($_POST['password'])) {

        header("location:home.html?Empty=Please complete the fields");
    }
    else {

        $user = $_POST["username"];
        $pass = $_POST["password"];

        $var = process_login($user, $pass);
    
        if($var == $user) {
    
            session_start();
            $_SESSION['username'] = $user;
            header("location:chat.html");
        }
        else {
    
            header("location:home.html?Invalid=Username or password incorrect");
        }
    }

} else {
    echo 'Login not working.';
}

function process_login($user, $pass) {

    $found = false;
    $flats = ORM::for_table('flats')->find_many();

    foreach ($flats as $f) {

        if ($f->user == $user) {

            if ($f->pass == $pass) {
                
                $found = $user;
            }
        }
    }

    return $found;
}

?>
