function RequestService($http, Config) {
	return {
		get: get,
		post: post
	};

	function get(route, success, fail) {
		return $http({
			method: 'GET',
			url: Config.Api.domain + '/' + route
		})
			.then(onResponse(success, fail))
			.catch(fail);
	}

	function post(route, Data, success, fail) {
		return $http({
			method: 'POST',
			url: Config.Api.domain + '/' + route,
			data: Data || {}
		})
			.then(onResponse(success, fail))
			.catch(fail);
	}

	function onResponse(success, fail) {
		return (Response) => {
			if (typeof Response !== 'object' || !Response) {
				return fail(Response);
			}
			if (Response.status !== 200) {
				return fail(Response);
			}
			if (typeof Response.data !== 'object' || !Response.data) {
				return fail(Response);
			}
			if (Response.data.successfully !== true) {
				return fail(Response.data.Response);
			}
			return success(Response.data.Response);
		};
	}
}

RequestService.$inject = ['$http', 'Config'];

export default RequestService;