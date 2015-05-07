<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Submit extends CI_Model {

	public function __construct() {
		parent::__construct();
		$this->load->database();
	}

	public function form($visitorID, $row) {
		$sql = 'INSERT INTO `submit`(`visitorID`, `name`, `num`, `birthday`, `gender`, `category`, `major`, `gpa`, `rank`, `phone`, `email`, `dormitory`, `remark`, `social`, `workshop`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
		$data = [$visitorID, $row['name'], intval($row['num']), $row['birthday'], $row['gender'], $row['category'], $row['major'], $row['gpa'], $row['rank'], $row['phone'], $row['email'], $row['dormitory'], $row['remark'], $row['social'], implode(',', $row['workshop'])];
		$this->db->query($sql, $data);
		return $this->db->insert_id();
	}

	public function avatar($ID, $file) {
		$sql = 'UPDATE `submit` SET `avatar` = ? WHERE `ID` = ?';
		return $this->db->query($sql, [$file, $ID]);
	}

	public function apply($ID, $file) {
		$sql = 'UPDATE `submit` SET `apply` = ? WHERE `ID` = ?';
		return $this->db->query($sql, [$file, $ID]);
	}

	public function get($ID) {
		$sql = 'SELECT * FROM `submit` WHERE `ID` = ?';
		return $this->db->query($sql, $ID)->row_array();
	}

	public function query() {
		$sql = 'SELECT * FROM `submit`';
		return $this->db->query($sql)->result_array();
	}

	public function valid() {
		return $this->_checkout(1);
	}

	public function invalid() {
		return $this->_checkout(0);
	}

	private function _checkout($flag) {
		$sql = 'SELECT `submit`.`ID`, `visitorID`, `timestamp`, `name`, `num`, `birthday`, `gender`, `category`, `major`, `gpa`, `rank`, `phone`, `email`, `dormitory`, `remark`, `social`, `workshop`, `avatar`, `apply`, `count`, `first`, `last`, `download`, `refer`, `ua` FROM `submit` LEFT JOIN `visitor` ON `submit`.`visitorID` = `visitor`.`ID` WHERE `valid` = ' . $flag;
		$result =  $this->db->query($sql)->result_array();

		foreach ($result as $index => $submit) {
			$result[$index]['workshop'] = array_map(function($date){
				return $date;
			}, explode(',', $submit['workshop']));
		}

		return $result;
	}

}
