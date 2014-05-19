<?php
class stat extends CI_Model {

	public function __construct() {
		$this->load->database();
	}

	public function getDayStat() {
		$stat = array();

		$startDate = array(
			"Y" => "2014",
			"m" => "05",
			"d" => "16"
		);
		$endDate = array(
			"Y" => date("Y"),
			"m" => date("m"),
			"d" => date("d")
		);

		$stat = array();
		for($d = $startDate['d']; $d <= $endDate['d']; $d++){
			if(strlen($d) == 1){
				$d = '0' . $d;
			}
			$stat[$d]['uv'] = 0;
			$stat[$d]['dl'] = 0;
		}

		$sql = 'SELECT `first`, `download` FROM `vistor`';
		$query = $this->db->query($sql);
		foreach($query->result_array() as $row){
			$today = date("d", strtotime($row['first']));
			$stat[$today]['uv']++;
			if($row['download'] != '0000-00-00 00:00:00'){
				$today = date("d", strtotime($row['download']));
				$stat[$today]['dl']++;
				}
			};
		$query->free_result();

		return $stat;
	}

	public function getAggrStat() {
		$stat = array();

		$sql = 'SELECT SUM(count) AS `totalPV` FROM `vistor`';
		$query = $this->db->query($sql);
		$stat['totalPV'] = $query->result()[0]->totalPV;
		$query->free_result();

		$sql = 'SELECT COUNT(*) AS `totalUV` FROM `vistor`';
		$query = $this->db->query($sql);
		$stat['totalUV'] = $query->result()[0]->totalUV;
		$query->free_result();

		$sql = 'SELECT COUNT(*) AS `totalDL` FROM `vistor` WHERE `download` != "0000-00-00 00:00:00"';
		$query = $this->db->query($sql);
		$stat['totalDL'] = $query->result()[0]->totalDL;
		$query->free_result();
				
		$sql = 'SELECT COUNT(*) AS `todayNewUV` FROM `vistor` WHERE `first` LIKE ?';
		$query = $this->db->query($sql, date("Y-m-d") . '%');
		$stat['todayNewUV'] = $query->result()[0]->todayNewUV;
		$query->free_result();

		$sql = 'SELECT COUNT(*) AS `todayDL` FROM `vistor` WHERE `download` LIKE ?';
		$query = $this->db->query($sql, date("Y-m-d") . '%');
		$stat['todayDL'] = $query->result()[0]->todayDL;
		$query->free_result();

		$sql = 'SELECT COUNT(*) AS `todayUV` FROM `vistor` WHERE `last` LIKE ?';
		$query = $this->db->query($sql, date("Y-m-d") . '%');
		$stat['todayUV'] = $query->result()[0]->todayUV;
		$query->free_result();

		return $stat;
	}

	public function getRefer() {
		$data = array();

		$sql = 'SELECT `refer`, COUNT(*) AS `count` FROM `vistor` GROUP BY `refer` ORDER BY COUNT(*) DESC';
		$query = $this->db->query($sql);

		foreach($query->result_array() as $row){
			foreach ($row as $key => $value) {
				$row[$key] = urlencode($value);
			}
			$data[] = $row;
		}

		$query->free_result();

		return $data;
	}

	public function getRawData() {
		$data = array();

		$sql = 'SELECT * FROM `vistor`';
		$query = $this->db->query($sql);
		foreach($query->result_array() as $row){
			foreach ($row as $key => $value) {
				$row[$key] = urlencode($value);
			}
			$data[] = $row;
		}

		$query->free_result(); 

		return $data;
	}
}