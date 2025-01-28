<?php
function sendEmail($to, $subject, $messageBody) {
    $smtpHost = 'smtp.gmail.com'; // SMTP server
    $smtpPort = 587;             // Port for TLS
    $username = 'bellaghayoussef20@gmail.com'; // Gmail username
    $password = 'rzmrpfuslffwpqyg';    // Gmail app password

    // Create the email headers
    $headers = "From: $username\r\n";
    $headers .= "Reply-To: $username\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Create the email content
    $message = "Subject: $subject\r\n";
    $message .= $headers . "\r\n";
    $message .= "$messageBody\r\n";

    // Connect to the SMTP server
    $connection = fsockopen($smtpHost, $smtpPort, $errno, $errstr, 30);
    if (!$connection) {
        die("Failed to connect to SMTP server: $errstr ($errno)");
    }

    // Communicate with the SMTP server
    fwrite($connection, "EHLO $smtpHost\r\n");
    fwrite($connection, "STARTTLS\r\n");
    stream_socket_enable_crypto($connection, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
    fwrite($connection, "AUTH LOGIN\r\n");
    fwrite($connection, base64_encode($username) . "\r\n");
    fwrite($connection, base64_encode($password) . "\r\n");

    fwrite($connection, "MAIL FROM: <$username>\r\n");
    fwrite($connection, "RCPT TO: <$to>\r\n");
    fwrite($connection, "DATA\r\n");
    fwrite($connection, "$message\r\n.\r\n");
    fwrite($connection, "QUIT\r\n");

    $response = stream_get_contents($connection);
    fclose($connection);

    return strpos($response, '250') !== false ? "Email sent successfully!" : "Failed to send email.";
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $to = $_POST['to'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    echo sendEmail($to, $subject, $message);
}


?>
