<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

function fill($key){
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
		$this->load->view('upload.php');
	}

	public function form(){
		$rawCookie = $this->input->cookie('vistorID', TRUE);
		$vistorID = $this->encrypt->decode($rawCookie);
		if(is_numeric($vistorID)){
			$postData = $this->input->post(NULL, TRUE);
			$postData['visitorID'] = $vistorID;
			$postData['date1'] = fill('date1');
			$postData['date2'] = fill('date2');
			$postData['date3'] = fill('date3');
			$postData['date4'] = fill('date4');
			$postData['remarks'] = fill('remarks');
			$postData['favorite'] = fill('favorite');
			$result = $this->upload_model->form($postData);
		} else{
			//staff to handle the 
		}
		echo('success');
	}
	public function avator(){
		$this->load->helper('form');
		$this->load->helper('url');

		$config['upload_path'] = "../uploads";
  		$config['allowed_types'] = 'gif|jpg|png|jpeg';
  		$config['encrypt_name'] = TRUE;
  		$this->load->library('upload');

  		$this->upload->initialize($config);
  		if(!$this->upload->do_upload("file")){
  			$error = array('error' => $this->upload->display_errors());
   			print_r($error);
  		} else{
  			$data = array('upload_data' => $this->upload->data());
  			print_r($data);
  		}
	}
}