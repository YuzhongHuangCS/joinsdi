<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Stat extends CI_Model {

	public function __construct() {
		parent::__construct();
		$this->load->database();
	}

	public function data() {
		$data = [
			'calendar' => $this->calendar(),
			'aggr' => $this->aggr(),
			'refer' => $this->refer(),
		];
		return $data;
	}

	public function calendar() {
		$begin = new DateTime('2015-05-01');
		$end = new DateTime('2015-05-31');
		$today = new DateTime();

		if ($end->diff($today)->format('%r%a') < 0) {
			$end = $today;
		}

		$interval = new DateInterval('P1D');
		$range = new DatePeriod($begin, $interval ,$end);

		$calendar = [];

		foreach ($range as $date) {
			$calendar[$date->format('d')] = [
				'uv' => 0,
				'dl' => 0,
				'up' => 0,
			];
		}

		$sql = 'SELECT `first`, `download` FROM `visitor`';
		$result = $this->db->query($sql)->result_array();
		foreach ($result as $row) {
			$date = new DateTime($row['first']);
			$calendar[$date->format('d')]['uv']++;

			if($row['download'] !== '0000-00-00 00:00:00'){
				$date = new DateTime($row['download']);
				$calendar[$date->format('d')]['dl']++;
			}
		}

		$sql = 'SELECT `timestamp` FROM `submit`';
		$result = $this->db->query($sql)->result_array();
		foreach ($result as $row) {
			$date = new DateTime($row['timestamp']);
			$calendar[$date->format('d')]['up']++;
		}

		$view = [
			'label' => [],
			'uv' => [],
			'dl' => [],
			'up' => [],
		];

		foreach ($calendar as $day => $stat) {
			$view['label'][] = $day;
			$view['uv'][] = $stat['uv'];
			$view['dl'][] = $stat['dl'];
			$view['up'][] = $stat['up'];
		}

		return $view;
	}

	public function aggr() {
		$aggr = [];
		$dateStr = date('Y-m-d');

		$sql = 'SELECT SUM(`count`) AS `totalPV`, COUNT(*) AS `totalUV` FROM `visitor`';
		$result = $this->db->query($sql)->row_array();
		$aggr['totalPV'] = $result['totalPV'];
		$aggr['totalUV'] = $result['totalUV'];

		$sql = 'SELECT COUNT(*) AS `totalDL` FROM `visitor` WHERE `download` != "0000-00-00 00:00:00"';
		$aggr['totalDL'] = $this->db->query($sql)->row_array()['totalDL'];

		$sql = "SELECT COUNT(*) AS `todayNewUV` FROM `visitor` WHERE `first` LIKE '{$dateStr}%'";
		$aggr['todayNewUV'] = $this->db->query($sql)->row_array()['todayNewUV'];


		$sql = "SELECT COUNT(*) AS `todayDL` FROM `visitor` WHERE `download` LIKE '{$dateStr}%'";
		$aggr['todayDL'] = $this->db->query($sql)->row_array()['todayDL'];

		$sql = "SELECT COUNT(*) AS `todayUV` FROM `visitor` WHERE `last` LIKE '{$dateStr}%'";
		$aggr['todayUV'] = $this->db->query($sql)->row_array()['todayUV'];

		return $aggr;
	}

	public function refer() {
		$sql = 'SELECT `refer`, COUNT(*) AS `count` FROM `visitor` GROUP BY `refer` ORDER BY `count` DESC';
		return $this->db->query($sql)->result_array();
	}

}
