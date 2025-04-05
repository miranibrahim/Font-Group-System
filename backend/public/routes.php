<?php
require_once __DIR__ . '/../app/Core/Router.php';
require_once __DIR__ . '/../app/Controllers/FontController.php';
require_once __DIR__ . '/../app/Controllers/GroupController.php';

$fontController = new FontController();
$groupController = new GroupController();

Router::get('/', function() {
    echo json_encode(['message' => 'Welcome to Font Group System API']);
});

// Fonts API
Router::get('/api/fonts', [$fontController, 'listFonts']);
Router::post('/api/upload-font', [$fontController, 'uploadFont']);
Router::delete('/api/delete-font/:id', function($params) use ($fontController) {
    $fontController->deleteFont($params['id']);
});

// Groups API
Router::get('/api/groups', [$groupController, 'listGroups']);
Router::get('/api/group/:id', function($params) use ($groupController) {
    $groupController->getGroupById($params['id']);
});
Router::post('/api/create-group', [$groupController, 'createGroup']);
Router::put('/api/update-group/:id', function($params) use ($groupController) {
    $groupController->updateGroup($params['id']);
});
Router::delete('/api/delete-group/:id', function($params) use ($groupController) {
    $groupController->deleteGroup($params['id']);
});