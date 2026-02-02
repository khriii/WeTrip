<?php
require_once "../database.php";

try {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!isset($data['id'])) {
        throw new Exception("City ID missing");
    }

    $cityId = $data['id'];

    $stmt = $conn->prepare(
        "DELETE FROM CITIES WHERE id = :id"
    );

    $stmt->execute([
        'id' => $cityId
    ]);

    if ($stmt->rowCount() === 0) {
        throw new Exception("City not found");
    }

    echo json_encode([
        "status" => "success",
        "message" => "City and related stops deleted"
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
