<?php

class User
{
    private $conn;
    private $table_name = "users";

    public function __construct($db)
    {
        $this->conn = $db->conn;
    }

    public function create($username, $password): bool
    {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        
        // Uso dei Prepared Statements (SICUREZZA)
        $stmt = $this->conn->prepare("INSERT INTO " . $this->table_name . " (username, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $username, $hashedPassword);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function login($username, $password): bool
    {
        $stmt = $this->conn->prepare("SELECT username, password FROM " . $this->table_name . " WHERE username = ? LIMIT 1");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            
            if (password_verify($password, $row["password"])) {
                return true;
            }
        }
        
        return false;
    }
}
?>