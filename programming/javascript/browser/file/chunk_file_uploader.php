<?php

$headers = [
    'Access-Control-Allow-Origin' => '*',
    'Access-Control-Allow-Headers' => '*',
];
foreach ($headers as $name => $value) {
    header($name . ': ' . $value);
}

foreach ($_FILES as $file) {
    $checksum = md5_file($file['tmp_name']);
    if ($_REQUEST['checksum'] !== $checksum) {
        echo json_encode([
            'checksum failed' => 'failed',
            'file checksum' => $checksum,
            'Request' => $_REQUEST,
        ]);
        return;
    }
}

echo json_encode([
    'FILES' => count($_FILES),
    'REQUEST' => $_REQUEST,
]);
