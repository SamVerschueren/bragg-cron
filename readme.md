# bragg-cron [![Build Status](https://travis-ci.org/SamVerschueren/bragg-cron.svg?branch=master)](https://travis-ci.org/SamVerschueren/bragg-cron)

> Cronjob middleware for [bragg](https://github.com/SamVerschueren/bragg)

This little piece of middleware makes it possible to handle Cronjob events as if they where normal requests.


## Install

```
$ npm install --save bragg-cron
```


## Usage

```js
const app = require('bragg')();
const router = require('bragg-router')();
const cron = require('bragg-cron');

router.post('cron:RuleName', ctx => {
    ctx.body = ctx.request.body;
});

app.use(cron());
app.use(router.routes());

exports.handler = app.listen();
```

The `cron:` prefix is attached by this module and is followed by the name of the rule that originated the event. The time at when the cronjob executed the function is provided in the `body` property of the `request` object.


## API

### cron()

Install the `cron` middleware


## License

MIT © [Sam Verschueren](https://github.com/SamVerschueren)
