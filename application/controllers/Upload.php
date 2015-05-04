<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH . 'controllers/Track.php');

class Upload extends Track {

	public function __construct() {
		parent::__construct();
		$this->load->model('submit');
	}

	public function index() {
		$this->load->view('upload.html');
	}

	public function form() {
		$submitID = $this->submit->form($this->visitorID, $this->input->post());

		if ($submitID) {
			$this->output->set_output($submitID);
		} else {
			$this->output->set_status_header(403);
		}
	}

}
