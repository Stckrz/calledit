export interface IRegister {
	username: string,
	email: string,
	password: string,
	repeatpassword: string,
}
export interface ILogin {
	username: string,
	password: string,
}

export interface IUser {
	username: string,
	_id: string,
	score: number,
	predictions: any[],
	roles: string[],
	rank: string,
}

export const iUserInitial = {
	username: "",
	_id: "",
	score: 0,
	predictions: [],
	roles: [],
	rank: ""
}

