const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
let app = null;

module.exports = {
	start,
	listen
};

function start() {
	if (app) {
		return app;
	}

	app = express();
	app.use(cors());
	app.use(express.static(path.join(__dirname, '..', 'docs')));
	app.use(bodyParser.json());

	return app;
}

function listen(Config, success) {
	const port = Config.Server.port;

	app.listen(port, onListen);

	function onListen() {
		const Route = {
			get,
			post
		};

		success(Route);

		function get(routePath, controller) {
			app.get(routePath, onGet);

			function onGet(req, res) {
				let Data = {};

				Data.Params = req.params;

				controller(Data, successController, failController);

				function successController(Response) {
					res.json({
						successfully: true,
						Response: Response
					});
				}

				function failController(Response) {
					res.json({
						successfully: false,
						Response: Response
					});
				}
			}
		}

		function post(routePath, controller) {
			app.post(routePath, onPost);

			function onPost(req, res) {
				let Data = req.body;

				Data.Params = req.params;

				controller(Data, successController, failController);

				function successController(Response) {
					res.json({
						successfully: true,
						Response: Response
					});
				}

				function failController(Response) {
					res.json({
						successfully: false,
						Response: Response
					});
				}
			}
		}
	}
}