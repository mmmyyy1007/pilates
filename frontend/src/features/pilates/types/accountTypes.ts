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

export interface AccountFormData {
    key: string;
    name: string;
    value: string;
}

export interface UpdatedAccountData {
    key: string;
    data: string;
}
