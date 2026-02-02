<?php
// verifica che l'utente sia autenticato
$suppress_auth_output = true;
require_once "../auth/check.php";

// connessione al database
require_once '../database.php';

try {
    // legge il body della richiesta JSON
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // avvia transazione
    $conn->beginTransaction();

    // prende i dati dal JSON
    if (isset($data['name'])) {
        $cityName = $data['name'];
    } else {
        throw new Exception("City name missing");
    }

    if (isset($data['id_group'])) {
        $groupId = $data['id_group'];
    } else {
        throw new Exception("Group ID missing");
    }

    // inserisce la città nella tabella CITIES
    $stmt = $conn->prepare(
        "INSERT INTO CITIES (name, id_group) VALUES (:name, :id_group)"
    );
    $stmt->execute([
        'name' => $cityName,
        'id_group' => $groupId
    ]);

    // recupera l'id appena creato
    $cityId = $conn->lastInsertId();
    if (!$cityId) {
        throw new Exception("Failed to retrieve city ID");
    }

    // conferma la transazione
    $conn->commit();

    // risposta di successo
    echo json_encode([
        "status" => "success",
        "city_id" => $cityId
    ]);

} catch (Exception $e) {
    // rollback in caso di errore
    if ($conn->inTransaction()) {
        $conn->rollBack();
    }

    // risposta di errore
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
