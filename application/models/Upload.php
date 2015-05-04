<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Upload extends CI_Model {

	public function __construct() {
		parent::__construct();
		$this->load->database();
	}

	public function form($visitorID, $row) {
		$sql = 'INSERT INTO `upload`(`visitorID`, `name`, `num`, `birthday`, `gender`, `category`, `major`, `gpa`, `rank`, `phone`, `email`, `dormitory`, `remark`, `social`, `workshop`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
		$data = [$visitorID, $row['name'], $row['num'], $row['birthday'], $row['gender'], $row['category'], $row['major'], $row['gpa'], $row['rank'], $row['phone'], $row['email'], $row['dormitory'], $row['remark'], $row['social'], implode(',', $row['workshop'])];
		$this->db->query($sql, $data);
		return $this->db->insert_id();
	}

	public function avatar($uploadID, $file) {
		$sql = 'UPDATE `upload` SET `avator` = ? WHERE `uploadID` = ?';
		return $this->db->query($sql, [$file, $uploadID]);
	}

	public function apply($uploadID, $file) {
		$sql = 'UPDATE `upload` SET `apply` = ? WHERE `uploadID` = ?';
		return $this->db->query($sql, [$file, $uploadID]);
	}

}
