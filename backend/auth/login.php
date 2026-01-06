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

    $stmt = $conn->prepare('SELECT id, username, password FROM users WHERE username = :user');
    $stmt->execute(['user' => $data['username']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($data['password'], $user['password'])) {
        session_start();
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];

        echo json_encode([
            "status" => "success",
            "user" => [
                "id" => $user['id'],
                "username" => $user['username']
            ]
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
    }

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $e->getMessage()]);
}