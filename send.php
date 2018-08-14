<?
/*$mail = "sorokin@atkgroup.pro";*/
$mail2 = "drygula.a@gmail.com";

if (isset($_POST['form'])) {
  $message = "";
  if (isset($_POST['title'])) {
    $message .= "<h2>" . $_POST['title'] . "</h2><hr><table>";
  }
  if (isset($_POST['name'])) {
    $message .= "<tr>" . "<td><strong>Имя:</strong></td><td>" . $_POST['name'] . "</td>" . "</tr>" ;
  }
  if (isset($_POST['tel'])) {
    $message .= "<tr>" . "<td><strong>Телефон:</strong></td><td>" . $_POST['tel'] . "</td>" . "</tr>" ;
  }
  if (isset($_POST['description'])) {
    $message .= "<tr>" . "<td><strong>Описание услуги:</strong></td><td>" . $_POST['description'] . "</td>" . "</tr>" ;
  }
  if (isset($_POST['time'])) {
    $message .= "<tr>" . "<td><strong>Время для звонка:</strong></td><td>" . $_POST['time'] . "</td>" . "</tr>" ;
  }
  $message .= "</table>";
  $subject = "Сообщение с сайта " . $_SERVER['SERVER_NAME'];
  $headers = "Content-type: text/html; charset=utf-8 \r\n";
  /*mail($mail, $subject, $message, $headers);*/
  mail($mail2, $subject, $message, $headers);
  echo json_encode(array());
} ?>