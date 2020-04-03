import { NodeCLI } from '@flowscripter/cli-framework';
import ExampleCommandFactory from './ExampleCommandFactory';

(async () => {
    const nodeCli = new NodeCLI({
        name: 'js-example-cli'
    });

    nodeCli.addCommandFactory(new ExampleCommandFactory());

    await nodeCli.execute();
})();
