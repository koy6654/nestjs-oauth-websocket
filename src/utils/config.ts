// import { readFileSync } from 'fs';
// import * as yaml from 'js-yaml';
// import { join } from 'path';

// interface Config {
//     server: {
//         port: number;
//     };
//     database: {
//         type: string;
//         host: string;
//         port: number;
//         username: string;
//         password: string;
//         database: string;
//         synchronize: boolean;
//     };
// }

// const CONFIG_FILE = 'config.yml';

// export default () => {
//     console.log(join(__dirname, CONFIG_FILE), 'utf8');
//     const config = yaml.load(
//         readFileSync(join(__dirname, CONFIG_FILE), 'utf8'),
//     ) as Config;
//     console.log(config);
//     return config;
// };

import { Command, CommandRunner, Option } from 'nest-commander';

interface BasicCommandOptions {
    string?: string;
    boolean?: boolean;
    number?: number;
}

@Command({ name: 'commander', description: '' })
export default class Commander extends CommandRunner {
    constructor() {
        super();
    }

    async run(
        passedParams: string[],
        options?: BasicCommandOptions,
    ): Promise<void> {
        console.log(passedParams);
        console.log(options);
    }

    @Option({
        flags: '-c, --config [path]',
        description: 'Get config yml',
    })
    getConfig(value: string): number {
        console.log(value);
        return Number(value);
    }
}
