<?php
// Verifica autenticazione
require_once "../auth/check.php";

// Connessione al database
require_once '../database.php';

try {
    // Legge il json dalla richiesta
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // Avvia una transazione
    $conn->beginTransaction();

    // Recupera l'id del gruppo
    $groupId = $data['group_id'] ?? null;
    if (!$groupId) {
        throw new Exception("Group ID missing");
    }

    // Controlla la presenza dello username
    if (!isset($data['username'])) {
        throw new Exception("Username missing");
    }

    // Recupera l'id dell'utente da rimuovere
    $stmt = $conn->prepare(
        "SELECT id FROM users WHERE username = :username LIMIT 1"
    );
    $stmt->execute([
        'username' => $data['username']
    ]);

    $userId = $stmt->fetchColumn();

    // Verifica che l'utente esista
    if (!$userId) {
        throw new Exception("User not found");
    }

    // Recupera il ruolo dell'utente nel gruppo
    $stmt = $conn->prepare(
        "SELECT role 
         FROM users_groups 
         WHERE id_user = :id_user 
           AND id_group = :id_group
         LIMIT 1"
    );

    $stmt->execute([
        'id_user'  => $userId,
        'id_group' => $groupId
    ]);

    $role = $stmt->fetchColumn();

    // Verifica che l'utente appartenga al gruppo
    if (!$role) {
        throw new Exception("User is not part of the group");
    }

    // Blocca la rimozione se l'utente è admin
    if ($role === 'admin') {
        throw new Exception("Cannot remove an admin from the group");
    }

    // Rimuove l'utente dal gruppo
    $stmt = $conn->prepare(
        "DELETE FROM users_groups 
         WHERE id_user = :id_user 
           AND id_group = :id_group"
    );

    $stmt->execute([
        'id_user'  => $userId,
        'id_group' => $groupId
    ]);

    // Conferma la transazione
    $conn->commit();

    echo json_encode([
        "status"  => "success",
        "message" => "User removed from group"
    ]);

} catch (Exception $e) {
    // Esegue il rollback in caso di errore
    if ($conn->inTransaction()) {
        $conn->rollBack();
    }

    echo json_encode([
        "status"  => "error",
        "message" => $e->getMessage()
    ]);
}
