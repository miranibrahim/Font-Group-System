<?php
class BaseController {
    protected function sendResponse($data) {
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }

    protected function sendError($message) {
        header('Content-Type: application/json');
        echo json_encode(['error' => $message]);
        exit;
    }
}
