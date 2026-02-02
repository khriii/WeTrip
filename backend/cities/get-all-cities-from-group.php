<?php
require_once "../database.php";

try {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!isset($data['id_group'])) {
        throw new Exception("Group ID missing");
    }

    $groupId = $data['id_group'];

    $stmt = $conn->prepare("SELECT id, name FROM CITIES WHERE id_group = :id_group ORDER BY id ASC");
    $stmt->execute(['id_group' => $groupId]);
    
    $cities = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["status" => "success", "cities" => $cities]);

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
