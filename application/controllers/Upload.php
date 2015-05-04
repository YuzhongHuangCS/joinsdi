<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH . 'controllers/Track.php');

class Upload extends Track {

	public function index() {
		$this->load->view('upload.html');
	}

}
