<?php
// Basic signup form processing
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $fullName = $_POST['fullName'] ?? '';
    $userName = $_POST['userName'] ?? '';
    $email = $_POST['email'] ?? '';
    $passWord = $_POST['passWord'] ?? '';
    $confirmPassword = $_POST['confirmPassword'] ?? '';
    $terms = isset($_POST['terms']);
    
    // Basic validation
    $errors = [];
    
    if (empty($fullName)) {
        $errors[] = "Full name is required";
    }
    
    if (empty($userName) || strlen($userName) < 3) {
        $errors[] = "Username must be at least 3 characters long";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Valid email is required";
    }
    
    if (empty($passWord) || strlen($passWord) < 6) {
        $errors[] = "Password must be at least 6 characters long";
    }
    
    if ($passWord !== $confirmPassword) {
        $errors[] = "Passwords do not match";
    }
    
    if (!$terms) {
        $errors[] = "You must agree to the terms and conditions";
    }
    
    if (empty($errors)) {
        // Hash the password
        $hashedPassword = password_hash($passWord, PASSWORD_DEFAULT);
        
        // Here you would typically save to database
        // For now, we'll just redirect to login
        header('Location: login.html?success=1');
        exit;
    } else {
        // Display errors (in a real app, you'd handle this more elegantly)
        $errorMessage = implode('<br>', $errors);
        echo "<!DOCTYPE html>
        <html>
        <head>
            <title>Signup Error</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .error { color: red; background: #ffebee; padding: 15px; border-radius: 5px; }
                .back-link { margin-top: 15px; }
                a { color: #667eea; text-decoration: none; }
                a:hover { text-decoration: underline; }
            </style>
        </head>
        <body>
            <div class='error'>
                <h3>Signup Failed</h3>
                <p>$errorMessage</p>
            </div>
            <div class='back-link'>
                <a href='signup.html'>← Back to Signup</a>
            </div>
        </body>
        </html>";
    }
} else {
    // If not POST request, redirect to signup form
    header('Location: signup.html');
    exit;
}
?>
