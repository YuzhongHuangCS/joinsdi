<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class sdilod extends CI_Controller {

	public function index() {
		$this->load->view('sdilod.php');
	}

	public function detail(){
		$this->load->view('detail.php');
	}

	public function portal(){
		$this->load->model('stat');
		date_default_timezone_set('Asia/Shanghai');

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

			case 'getUploadData':
				$data = $this->stat->getUploadData();
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