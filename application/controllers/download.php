<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class download extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('visit');
		$this->load->library('encrypt');
		$this->load->helper('cookie');
		$this->load->helper('file');
	}

	public function index() {
		$rawCookie = $this->input->cookie('vistorID', TRUE);
		$vistorID = $this->encrypt->decode($rawCookie);

		if(is_numeric($vistorID)){
			$this->visit->download($vistorID);
		} else{
			$newVistorID = $this->visit->directDownload();

			$cookie = array(
				'name'   => 'vistorID',
    			'value'  => $this->encrypt->encode($newVistorID),
    			'expire' => '31104000'
			);
			$this->input->set_cookie($cookie);
		}

		//force download
		$path = '/home/joinus/wwwfiles/paper/2013级设计创新班招生报名表.docx';
		$info = get_file_info($path);
		$size = $info['size'];
		$encoded_name = rawurlencode($info['name']);
		$mime_type = get_mime_by_extension($encoded_name);
		if ( $mime_type == '' ) {
			$mime_type = 'application/octet-stream';
		}
		header('Pragma: public');
		header('Cache-control: public');
		header("Content-Type: $mime_type");
		header("Content-Disposition: attachment; filename=\"$encoded_name\"; filename*=utf-8''$encoded_name");
		header("Content-Length: $size");
		readfile($path);
	}
}