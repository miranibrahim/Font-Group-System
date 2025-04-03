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
        
        // Validate input data
        if (!isset($data['name']) || empty($data['name'])) {
            $this->sendError("Group name is required");
            return;
        }
        
        if (!isset($data['fonts']) || !is_array($data['fonts']) || count($data['fonts']) < 2) {
            $this->sendError("A group must have at least 2 fonts");
            return;
        }
        
        // Check if all font IDs are numeric
        foreach ($data['fonts'] as $fontId) {
            if (!is_numeric($fontId)) {
                $this->sendError("Invalid font ID format");
                return;
            }
        }
        
        $result = $this->groupModel->createGroup($data['name'], $data['fonts']);
        
        if ($result['success']) {
            $this->sendResponse(['success' => 'Font group created', 'id' => $result['id']]);
        } else {
            $this->sendError($result['error']);
        }
    }

    public function deleteGroup($id) {

        $result = $this->groupModel->deleteGroup($id);

        if ($result) {
            $this->sendResponse(['success' => 'Font group deleted']);
        } else {
            $this->sendError('Failed to delete Font group or not Exist.');
        }
    }
}
