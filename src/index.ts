import { Serverlet } from "./app";
import { ProductsRoutes } from "./products/routes";
import { ProductsAdminRoutes } from "./products/admin/routes";
import { AuthRoutes } from "./auth/routes";
import { AdminRoutes } from "./admin/routes";

// https://github.com/feathersjs-ecosystem/feathers-guide/blob/master/examples/chat/server/start/src/app.js

const serverlet = new Serverlet();
const app = serverlet.setup()
    .installRoutingProvider(new AuthRoutes())
    .installRoutingProvider(new AdminRoutes())
    .installRoutingProvider(new ProductsAdminRoutes())
    .installRoutingProvider(new ProductsRoutes())
    .middleware()
    .app;
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise ', p, reason);
});

server.on('listening', () => {
    console.info('Feathers application started on http://%s:%d', app.get('host'), port);
    // console.log('\nRoutes:', Object.keys((<any>app)['services']));
});
