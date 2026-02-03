<?php
ob_start();

require_once "../auth/check.php";

require_once '../database.php';


ob_end_clean();

try {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $searchQuery = isset($data['query']) ? trim($data['query']) : '';

    if (empty($searchQuery)) {
        echo json_encode([]);
        exit;
    }

    $stmt = $conn->prepare("SELECT id, username FROM USERS WHERE username LIKE :pattern LIMIT 10");

    $stmt->execute([
        'pattern' => $searchQuery . '%'
    ]);

    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($users);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Connection failed: " . $e->getMessage()
    ]);
}