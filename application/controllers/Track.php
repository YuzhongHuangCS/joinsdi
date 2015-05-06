<?php
defined('BASEPATH') OR exit('No direct script access allowed');

abstract class Track extends CI_Controller {

	public $visitorID = 0;

	public function __construct() {
		parent::__construct();
		$this->load->library('encryption');
		$this->load->library('user_agent');
		$this->load->model('visitor');
		$this->load->helper('url');
		$this->_track();
	}

	private function _track() {
		if (($this->agent->is_browser('MSIE')) && ($this->agent->version() < 10) && uri_string() !== 'bsie' && uri_string() !== 'download') {
			redirect('/bsie/');
		}
		$this->visitorID = $this->encryption->decrypt($this->input->cookie('visitorID'));
		if ($this->visitorID) {
			$this->visitor->again($this->visitorID);
		} else {
			$this->visitorID = $this->visitor->create(trim($this->agent->referrer()), trim($this->agent->agent_string()));
			$this->input->set_cookie('visitorID', $this->encryption->encrypt($this->visitorID), SECONDS_YEAR);
		}
	}

}
