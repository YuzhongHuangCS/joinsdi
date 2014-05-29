<?php
class upload_model extends CI_Model {

	public function __construct() {
		$this->load->database();
	}

	public function form($data) {
		//print_r($data);
		$sql = 'INSERT INTO `upload`(`uploadID`, `visitorID`, `timestamp`, `name`, `num`, `gender`, `birthday`, `category`, `major`, `longNum`, `shortNum`, `email`, `dormitory`, `gpa`, `rank`, `date1`, `date2`, `date3`, `date4`, `remark`, `favorite`) VALUES (NULL, ? , CURRENT_TIMESTAMP, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
		$this->db->query($sql, array($data['visitorID'], $data['name'], $data['num'], $data['gender'], $data['birthday'], $data['category'], $data['major'], $data['longNum'], $data['shortNum'], $data['email'], $data['dormitory'], $data['gpa'], $data['rank'], $data['date1'], $data['date2'], $data['date3'], $data['date4'], $data['remark'], $data['favorite']));

		return $this->db->insert_id();
	}

	public function avatar($data) {
		$sql = 'UPDATE `upload` SET `avator` = ? WHERE `uploadID` = ?';
		$result = $this->db->query($sql, array($data[1], $data[0]));

		return $result;
	}

	public function apply($data) {
		$sql = 'UPDATE `upload` SET `apply` = ? WHERE `uploadID` = ?';
		$result = $this->db->query($sql, array($data[1], $data[0]));

		return $result;
	}

	public function check($uploadID){
		$sql = 'SELECT * FROM `upload` WHERE `uploadID` = ?';
		$result = $this->db->query($sql, $uploadID);

		return $result;
	}
}