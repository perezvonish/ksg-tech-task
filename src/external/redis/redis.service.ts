import Redis from "ioredis";
import {Configuration} from "../../config/config";

export class RedisService {
    private readonly client = new Redis({
        host: Configuration.redis.host,
        port: Configuration.redis.port,
    })

    async setArrayAsList(title: string, data: any[]) {
        const pipeline = this.client.pipeline();
        data.forEach((item) => {
            pipeline.rpush(title, JSON.stringify(item));
        });
        await pipeline.exec();
        await this.client.expire(title, Configuration.redis.cacheDuration); // Установка времени жизни
    }

    async getArrayFromList(title: string) {
        const length = await this.client.llen(title);
        if (length === 0) return [];
        const data = await this.client.lrange(title, 0, -1);
        return data.map((item) => JSON.parse(item));
    }
}