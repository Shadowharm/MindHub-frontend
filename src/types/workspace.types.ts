import { IBase } from './root.types'
import {ITask} from "@/types/task.types";
import {IUser} from "@/types/user.types";

export enum ERole {
	OWNER = 'owner',
	ADMIN = 'admin',
	MEMBER = 'member'
}

export interface IInviteMember {
	email: string
	role: ERole
}
export interface IUpdateWorkspaceMembersDto {
	include?: IInviteMember;

	exclude?: string;
}

export const Roles = [
	{
		value: ERole.OWNER,
		label: 'Owner'
	},
	{
		value: ERole.ADMIN,
		label: 'Admin'
	},
	{
		value: ERole.MEMBER,
		label: 'Member'
	}
]

export interface IWorkspace extends IBase {
	name: string;
	description: string;
	tasks?: ITask[];
	users?: IUsersOnWorkspaces[];
}

export interface IUsersOnWorkspaces {
	role: ERole;
	user: IUser
	invitedBy: IUser
}


export type CreateWorkspace = Partial<Pick<IWorkspace, 'name' | 'description'>>
