<?php
require_once __DIR__ . '/../Core/Database.php';

class Font extends Database
{
    // Get All fonts
    public function getAllFonts()
    {
        $stmt = $this->pdo->query("SELECT * FROM fonts");
        $fonts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $fonts;
    }

    // Get individual font by id
    public function getFontById($id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM fonts WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Check if font exist or not
    public function checkFontExists($fontName)
    {
        $checkStmt = $this->pdo->prepare("SELECT id FROM fonts WHERE name = ?");
        $checkStmt->execute([$fontName]);
        return $checkStmt->rowCount() > 0;
    }

    // Save fonts data into db
    public function uploadFont($name, $path, $publicId)
    {
        $insertStmt = $this->pdo->prepare("INSERT INTO fonts (name, path, public_id) VALUES (?, ?, ?)");
        $result = $insertStmt->execute([$name, $path, $publicId]);
        if ($result) {
            return ['success' => true, 'id' => $this->pdo->lastInsertId()];
        } else {
            return ['success' => false, 'error' => 'Failed to insert font into database'];
        }
    }

    // Delete font by id
    public function deleteFont($id)
    {
        $checkStmt = $this->pdo->prepare("SELECT id FROM fonts WHERE id = ?");
        $checkStmt->execute([$id]);

        if ($checkStmt->rowCount() === 0) {
            return false;
        }

        $deleteStmt = $this->pdo->prepare("DELETE FROM fonts WHERE id = ?");
        return $deleteStmt->execute([$id]);
    }
}
