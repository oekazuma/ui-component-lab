import type { Handle } from '@sveltejs/kit/hooks';

// <html lang> をページの言語に合わせる（ルートと 404 は en）
export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', event.params.lang ?? 'en')
	});
