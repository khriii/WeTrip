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
        throw new Exception("Not authorized to delete this group");
    }

    // Elimina STOPS collegati alle città del gruppo
    $stmt = $conn->prepare(
        "DELETE s
         FROM STOPS s
         JOIN CITIES c ON s.id_city = c.id
         WHERE c.id_group = :id_group"
    );
    $stmt->execute(['id_group' => $groupId]);

    // Elimina CITIES
    $stmt = $conn->prepare(
        "DELETE FROM CITIES WHERE id_group = :id_group"
    );
    $stmt->execute(['id_group' => $groupId]);

    // Elimina USERS_GROUPS
    $stmt = $conn->prepare(
        "DELETE FROM USERS_GROUPS WHERE id_group = :id_group"
    );
    $stmt->execute(['id_group' => $groupId]);

    // Elimina GROUPS
    $stmt = $conn->prepare(
        "DELETE FROM GROUPS WHERE id = :id_group"
    );
    $stmt->execute(['id_group' => $groupId]);

    $conn->commit();

    echo json_encode([
        "status"  => "success",
        "message" => "Group deleted successfully"
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
