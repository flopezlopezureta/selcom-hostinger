<?php
header('Content-Type: text/plain');
require_once 'db.php';
try {
    $db = getDB();
    $stmt = $db->query("DESCRIBE devices");
    echo "Table Structure (devices):\n";
    foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
        echo "Field: {$row['Field']} - Type: {$row['Type']}\n";
    }

    echo "\n\nLast 5 devices updated:\n";
    $stmt = $db->query("SELECT id, name, actuators, model_variant FROM devices ORDER BY updated_at DESC LIMIT 5");
    foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
        echo "ID: {$row['id']} - Name: {$row['name']} - Variant: {$row['model_variant']} - Actuators: " . ($row['actuators'] ?: 'NULL') . "\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>