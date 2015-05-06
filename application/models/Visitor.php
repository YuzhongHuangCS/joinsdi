<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Visitor extends CI_Model {

	public function __construct() {
		parent::__construct();
		$this->load->database();
	}

	public function create($refer, $ua) {
		$sql = 'INSERT INTO `visitor`(`refer`, `ua`) VALUES (?, ?)';
		$this->db->query($sql, [$refer, $ua]);

		return $this->db->insert_id();
	}

	public function again($ID) {
		$sql = 'UPDATE `visitor` SET `count` = count + 1, `last` = CURRENT_TIMESTAMP WHERE `ID` = ?';
		return $this->db->query($sql, $ID);
	}

	public function download($ID) {
		$sql = 'UPDATE `visitor` SET `download` = CURRENT_TIMESTAMP WHERE `ID` = ?';
		return $this->db->query($sql, $ID);
	}

	public function query() {
		$sql = 'SELECT * FROM `visitor`';
		return $this->db->query($sql)->result_array();
	}

}
