/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import fs from 'fs';
import nixt from 'nixt';

describe('CLI test', () => {

    test('no argument', (done) => {
        nixt({ colors: false })
            .run('./bin/js-example-cli')
            .stdout(/.*Try running\?*/)
            .end(done);
    });

    test('invalid command', (done) => {
        nixt({ colors: false })
            .run('./bin/js-example-cli hello')
            .stderr(/.*Unused arg: hello*/)
            .stdout(/.*Try running*/)
            .end(done);
    });

    test('valid command', (done) => {
        nixt({ colors: false })
            .run('./bin/js-example-cli greeter')
            .stdout(/.*Hello world*/)
            .end(done);
    });

    test('valid command with option', (done) => {
        nixt({ colors: false })
            .run('./bin/js-example-cli greeter --subject you')
            .stdout(/.*Hello you*/)
            .end(done);
    });

    test('valid command with invalid option', (done) => {
        nixt({ colors: false })
            .run('./bin/js-example-cli greeter -w')
            .stdout(/.*Hello world/)
            .stderr(/.*Unused arg: -w/)
            .end(done);
    });

    test('correctly typed command name arg for help command', (done) => {
        nixt({ colors: false })
            .run('./bin/js-example-cli help greeter')
            .stdout(/.*The classic example\?*/)
            .code(0)
            .end(done);
    });

    test('incorrectly typed command name arg for help command', (done) => {
        nixt({ colors: false })
            .run('./bin/js-example-cli help greetes')
            .stdout(/.*Possible matches: greeter\?*/)
            .stdout(/.*Unknown command: greetes\?*/)
            .stdout(/.*Usage\?*/)
            .code(0)
            .end(done);
    });

    test('command can be installed, run and uninstalled', async () => {
        const pluginLocation = path.join(process.cwd(), 'js-example-cli-plugins');
        try {
            fs.rmdirSync(pluginLocation, { recursive: true });
        } catch (err) {
            // ignore and carry on
        }

        try {
            await new Promise((resolve, reject) => {
                nixt({ colors: false })
                    .run('./bin/js-example-cli help cow')
                    .stdout(/.*Unknown command: cow\?*/)
                    // .stderr(/.*Unknown command: cat\?*/)
                    .stdout(/.*Usage\?*/)
                    .code(0)
                    .end((err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
            });
            await new Promise((resolve, reject) => {
                nixt({ colors: false })
                    .run('./bin/js-example-cli plugin:add js-example-cli-plugin')
                    // .stdout(/.*Added\?*/)
                    .stderr(/.*Added\?*/)
                    .code(0)
                    .end((err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
            });
            await new Promise((resolve, reject) => {
                nixt({ colors: false })
                    .run('./bin/js-example-cli plugin:add js-example-cli-plugin')
                    // .stdout(/.*Already added\?*/)
                    .code(0)
                    .end((err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
            });
            await new Promise((resolve, reject) => {
                nixt({ colors: false })
                    .run('./bin/js-example-cli help')
                    .stdout(/.*cow\?*/)
                    .end((err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
            });
            await new Promise((resolve, reject) => {
                nixt({ colors: false })
                    .run('./bin/js-example-cli cow')
                    .stdout(/.*Moo world\?*/)
                    .end((err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
            });
            await new Promise((resolve, reject) => {
                nixt({ colors: false })
                    .run('./bin/js-example-cli plugin:remove js-example-cli-plugin')
                    .stdout(/.*Removed\?*/)
                    .end((err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
            });
            await new Promise((resolve, reject) => {
                nixt({ colors: false })
                    .run('./bin/js-example-cli help cow')
                    .stderr(/.*Unknown command: cow\?*/)
                    .stdout(/.*Usage\?*/)
                    .end((err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
            });
        } catch (err) {
            try {
                fs.rmdirSync(pluginLocation, { recursive: true });
            } catch (err2) {
                // ignore and carry on
            }
        }
    });
});
