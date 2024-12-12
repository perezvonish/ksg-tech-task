export class WhereDto {
    private _id?: number

    constructor(dto: {
        id: number
    }) {
        this._id = dto.id
    }

    public get id(): number | undefined {
        return this._id
    }

    public set id(id: number) {
        this._id = id
    }
}