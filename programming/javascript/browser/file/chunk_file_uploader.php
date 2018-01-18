<?php

$headers = [
    'Access-Control-Allow-Origin' => '*',
    'Access-Control-Allow-Headers' => '*',
    'Content-Type' => 'application/json',
];
foreach ($headers as $name => $value) {
    header($name . ': ' . $value);
}

foreach ($_FILES as $_FILE) {
    $contents = file_get_contents($_FILE['tmp_name']);
    $checksum = md5($contents);
    if ($_REQUEST['checksum'] !== $checksum) {
        header('HTTP/1.1 404 Not Found');
        echo json_encode([
            'checksum failed' => 'failed',
            'file checksum' => $checksum,
            'Request' => $_REQUEST,
        ]);
        return;
    }

    $fp = fopen('./movie' . $_REQUEST['index'] . '.part', 'wb');
    if (fwrite($fp, $contents) === false) {
        echo json_encode([
            'failed' => 'fwrite',
            'Request' => $_REQUEST,
        ]);
        return;
    }
    fclose($fp);

}

$all_file_parts_created = true;
for ($i = 0; $i < $_REQUEST['maxIndex']; $i++) {
    $part_file = './movie' . $i . '.part';
    if (!file_exists($part_file)) {
        $all_file_parts_created = false;
    }
}


if ($all_file_parts_created) {
    $fp = fopen('./movie.mp4', 'w');
    for ($i = 0; $i < $_REQUEST['maxIndex']; $i++) {
        $part_file = './movie' . $i . '.part';
        $contents = file_get_contents($part_file);
        fwrite($fp, $contents);
    }
    fclose($fp);
}

echo json_encode([
    'FILES' => count($_FILES),
    'REQUEST' => $_REQUEST,
]);
