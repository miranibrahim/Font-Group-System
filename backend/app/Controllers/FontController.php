<?php
require_once __DIR__ . '/../Models/Font.php';
require_once __DIR__ . '/../Core/BaseController.php';

class FontController extends BaseController
{
    private $fontModel;
    private $cloudinary;

    public function __construct()
    {
        $this->fontModel = new Font();
        // Import Cloudinary instance
        $this->cloudinary = require_once __DIR__ . '/../../config/cloudinary.php';
    }

    // List all fonts
    public function listFonts()
    {
        $this->sendResponse($this->fontModel->getAllFonts());
    }

    // Upload Fonts
    public function uploadFont()
    {
        if (!isset($_FILES['font'])) {
            $this->sendError('No file uploaded');
            return;
        }

        $fontName = $_FILES['font']['name'];
        $tmpPath = $_FILES['font']['tmp_name'];

        // First check if font already exists in database
        $fontExists = $this->fontModel->checkFontExists($fontName);
        if ($fontExists) {
            $this->sendError('Font with this name already exists');
            return;
        }

        try {
            // Separate file name and extension
            $filenameWithoutExt = pathinfo($fontName, PATHINFO_FILENAME);
            $extension = pathinfo($fontName, PATHINFO_EXTENSION);

            // Replace spaces with underscores in the filename
            $filenameWithoutExt = str_replace(' ', '_', $filenameWithoutExt);

            // Upload to Cloudinary 
            $uploadResult = $this->cloudinary->uploadApi()->upload($tmpPath, [
                'resource_type' => 'raw',
                'folder' => 'fonts',
                'public_id' => $filenameWithoutExt . '.' . $extension,
                'use_filename' => true
            ]);

            $cloudinaryUrl = $uploadResult['secure_url'];
            $publicId = $uploadResult['public_id'];

            // Save to database with both URL and public_id
            $result = $this->fontModel->uploadFont($fontName, $cloudinaryUrl, $publicId);
            if ($result['success']) {
                $this->sendResponse([
                    'success' => 'Font uploaded to Cloudinary',
                    'id' => $result['id'],
                    'url' => $cloudinaryUrl
                ]);
            } else {
                // If database insertion fails, delete from Cloudinary
                $this->cloudinary->uploadApi()->destroy($publicId, ['resource_type' => 'raw']);
                $this->sendError($result['error']);
            }
        } catch (Exception $e) {
            $this->sendError('Cloudinary upload failed: ' . $e->getMessage());
        }
    }

    // Delete a single font
    public function deleteFont($id)
    {
        // Get font details first to get the public_id
        $font = $this->fontModel->getFontById($id);
        if (!$font) {
            $this->sendError('Font not found');
            return;
        }

        try {
            // Delete from Cloudinary using the stored public_id
            if (!empty($font['public_id'])) {
                $this->cloudinary->uploadApi()->destroy($font['public_id'], ['resource_type' => 'raw']);
            }

            // Delete from database
            $result = $this->fontModel->deleteFont($id);

            if ($result) {
                $this->sendResponse(['success' => 'Font deleted from database and Cloudinary']);
            } else {
                $this->sendError('Failed to delete font from database');
            }
        } catch (Exception $e) {
            $this->sendError('Error during deletion: ' . $e->getMessage());
        }
    }
}
