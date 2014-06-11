<?php

class mail extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->database();
  		$this->load->library('email');
  		$this->load->library('parser');
	}

	public function index() {
		$sql = 'SELECT * FROM `mymail2`';
		$query = $this->db->query($sql);
  		
  		$config['mailtype'] = 'html';
  		$config['crlf'] = '\r\n';
  		$config['newline'] = '\r\n';

  		foreach ($query->result() as $info) {
  			$content = $this->parser->parse('mail', $info, TRUE);
  			$this->email->initialize($config);
  			$this->email->from('joinsdi@idi.zju.edu.cn', '设计创新班2013级招生');
  			$this->email->to($info->email);

  			$this->email->subject('设计创新班2013级招生/专家面试通知');
			$this->email->message($content);
			$this->email->set_alt_message('设计创新班2013级招生/专家面试通知');

			$this->email->send();
			echo($info->name);
			echo "\n";
			sleep(1);
  		}
	}

	public function test(){
		$this->load->view('mail');
	}
}