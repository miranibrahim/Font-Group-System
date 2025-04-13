<?php
// Load environment variables
require_once __DIR__ . '/../vendor/autoload.php';

// Check if .env file exists (for local development)
if (file_exists(__DIR__ . '/../.env')) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
    $dotenv->load();
}

// Get environment variables with fallbacks
define('DB_HOST', $_ENV['DB_HOST'] ?? getenv('DB_HOST') ?? 'localhost');
define('DB_USER', $_ENV['DB_USER'] ?? getenv('DB_USER') ?? 'root');
define('DB_PASS', $_ENV['DB_PASS'] ?? getenv('DB_PASS') ?? '');
define('DB_NAME', $_ENV['DB_NAME'] ?? getenv('DB_NAME') ?? 'font_group_system');
define('DB_PORT', $_ENV['DB_PORT'] ?? getenv('DB_PORT') ?? '3306');

// Create PDO connection
function getPDO() {
    try {
        $dsn = "mysql:host=".DB_HOST.";port=".DB_PORT.";dbname=".DB_NAME;
        $pdo = new PDO($dsn, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }
}

// Global PDO connection (only create when needed)
$pdo = getPDO();