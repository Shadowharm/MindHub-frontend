export interface IAuthForm {
	email: string
	password: string
	name?: string
}

export interface ISettings {
	workInterval?: number
	breakInterval?: number
	intervalsCount?: number
}

export interface IUser {
	id: string
	name?: string
	email: string

	settings: ISettings
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}

export type IUserForm = Partial<IAuthForm> & Pick<IUser, 'name'> & ISettings
