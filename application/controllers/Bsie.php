<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH . 'controllers/Track.php');

class Bsie extends Track {

	public function index() {
		$this->load->view('bsie.html');
	}

}
