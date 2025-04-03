<?php
require_once __DIR__ . '/../app/Core/Router.php';
require_once __DIR__ . '/../app/Controllers/FontController.php';
require_once __DIR__ . '/../app/Controllers/GroupController.php';

$fontController = new FontController();
$groupController = new GroupController();

Router::get('/', function() {
    echo json_encode(['message' => 'Welcome to Font Group System API']);
});

Router::get('/fonts', [$fontController, 'listFonts']);
Router::post('/upload-font', [$fontController, 'uploadFont']);
Router::delete('/delete-fonts/:id', function($params) use ($fontController) {
    $fontController->deleteFont($params['id']);
});

Router::get('/groups', [$groupController, 'listGroups']);
Router::post('/create-group', [$groupController, 'createGroup']);
Router::delete('/delete-group/:id', function($params) use ($groupController) {
    $groupController->deleteGroup($params['id']);
});