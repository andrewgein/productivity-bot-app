import Api from "./Api";

const DATA_DIE_TIME = 5 * 60 * 1000

class StorageManager {
    static instance = null;
    data = {};
    dataFetchTime = {};

    constructor() {
        if (StorageManager.instance != null) {
            return StorageManager.instance;
        }
        StorageManager.instance = this;
        return StorageManager.instance;
    }

    static getInstance() {
        if (!StorageManager.instance) {
            StorageManager.instance = new StorageManager();
        }
        return StorageManager.instance;
    }

    async getOrPut(path, fetcher) {
        const existingData = this.data[path];
        if (existingData && (new Date() - this.dataFetchTime[path] < DATA_DIE_TIME)) {
            return existingData;
        }
        this.data[path] = await fetcher()
        this.dataFetchTime[path] = new Date()
        return this.data[path]
    }

    async getTasks() {
        const tasks = await this.getOrPut("tasks", async () => Api.getTasks())
        return tasks
    }
}

export default StorageManager;
