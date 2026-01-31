<?php

// Input:
//  groupId

// Output:
//  status
//  groupName

header('Content-Type: application/json');

require_once "../database.php";
require_once "../cors.php";

try {
  $json = file_get_contents('php://input');

  $data = json_decode($json, true);

  // Check if id exists in input
  if (!isset($data['groupId'])) {
        throw new Exception("Group ID is missing");
  }

  $stmt = $conn->prepare('SELECT name FROM GROUPS WHERE id = :groupId');

  $stmt->execute([
      'groupId' => $data['groupId']
  ]);

  $groupName = $stmt->fetchColumn();

  // If id does not exists:
  if ($groupName === false) {
        echo json_encode([
            "status" => "error",
            "message" => "Group not found"
        ]);
        exit;
    }

    // If its all okay
    echo json_encode([
        "status" => "success",
        "groupName" => $groupName
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Connection failed: " . $e->getMessage()
    ]);
}
