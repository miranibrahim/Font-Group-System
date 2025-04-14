<?php
require_once __DIR__ . '/routes.php';

// Handle CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// For debugging
// echo "Request URI: " . $_SERVER['REQUEST_URI'] . "<br>";
// echo "Request Method: " . $_SERVER['REQUEST_METHOD'] . "<br>";

Router::dispatch($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);