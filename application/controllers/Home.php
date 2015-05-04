<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH . 'controllers/Track.php');

class Home extends Track {

	public function index() {
		$this->load->view('home.html');
	}

}
