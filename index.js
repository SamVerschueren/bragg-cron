'use strict';
module.exports = () => {
	return ctx => {
		if (!ctx.path && ctx.req.source === 'aws.events' && ctx.req['detail-type'] === 'Scheduled Event') {
			const resource = ctx.req.resources[0];
			const source = resource.split('/').pop();

			const body = {
				time: ctx.req.time
			};

			ctx.request.body = body;
			Object.defineProperty(ctx, 'path', {enumerable: true, value: `cron:${source}`});
			Object.defineProperty(ctx, 'method', {enumerable: true, value: 'post'});
		}
	};
};
