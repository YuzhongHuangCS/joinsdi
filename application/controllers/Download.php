<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Download extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->helper('download');
	}

	public function index() {
		force_download(FCPATH . '/static/2014级设计创新班招生报名表.docx');
	}

}
