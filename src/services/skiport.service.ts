import {Configuration} from "../config/config";
import {ItemResponse} from "../api/response";
import {Externals} from "../external";

export class SkiportService {
    private readonly redis = new Externals.RedisService()

    async getPrices() {
        const isCached = await this.redis.getArrayFromList("items")

        if (isCached) {
            return isCached
        }

        const url = `${Configuration.skinport.apiRoute}/items?`

        const responseTradable: ItemResponse[] = await fetch(`${url + new URLSearchParams([['tradable', 'true']])}`, {
            method: 'GET',
            headers: {
                'Accept-Encoding': 'br'
            },

        }).then((result) => result.json()).catch(e => {throw e});

        const responseNonTradable: ItemResponse[] = await fetch(`${url + new URLSearchParams([['tradable', 'false']])}`, {
            method: 'GET',
            headers: {
                'Accept-Encoding': 'br'
            },

        }).then((result) => result.json()).catch(e => {throw e});

        const response = []

        for (let i = 0; i < responseTradable.length; i++) {
            const tradableLot = responseTradable[i]
            const nonTradableLot = responseNonTradable[i]

            const result = {
                marketHashName: tradableLot.market_hash_name,
                minTradable: tradableLot?.min_price,
                minNonTradable: nonTradableLot?.min_price,
            }

            response.push(result)
        }

        await this.redis.setArrayAsList("items", response)

        return response
    }
}