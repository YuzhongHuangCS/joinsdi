<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class portal extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('stat');
		date_default_timezone_set('Asia/Shanghai');
	}

	public function index() {		

		$action = $this->input->get('action', TRUE);
		switch ($action) {
			case 'getDayStat':
				$data = $this->stat->getDayStat();
				break;

			case 'getAggrStat':
				$data = $this->stat->getAggrStat();
				break;
			
			case 'getRefer':
 				$data = $this->stat->getRefer();
				break;

			case 'getRawData':
				$data = $this->stat->getRawData();
				break;
			
			default:
				$data = '';
				break;
		}

		$json = urldecode(json_encode($data, JSON_NUMERIC_CHECK));
		$this->output->set_content_type('application/json; charset=utf-8');
		$this->output->set_output($json);
	}
}