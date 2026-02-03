<?php
header('Content-Type: application/json');
require_once '../database.php';

try {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!isset($data['groupId'])) {
        throw new Exception("Group ID missing");
    }

    $groupId = (int)$data['groupId'];

    $stmt = $conn->prepare("
        SELECT u.id, u.username, ug.role 
        FROM USERS u
        JOIN USERS_GROUPS ug ON u.id = ug.id_user
        WHERE ug.id_group = :group_id
    ");

    $stmt->execute(['group_id' => $groupId]);
    $members = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "members" => $members
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}