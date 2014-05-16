<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class download extends CI_Controller {

	public function index() {
		$this->load->database();
		$this->load->library('user_agent');
		$this->load->library('encrypt');
		$this->load->helper('cookie');

		$rawCookie = $this->input->cookie('vistorID', TRUE);
		$vistorID = $this->encrypt->decode($rawCookie);

		if(is_numeric($vistorID)){
			$sql = 'UPDATE `vistor` SET `download` = CURRENT_TIMESTAMP WHERE `id` = ?';
			$this->db->query($sql, $vistorID);
		} else{
			$sql = 'INSERT INTO `vistor` (`id`, `first`, `download`, `refer`, `ua`) VALUES (NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?, ?)';
			$this->db->query($sql, array($this->agent->referrer(), $this->agent->agent_string()));

			$cookie = array(
				'name'   => 'vistorID',
    			'value'  => $this->encrypt->encode($this->db->insert_id()),
    			'expire' => '31104000'
			);
			$this->input->set_cookie($cookie);
		}

		header('Location: http://www.idi.zju.edu.cn/joinsdi/paper/%E8%AE%BE%E8%AE%A1%E5%88%9B%E6%96%B0%E7%8F%AD2014%E5%B9%B4%E6%8B%9B%E7%94%9F%E6%8A%A5%E5%90%8D%E8%A1%A8.docx'); 
	}
}