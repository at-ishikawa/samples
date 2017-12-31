<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

function createFileFromChunks($temp_dir, $fileName, $chunkSize, $totalSize,$total_files) {

    // count all the parts of this file
    $total_files_on_server_size = 0;
    $temp_total = 0;
    foreach(scandir($temp_dir) as $file) {
        $temp_total = $total_files_on_server_size;
        $tempfilesize = filesize($temp_dir.'/'.$file);
        $total_files_on_server_size = $temp_total + $tempfilesize;
    }
    // check that all the parts are present
    // If the Size of all the chunks on the server is equal to the size of the file uploaded.
    if ($total_files_on_server_size >= $totalSize) {
    // create the final destination file
        if (($fp = fopen('temp/'.$fileName, 'w')) !== false) {
            for ($i=1; $i<=$total_files; $i++) {
                fwrite($fp, file_get_contents($temp_dir.'/'.$fileName.'.part'.$i));
            }
            fclose($fp);
        } else {
            return false;
        }

        // rename the temporary directory (to avoid access from other
        // concurrent chunks uploads) and than delete it
        if (rename($temp_dir, $temp_dir.'_UNUSED')) {
            rrmdir($temp_dir.'_UNUSED');
        } else {
            rrmdir($temp_dir);
        }
    }

}

if ($_REQUEST['HTTP_METHOD'] === 'OPTIONS') {
    return;
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if(!(isset($_GET['resumableIdentifier']) && trim($_GET['resumableIdentifier'])!='')){
        $_GET['resumableIdentifier']='';
    }
    $temp_dir = 'temp/'.$_GET['resumableIdentifier'];
    if(!(isset($_GET['resumableFilename']) && trim($_GET['resumableFilename'])!='')){
        $_GET['resumableFilename']='';
    }
    if(!(isset($_GET['resumableChunkNumber']) && trim($_GET['resumableChunkNumber'])!='')){
        $_GET['resumableChunkNumber']='';
    }
    $chunk_file = $temp_dir.'/'.$_GET['resumableFilename'].'.part'.$_GET['resumableChunkNumber'];
    if (file_exists($chunk_file)) {
        header("HTTP/1.0 200 OK");
    } else {
        header("HTTP/1.0 404 Not Found");
    }
    return;
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $errors = [];
    foreach ($_FILES as $file) {
        // check the error status
        if ($file['error'] != 0) {
            $errors[] = 'error '.$file['error'].' in file '.$_POST['resumableFilename'];
            continue;
        }

        // init the destination file (format <filename.ext>.part<#chunk>
        // the file is stored in a temporary directory
        if(isset($_POST['resumableIdentifier']) && trim($_POST['resumableIdentifier'])!=''){
            $temp_dir = 'temp/'.$_POST['resumableIdentifier'];
        }
        $dest_file = $temp_dir.'/'.$_POST['resumableFilename'].'.part'.$_POST['resumableChunkNumber'];

        // create the temporary directory
        if (!is_dir($temp_dir)) {
            mkdir($temp_dir, 0777, true);
        }

        createFileFromChunks($temp_dir, $_POST['resumableFilename'],$_POST['resumableChunkSize'], $_POST['resumableTotalSize'],$_POST['resumableTotalChunks']);
    }
}
