import {Type} from "."

interface ServerConfig {
    env: Type.Enums.ServerEnv   
    port: number
}

interface PostgresConfig {
    host: string
    port: number
    user: string
    password: string
    database: string
}

interface RedisConfig {
    host: string
    port: number
    cacheDuration: number
}

interface SkinportConfig {
    apiRoute: string
    apiKey: string
}

export interface ConfigType {
    server: ServerConfig
    postgres: PostgresConfig
    redis: RedisConfig
    skinport: SkinportConfig
}