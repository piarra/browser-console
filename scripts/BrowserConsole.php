<?php

class BrowserConsole
{
    private $socketHost = 'localhost';
    private $socketPort = 8980;
    private function notify($message, $level = 'info', $type = 'text')
    {
        $query = [
            'level'   => $level,
            'type'    => $type,
            'message' => $message,
        ];
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'http://' . $this->socketHost . ':' . $this->socketPort . '/notify'); 
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($query));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        try {
            $res = curl_exec($ch);
        }
        catch (Exception $e) {
        }
        curl_close($ch);
    }

    public function log($message, $level, $type = 'text')
    {
        $this->notify($message, $level, $type);
    }

    public function logByImage($obj, $level, $type = 'jpeg') {
        if ($type == 'jpeg' || $type == 'png') {
            $img = 'data:image/' . $type . ';base64,' . base64_encode($obj);
            $this->log($img, $level, $type);
        } elseif ($type == 'file') {
            $imgBinary = file_get_contents($obj);
            if (preg_match('/\.(png|jpg)$/', $obj, $m)) {
                $ext = $m[1];
                if ($ext == 'jpg') {
                    $this->logByImage($imgBinary, $level, 'jpeg');
                } elseif ($ext == 'png') {
                    $this->logByImage($imgBinary, $level, 'png');
                }
            }
        } elseif ($type == 'gd') {
            ob_start();
            imagepng($obj);
            $pngBinary = ob_get_contents();
            return $this->logByImage($pngBinary, $level, 'png');
        } else {
            throw new Exception('image should be jpeg or png');
        }
    }
 
    public function logByUrl($url, $level = 'info')
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:44.0) Gecko/20100101 Firefox/44.0'); 
        $html = curl_exec($ch);
        curl_close($ch);
        $this->notify($html, $level, 'html');
    }
}
