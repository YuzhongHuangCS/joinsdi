<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->library('encryption');
		$this->load->library('user_agent');
		$this->load->model('visitor');
	}

	public function index() {
		$visitorID = $this->encryption->decrypt($this->input->cookie('visitorID'));

		if ($visitorID) {
			$this->visitor->again($visitorID);
		} else {
			$visitorID = $this->visitor->create($this->agent->referrer(), $this->agent->agent_string());
			$this->input->set_cookie('visitorID', $visitorID, SECONDS_YEAR);
		}

		$this->load->view('home.html');
	}
}
