<?php
require_once 'cors.php';

require_once 'database.php';

try {
    $stmt = $conn->query('SELECT * FROM users');
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);

} catch (PDOException $e) {
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
}
?>
