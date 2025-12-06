<?php
$hostname = "localhost";
$username = "root";
$password = "";
$dbname = "wetrip";

try {
  $conn = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
  die(json_encode(["error" => "Connection failed: " . $e->getMessage()]));
}
?>
