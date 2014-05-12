<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class welcome extends CI_Controller {

	public function index() {
		$this->load->view('welcome.php');

		$this->load->database();
		$this->load->library('user_agent');
		$this->load->library('encrypt');
		$this->load->helper('cookie');

		$rawCookie = $this->input->cookie('vistorID', TRUE);
		$vistorID = $this->encrypt->decode($rawCookie);

		if(is_numeric($vistorID)){
			$sql = 'UPDATE `vistor` SET `count` = count + 1, `last` = CURRENT_TIMESTAMP WHERE `id` = ?';
			$this->db->query($sql, array($vistorID));
		} else{
			$sql = 'INSERT INTO `vistor` (`id`, `first`, `refer`, `ua`) VALUES (NULL, CURRENT_TIMESTAMP, ?, ?)';
			$this->db->query($sql, array($this->agent->referrer(), $this->agent->agent_string()));

			$cookie = array(
				'name'   => 'vistorID',
    			'value'  => $this->encrypt->encode($this->db->insert_id()),
    			'expire' => '31104000'
			);
			$this->input->set_cookie($cookie);
		}
	}
}