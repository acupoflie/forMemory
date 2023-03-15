<?php

try {
    $db = new PDO('mysql:host=localhost;dbname=pdo', 'root', '');
} catch (PDOException $e) {
    echo $e;
}



?>