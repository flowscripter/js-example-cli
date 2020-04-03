import { STDOUT_PRINTER_SERVICE } from '@flowscripter/cli-framework';

export default class ExampleCommandFactory {

    // eslint-disable-next-line class-methods-use-this
    getCommands() {
        return [{
            name: 'greeter',
            description: 'The classic example',
            options: [{
                name: 'subject',
                defaultValue: 'world',
                description: 'Who to greet',
                shortAlias: 's',
                isOptional: true
            }],
            positionals: [],
            run: async (commandArgs, context) => {
                const printer = context.getService(STDOUT_PRINTER_SERVICE);
                if (printer == null) {
                    throw new Error('STDOUT_PRINTER_SERVICE not available in context');
                }
                printer.info(`Hello ${commandArgs.subject}\n`);
            }
        }];
    }
}
