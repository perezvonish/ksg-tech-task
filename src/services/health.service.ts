export class HealthService {
    async getHealthStatus() {
        return {
            code: 200,
            status: "Success"
        }
    }
}