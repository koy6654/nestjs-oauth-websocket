import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly configService: ConfigService) {
        super({
            clientID: configService.get<string>('google.clientId'),
            clientSecret: configService.get<string>('google.secret'),
            callbackURL: configService.get<string>('google.redirect'),
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
