<?php
require_once __DIR__ . '/../Models/Font.php';
require_once __DIR__ . '/../Core/BaseController.php';

class FontController extends BaseController {
    private $fontModel;

    public function __construct() {
        $this->fontModel = new Font();
    }

    public function listFonts() {
        echo json_encode($this->fontModel->getAllFonts());
    }

    public function uploadFont() {
        if (!isset($_FILES['font'])) {
            $this->sendError( 'No file uploaded');
            return;
        }
    
        $fontName = $_FILES['font']['name'];
        $fontPath = __DIR__ . '/../../uploads/' . $fontName;
    
        if (move_uploaded_file($_FILES['font']['tmp_name'], $fontPath)) {
            $result = $this->fontModel->uploadFont($fontName, $fontPath);
            
            if ($result['success']) {
                $this->sendResponse(['success' => 'Font uploaded successfully', 'id' => $result['id']]);
            } 
            else {
                if (file_exists($fontPath)) {
                    unlink($fontPath);
                }
                $this->sendError( $result['error']);
            }
        } 
        else {
            $this->sendError( 'Failed to upload font');
        }
    }

    public function deleteFont($id) {
        
        $result = $this->fontModel->deleteFont($id);

        if ($result) {
            $this->sendResponse(['success' => 'Font deleted']);
        } else {
            $this->sendError('Failed to delete font or file not Exist.');
        }
    }
}
