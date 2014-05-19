<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class download extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('visit');
		$this->load->library('encrypt');
		$this->load->helper('cookie');
	}

	public function index() {
		$rawCookie = $this->input->cookie('vistorID', TRUE);
		$vistorID = $this->encrypt->decode($rawCookie);

		if(is_numeric($vistorID)){
			$this->visit->download($vistorID);
		} else{
			$newVistorID = $this->visit->directDownload();

			$cookie = array(
				'name'   => 'vistorID',
    			'value'  => $this->encrypt->encode($newVistorID),
    			'expire' => '31104000'
			);
			$this->input->set_cookie($cookie);
		}

		header('Location: http://www.idi.zju.edu.cn/joinsdi/paper/2013级设计创新班招生报名表.docx'); 
	}
}