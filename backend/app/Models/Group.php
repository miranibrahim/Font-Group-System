<?php
require_once __DIR__ . '/../Core/Database.php';

class Group extends Database {
    public function getAllGroups() {
        $stmt = $this->pdo->query("SELECT * FROM font_groups");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createGroup($name, $fonts) {
        $stmt = $this->pdo->prepare("INSERT INTO font_groups (name, fonts) VALUES (?, ?)");
        return $stmt->execute([$name, json_encode($fonts)]);
    }

    public function deleteGroup($id) {
        $stmt = $this->pdo->prepare("DELETE FROM font_groups WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
