export interface GoogleRequestUser {
    provider: string;
    providerId: string;
    name: string;
    email: string;
}

export interface GoogleRedirectResponse {
    accessToken: string;
    refreshToken: string;
}

export interface UserJwtDecodeBody {
    token: string;
}
