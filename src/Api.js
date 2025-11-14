import axios from 'axios'
import configData from './config.json';
import $script from 'scriptjs';

const endpoint = axios.create({ 
    baseURL: configData.API_BASE_URL
})

let userId = 1
let body = {}
$script.get('https://st.max.ru/js/max-web-app.js', function() {
	debugger;
	if (window.WebApp.initData) {
		userId = window.WebApp.initDataUnsafe.user.id
	}
})

export default {
    async getTasks() {
        const result = await endpoint.get(`/get-tasks/${userId}` + JSON.stringify(body, null, 2))
        return result.data
    },

    async addTask(task) {
        const result = await endpoint.post("/add-task", { ...task,  userId: userId});
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
