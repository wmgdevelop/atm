function AlertService() {
	return {
		success,
		error
	};

	function success(message) {
		show(message, 'success');
	}

	function error(message) {
		show(message, 'error');
	}

	function show(message, type) {
		const alertHtml = `<div class="alert alert-${type}">${message}</div>`;

		document.getElementById('alert').innerHTML = '';
		document.getElementById('alert').innerHTML = alertHtml;
	}
}

export default AlertService;