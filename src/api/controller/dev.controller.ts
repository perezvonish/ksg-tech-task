import {FastifyInstance} from "fastify";

export async function devRoutes(fastify: FastifyInstance) {
    fastify.get('/mock', async (request, reply) => {
        return fastify.userService.createMock();
    });
}
