import type { ITask, CreateTask } from '@/types/task.types';



import { axiosWithAuth } from '@/api/interceptors';


class TaskService {
	private BASE_URL = '/user/tasks'

	async getTasks(workspaceId: string) {
		return await axiosWithAuth.get<ITask[]>(this.BASE_URL+'?workspaceId='+workspaceId)
	}

	async createTask(data: CreateTask) {
		return await axiosWithAuth.post(this.BASE_URL, data)
	}

	async updateTask(id: string, data: CreateTask) {
		return await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
	}

	async deleteTask(id: string) {
		return await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
	}
}

export const taskService = new TaskService()
