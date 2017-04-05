import path from 'path';
import test from 'ava';
import loadJsonFile from 'load-json-file';
import m from './';

function fn(t, source, opts) {
	const event = loadJsonFile.sync(path.join(__dirname, 'fixtures', `${source}.json`));
	const ctx = {
		req: event,
		request: {}
	};
	m(opts)(ctx);
	return ctx;
}

test('do nothing if it\'s not a cron event', t => {
	const result = fn(t, 'dynamodb-event');
	t.falsy(result.request.body);
	t.falsy(result.path);
	t.falsy(result.method);
});

test('result', t => {
	const result = fn(t, 'event');
	t.is(result.path, 'cron:my-schedule');
	t.is(result.method, 'post');
	t.deepEqual(result.request.body, {
		time: '1970-01-01T00:00:00Z'
	});
});
