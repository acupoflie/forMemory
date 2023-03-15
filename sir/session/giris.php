
<?php 

    if(isset($_POST['submit'])){
        
        $kadi = $_POST['kadi'];
        $sifre = $_POST['sifre'];

        $_SESSION['zaman'] = time() + 10;
        $_SESSION['kadi'] = $uye['kadi'];

        header('Location:/sir/session');

    }


?>



<form action="" method="post">

Kullanici adi: <br>
<input type="text" name="kadi">
<hr>
Sifre: <br>
<input type="password" name="sifre">
<input type="hidden" name="submit" value="1">
<input type="submit" value="giris">

</form>