<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sdilod extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->library('encryption');
		$this->load->helper('url');

		$answer = strval(floor(pow(date('Y') * date('n') * date('j'), 2) / date('N')));
		if (uri_string() !== 'sdilod/login' && $this->encryption->decrypt($this->input->cookie('auth')) !== $answer) {
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
				$this->input->set_cookie('auth', $this->encryption->encrypt($answer), 0);
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

}
