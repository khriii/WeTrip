<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'database.php';

try {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!isset($data['username']) || !isset($data['password'])) {
      echo json_encode(["status" => "error", "message" => "Username or password missing"]);
      exit();
    }

    $stmt = $conn->prepare('SELECT password FROM users WHERE username = :user');

    $stmt->execute(['user' => $data['username']]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($data['password'], $user['password'])) {
      echo json_encode(["status" => "success"]);
    }

} catch (PDOException $e) {
  echo json_encode(["status" => "error", "message" => "Connection failed: " . $e->getMessage()]);
}
?>
