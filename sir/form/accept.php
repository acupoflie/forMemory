


<?php 

function filtrele($post) {
    return is_array($post) ? array_map("filtrele", $post) 
    : htmlspecialchars(trim($post));
}

$_POST = array_map("filtrele", $_POST);

function post($name){
    if(isset($_POST[$name]))
    return $name;
}

echo post("test");

?>