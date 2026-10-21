import { readdirSync } from 'node:fs';

// 全部品の詳細ページを回すテストのために、部品のディレクトリ名を集める
export const componentIds = readdirSync(new URL('../src/lib/components/', import.meta.url));
