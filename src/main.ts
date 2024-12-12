import fastify from 'fastify'
import ServicePlugin from "./plugins/service.plugin"
import {Configuration} from "./config/config";
import {Controller} from './api/controller';
import {Type} from './type';


const turnLogger = Configuration.server.env == Type.Enums.ServerEnv.local

const server = fastify({ logger: turnLogger });

const start = async () => {
    try {
        await server.register(ServicePlugin);

        await server.register(Controller.healthRoutes);
        await server.register(Controller.skinportRoutes)
        await server.register(Controller.devRoutes)

        const serverPort = Configuration.server.port;

        await server.listen({ port: serverPort });

        console.log(`Server is running at http://localhost:${serverPort}`);

    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
