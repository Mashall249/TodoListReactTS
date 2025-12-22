export type UserEntityType = {
	id: number;
	username: string;
	email: string;
};

export type LoginRequestType = {
	username: string;
	password: string;
};

export type LoginResponseType = {
	accessToken: string;
	refreshToken?: string;
	username: string;
};

export type RegisterRequestType = {
	username: string;
	email: string;
	password: string;
};

export type RegisterFormType = RegisterRequestType & {
	confirmPassword: string;
};

export type EditType = {
	username: string;
	email: string;
};

export type ChangePasswordType = {
	username: string;
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
};

export type UserNameType = {
	username: string;
};
