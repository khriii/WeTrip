<?php
require_once "../database.php";

try {
    // legge body JSON
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // validazione input
    if (!isset($data['city_id'])) {
        throw new Exception("City ID missing");
    }

    $cityId = $data['city_id'];

    // query: tutti gli stop della city
    $stmt = $conn->prepare("
        SELECT
            id,
            name,
            description,
            price
        FROM STOPS
        WHERE id_city = :id_city
        ORDER BY id ASC
    ");

    $stmt->execute([
        'id_city' => $cityId
    ]);

    $stops = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "stops" => $stops
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
