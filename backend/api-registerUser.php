<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

require_once 'database.php';

try {

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!isset($data['username']) && !isset($data['password'])) {
        die(json_encode(["error" => "Username or password not set"]));
    }

    $stmt = $conn->prepare('INSERT INTO users (username, password) VALUES (:user, :pass)');

    $stmt->execute([
        'user' => $data['username'],
        'pass'=> password_hash($data["password"], PASSWORD_DEFAULT)
    ]);

    echo json_encode(["status" => "success"]);

} catch (PDOException $e) {
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
}
?>