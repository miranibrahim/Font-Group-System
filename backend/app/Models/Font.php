<?php
require_once __DIR__ . '/../Core/Database.php';

class Font extends Database {
    public function getAllFonts() {
        $stmt = $this->pdo->query("SELECT * FROM fonts");
        $fonts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        foreach ($fonts as &$font) {
            $font['url'] = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . '/uploads/' . str_replace(' ', '',$font['name']);
        }
    
        return $fonts;
    }
    

    public function uploadFont($name, $path) {
        
        $checkStmt = $this->pdo->prepare("SELECT id FROM fonts WHERE name = ?");
        $checkStmt->execute([$name]);
        
        if ($checkStmt->rowCount() > 0) {
            return ['success' => false, 'error' => 'Font with this name already exists'];
        }
        
        $insertStmt = $this->pdo->prepare("INSERT INTO fonts (name, path) VALUES (?, ?)");
        $result = $insertStmt->execute([$name, $path]);
        
        if ($result) {
            return ['success' => true, 'id' => $this->pdo->lastInsertId()];
        } else {
            return ['success' => false, 'error' => 'Failed to insert font into database'];
        }
    }

    public function deleteFont($id) {

        $checkStmt = $this->pdo->prepare("SELECT id FROM fonts WHERE id = ?");
        $checkStmt->execute([$id]);
        
        if ($checkStmt->rowCount() === 0) {
            return false; 
        }
        
        $deleteStmt = $this->pdo->prepare("DELETE FROM fonts WHERE id = ?");
        return $deleteStmt->execute([$id]);
    }
}
