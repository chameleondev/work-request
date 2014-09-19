<?php
require_once 'phpmailer/PHPMailerAutoload.php';



    
    

    //create an instance of PHPMailer
    $mail = new PHPMailer();

    $mail->From = $_POST['inputEmail'];
    $mail->FromName = 'Employee';
    $mail->AddAddress('dillon.lee@chameleon-uk.com'); //recipient 
    $mail->Subject = 'Work request submission';
    $mail->Body = "Name: Dillon Lee";
    // $mail->Body = "Name: " . $_POST['inputName'] . "\r\n\r\nMessage: " . stripslashes($_POST['inputMessage']);

    if (isset($_POST['ref'])) {
        $mail->Body .= "\r\n\r\nRef: " . $_POST['ref'];
    }

    if(!$mail->send()) {
        $data = array('success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
        echo json_encode($data);
        exit;
    }

    $data = array('success' => true, 'message' => 'Thanks! We have received your message.');
    echo json_encode($data);
