<?php
// Verifica che l'utente sia autenticato
require_once "../auth/check.php";

// Connessione al database
require_once '../database.php';

try {
    // Legge il body della richiesta (JSON)
    $json = file_get_contents('php://input');

    // Decodifica il JSON in array associativo
    $data = json_decode($json, true);

    // Avvia una transazione
    $conn->beginTransaction();

    // Recupera l'ID del gruppo dal payload
    $groupId = $data['group_id'];

    // Controlla che l'ID del gruppo sia presente
    if (!$groupId) {
        throw new Exception("Failed to retrieve group ID");
    }

    // Controlla che lo username sia presente
    if (!isset($data['username'])) {
        throw new Exception("Username missing");
    }

    // Prepara la query per ottenere l'ID dell'utente tramite username
    $stmt = $conn->prepare(
        "SELECT id FROM USERS WHERE username = :username LIMIT 1"
    );

    // Esegue la query con binding del parametro
    $stmt->execute([
        'username' => $data['username']
    ]);

    // Recupera l'ID dell'utente
    $user_id = $stmt->fetchColumn();

    // Se l'utente non esiste, interrompe l'operazione
    if ($user_id === false) {
        throw new Exception("User not found");
    }

    // Prepara l'inserimento dell'utente nel gruppo con un ruolo specifico
    $stmt = $conn->prepare(
        'INSERT INTO USERS_GROUPS (id_user, id_group, role) 
         VALUES (:id_user, :id_group, :role)'
    );

    // Esegue l'inserimento
    $stmt->execute([
        'id_user' => $user_id,
        'id_group' => $groupId,
        'role' => $data['role']
    ]);

    // Conferma la transazione
    $conn->commit();

    // Risposta di successo
    echo json_encode(["status" => "success"]);

} catch (Exception $e) {
    // Annulla la transazione in caso di errore
    if ($conn->inTransaction()) {
        $conn->rollBack();
    }

    // Risposta di errore con messaggio
    echo json_encode([
        "status" => "error",
        "message" => "Connection failed: " . $e->getMessage()
    ]);
}
