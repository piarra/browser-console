<?php

require_once('BrowserConsole.php');

$console = new BrowserConsole();

$im = imagecreatetruecolor(500, 100);
for ($i = 0; $i <= 100; $i++) {
    $color = imagecolorallocate($im, rand(1, 255), rand(1, 255), rand(1, 255));

    $r = rand(10, 50);
    imagearc($im, rand(1,500), rand(1, 100), $r, $r,  0, 360, $color);

    ob_start();
    imagejpeg($im);
    $str = ob_get_contents();
    ob_end_clean();
    
    $img = 'data:image/jpeg;base64,' . base64_encode($str);
    $imghtml = '<img src="' . $img . '"/>';
    $console->notify($imghtml);
    sleep(1);
}

