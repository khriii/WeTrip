<?php
require_once "../database.php";

try {
    // legge body JSON
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // validazione input
    if (!isset($data['stop_id'])) {
        throw new Exception("Stop ID missing");
    }

    $stopId = $data['stop_id'];

    // elimina lo stop
    $stmt = $conn->prepare("
        DELETE FROM STOPS WHERE id = :id
    ");
    $stmt->execute([
        'id' => $stopId
    ]);

    if ($stmt->rowCount() === 0) {
        throw new Exception("Stop not found");
    }

    echo json_encode([
        "status" => "success",
        "message" => "Stop removed successfully"
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
