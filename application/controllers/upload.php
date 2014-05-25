<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class upload extends CI_Controller {

	public function index() {
		$this->load->view('upload.php');
	}
}