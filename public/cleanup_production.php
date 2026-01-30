<?php
// cleanup_production.php - Ejecutar para limpiar archivos fuente residuales en el servidor
// SÓLO PARA USO EN EL SERVIDOR DE PRODUCCIÓN

$sourceFiles = [
    'App.tsx',
    'index.tsx',
    'types.ts',
    'package.json',
    'package-lock.json',
    'tsconfig.json',
    'vite.config.ts',
    'tailwind.config.js',
    'postcss.config.js',
    'metadata.json'
];

$sourceDirs = [
    'src',
    'components',
    'services',
    'assets/src'
];

echo "<h3>🧹 Iniciando limpieza de archivos fuente...</h3>";

foreach ($sourceFiles as $file) {
    if (file_exists($file)) {
        if (unlink($file)) {
            echo "✅ Eliminado archivo: $file<br>";
        } else {
            echo "❌ Error al eliminar: $file<br>";
        }
    }
}

function deleteDirectory($dir)
{
    if (!file_exists($dir))
        return true;
    if (!is_dir($dir))
        return unlink($dir);
    foreach (scandir($dir) as $item) {
        if ($item == '.' || $item == '..')
            continue;
        if (!deleteDirectory($dir . DIRECTORY_SEPARATOR . $item))
            return false;
    }
    return rmdir($dir);
}

foreach ($sourceDirs as $dir) {
    if (is_dir($dir)) {
        if (deleteDirectory($dir)) {
            echo "✅ Eliminada carpeta: $dir<br>";
        } else {
            echo "❌ Error al eliminar carpeta: $dir<br>";
        }
    }
}

echo "<h4>✨ Limpieza completada. Intenta recargar el Hub ahora.</h4>";
?>