<?php

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit("Method Not Allowed");
}

$first_name = trim($_POST["first_name"] ?? '');
$last_name  = trim($_POST["last_name"] ?? '');
$email      = trim($_POST["email"] ?? '');
$phone      = trim($_POST["phone"] ?? '');
$message    = trim($_POST["message"] ?? '');

if (
    empty($first_name) ||
    empty($email) ||
    empty($phone)
) {
    http_response_code(400);
    exit("Please fill required fields");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit("Invalid email");
}

$email = str_replace(["\r", "\n"], '', $email);

$to = "oleksandr.siczynski@twojstartup.pl";
$subject = "New message from BZ-landing-Lodz";

$body = <<<TEXT
Name: $first_name

Last name: $last_name

Email: $email

Phone: $phone

Message:
$message
TEXT;

$headers = [];
$headers[] = "From: no-reply@biznes-zone.com";
$headers[] = "Reply-To: $email";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

$headers_string = implode("\r\n", $headers);

$success = mail(
    $to,
    $subject,
    $body,
    $headers_string
);

if ($success) {
    echo "Success";
} else {
    http_response_code(500);
    echo "Error during sending";
}
?>