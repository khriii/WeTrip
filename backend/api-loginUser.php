<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

require_once 'database.php';

try {

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!isset($data['username']) && !isset($data['password'])) {
        die(json_encode(["error" => "username or password not set"]));
    }

    $stmt = $conn->prepare('SELECT password FROM users WHERE username = :user');

    $stmt->execute([
        'user' => $data['username'],
    ]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);


    if ($user) {
        if (password_verify($data['password'], $user['password'])) {
            echo json_encode(["status" => "success", "message" => "Logged in successfully"]);
        } else{
            echo json_encode(["status" => "error", "message" => "Wrong credentials"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "User not found"]);
    }

} catch (PDOException $e) {
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
}
?>