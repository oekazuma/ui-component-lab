import { expect, test } from '@playwright/test';
import { componentIds } from './component-ids';

test('components.json: lists every component with absolute URLs and version 1', async ({ request }) => {
	const res = await request.get('components.json');
	expect(res.status()).toBe(200);
	expect(res.headers()['content-type']).toContain('application/json');
	const json = await res.json();
	expect(json.version).toBe(1);
	expect(json.site.url).toBe('https://oekazuma.github.io/ui-component-lab/');
	expect(json.components.map((c: { id: string }) => c.id).sort()).toEqual([...componentIds].sort());
	const select = json.components.find((c: { id: string }) => c.id === 'select');
	expect(select.urls.ja).toBe('https://oekazuma.github.io/ui-component-lab/ja/components/select/');
	expect(select.usage.length).toBeGreaterThan(0);
});

test('components.json: keeps misuse, related and sources as written in data.ts', async ({ request }) => {
	const json = await (await request.get('components.json')).json();
	const checkbox = json.components.find((c: { id: string }) => c.id === 'checkbox');
	expect(checkbox.misuse.some((m: { deceptive?: boolean }) => m.deceptive)).toBe(true);
	expect(checkbox.related.length).toBeGreaterThan(0);
	expect(checkbox.sources.every((s: { url: string }) => s.url.startsWith('https://'))).toBe(true);
	expect(json.categories).toHaveLength(7);
});
