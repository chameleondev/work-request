<?php
require_once 'PHPMailerAutoload.php';
 

    // //create an instance of PHPMailer
    // $mail = new PHPMailer();

    // // $mail->From = $_POST['inputEmail'];
    // $mail->From = 'dillonlee@live.co.uk';
    // $mail->FromName = 'Employee';
    // $mail->AddAddress('dillon.lee@chameleon-uk.com'); //recipient 
    // $mail->Subject = 'Work request submission';
    // $mail->Body = "Name: Dillon Lee";
    // // $mail->Body = "Name: " . $_POST['inputName'] . "\r\n\r\nMessage: " . stripslashes($_POST['inputMessage']);

    // if (isset($_POST['ref'])) {
    //     $mail->Body .= "\r\n\r\nRef: " . $_POST['ref'];
    // }

    // if(!$mail->send()) {
    //     $data = array('success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
    //     echo json_encode($data);
    //     exit;
    // }

    // $data = array('success' => true, 'message' => 'Thanks! We have received your message.');
    // echo json_encode($data);


$mail = new PHPMailer(); // defaults to using php "mail()"

$body = file_get_contents('email.php');
$body = eregi_replace("[\]",'',$body);

$mail->AddReplyTo("name@yourdomain.com","Dillon Lee");

$mail->SetFrom('name@yourdomain.com', 'Dillon Lee');

$mail->AddReplyTo("name@yourdomain.com","Dillon Lee");

$address = "dillon.lee@chameleon-uk.com";
$mail->AddAddress($address, "The chameleon");

$mail->Subject    = "New job request";

$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test

$mail->MsgHTML(
    "Hi 
    
    <br><br><b>Job Code</b> : ".$_POST['stage1Code']." 

    <br><br><b>Job Type</b> : ".$_POST['stage1Job']."

    <br><br><b>Client</b> : ".$_POST['stage1Client']."

    <br><br><b>Product</b> : ".$_POST['stage1Product']."

    <br><br><b>Product Title</b> : ".$_POST['stage1Title']."

    <br><br><b>Account Person</b> : ".$_POST['stage1Account']."

    <br><br><b>Extra Info</b> : ".$_POST['stage1BugInPap'].", ".$_POST['stage1NbOrInt']."

    <br><br><b>Type of Project</b> : ".$_POST['stage1NewDesProj'].", ".$_POST['stage1NewStudProj'].", ".$_POST['stage1DigProj']."

    <br><br><b>Routing Sheet</b> : ".$_POST['stage1ExistingStudProj']."

    "

    );

// $mail->AddAttachment("images/phpmailer.gif");      // attachment
// $mail->AddAttachment("images/phpmailer_mini.gif"); // attachment

if(!$mail->Send()) {
  echo "Mailer Error: " . $mail->ErrorInfo;
} else {
  echo "Message sent!";
}