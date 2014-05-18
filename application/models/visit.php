<?php
class visit extends CI_Model {

	public function __construct() {
		$this->load->database();
	}

	public function visitAgain($vistorID) {
		$sql = 'UPDATE `vistor` SET `count` = count + 1, `last` = CURRENT_TIMESTAMP WHERE `id` = ?';
		$this->db->query($sql, $vistorID);

		return ;
	}

	public function newVistor(){
		$this->load->library('user_agent');

		$sql = 'INSERT INTO `vistor` (`id`, `first`, `refer`, `ua`) VALUES (NULL, CURRENT_TIMESTAMP, ?, ?)';
		$this->db->query($sql, array($this->agent->referrer(), $this->agent->agent_string()));

		return $this->db->insert_id();
	}
}