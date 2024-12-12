import {Externals} from "../external"

export abstract class BaseRepository<T, W, G> {
    protected readonly postgres = new Externals.PostgresService()

    abstract tableTitle: string

    abstract getOne(where: W): Promise<T>
    abstract update(where: W, payload: G): Promise<T>
}