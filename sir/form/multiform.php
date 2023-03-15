


<?php 

function filtrele($post) {
    return is_array($post) ? array_map("filtrele", $post) 
    : htmlspecialchars(trim($post));
}

$_POST = array_map("filtrele", $_POST);

function postt($name){
    if(isset($_POST[$name]))
    return $_POST[$name];
}


?>



<form action="" method="post">
    <h3>Giris yap</h3>
    Kullanici adi: <br>
    <input type="text" name="kadi">
    <hr>
    Sifre:<br>
    <input type="password" name="sifre">
    <input type="hidden" name="girisyap" value="1">
    <input type="submit" value="Giris yap">
</form>

<hr>

<form action="" method="post">
    <h3>Register</h3>
    Kullanici adi:<br>
    <input type="text" name="kadi">
    <hr>
    Sifre:<br>
    <input type="password" name="sifre">
    <hr>
    E-posta:<br>
    <input type="text" name="email">
    <input type="hiden" name="kayitol" value="1">
    <input type="submit" value="Giris yap">
</form>