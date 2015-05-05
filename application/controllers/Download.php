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

	public function avatar($token) {
		$message = $this->encryption->decrypt(base64_decode($token));
		if ($message) {
			$info = explode('_', $message);
			force_download(FCPATH . '/avatar/' . $info[0], 'JoinSDI-个人照片-' . $info[1] . '.' . pathinfo($info[0], PATHINFO_EXTENSION));
		} else {
			$this->output->set_status_header(403);
		}
	}

	public function apply($token) {
		$message = $this->encryption->decrypt(base64_decode($token));
		if ($message) {
			$info = explode('_', $message);
			force_download(FCPATH . '/apply/' . $info[0], 'JoinSDI-报名表-' . $info[1] . '.' . pathinfo($info[0], PATHINFO_EXTENSION));
		} else {
			$this->output->set_status_header(403);
		}
	}

}
