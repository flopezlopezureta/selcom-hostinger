<?php
// api/test_db_connection.php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: text/plain');

echo "--- Iniciando Diagnóstico ---\n";

$envPath = __DIR__ . '/.env';
if (!file_exists($envPath)) {
    die("ERROR CRÍTICO: No se encuentra el archivo .env en: $envPath\n");
}
echo "Archivo .env encontrado.\n";

// Cargar .env manualmente para testing
$lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$env = [];
foreach ($lines as $line) {
    if (strpos(trim($line), '#') === 0)
        continue;
    if (strpos($line, '=') !== false) {
        list($key, $value) = explode('=', $line, 2);
        $env[trim($key)] = trim($value);
    }
}

echo "Variables leídas del .env:\n";
echo "DB_HOST: " . ($env['DB_HOST'] ?? 'NO DEFINIDO') . "\n";
echo "DB_NAME: " . ($env['DB_NAME'] ?? 'NO DEFINIDO') . "\n";
echo "DB_USER: " . ($env['DB_USER'] ?? 'NO DEFINIDO') . "\n";
echo "DB_PASS: " . (isset($env['DB_PASS']) ? '***' . substr($env['DB_PASS'], -3) : 'NO DEFINIDO') . "\n";

try {
    $host = $env['DB_HOST'] ?? 'localhost';
    $dbname = $env['DB_NAME'] ?? '';
    $user = $env['DB_USER'] ?? '';
    $pass = $env['DB_PASS'] ?? '';

    echo "\nIntentando conectar a MySQL...\n";
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "¡CONEXIÓN EXITOSA!\n";

    echo "\nVerificando tabla 'users'...\n";
    $stmt = $pdo->query("SELECT count(*) as total FROM users");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "Usuarios encontrados: " . $row['total'] . "\n";

} catch (PDOException $e) {
    echo "\nERROR DE CONEXIÓN: " . $e->getMessage() . "\n";
}
?>