export interface AccountData {
    name: string;
    date: string;
    email: string;
}

export interface AccountApiRespose {
    account: AccountData;
}

export type AccountUserNameData = Pick<AccountData, "name">;
