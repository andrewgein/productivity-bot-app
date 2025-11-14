import axios from 'axios'
import configData from './config.json';

const endpoint = axios.create({ 
    baseURL: configData.API_BASE_URL
})
export default {
    async getTasks() {
        const maxId = window.WebAppData.user.id || 87852389
        const result = await endpoint.get(`/get-tasks/${maxId}`)
        return result.data
    },

    async addTask(task) {
        const maxId = window.WebAppData.user.id || 87852389
        const result = await endpoint.post("/add-task", { ...task,  userId: maxId});
        return result.data;
    },

    async updateTask(task) {
        const result = await endpoint.put("/update-task", { ...task })
        return result.data;
    },

    async deleteTask(taskId) {
        return endpoint.post("/delete-task", { taskId: taskId })
    }
}
