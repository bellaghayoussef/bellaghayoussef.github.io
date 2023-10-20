<?php

require  __DIR__ .'/PHPMailer/PHPMailer/PHPMailerAutoload.php';

//Create a new PHPMailer instance
$mail = new PHPMailer;

                $mail->isSMTP();
                $mail->SMTPSecure = "ssl"; 
                $mail->Debugoutput = 'html';
                $mail->Host = "smtp.gmail.com";
                $mail->Port = 465;
                $mail->Username = "bellaghayoussef20@gmail.com";    
                $mail->Password = "rdhs mpeo xdpc okzc";
                $mail->SMTPAuth = true;  



 $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
 $from = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
 $subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_SPECIAL_CHARS);
 $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS);
 






// Set PHPMailer to use the sendmail transport
//$mail->isSendmail();
//Set who the message is to be sent from
$mail->setFrom( $from ,  $name);
//Set an alternative reply-to address

//Set who the message is to be sent to
$mail->addAddress('bellaghayoussef20@gmail.com', 'moi');
//Set the subject line
$mail->Subject =  $subject;
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
// $mail->msgHTML(file_get_contents('contents.html'), dirname(__FILE__));
//Replace the plain text body with one created manually
$mail->AltBody = 'This is a plain-text message body';
//Attach an image file
$mail->Body    = $message ;

//send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else{
    echo "OK";
}
// $mail_message='Dear ';
//                 $mail_message.='Thanks for contacting regarding to forgot password,<br> Your <b>Password</b> is <b></b>'."\r\n";
//                 $mail_message.='<br>Please Update your password.';
//                 $mail_message.='<br>Thanks & Regards';
//                 $mail_message.='<br>Test group of company';

//                 date_default_timezone_set('Etc/UTC');
//                 require 'PHPMailer/PHPMailer/PHPMailerAutoload.php';
//                 $mail = new PHPMailer;
//                 $mail->isSMTP();
//                 $mail->SMTPSecure = "ssl"; 
//                 $mail->Debugoutput = 'html';
//                 $mail->Host = "smtp.gmail.com";
//                 $mail->Port = 465;
//                 $mail->SMTPAuth = true;   
//                 $mail->Username = "bellaghayoussef20@gmail.com";    
//                 $mail->Password = "rdhs mpeo xdpc okzc";
//                 $mail->setFrom('bellaghayoussef@gmail.com', 'Test group of company');
//                 $mail->IsHTML(true);
//                 $mail->addAddress("bellaghayoussef20@gmail.com");
//                 $mail->Subject = 'New password for login';
//                 $mail->Body    = $mail_message;

//                 if (!$mail->send()) {
//                     echo 'Failed to send password, please try again!';
//                     //$this->load->view('branch/forgotPassword', $data);
//                 } else {
//                    echo'Password sent to your email!';
//                   //  $this->load->view('branch/forgotPassword', $data);
//                 }


























// ini_set("SMTP", "smtp.gmail.com");
// ini_set("smtp_port", 587); // Port SMTP pour TLS
// ini_set("sendmail_from", "bellaghayoussef20@gmail.com");

//  $to = 'bellaghayoussef20@gmail.com';
//  $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
//  $from = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
//  $subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_SPECIAL_CHARS);
//  $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS);
 
//  if (filter_var($from, FILTER_VALIDATE_EMAIL)) {
//      $headers = ['From' => ($name?"<$name> ":'').$from,
//              'X-Mailer' => 'PHP/' . phpversion()
//             ];
 
//      mail($to, $subject, $message."\r\n\r\nfrom: ".$_SERVER['REMOTE_ADDR'], $headers);
//      die('OK');
     
//  } else {
//      die('Invalid address');
//  }
?>
