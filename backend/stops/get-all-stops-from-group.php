<?php
require_once "../database.php";

try {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!isset($data['id_group'])) {
        throw new Exception("Group ID missing");
    }

    $groupId = $data['id_group'];

    // Join STOPS with CITIES to filter by group_id
    $sql = "
        SELECT 
            s.id, 
            s.id_city, 
            s.name, 
            s.description, 
            s.price,
            c.name as city_name
        FROM STOPS s
        JOIN CITIES c ON s.id_city = c.id
        WHERE c.id_group = :id_group
        ORDER BY s.id ASC
    ";

    $stmt = $conn->prepare($sql);
    $stmt->execute(['id_group' => $groupId]);
    
    $stops = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["status" => "success", "stops" => $stops]);

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
