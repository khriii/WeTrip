<?php
// Controlla che l'utente sia autenticato
require_once "../auth/check.php";

// Include la connessione al database (PDO)
require_once '../database.php';

try {
    // Legge il body della richiesta HTTP (JSON)
    $json = file_get_contents('php://input');

    // Converte il JSON in array associativo
    $data = json_decode($json, true);

    // Avvia una transazione per garantire atomicità
    $conn->beginTransaction();

    // Inserisce un nuovo gruppo nella tabella `groups`
    $stmt = $conn->prepare('INSERT INTO groups (name) VALUES (:name)');
    $stmt->execute([
        'name' => $data['name']
    ]);

    // Recupera l'ID del gruppo appena creato
    $groupId = $conn->lastInsertId();

    // Verifica che l'ID del gruppo sia stato generato correttamente
    if (!$groupId) {
        throw new Exception("Failed to retrieve group ID");
    }

    // Recupera l'utente creatore del gruppo tramite username
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = :username");
    $stmt->execute([
        "username" => $data["username"]
    ]);

    // Ottiene i dati dell'utente
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Se l'utente non esiste, interrompe l'operazione
    if (!$user) {
        throw new Exception("User not found");
    }

    // Inserisce l'utente nel gruppo con il ruolo specificato
    $stmt = $conn->prepare(
        'INSERT INTO users_groups (id_user, id_group, role) 
         VALUES (:id_user, :id_group, :role)'
    );

    $stmt->execute([
        'id_user' => $user['id'],
        'id_group' => $groupId,
        'role' => $data['role']
    ]);

    // Conferma tutte le operazioni sul database
    $conn->commit();

    // Risposta di successo con ID del gruppo creato
    echo json_encode([
        "status" => "success",
        "id_group" => $group_id
    ]);

} catch (Exception $e) {
    // Annulla la transazione se è ancora attiva
    if ($conn->inTransaction()) {
        $conn->rollBack();
    }

    // Risposta di errore
    echo json_encode([
        "status" => "error",
        "message" => "Connection failed: " . $e->getMessage()
    ]);
}
