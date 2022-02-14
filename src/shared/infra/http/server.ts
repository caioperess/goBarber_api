import App from './app';

const port = process.env.PORT || process.env.APP_PORT;
const URL = `${process.env.APP_URL}:${port}`;

App.set('port', port);

App.listen(port, () => {
  console.log(`Server is running on ${URL}`);
});
