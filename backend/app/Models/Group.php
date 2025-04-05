<?php
require_once __DIR__ . '/../Core/Database.php';

class Group extends Database {
    public function getAllGroups() {
        $stmt = $this->pdo->query("SELECT * FROM font_groups");
        $groups = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        foreach ($groups as &$group) {
            $fontIds = json_decode($group['fonts'], true);
            if (is_array($fontIds) && count($fontIds)) {
                $placeholders = implode(',', array_fill(0, count($fontIds), '?'));
                $fontStmt = $this->pdo->prepare("SELECT name FROM fonts WHERE id IN ($placeholders)");
                $fontStmt->execute($fontIds);
                $fontNames = $fontStmt->fetchAll(PDO::FETCH_COLUMN);
                $group['font_names'] = $fontNames;
            } else {
                $group['font_names'] = [];
            }
        }
    
        return $groups;
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

    public function getGroupById($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM font_groups WHERE id = ?");
        $stmt->execute([$id]);
        $group = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($group) {
            $fontIds = json_decode($group['fonts'], true);
            if (is_array($fontIds) && count($fontIds)) {
                $placeholders = implode(',', array_fill(0, count($fontIds), '?'));
                $fontStmt = $this->pdo->prepare("SELECT id, name FROM fonts WHERE id IN ($placeholders)");
                $fontStmt->execute($fontIds);
                $fonts = $fontStmt->fetchAll(PDO::FETCH_ASSOC);
                $group['font_details'] = $fonts;
                $group['font_ids'] = $fontIds;
            } else {
                $group['font_details'] = [];
                $group['font_ids'] = [];
            }
        }
        
        return $group;
    }
    
    public function updateGroup($id, $name, $fonts) {
        // Check if group exists
        $checkGroupStmt = $this->pdo->prepare("SELECT id FROM font_groups WHERE id = ?");
        $checkGroupStmt->execute([$id]);
        
        if ($checkGroupStmt->rowCount() === 0) {
            return ['success' => false, 'error' => 'Group not found'];
        }
        
        // Check if name is taken by another group
        $checkNameStmt = $this->pdo->prepare("SELECT id FROM font_groups WHERE name = ? AND id != ?");
        $checkNameStmt->execute([$name, $id]);
        
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
        
        // Update group if all checks pass
        $updateStmt = $this->pdo->prepare("UPDATE font_groups SET name = ?, fonts = ? WHERE id = ?");
        $result = $updateStmt->execute([$name, json_encode($fonts), $id]);
        
        if ($result) {
            return ['success' => true];
        } else {
            return ['success' => false, 'error' => 'Failed to update font group'];
        }
    }
}
