<?php
require_once __DIR__ . '/../Core/Database.php';

class Group extends Database {
    public function getAllGroups() {
        $stmt = $this->pdo->query("SELECT * FROM font_groups");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createGroup($name, $fonts) {
        // Check if group name already exists
        $checkNameStmt = $this->pdo->prepare("SELECT id FROM font_groups WHERE name = ?");
        $checkNameStmt->execute([$name]);
        
        if ($checkNameStmt->rowCount() > 0) {
            return ['success' => false, 'error' => 'A group with this name already exists'];
        }
        
        // Check if all font IDs exist
        $fontPlaceholders = implode(',', array_fill(0, count($fonts), '?'));
        $checkFontsStmt = $this->pdo->prepare("SELECT id FROM fonts WHERE id IN ($fontPlaceholders)");
        $checkFontsStmt->execute($fonts);
        
        if ($checkFontsStmt->rowCount() != count($fonts)) {
            return ['success' => false, 'error' => 'One or more font IDs do not exist'];
        }
        
        // Insert group if all checks pass
        $insertStmt = $this->pdo->prepare("INSERT INTO font_groups (name, fonts) VALUES (?, ?)");
        $result = $insertStmt->execute([$name, json_encode($fonts)]);
        
        if ($result) {
            return ['success' => true, 'id' => $this->pdo->lastInsertId()];
        } else {
            return ['success' => false, 'error' => 'Failed to create font group'];
        }
    }

    public function deleteGroup($id) {
        
        $checkStmt = $this->pdo->prepare("SELECT id FROM font_groups WHERE id = ?");
        $checkStmt->execute([$id]);
        
        if ($checkStmt->rowCount() === 0) {
            return false; 
        }
        
        $deleteStmt = $this->pdo->prepare("DELETE FROM font_groups WHERE id = ?");
        return $deleteStmt->execute([$id]);
    }
}
