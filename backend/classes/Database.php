<?php

class Database
{
    private $hostname = "localhost";
    private $dbname;
    private $username = "root";
    private $password = "";


    public $conn;


    public function __construct($hostname, $dbname, $username, $password)
    {
        $this->hostname = $hostname;
        $this->dbname = $dbname;
        $this->username = $username;
        $this->password = $password;

        $this->connect();
    }

    public function connect()
    {
        $this->conn = new mysqli($this->hostname, $this->username, $this->password, $this->dbname);
    
        $this->checkErrors();
    }

    public function checkErrors()
    {
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function close()
    {
        $this->conn->close();
    }
}

?>