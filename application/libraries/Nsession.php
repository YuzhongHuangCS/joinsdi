<?php
/**
 * CodeIgniter for SAE
 * Nsession Class
 *
 * @package	CodeIgniter
 * @author Yuzo
 */
defined('BASEPATH') OR exit('No direct script access allowed');

class Nsession {

	public function __construct()
	{
		session_start();
	}

	public function set($key, $value)
	{
		$_SESSION[$key] = $value;
	}

	public function set_data($data)
	{
		foreach ($data as $key => $value) {
			$_SESSION[$key] = $value;
		}
	}

	public function get($key)
	{
		return isset($_SESSION[$key]) ? $_SESSION[$key] : NULL;
	}

	public function exists($key)
	{
		return isset($_SESSION[$key]);
	}

	public function delete($key)
	{
		unset($_SESSION[$key]);
	}

	public function regenerateID($deleteOld = FALSE)
	{
		session_regenerate_id($deleteOld);
	}
}
