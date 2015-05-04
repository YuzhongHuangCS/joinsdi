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
		$sql = 'UPDATE `submit` SET `avator` = ? WHERE `ID` = ?';
		return $this->db->query($sql, [$file, $ID]);
	}

	public function apply($ID, $file) {
		$sql = 'UPDATE `submit` SET `apply` = ? WHERE `ID` = ?';
		return $this->db->query($sql, [$file, $ID]);
	}

}
