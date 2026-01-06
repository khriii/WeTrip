<?php
require_once '../cors.php';

// Start the session to check for the user_id
session_start();

header('Content-Type: application/json');

// Set the default response
$response = [
  'isAuthenticated' => false,
  'user' => null
];

if (isset($_SESSION['user_id'])) {
  $response['isAuthenticated'] = true;

  $response['user'] = [
    'id' => $_SESSION['user_id'],
    'username' => $_SESSION['username'] ?? 'User'
  ];
}

echo json_encode($response);