import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

interface Config {
    server: {
        port: number;
    },
    database: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        synchronize: boolean;
    },
    google: {
        clientId: string;
        secret: string;
    }
}

const CONFIG_FILE = 'config.yml';

export default (path?: string) => {
    const directoryPath = process.env.NODE_ENV === 'prod' ? path : `${__dirname}/../..`;
    const config = yaml.load(
        readFileSync(join(directoryPath, CONFIG_FILE), 'utf8'),
    ) as Config;

    return config;
};
