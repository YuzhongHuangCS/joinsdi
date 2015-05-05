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
					$this->output->set_status_header(200);
					return $this->_sendmail($submitID);
				}
			}
		}

		$this->output->set_status_header(403);
	}

	private function _sendmail($submitID) {
		$this->load->library('email');
		$this->load->library('parser');

		$data = $this->submit->get($submitID);

		$workshop = [];
		foreach(explode(',', $data['workshop']) as $date) {
			$workshop[] = ['date' => $date];
		}
		$data['workshop'] = $workshop;

		$data['avatar'] = 'http://www.idi.zju.edu.cn/joinsdi/download/avatar/' . base64_encode($this->encryption->encrypt($data['avatar'] . '_' . $data['name']));
		$data['apply'] = 'http://www.idi.zju.edu.cn/joinsdi/download/apply/' . base64_encode($this->encryption->encrypt($data['apply'] . '_' . $data['name']));

		$this->email->from('hyzme@zju.edu.cn', '设计创新班2014级招生');
		$this->email->reply_to('sdi2015@163.com');
		$this->email->to($data['email']);
		$this->email->subject('报名表提交成功 - 设计创新班2014级招生');
		$this->email->message($this->parser->parse('mail/submit.html', $data, TRUE));
		return $this->email->send();
	}

}
