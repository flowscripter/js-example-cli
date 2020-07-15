import {
    PLUGIN_REGISTRY_SERVICE,
    STDOUT_PRINTER_SERVICE,
    AdvancedMultiCommandNodeCLI
} from '@flowscripter/cli-framework';

function getCommand() {
    return {
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
            const printer = context.serviceRegistry.getServiceById(STDOUT_PRINTER_SERVICE);
            if (printer == null) {
                throw new Error('STDOUT_PRINTER_SERVICE not available in context');
            }
            printer.info(`Hello ${commandArgs.subject}\n`);
        }
    };
}

(async () => {
    // Provide PluginRegistry custom config to use a custom package install location
    // and force a module scope
    const serviceConfigs = new Map();
    serviceConfigs.set(PLUGIN_REGISTRY_SERVICE, {
        moduleScope: '@flowscripter',
        pluginLocation: '/tmp/js-example-cli-plugins'
    });

    const cli = new AdvancedMultiCommandNodeCLI([], [getCommand()], serviceConfigs, new Map(), 'js-example-cli');

    await cli.execute();
})();
