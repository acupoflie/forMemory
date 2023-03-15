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

if(post('submit')){
    print_r($_POST);
}


?>


<form action="#" method="post" enctype="multipart/form-data">

Ad: <br>
<input type="text" name="ad">
<hr>
Hakkimda:<br>
<textarea name="hakkimda" placeholder="bir seyler yaz" cols="50" rows="5"><?php echo $_POST[post('hakkimda')] ?></textarea>
<hr>
Meslek: <br>
<select name="meslek">
    <option>----   sec   -----</option>
    <option <?php echo $_POST[post('meslek')] == 'web-developer' ? ' selected' : null ?> value="web-developer">Web Developer</option>
    <option <?php echo $_POST[post('meslek')] == "front-end-developer" ? ' selected' : null ?>  value="front-end-developer">Front end developer</option>
    <option <?php echo $_POST[post('meslek')] == "back-end-developer" ? ' selected' : null ?>  value="back-end-developer">Back-end developer</option>
</select>
<hr>
Cinsiyet:<br>
<label>
    Erkek
    <input type="radio" name="cinsiyet" value="erkek">
</label>
<label>
    Kadin
    <input type="radio" name="cinsiyet" value="kadin">
</label>
<hr>
Ilgi alanlar: <br>

<label>
    php
    <input <?php echo post('ilgi_alanlari') && in_array('php', $_POST[post('ilgi_alanlari')]) ? ' checked' : null ?> type="checkbox" name="ilgi_alanlari[]" value="php">
</label>
<label>
    java
    <input <?php echo post('ilgi_alanlari') && in_array('java', $_POST[post('ilgi_alanlari')]) ? ' checked' : null ?> type="checkbox" name="ilgi_alanlari[]" value="java">
</label>
<label>
    web
    <input <?php echo post('ilgi_alanlari') && in_array('web', $_POST[post('ilgi_alanlari')]) ? ' checked' : null ?> type="checkbox" name="ilgi_alanlari[]" value="web">
</label>
<hr>
Fotograf: <br>
<input type="file" name="fotograf">
<hr>
Meslek: <br>
<select name="meslek2[]" multiple>
    <option>----   sec -----</option>
    <option selected value="web-developer">Web Developer</option>
    <option value="front-end-developer">Front end developer</option>
    <option value="back-end-developer">Back-end developer</option>
</select>
<hr>
<input type="hidden" name="submit" value="1">
<input type="submit" name="gonder">

</form>