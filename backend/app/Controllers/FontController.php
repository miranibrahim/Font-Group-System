<?php
require_once __DIR__ . '/../Models/Font.php';

class FontController {
    private $fontModel;

    public function __construct() {
        $this->fontModel = new Font();
    }

    public function listFonts() {
        echo json_encode($this->fontModel->getAllFonts());
    }

    public function uploadFont() {
        if (!isset($_FILES['font'])) {
            echo json_encode(['error' => 'No file uploaded']);
            return;
        }

        $fontName = $_FILES['font']['name'];
        $fontPath = '../uploads/' . $fontName;

        if (move_uploaded_file($_FILES['font']['tmp_name'], $fontPath)) {
            $this->fontModel->uploadFont($fontName, $fontPath);
            echo json_encode(['success' => 'Font uploaded successfully']);
        } else {
            echo json_encode(['error' => 'Failed to upload font']);
        }
    }

    public function deleteFont($id) {
        if ($this->fontModel->deleteFont($id)) {
            echo json_encode(['success' => 'Font deleted']);
        } else {
            echo json_encode(['error' => 'Failed to delete font']);
        }
    }
}
