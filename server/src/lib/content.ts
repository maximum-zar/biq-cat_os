import { readFileSync } from 'fs';
import { join } from 'path';
import * as handlebars from 'handlebars';

export default function readContent(name: string) {
    const content = readFileSync(join(__dirname, '..', '..', '..', 'app', 'views', 'pages', name + '.html')).toString(
        'utf-8',
    );
}
