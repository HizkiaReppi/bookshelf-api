import Hapi from '@hapi/hapi';
import routes from './src/routes.js';

const main = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  server.route(routes);
  await server.start();
  console.log('Server Running!');
};

main();
