<?php

require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');

session_start();

if(isset ($_GET['logout'])){

    session_destroy();

    $user = $_SESSION['username'];

    $pasttime = time() - $_SESSION["chat_time"];

    $passtime = $pasttime;

    $pagetimes = ORM::for_table('pagetime')->find_many();

    foreach ($pagetimes as $f) {

        if ($f->user == $user) {

            $beforetime = $f->chat_time;

            $secs = intval(date("s", $pasttime)) + 60 * intval(date('i', $pasttime));

            $result = intval($beforetime) + $secs; 

            $f->chat_time = $result . "";
            $f->save();

        }
    }

    $datetimes = ORM::for_table('usrdates')->find_many();

    foreach ($datetimes as $f) {

        if ($f->day == date('l', $_SESSION["chat_time"])) {

            if($f->month == 'May') {

                $f->log_times = $f->log_times + 1;
                $f->save();
            }
        }
    }

    echo "<script>location.href='home.html'</script>";

} else {
    echo "<script>location.href='home.html'</script>";
}

?>