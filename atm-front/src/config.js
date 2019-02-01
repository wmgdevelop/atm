const Config = {
	Api: {
		domain: process.env.NODE_ENV === 'production' ? 'https://atm-server.herokuapp.com' : 'http://localhost:3000'
	}
};

export default Config;