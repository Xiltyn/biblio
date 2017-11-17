const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.prod');

const app = express();
const compiler = webpack(config);
const PORT = process.env.PORT || 3010;

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: '/dist'
}));

app.use('/assets', express.static('./assets'));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, (err) => {
	if (err) {
		console.log('There was an error while listening on the port :: ' + PORT);
		console.log(err);
		return;
	}

	console.log('Listening on port:' + PORT);
});
