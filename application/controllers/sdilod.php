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
		$uploadID = $this->input->get('uploadID', TRUE);
		switch ($action) {
			case 'getDayStat':
				$data = $this->stat->getDayStat();
				$json = urldecode(json_encode($data, JSON_NUMERIC_CHECK));
				$this->output->set_content_type('application/json; charset=utf-8');
				$this->output->set_output($json);
				break;

			case 'getAggrStat':
				$data = $this->stat->getAggrStat();
				$json = urldecode(json_encode($data, JSON_NUMERIC_CHECK));
				$this->output->set_content_type('application/json; charset=utf-8');
				$this->output->set_output($json);
				break;

			case 'getRefer':
 				$data = $this->stat->getRefer();
 				$json = urldecode(json_encode($data, JSON_NUMERIC_CHECK));
				$this->output->set_content_type('application/json; charset=utf-8');
				$this->output->set_output($json);
				break;

			case 'getRawData':
				$data = $this->stat->getRawData();
				$json = urldecode(json_encode($data, JSON_NUMERIC_CHECK));
				$this->output->set_content_type('application/json; charset=utf-8');
				$this->output->set_output($json);
				break;

			case 'getUploadData':
				$data = $this->stat->getUploadData();
				$json = urldecode(json_encode($data, JSON_NUMERIC_CHECK));
				$this->output->set_content_type('application/json; charset=utf-8');
				$this->output->set_output($json);
				break;

			case 'getAvatar':
				$this->load->helper('file');
				
				$fileName = $this->stat->getAvatar($uploadID);
				$path = '/home/joinus/avatar/' . $fileName;

				$info = get_file_info($path);
				$size = $info['size'];

				$encoded_name = rawurlencode($info['name']);
				$mime_type = get_mime_by_extension($encoded_name);
				if ( $mime_type == '' ) {
					$mime_type = 'application/octet-stream';
				}
				header("Content-Type: $mime_type");
				header("Content-Length: $size");
				readfile($path);
				break;

			case 'getApply':
				$this->load->helper('file');
				
				$fileName = $this->stat->getApply($uploadID);
				$path = '/home/joinus/apply/' . $fileName;

				$info = get_file_info($path);
				$size = $info['size'];

				$encoded_name = rawurlencode($info['name']);
				$mime_type = get_mime_by_extension($encoded_name);
				if ( $mime_type == '' ) {
					$mime_type = 'application/octet-stream';
				}
				header("Content-Type: $mime_type");
				header("Content-Length: $size");
				header("Content-Disposition: attachment; filename=\"$encoded_name\"; filename*=utf-8''$encoded_name");
				readfile($path);
				break;
		}
	}
}