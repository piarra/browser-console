<?php

require_once('BrowserConsole.php');

$console = new BrowserConsole();

$im = imagecreatetruecolor(500, 100);
for ($i = 0; $i <= 100; $i++) {
    $color = imagecolorallocate($im, rand(1, 255), rand(1, 255), rand(1, 255));

    $r = rand(10, 50);
    imagearc($im, rand(1,500), rand(1, 100), $r, $r,  0, 360, $color);

    $filename = '/tmp/test.png';
    imagepng($im, $filename);

    $console->log('info' . $i, 'info');
    $console->log('notice' . $i, 'notice');
    $console->log('debug' . $i, 'debug');
    $console->log('warning' . $i, 'warning');
    $console->log('error'. $i, 'error');
    $console->logByImage($im, 'info', 'gd');
    //$console->logByImage($filename, 'info', 'file');
    sleep(1);
}

