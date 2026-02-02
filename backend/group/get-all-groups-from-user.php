<?php
// connessione DB
require_once "../database.php";

try {
    // legge body JSON
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // validazione input
    if (!isset($data['user_id'])) {
        throw new Exception("User ID missing");
    }

    $userId = $data['user_id'];

    // query: gruppi + ruolo dell'utente
    $stmt = $conn->prepare("
        SELECT
            g.id,
            g.name,
            ug.role
        FROM USERS_GROUPS ug
        JOIN GROUPS g ON g.id = ug.id_group
        WHERE ug.id_user = :id_user
    ");

    $stmt->execute([
        'id_user' => $userId
    ]);

    $groups = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "groups" => $groups
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
