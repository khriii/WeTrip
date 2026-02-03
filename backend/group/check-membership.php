<?php
header('Content-Type: application/json');

ob_start();
require_once "../auth/check.php"; 
require_once '../database.php';
ob_end_clean();

try {
    if (!isset($_SESSION['user_id'])) {
        throw new Exception("User not logged in");
    }
    $userId = $_SESSION['user_id'];

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!isset($data['group_id'])) {
        throw new Exception("Group ID missing");
    }

    $groupId = $data['group_id'];

    $stmt = $conn->prepare("SELECT role FROM USERS_GROUPS WHERE id_user = :uid AND id_group = :gid LIMIT 1");
    $stmt->execute([
        'uid' => $userId,
        'gid' => $groupId
    ]);

    $membership = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($membership) {
        echo json_encode([
            "status" => "success",
            "isMember" => true,
            "role" => $membership['role']
        ]);
    } else {
        echo json_encode([
            "status" => "success",
            "isMember" => false
        ]);
    }

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>