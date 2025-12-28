<?php
require_once "../auth/check.php";
require_once '../database.php';

try {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $conn->beginTransaction();

    $stmt = $conn->prepare('INSERT INTO groups (name) VALUES (:name)');
    $stmt->execute([
        'name' => $data['name']
    ]);

    $groupId = $conn->lastInsertId();

    if (!$groupId) {
        throw new Exception("Failed to retrieve group ID");
    }

    $stmt = $conn->prepare("SELECT id FROM users WHERE username = :username");
    $stmt->execute(["username" => $data["username"]]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        throw new Exception("User not found");
    }

    $stmt = $conn->prepare('INSERT INTO users_groups (id_user, id_group, role) VALUES (:id_user, :id_group, :role)');
    $stmt->execute([
        'id_user' => $user['id'],
        'id_group' => $groupId,
        'role' => $data['role']
    ]);

    $conn->commit();

    echo json_encode(["status" => "success"]);

} catch (Exception $e) {
    if ($conn->inTransaction()) {
        $conn->rollBack();
    }
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $e->getMessage()]);
}
?>