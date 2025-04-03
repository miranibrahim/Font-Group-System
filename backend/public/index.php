<?php
require_once __DIR__ . '/../app/Controllers/FontController.php';

$fontController = new FontController();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['upload'])) {
    $fontController->uploadFont();
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['list'])) {
    $fontController->listFonts();
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['delete'])) {
    $fontController->deleteFont($_GET['id']);
} else {
    echo json_encode(['error' => 'Invalid request']);
}
