<?php
require_once __DIR__ . '/routes.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// For debugging
// echo "Request URI: " . $_SERVER['REQUEST_URI'] . "<br>";
// echo "Request Method: " . $_SERVER['REQUEST_METHOD'] . "<br>";

Router::dispatch($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);