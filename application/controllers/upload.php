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
			$this->load->view('upload.php');
		}
	}

	public function form(){
		$rawCookie = $this->input->cookie('vistorID', TRUE);
		$vistorID = $this->encrypt->decode($rawCookie);

		if(is_numeric($vistorID)){
			global $postData;
			$postData = $this->input->get(NULL, TRUE);
			$postData['visitorID'] = $vistorID;

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