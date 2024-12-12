export class UpdateDto {
    private _balance?: number

    constructor(dto: {
        balance: number
    }) {
        this._balance = dto.balance
    }

    public get balance(): number | undefined {
        return this._balance
    }

    public set balance(balance: number) {
        this._balance = balance
    }
}