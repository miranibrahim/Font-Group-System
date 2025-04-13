<?php
require_once __DIR__ . '/../../config/config.php';

class Database {
    protected $pdo;

    public function __construct() {
        global $pdo;
        $this->pdo = $pdo;
    }
    
    // Add a method to close connection if needed
    public function close() {
        $this->pdo = null;
    }
}