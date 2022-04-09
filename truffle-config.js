require('ts-node').register({
	files: true,
});

module.exports = {
	networks: {
		development: {
			host: '127.0.0.1',
			port: '7545',
			network_id: '*',
		},
	},
	// migrations_directory: "migrations-js",
	compilers: {
		solc: {
			version: '0.8.13',
			settings: {
				optimizer: {
					enabled: false,
					runs: 200,
				},
			},
		},
	},
};
