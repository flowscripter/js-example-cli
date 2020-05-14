import path from 'path';
import { NodeCLI, PLUGIN_REGISTRY_SERVICE } from '@flowscripter/cli-framework';
import ExampleCommandFactory from './ExampleCommandFactory';

(async () => {
    // Provide PluginRegistry custom config to use a custom package install location
    // and force a module scope
    const serviceConfigs = new Map();
    serviceConfigs.set(PLUGIN_REGISTRY_SERVICE, {
        moduleScope: '@flowscripter',
        pluginLocation: path.join(process.cwd(), 'js-example-cli-plugins')
    });

    const nodeCli = new NodeCLI('js-example-cli', serviceConfigs, new Map());

    nodeCli.addCommandFactory(new ExampleCommandFactory());

    await nodeCli.execute();
})();
