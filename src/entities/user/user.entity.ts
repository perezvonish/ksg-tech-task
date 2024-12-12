export class UserEntity {
    private _id: number;

    private _balance: number;

    private _createdAt: Date;
    private _updatedAt: Date | undefined;
    private _deletedAt: Date | undefined;

    constructor(dto: {
        id: number,
        balance: number
        createdAt: Date
    }) {
        this._id = dto.id;
        this._balance = dto.balance;
        this._createdAt = dto.createdAt
    }

    public get id(): number {
        return this._id;
    }

    public get balance(): number {
        return this._balance;
    }

    public set balance(value: number) {
        this._balance = value;
        this.updateTimestamp();
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public get updatedAt(): Date | undefined {
        return this._updatedAt;
    }

    public get deletedAt(): Date | undefined {
        return this._deletedAt;
    }

    private updateTimestamp(): void {
        this._updatedAt = new Date();
    }
}
