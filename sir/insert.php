<?php 
/*
$sorgu = $db->prepare('INSERT INTO dersler SET
baslik = ?,
icerik = ?,
onay = ?');
 
 $ekle = $sorgu->execute([
    'deneme baslik', 'icerik', 1
 ]);

 if($ekle) {
    echo "verileriniz eklendi";
 } else {
    $hata = $sorgu->errorInfo();
    echo 'MySQL error: ' . $hata[2];
 }
    */

    if(isset($_POST['submit'])){
        $baslik = isset($_POST['baslik']) ? $_POST['baslik'] : null;
        $icerik = isset($_POST['icerik']) ? $_POST['icerik'] : null;
        $onay = isset($_POST['onay']) ? $_POST['onay'] : 0;

        if(!$baslik) {
            echo "baslik ekleyin";
        } elseif(!$icerik) {
            echo "icerik ekleyin";
        } else {
           $sorgu = $db->prepare('INSERT INTO dersler SET
           baslik = ?,
           icerik = ?,
           onay = ?');
           
           $ekle = $sorgu->execute([$baslik, $icerik, $onay]);

           if($ekle) {
            header('Location:index.php');
           } else {
            $hata = $sorgu->errorInfo();
            echo "MySQL hatasi: " . $hata[2];
           }
        }
    }
?>





<form action="" method="post">

    Baslik: <br>
    <input type="text" value="<?php echo isset($_POST['baslik']) ? $_POST['baslik'] : ' ' ?>" name="baslik"> <br> <br>

    Icerik: <br>
    <textarea name="icerik" cols="30" rows="10"><?php echo isset($_POST['icerik']) ? $_POST['icerik'] : ' ' ?></textarea> <br> <br>

    Onay: <br>
    <select name="onay">
        <option value="1">Onayli</option>
        <option value="0">Onayli degil</option>
    </select><br> <br>

    <input type="hidden" name="submit" value="1">
    <button type="submit">Gonder</button>
</form>