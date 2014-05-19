<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class welcome extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('visit');
		$this->load->library('encrypt');
		$this->load->helper('cookie');
		$this->load->library('user_agent');
	}

	public function index() {
		if(($this->agent->is_browser('Internet Explorer')) && ($this->agent->version() <= 8)){
			$this->load->view('bsie.php');
		} else{
			$this->load->view('welcome.php');
		}

		$rawCookie = $this->input->cookie('vistorID', TRUE);
		$vistorID = $this->encrypt->decode($rawCookie);

		if(is_numeric($vistorID)){
			$this->visit->visitAgain($vistorID);
		} else{
			$newVistorID = $this->visit->newVistor();

			$cookie = array(
				'name'   => 'vistorID',
    			'value'  => $this->encrypt->encode($newVistorID),
    			'expire' => '31104000'
			);
			$this->input->set_cookie($cookie);
		}
	}
}