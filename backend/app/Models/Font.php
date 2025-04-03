<?php
require_once __DIR__ . '/../Core/Database.php';

class Font extends Database {
    public function getAllFonts() {
        $stmt = $this->pdo->query("SELECT * FROM fonts");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function uploadFont($name, $path) {
        $stmt = $this->pdo->prepare("INSERT INTO fonts (name, path) VALUES (?, ?)");
        return $stmt->execute([$name, $path]);
    }

    public function deleteFont($id) {
        $stmt = $this->pdo->prepare("DELETE FROM fonts WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
