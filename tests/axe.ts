import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';

// 検査する WCAG の水準は 1 か所で決める。写しが増えると、一部だけ水準が違ってしまう
export async function expectNoAxeViolations(page: Page) {
	const { violations } = await new AxeBuilder({ page })
		.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
		.analyze();
	expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
}
