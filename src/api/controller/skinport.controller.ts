import {FastifyInstance} from 'fastify';

export async function skinportRoutes(fastify: FastifyInstance) {
    fastify.get('/prices', async (request, reply) => {
        return fastify.skinportService.getPrices();
    });

    fastify.get('/buy', async (request, reply) => {
        return fastify.userService.buyItem();
    });
}
