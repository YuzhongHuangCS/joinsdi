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
			$this->output->set_output($this->encryption->encrypt($submitID));
		} else {
			$this->output->set_status_header(403);
		}
	}

	public function avatar() {
		$submitID = $this->encryption->decrypt($this->input->post('submitID'));

		if ($submitID) {
			$config = [
				'upload_path' => FCPATH . '/avatar',
				'allowed_types' => 'jpg|jpeg|png|gif',
				'max_size' => 10240,
				'encrypt_name' => TRUE,
			];
			$this->load->library('upload', $config);

			if ($this->upload->do_upload('file')) {
				if ($this->submit->avatar($submitID, $this->upload->data()['file_name'])) {
					return $this->output->set_status_header(200);
				}
			}
		}

		$this->output->set_status_header(403);
	}

	public function apply() {
		$submitID = $this->encryption->decrypt($this->input->post('submitID'));

		if ($submitID) {
			$config = [
				'upload_path' => FCPATH . '/apply',
				'allowed_types' => 'pdf|zip|rar|7z',
				'max_size' => 102400,
				'encrypt_name' => TRUE,
			];
			$this->load->library('upload', $config);

			if ($this->upload->do_upload('file')) {
				if ($this->submit->apply($submitID, $this->upload->data()['file_name'])) {
					return $this->output->set_status_header(200);
				}
			}
		}

		$this->output->set_status_header(403);
	}
}
