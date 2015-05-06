<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sdilod extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->library('nsession');
		$this->load->helper('url');

		if (uri_string() !== 'sdilod/login' && !$this->nsession->exists('auth')) {
			redirect('/sdilod/login/');
		}
	}

	public function index() {
		$this->load->view('sdilod.html');
	}

	public function login() {
		$this->load->library('parser');
		$error = ['error' => []];
		if ($this->input->method() === 'post') {
			$password = $this->input->post('password');
			$answer = strval(floor(pow(date('Y') * date('n') * date('j'), 2) / date('N')));
			if ($password === $answer) {
				$this->nsession->set('auth', 'auth');
				redirect('/sdilod/');
			} else{
				$error = ['error' => [['text' => '密码错误']]];
			}
		}
		$this->parser->parse('login.html', $error);
	}

	public function submit() {
		$this->load->model('submit');
		$this->output->set_json($this->submit->query());
	}

	public function visitor() {
		$this->load->model('visitor');
		$this->output->set_json($this->visitor->query());
	}

	public function avatar($filename) {
		$this->load->helper('download');
		$name = $this->input->get('name');

		if (empty($name)) {
			force_download(FCPATH . '/avatar/' . $filename);
		} else {
			force_download(FCPATH . '/avatar/' . $filename, 'JoinSDI-个人照片-' . $name . '.' . pathinfo($filename, PATHINFO_EXTENSION));
		}
	}

	public function apply($filename) {
		$this->load->helper('download');
		$name = $this->input->get('name');

		if (empty($name)) {
			force_download(FCPATH . '/apply/' . $filename);
		} else {
			force_download(FCPATH . '/apply/' . $filename, 'JoinSDI-报名表-' . $name . '.' . pathinfo($filename, PATHINFO_EXTENSION));
		}
	}

}
