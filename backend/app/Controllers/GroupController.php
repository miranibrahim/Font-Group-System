<?php
require_once __DIR__ . '/../Models/Group.php';
require_once __DIR__ . '/../Core/BaseController.php';

class GroupController extends BaseController {
    private $groupModel;

    public function __construct() {
        $this->groupModel = new Group();
    }

    // Getting all group list
    public function listGroups() {
        $this->sendResponse($this->groupModel->getAllGroups());
    }

    // Getting individual group by id
    public function getGroupById($id) {
        $group = $this->groupModel->getGroupById($id);
        
        if ($group) {
            $this->sendResponse($group);
        } else {
            $this->sendError('Group not found');
        }
    }

    // Create function for group
    public function createGroup() {
        $data = json_decode(file_get_contents("php://input"), true);
        
        // Check group name is provided or not
        if (!isset($data['name']) || empty($data['name'])) {
            $this->sendError("Group name is required");
            return;
        }
        
        // Check at leat 2 fonts is uploaded or not
        if (!isset($data['fonts']) || !is_array($data['fonts']) || count($data['fonts']) < 2) {
            $this->sendError("A group must have at least 2 fonts");
            return;
        }

        // insert group into db
        $result = $this->groupModel->createGroup($data['name'], $data['fonts']);
        
        if ($result['success']) {
            $this->sendResponse(['success' => 'Font group created', 'id' => $result['id']]);
        } else {
            $this->sendError($result['error']);
        }
    }

    // Delete Group
    public function deleteGroup($id) {

        // delete from db
        $result = $this->groupModel->deleteGroup($id);

        if ($result) {
            $this->sendResponse(['success' => 'Font group deleted']);
        } else {
            $this->sendError('Failed to delete Font group or not Exist.');
        }
    }

    
    // Update Group
    public function updateGroup($id) {
        $data = json_decode(file_get_contents("php://input"), true);
        
        // Check Group Name is provided or not
        if (!isset($data['name']) || empty($data['name'])) {
            $this->sendError("Group name is required");
            return;
        }
        
        // Check at least 2 fonts are selected or not
        if (!isset($data['fonts']) || !is_array($data['fonts']) || count($data['fonts']) < 2) {
            $this->sendError("A group must have at least 2 fonts");
            return;
        }
        
        // saving to db
        $result = $this->groupModel->updateGroup($id, $data['name'], $data['fonts']);
        
        if ($result['success']) {
            $this->sendResponse(['success' => 'Font group updated']);
        } else {
            $this->sendError($result['error']);
        }
    }
}
