# js-example-cli
[![license](https://img.shields.io/github/license/flowscripter/js-example-cli.svg)](https://github.com/flowscripter/js-example-cli/blob/master/LICENSE)
[![dependencies](https://img.shields.io/david/flowscripter/js-example-cli.svg)](https://david-dm.org/flowscripter/js-example-cli)
[![travis](https://api.travis-ci.com/flowscripter/js-example-cli.svg)](https://travis-ci.com/flowscripter/js-example-cli)
[![npm](https://img.shields.io/npm/v/@flowscripter/js-example-cli.svg)](https://www.npmjs.com/package/@flowscripter/js-example-cli)

> Example JavaScript CLI application for the [cli-framework](https://github.com/flowscripter/cli-framework).

## Overview

## Development

Firstly:

```
npm install
```

then:

Build: `npm run build`

Watch: `npm run watch`

Lint: `npm run lint`

E2E test: `npm run e2e`

## Run with Node (12.6.0+)

#### Running From Source

After building, the CLI can be run with:

    ./bin/js-example-cli

Then run with with an invalid argument:

    ./bin/js-example-cli foo

Then run with with a valid argument:

    ./bin/js-example-cli greeter --subject=lovely

To run with debug logging:

    DEBUG=* NODE_NO_WARNINGS=1 ./bin/js-example-cli

#### Simulated Installation

To simulate installation:

    sudo npm link
    js-example-cli

#### Installation

    npm install -g @flowscripter/js-example-cli
    js-example-cli

## Further Details

Further details on project configuration files and Javascript version support can be found in
the [template for this project](https://github.com/flowscripter/ts-template/blob/master/README.md#overview).

## License

MIT © Flowscripter
