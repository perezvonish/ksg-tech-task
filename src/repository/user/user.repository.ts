import {Entities} from "../../entities";
import {BaseRepository} from "../base.repository";

export class UserRepository extends BaseRepository<Entities.User.UserEntity, Entities.User.Dto.WhereDto, Entities.User.Dto.UpdateDto>{
    tableTitle = "users"

    async getOne(where: Entities.User.Dto.WhereDto): Promise<Entities.User.UserEntity> {
        let sql = `SELECT * FROM ${this.tableTitle}`

        if (where.id) {
            sql = sql + ` WHERE id = ${where.id}`;
        }

        const [user] = await this.postgres.query(sql);
        return user;
    }

    async update(where: Entities.User.Dto.WhereDto, payload: Entities.User.Dto.UpdateDto): Promise<Entities.User.UserEntity> {
        let sql = `UPDATE ${this.tableTitle} SET`

        if (payload.balance) {
            sql = sql + ` balance = ${payload.balance}`
        }

        sql = sql + ` WHERE id = ${where.id}`

        const [user] = await this.postgres.query(sql);
        return user;
    }

    async createMock() {
        const createTableSql = `CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            balance NUMERIC DEFAULT 0,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP, 
            deleted_at TIMESTAMP 
        );`

        await this.postgres.query(createTableSql)

        const sql = `
            INSERT INTO users (balance, created_at, updated_at, deleted_at)
            VALUES ($1, $2, $3, $4)
            RETURNING id, balance, created_at, updated_at, deleted_at;
        `;
        const values = [
            300,
            new Date(),
            null,
            null,
        ];

        const [user] = await this.postgres.query(sql, values);
        return user;
    }
}