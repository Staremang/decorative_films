<?
/*
 * @param $filename - String (Путь до файла)
 * @param $date - Array (Данный для занесения)
 *
 */
function printData ($filename, $date) {
    if (file_exists($filename)) {
        $fp = fopen($filename, 'a');
    } else {
        $fp = fopen($filename, 'a');
        fwrite($fp, "\xEF\xBB\xBF");
    }
    fputcsv($fp, $date, ';');
    fclose($fp);
}


function getBody ($title, $body) {
    return '<html>
                <head>
                    <title>'.$title.'</title>
                    <style>
                        table {
                            border-collapse: collapse;
                            border-spacing: 0;
                        }
                        table, td {
                            border: solid 1px black;
                        }
                        td {
                            padding: 3px;
                        }
                        ul {
                            padding-left: 15px;
                            margin: 0;
                        }
                    </style>
                </head>
                <body>
                    '.$body.'
                </body>
            </html>';
}

if( isset($_POST['form-type']) ) {
//    $to       = ""; //Почта получателя
	$to       = "stadia-reklama@yandex.ru, zakaz@stadia-nk.ru, staremang@ya.ru"; //Почта получателя (developer)
    $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
    $headers .= "From: Декоративные пленки <mail@staida-nk.ru>\r\n"; //Наименование и почта отправителя

    $subject = '';
    $message = '';

    $formCheck = true;






    ////////////////////////
    // Заявка на дизайн
    ////////////////////////

    if ($_POST['form-type'] == "design") {

        if ((isset($_POST['name']) && $_POST['name'] != "") && 
			(isset($_POST['email']) && $_POST['email'] != "") &&
            (isset($_POST['tel']) && $_POST['tel'] != "")) {

            $subject = 'Заявка на дизайн';
            $message = '<table>
                            <tr>
                                <td>Имя:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['name']))).'</td>
                            </tr>
                            <tr>
                                <td>E-mail:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['email']))).'</td>
                            </tr>
                            <tr>
                                <td>Телефон:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['tel']))).'</td>
                            </tr>';
			
			if (isset($_POST['msg']) && $_POST['msg'] != "") {
				$message .= '<tr>
                                <td>Сообщение:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['msg']))).'</td>
                            </tr>';
			}
			
			$message .= '</table>';

        } else {
            $formCheck = false;
        }


    ////////////////////////
    // "Узнать подробнее" (с промо-страницы)
    ////////////////////////
    } elseif ($_POST['form-type'] == "film") {

        if ((isset($_POST['name']) && $_POST['name'] != "") && 
			(isset($_POST['email']) && $_POST['email'] != "") &&
            (isset($_POST['tel']) && $_POST['tel'] != "")) {

            $subject = 'Новый заказ';
            $message = '<table>
                            <tr>
                                <td>Имя:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['name']))).'</td>
                            </tr>
                            <tr>
                                <td>E-mail:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['email']))).'</td>
                            </tr>
                            <tr>
                                <td>Телефон:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['tel']))).'</td>
                            </tr>';
			
			if (isset($_POST['msg']) && $_POST['msg'] != "") {
				$message .= '<tr>
                                <td>Сообщение:</td>
                                <td>'.trim(urldecode(htmlspecialchars($_POST['msg']))).'</td>
                            </tr>';
			}
			
			$message .= '</table>';

        } else {
            $formCheck = false;
        }

    } else {
        $formCheck = false;
    }





    if ($formCheck) {

        mail($to, $subject, getBody($subject, $message), $headers);
        echo json_encode(array('sended'=>true, 'type'=>$_POST['form-type'], 'message'=>''));

    } else {

        echo json_encode(array('sended'=>false, 'message'=>'Серверная ошибка. Пните разработчика, он наговнокодил.'));

    }
}



?>