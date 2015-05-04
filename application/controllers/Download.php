<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH . 'controllers/Track.php');

class Download extends Track {

	public function __construct() {
		parent::__construct();
		$this->load->helper('download');
	}

	public function index() {
		$this->visitor->download($this->visitorID);
		force_download(FCPATH . '/static/2014级设计创新班招生报名表.docx');
	}

}
