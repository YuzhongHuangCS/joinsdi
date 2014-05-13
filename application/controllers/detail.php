<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class detail extends CI_Controller {

	public function index() {
		$this->load->view('detail.php');
	}
}