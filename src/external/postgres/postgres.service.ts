import {Pool} from "pg";
import {Configuration} from "../../config/config";

export class PostgresService {
    private readonly pool= new Pool({
        host: Configuration.postgres.host,
        user: Configuration.postgres.user,
        password: Configuration.postgres.password,
        database: Configuration.postgres.database,
        port: Configuration.postgres.port,
    })

    async query(text: string, params?: any[]) {
        const client = await this.pool.connect();

        const result = await client.query(text, params);

        client.release()

        return result.rows;
    };
}