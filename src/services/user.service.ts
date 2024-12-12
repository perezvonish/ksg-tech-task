import {Entities} from "../entities";
import {Repository} from "../repository";

export class UserService {
    private readonly repository = new Repository.User.UserRepository()

    async createMock() {
        await this.repository.createMock()
    }

    async buyItem() {
        const substructCount = 100

        const where = new Entities.User.Dto.WhereDto({
            id: 1
        })

        const user = await this.repository.getOne(where)
        if (!user) {
            throw new Error(`User with id 1 not found.`)
        }

        if (this.validateBalance(user.balance, substructCount)) {
            throw new Error(`User with negative balance.`)
        }

        const updateDto = new Entities.User.Dto.UpdateDto({
            balance: user.balance - substructCount
        })

        try {
            await this.repository.update(where, updateDto)
        } catch (e) {
            throw e
        }

        return await this.repository.getOne(where)
    }

    private validateBalance(balance: number, value: number) {
        return balance >= value;
    }
}