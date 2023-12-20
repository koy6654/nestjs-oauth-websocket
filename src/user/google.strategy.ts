import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly config: ConfigService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            scope: ['email', 'profile'],
        });
    }

    validate(accessToken: string, refreshToken: string, profile: Profile) {
        const { id, name, emails } = profile;

        return {
            provider: 'google',
            providerId: id,
            name: name.givenName,
            email: emails[0].value,
        };
    }
}
