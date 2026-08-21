<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

$toEmail   = 'Denkowfalo@yandex.ru';
$fromEmail = 'no-reply@logostart26.ru';

if (!empty($_POST['website_hp'])) {
    echo json_encode(['success' => true]);
    exit;
}

$name   = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$phone  = isset($_POST['phone']) ? trim(strip_tags($_POST['phone'])) : '';
$branch = isset($_POST['branch']) ? trim(strip_tags($_POST['branch'])) : '';

if (empty($name) || mb_strlen($name) < 2 || mb_strlen($name) > 50) {
    echo json_encode(['success' => false, 'message' => 'Укажите корректное имя (от 2 до 50 символов).']);
    exit;
}

$phoneDigits = preg_replace('/\D/', '', $phone);
if (empty($phoneDigits) || strlen($phoneDigits) < 10 || strlen($phoneDigits) > 12) {
    echo json_encode(['success' => false, 'message' => 'Введите корректный номер телефона.']);
    exit;
}

$allowedBranches = [
    'Ставрополь (ул. Доваторцев, 32Б)',
    'Михайловск (ул. Почтовая, д.77)'
];
if (!in_array($branch, $allowedBranches, true)) {
    $branch = 'Не указан / Другой';
}

if (empty($_POST['agreement'])) {
    echo json_encode(['success' => false, 'message' => 'Необходимо согласие на обработку персональных данных.']);
    exit;
}


$rawSubject = "Заявка на диагностику: " . $name;
$subject = '=?UTF-8?B?' . base64_encode($rawSubject) . '?=';


$message = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <title>Новая заявка</title>
</head>
<body style='font-family: Arial, sans-serif; color: #333; line-height: 1.5;'>
    <h2>Новая заявка на диагностику</h2>
    <p><strong>Имя:</strong> " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "</p>
    <p><strong>Телефон:</strong> " . htmlspecialchars($phone, ENT_QUOTES, 'UTF-8') . "</p>
    <p><strong>Филиал:</strong> " . htmlspecialchars($branch, ENT_QUOTES, 'UTF-8') . "</p>
    <hr style='border: 0; border-top: 1px solid #ccc;'>
    <p style='font-size: 12px; color: #888;'>Заявка отправлена с сайта logostart26.ru</p>
</body>
</html>";


$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=utf-8\r\n";
$headers .= "From: =?UTF-8?B?" . base64_encode("Логостарт") . "?= <{$fromEmail}>\r\n";
$headers .= "Reply-To: {$fromEmail}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";


if (mail($toEmail, $subject, $message, $headers, "-f" . $fromEmail)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Ошибка при отправке письма.']);
}