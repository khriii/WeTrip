<?php
// verifica che l'utente sia autenticato
require_once "../auth/check.php";

// connessione al database
require_once "../database.php";

try {
    // legge il body della richiesta JSON
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // avvia transazione
    $conn->beginTransaction();

    // validazione campi obbligatori
    if (!isset($data['id_city'])) {
        throw new Exception("City ID missing");
    }
    if (!isset($data['name'])) {
        throw new Exception("Stop name missing");
    }
    if (!isset($data['description'])) {
        throw new Exception("Description missing");
    }
    if (!isset($data['price'])) {
        throw new Exception("Price missing");
    }

    $idCity = $data['id_city'];
    $name = $data['name'];
    $description = $data['description'];
    $price = $data['price'];

    // inserisce lo stop nella tabella STOPS
    $stmt = $conn->prepare(
        "INSERT INTO STOPS (id_city, name, description, price)
         VALUES (:id_city, :name, :description, :price)"
    );

    $stmt->execute([
        'id_city' => $idCity,
        'name' => $name,
        'description' => $description,
        'price' => $price
    ]);

    // recupera l'id appena creato
    $stopId = $conn->lastInsertId();
    if (!$stopId) {
        throw new Exception("Failed to retrieve stop ID");
    }

    // conferma la transazione
    $conn->commit();

    // risposta di successo
    echo json_encode([
        "status" => "success",
        "stop_id" => $stopId
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
