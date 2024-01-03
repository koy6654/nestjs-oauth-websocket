export interface TokenPayload {
    userId: string;
}

export interface DecodedJwtToken {
    userId: string;
    iat: number;
    exp: number;
}
