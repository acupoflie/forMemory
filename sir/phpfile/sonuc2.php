<?php

function multi_files($dosyalar){

    $sonuc = [];

    //errors
    foreach($dosyalar['error'] as $index => $error){
        if($error == 4){
            $sonuc['hata'] = "select a file";
        } elseif ($error != 0) {
            $sonuc['hata'][] = "you got a error when upload file #" . $dosyalar['name'][$index];
        }
    }


    //continue if no error
    if(!isset($sonuc['hata'])) {

        //check file mimes
        global $uzantilar;

        foreach($dosyalar['type'] as $index => $type) {
            if(!in_array($type, $uzantilar)) {
                $sonuc['hata'][] = "file type is wrong" . $dosyalar['name'][$index]; 
            }
        }
    }

    //con if no error
    if(!isset($sonuc['hata'])) {

        //check size
        $max_size = (1024 * 1024 * 3);
        foreach($dosyalar['size'] as $index => $size) {
            if($size >= $max_size) {
                $sonuc['hata'][] = "size is so much #" . $dosyalar['name'][$index]; 
            }
        }
    }

    //con if no err
    if(!isset($sonuc['hata'])) {
        
        //move files
        foreach($dosyalar['tmp_name'] as $index => $tmp) {
            $fileName = $dosyalar['name'][$index];
            $yukle = move_uploaded_file($tmp, $fileName);
            if($yukle) {
                $sonuc['dosya'][] = $fileName;
            } else {
                $sonuc['hata'][] = "dosya yuklenemedi # " . $fileName;
            }
        }

    }



    return $sonuc;
}

$uzantilar =  [
    'image/jpeg',
    'image/png'
];

$sonuc = multi_files($_FILES['dosya']);



if(isset($sonuc['dosya'])) { 
    print_r($sonuc['dosya']);
    if(isset($sonuc['hata'])){
        print_r($sonuc['hata']); 
    }
} elseif (isset($sonuc['hata'])) {
    if(is_array($sonuc['hata'])) {
        echo implode('<br>', $sonuc['hata']);
    } else {
        echo $sonuc['hata'];
    }
}

?>
