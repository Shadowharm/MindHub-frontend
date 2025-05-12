import {CreateWorkspace, IUpdateWorkspaceMembersDto, IWorkspace} from '@/types/workspace.types';



import { axiosWithAuth } from '@/api/interceptors';
import {CustomAxiosError, CustomError} from "@/api/customError";


class WorkspaceService {
	private BASE_URL = '/user/workspace'

	async getWorkspaces() {
		const {data} = await axiosWithAuth.get<IWorkspace[]>(this.BASE_URL)
		return data
	}

	async createWorkspace(newWorkspace: CreateWorkspace): Promise<IWorkspace> {
		const { data } = await axiosWithAuth.post(this.BASE_URL, newWorkspace)
		return data
	}

	async getWorkspace(id: string) {
		const { data } = await axiosWithAuth.get<IWorkspace>(`${this.BASE_URL}/${id}`)
		return data
	}

	async updateWorkspace(id: string, data: CreateWorkspace) {
		return await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
	}

	async deleteWorkspace(id: string) {
		return await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
	}

	async toggleWorkspaceMembers(id: string, data: IUpdateWorkspaceMembersDto) {
		try {
			return await axiosWithAuth.put(`${this.BASE_URL}/${id}/toggle-members`, data)
		} catch (e) {
			throw new CustomError(e as CustomAxiosError)
		}
	}
}

export const workspaceService = new WorkspaceService()
