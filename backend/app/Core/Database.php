<?php
require_once __DIR__ . '/../../config/config.php';

class Database {
    protected $pdo;

    public function __construct() {
        global $pdo;
        $this->pdo = $pdo;
    }
}
