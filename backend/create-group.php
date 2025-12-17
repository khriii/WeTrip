<?php
require_once "../check.php";
require_once '../database.php';


try{
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $stmt = $conn->prepare('INSERT INTO groups (name) VALUES (:name)');
    
    $stmt->execute([
        'name' => $data['name']
    ]);

    $stmt = $conn->prepare("SELECT id FROM USERS WHERE username = :username");
    $stmt->execute(["username" => $data["username"]]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    $groupId = $conn->lastInsertId();

    $stmt = $conn->prepare('INSERT INTO user_groups (id_user, id_group, role) VALUES (:id_user, :id_group, :role)');
    
    $stmt->execute([
        'id_user' => $user,
        'id_group' => $groupId,
        'role' => $data['role']
    ]);

}catch(PDOException $e){
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $e->getMessage()]);
}

?>