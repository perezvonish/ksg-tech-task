import 'dotenv/config'
import {Type} from '../type';
import assert from "node:assert";

function validatePostgresConfig(config: Type.ConfigType) {
    assert.ok(config.postgres.host, "Postgres host does not exists")
    assert.ok(config.postgres.port, "Postgres port does not exists")
    assert.ok(config.postgres.user, "Postgres username does not exists")
    assert.ok(config.postgres.password, "Postgres password does not exists")
    assert.ok(config.postgres.database, "Postgres database-name does not exists")
}

function validateRedisConfig(config: Type.ConfigType) {
    assert.ok(config.redis.host, "Redis host does not exists")
    assert.ok(config.redis.port, "Redis port does not exists")
}

function validateSkinportConfig(config: Type.ConfigType) {
    assert.ok(config.skinport.apiRoute, "Skinport api-route does not exists")
    assert.ok(config.skinport.apiKey, "Skinport api-key does not exists")
}

function generateConfig(): Type.ConfigType {
    const config: Type.ConfigType = {
        server: {
            env: process.env.SERVER_ENV as Type.Enums.ServerEnv ?? Type.Enums.ServerEnv.local,
            port: Number(process.env.SERVER_PORT),
        },
        postgres: {
            host: String(process.env.POSTGRES_HOST),
            port: Number(process.env.POSTGRES_PORT),
            user: String(process.env.POSTGRES_USER),
            password: String(process.env.POSTGRES_PASSWORD),
            database: String(process.env.POSTGRES_DATABASE),
        },
        redis: {
            host: String(process.env.REDIS_HOST),
            port: Number(process.env.REDIS_PORT),
            cacheDuration: Number(process.env.REDIS_CACHE_DURATION ?? 60),
        },
        skinport: {
            apiRoute: String(process.env.SKINPORT_API_ROUTE),
            apiKey: String(process.env.SKINPORT_API_KEY),
        }
    }

    validateRedisConfig(config)
    validateSkinportConfig(config)
    validatePostgresConfig(config)

    return config
}

export const Configuration = generateConfig()