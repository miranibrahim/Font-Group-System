<?php
require_once __DIR__ . '/../Models/Group.php';
require_once __DIR__ . '/../Core/BaseController.php';

class GroupController extends BaseController {
    private $groupModel;

    public function __construct() {
        $this->groupModel = new Group();
    }

    public function listGroups() {
        $this->sendResponse($this->groupModel->getAllGroups());
    }

    public function createGroup() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['name']) || !isset($data['fonts']) || count($data['fonts']) < 2) {
            $this->sendError("A group must have at least 2 fonts.");
        }

        $this->groupModel->createGroup($data['name'], $data['fonts']);
        $this->sendResponse(['success' => 'Font group created']);
    }

    public function deleteGroup($id) {
        if ($this->groupModel->deleteGroup($id)) {
            $this->sendResponse(['success' => 'Font group deleted']);
        } else {
            $this->sendError('Failed to delete font group');
        }
    }
}
