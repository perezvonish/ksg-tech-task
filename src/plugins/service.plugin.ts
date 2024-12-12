import fp from 'fastify-plugin';
import {FastifyInstance} from 'fastify';
import {Services} from '../services';

export default fp(async (fastify: FastifyInstance) => {
    fastify.decorate('userService', new Services.UserService());
    fastify.decorate('healthService', new Services.HealthService());
    fastify.decorate('skinportService', new Services.SkiportService());
});

declare module 'fastify' {
    interface FastifyInstance {
        userService: Services.UserService;
        healthService: Services.HealthService;
        skinportService: Services.SkiportService;
    }
}
