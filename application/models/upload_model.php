<?php
class upload_model extends CI_Model {

	public function __construct() {
		$this->load->database();
	}

	public function form($data) {
		$sql = 'INSERT INTO `upload`(`uploadID`, `visitorID`, `timestamp`, `name`, `id`, `birthday`, `campus`, `category`, `major`, `longNum`, `shortNum`, `email`, `dormitory`, `gpa`, `rank`, `date1`, `date2`, `date3`, `date4`, `remarks`, `favorite`) VALUES (NULL, ? , CURRENT_TIMESTAMP, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
		$this->db->query($sql, array($data['visitorID'], $data['name'], $data['id'], $data['birthday'], $data[
			'campus'], $data['category'], $data['major'], $data['longNum'], $data['shortNum'], $data['email'], $data['dormitory'], $data['gpa'], $data['rank'], $data['date1'], $data['date2'], $data['date3'], $data['date3'], $data['date4'], $data['remarks'], $data['favorite']));

		return $this->db->insert_id();
	}

	public function avator($data) {
		$sql = 'UPDATE `upload` SET `avator` = ? WHERE `visitorID` = ?';
		$this->db->query($sql, array());
	}
}