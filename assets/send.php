<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $first_name = htmlspecialchars(trim($_POST["first_name"]));
    $last_name  = htmlspecialchars(trim($_POST["last_name"]));
    $email      = htmlspecialchars(trim($_POST["email"]));
    $phone      = htmlspecialchars(trim($_POST["phone"]));
    $message    = htmlspecialchars(trim($_POST["message"]));

    $to = "oleksandr.siczynski@twojstartup.pl";
    $subject = "New message from BZ-landing";

    $body = "
    Name: $first_name

    Last name: $last_name

    Email: $email

    Phone: $phone

    Message:
    $message
    ";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Success send!";
    } else {
        echo "Error during sending";
    }

} else {
    echo "Fault";
}
?>