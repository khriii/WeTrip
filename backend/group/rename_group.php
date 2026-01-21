<?php
require_once "../database.php";

try {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!$data) {
        throw new Exception("Invalid JSON");
    }

    $groupId = (int)($data['group_id'] ?? 0);
    if (!$groupId) {
        throw new Exception("Group ID missing");
    }

    $userId = (int)($data['user_id'] ?? 0);
    if (!$userId) {
        throw new Exception("User ID missing");
    }

    $name = trim($data['new_name'] ?? '');
    if ($name === '') {
        throw new Exception("Group name missing");
    }

    $conn->beginTransaction();

    // Verifica che l'utente sia owner del gruppo
    $stmt = $conn->prepare(
        "SELECT role
         FROM USERS_GROUPS
         WHERE id_user = :id_user
           AND id_group = :id_group"
    );
    $stmt->execute([
        'id_user'  => $userId,
        'id_group' => $groupId
    ]);

    $membership = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$membership) {
        throw new Exception("User is not a member of this group");
    }

    if ($membership['role'] !== 'admin') {
        throw new Exception("Not authorized to rename this group");
    }

    // Aggiorna il nome del gruppo
    $stmt = $conn->prepare(
        "UPDATE GROUPS
         SET name = :name
         WHERE id = :id_group"
    );
    $stmt->execute([
        'name'     => $name,
        'id_group' => $groupId
    ]);

    if ($stmt->rowCount() === 0) {
        throw new Exception("Group not found or name unchanged");
    }

    $conn->commit();

    echo json_encode([
        "status"  => "success",
        "message" => "Group renamed successfully"
    ]);

} catch (Exception $e) {
    if ($conn->inTransaction()) {
        $conn->rollBack();
    }

    http_response_code(400);
    echo json_encode([
        "status"  => "error",
        "message" => $e->getMessage()
    ]);
}
