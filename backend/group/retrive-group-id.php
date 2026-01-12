<?php
require_once "../auth/check.php";
require_once '../database.php';

try {
    // legge il body della richiesta JSON
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // prende il nome del gruppo
    if (isset($data['name'])) {
        $groupName = $data['name'];
    } else {
        throw new Exception("Group name missing");
    }

    // prepara la query per trovare l'id del gruppo
    $stmt = $conn->prepare(
        "SELECT id FROM GROUPS WHERE name = :name LIMIT 1"
    );
    $stmt->execute([
        'name' => $groupName
    ]);

    $groupId = $stmt->fetchColumn();

    // restituisce l'id del gruppo
    echo json_encode([
        "status" => "success",
        "id_group" => $groupId
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
