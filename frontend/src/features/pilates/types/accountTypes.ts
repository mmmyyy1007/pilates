export interface AccountData {
    name: string;
    date: string;
    email: string;
}

export interface AccountApiRespose {
    account: AccountData;
}

export interface AccountUserNameData {
    key: string;
    name: string;
    email: string;
}

export interface UpdatedAccountData {
    key: string | null;
    data: string;
}

export interface UpdatedPasswordData {
    password: string;
    newPassword: string;
    ConfirmNewPassword: string;
}
