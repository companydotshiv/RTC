<?php
/**
 * RTC Foods - Admin Authentication Helper
 */
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/functions.php';

// Handle Logout
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    unset($_SESSION['admin_logged_in']);
    unset($_SESSION['admin_user']);
    header('Location: ' . url('admin/index.php'));
    exit;
}

// Handle Login Form Submission
$loginError = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['admin_login'])) {
    $username = clean_input($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($username === ADMIN_USERNAME && $password === ADMIN_PASSWORD) {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_user'] = $username;
        header('Location: ' . url('admin/index.php'));
        exit;
    } else {
        $loginError = 'Invalid admin credentials. Please try again.';
    }
}

function require_admin() {
    if (empty($_SESSION['admin_logged_in'])) {
        return false;
    }
    return true;
}
