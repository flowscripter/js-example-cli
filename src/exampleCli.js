import {
    PLUGIN_REGISTRY_SERVICE,
    STDOUT_PRINTER_SERVICE,
    BaseNodeCLI,
    MultiCommandHelpGlobalCommand,
    MultiCommandHelpSubCommand,
    PrompterService,
    StderrPrinterService,
    StdoutPrinterService,
    UsageCommand,
    VersionCommand
} from '@flowscripter/cli-framework';

const helpGlobalCommand = new MultiCommandHelpGlobalCommand();
const usageCommand = new UsageCommand(helpGlobalCommand);

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

    const nodeCli = new BaseNodeCLI([
        new StderrPrinterService(90),
        new StdoutPrinterService(90),
        new PrompterService(90)
    ], [
        helpGlobalCommand,
        new MultiCommandHelpSubCommand(),
        new VersionCommand(),
        getCommand()
    ], serviceConfigs, new Map(), 'js-example-cli', usageCommand, usageCommand);

    await nodeCli.execute();
})();
