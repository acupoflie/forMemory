<?php 


function download($dosya, $limit = 1, $file_uzantilari = null){ 

    $sonuc = [];

    if($dosya['error'] == 4){
        $sonuc['hata'] = "select a file";
    } else { 
        if(is_uploaded_file($dosya['tmp_name'])){
    
            $uzanti = explode('.', $dosya['name']);
            $uzanti = $uzanti[1];
    
            $uzantilar = $file_uzantilari ? $file_uzantilari : [
                'image/jpeg',
                'image/png',
                'image/gif'
            ];
    
            $file_size = (1024 * 1024) * $limit;
            $dosya_uzantisi = $dosya['type'];
    
            if(in_array($dosya_uzantisi, $uzantilar)){
    
                if($file_size >= $dosya['size']){
    
                    $ad = uniqid();
    
                    $yukle = move_uploaded_file($dosya['tmp_name'], $ad . '.' . $uzanti);
    
                    if($yukle) { 
    
                        $sonuc['dosya'] = $ad . '.' . $uzanti;
    
                    } else {
                        $sonuc['hata'] = "fuck off yet";
                    }
    
                } else {
                    $sonuc['hata'] = "file size too";
                }
    
            } else {
                $sonuc['hata'] = "file format wrong";
            }
    
        } else {
            $sonuc['hata'] = 'dosya yuklenmedi'; 
        }
    }

    return $sonuc;
    
}

$sonuc = download($_FILES['dosya']);

if(isset($sonuc['hata'])){
    echo $sonuc['hata'];
} else {
    echo '<a href="' . $sonuc['dosya'] . '">see pic</a>';
}



?>