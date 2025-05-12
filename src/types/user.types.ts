export interface IAuthForm {
	email: string
	password: string
}

export interface IUser {
	id: string
	name?: string
	email: string

	workInterval?: number
	breakInterval?: number
	intervalCount?: number
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}
