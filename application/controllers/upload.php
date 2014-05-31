<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

function fill($key){
	global $postData;
	if(!isset($postData[$key])){
		return '';
	} else{
		return $postData[$key];
	}
}
class upload extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('upload_model');
		$this->load->library('encrypt');
		$this->load->helper('cookie');
		$this->load->library('user_agent');
	}

	public function index() {
		if(($this->agent->is_browser('Internet Explorer')) && ($this->agent->version() <= 9)){
			$this->load->view('bsie.php');
		} else{
			$rawCookie = $this->input->cookie('vistorID', TRUE);
			$vistorID = $this->encrypt->decode($rawCookie);
			if(is_numeric($vistorID)){
				$this->load->view('upload.php');
			} else{
				header('Location: http://www.idi.zju.edu.cn/joinsdi/');  
			}
		}
	}

	public function form(){
		$rawCookie = $this->input->cookie('vistorID', TRUE);
		$vistorID = $this->encrypt->decode($rawCookie);

		if(is_numeric($vistorID)){
			global $postData;
			$postData = $this->input->post(NULL, TRUE);
			$postData['visitorID'] = $vistorID;

			$postData['shortNum'] = fill('shortNum');
			$postData['date1'] = fill('date1');
			$postData['date2'] = fill('date2');
			$postData['date3'] = fill('date3');
			$postData['date4'] = fill('date4');
			$postData['remark'] = fill('remark');
			$postData['favorite'] = fill('favorite');
			$uploadID = $this->upload_model->form($postData);

			if($uploadID){
				echo('success');
				$cookie = array(
					'name'   => 'uploadID',
    				'value'  => $this->encrypt->encode($uploadID),
    				'expire' => '31104000'
    			);
				$this->input->set_cookie($cookie);
			} else{
				echo('falied');
			}
		} else{
			header('Location: http://www.idi.zju.edu.cn/joinsdi/');  
		}
	}
	public function avatar(){
		$rawCookie = $this->input->cookie('vistorID', TRUE);
		$vistorID = $this->encrypt->decode($rawCookie);
		if(is_numeric($vistorID)){
			$rawCookie = $this->input->cookie('uploadID', TRUE);
			$uploadID = $this->encrypt->decode($rawCookie);
			if(is_numeric($uploadID)){
				$this->load->helper('form');
				$this->load->helper('url');
				$this->load->library('upload');

				$config['upload_path'] = "../avatar";
  				$config['allowed_types'] = 'gif|jpg|png|jpeg';
  				$config['max_size'] = 10240;
  				$config['encrypt_name'] = TRUE;

  				$this->upload->initialize($config);
  				if(!$this->upload->do_upload("file")){
  					$error = array('error' => $this->upload->display_errors());
   					//print_r($error);
   					echo('failed');
  				} else{
  					$data = array('upload_data' => $this->upload->data());
  					$result = $this->upload_model->avatar(array($uploadID, $data['upload_data']['file_name']));
  					//echo ($result);
  					echo('success');
  				}
			} else{
				header('Location: http://www.idi.zju.edu.cn/joinsdi/');  
			}
		}
		else{
			header('Location: http://www.idi.zju.edu.cn/joinsdi/');  
		}
	}

	public function apply(){
		//print_r($_FILES);
		$rawCookie = $this->input->cookie('vistorID', TRUE);
		$vistorID = $this->encrypt->decode($rawCookie);
		if(is_numeric($vistorID)){
			$rawCookie = $this->input->cookie('uploadID', TRUE);
			$uploadID = $this->encrypt->decode($rawCookie);
			if(is_numeric($uploadID)){
				$this->load->helper('form');
				$this->load->helper('url');
				$this->load->library('upload');

				$config['upload_path'] = "../apply";
  				$config['allowed_types'] = 'pdf|zip|rar|7z';
  				$config['max_size'] = 102400;
  				$config['encrypt_name'] = TRUE;

  				$this->upload->initialize($config);
  				if(!$this->upload->do_upload("file")){
  					$error = array('error' => $this->upload->display_errors());
   					//print_r($error);
   					echo('failed');
  				} else{
  					$data = array('upload_data' => $this->upload->data());
  					$result = $this->upload_model->apply(array($uploadID, $data['upload_data']['file_name']));
  					//echo ($result);
  					echo('success');
  					//send mail
  					
		$info = $this->upload_model->check($uploadID)->result()[0];

  		$this->load->library('email');

  		$config['mailtype'] = 'html';
  		$config['crlf'] = '\r\n';
  		$config['newline'] = '\r\n';
  		$this->email->initialize($config);

  		$this->email->from('joinsdi@www.idi.zju.edu.cn', '设计创新班2013级招生');
  		$this->email->to($info->email);

  		$this->email->subject('设计创新班2013级招生/报名表提交成功');
		$this->email->message('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
			<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
    			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />　　
    			<title>你的报名表已成功提交</title>　
			</head>
			<body>
    			<table border="0" cellpadding="0" cellspacing="0" width="100%">
        		<tr>
            		<img width="180" src="http://www.idi.zju.edu.cn/joinsdi/img/logo.png" style="margin-bottom: 8px;">
        		</tr>
        		<tr>
            		<p style="margin-left: 54px; font-size: 12px; margin-bottom: 24px;">亲爱的 ' . $info->name . ' </p>
            		<p style="margin-left: 54px; font-size: 12px; margin-bottom: 24px;">感谢你参与浙江大学国际设计研究院设计创新班2013级招生。</p>
            		<p style="margin-left: 54px; font-size: 12px; margin-bottom: 24px;">你的报名表已经成功提交</p>
            		<p style="margin-left: 54px; font-size: 12px">你可以通过Entry ID更新你的报名表。在提交更新后的报名表时，填入备注栏中即可。</p>
            		<p style="margin-left: 54px; font-size: 12px">你的Entry ID为: <b>' . $info-> uploadID . '</b></p>
            		<p style="margin-left: 54px; font-size: 12px; margin-bottom: 24px;">请在招生结束前妥善保存此Entry ID。</p>
            		<p style="margin-left: 54px; font-size: 12px">参与WorkShop名单预计将在6月5日公布，请注意保持手机通讯通畅。</p>
            		<p style="margin-left: 54px; font-size: 12px">WorkShop将于6月6日-6月7日举行，请空出自己选择的WorkShop时段。</p>
            		<p style="margin-left: 54px; font-size: 12px; margin-bottom: 24px;">专家面试时间将于WorkShop后公布，请密切关注我们的动态。</p>
            		<p style="margin-left: 54px; font-size: 12px">阅读更多招生信息请登录：</p>
            		<p style="margin-left: 54px; font-size: 12px; margin-bottom: 24px;"><a style="color: #B51F27" href="http://www.idi.zju.edu.cn/joinsdi/">招生官网</a> | <a style="color: #B51F27" href="http://www.renren.com/323343079/profile">人人主页</a></p>
            		<p style="margin-left: 54px; font-size: 12px">如果你有任何疑问，请在我们的交流版面与我们互动。</p>
            		<p style="margin-left: 54px; font-size: 12px">请勿直接回复本邮件，如有疑问可邮件至 <a href="mailto: joinsdi2014@gmail.com" style="color: #B51F27">joinsdi2014@gmail.com</a></p>
            		<p style="margin-left: 54px; font-size: 12px; margin-bottom: 24px;">最后，再次感谢你参与浙江大学国际设计研究院设计创新班2013级招生。</p>
            		<p style="margin-left: 54px; font-size: 12px;">祝好，</p>
            		<p style="margin-left: 54px; font-size: 12px">设计创新班全体成员</p>
        		</tr>
    			</table>
			</body>
			</html>');
		$this->email->set_alt_message('你的报名表已经成功提交');

		$this->email->send();
  				}
			} else{
				header('Location: http://www.idi.zju.edu.cn/joinsdi/');  
			}
		}
		else{
			header('Location: http://www.idi.zju.edu.cn/joinsdi/');  
		}
	}

}
