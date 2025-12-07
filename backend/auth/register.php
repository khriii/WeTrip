<?php
require_once '../cors.php';
require_once '../database.php';

header('Content-Type: application/json');

try {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!isset($data['username']) || !isset($data['password'])) {
        echo json_encode(["status" => "error", "message" => "Username or password missing"]);
        exit();
    }

    $stmt = $conn->prepare('INSERT INTO users (username, password) VALUES (:user, :pass)');

    $stmt->execute([
        'user' => $data['username'],
        'pass' => password_hash($data["password"], PASSWORD_DEFAULT)
    ]);

    echo json_encode(["status" => "success"]);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $e->getMessage()]);
}
?>
