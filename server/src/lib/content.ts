import { readFileSync } from 'fs';
import { join } from 'path';

export default function readContent(name: string, data?: { [k: string]: string }) {
    let content = readFileSync(join(__dirname, '..', '..', '..', 'app', 'views', 'pages', name + '.html')).toString(
        'utf-8',
    );

    for (let key in data) {
        content = content.replace(new RegExp("{"+key+"}", 'g'), data[key]);
    }
    return content;
}
