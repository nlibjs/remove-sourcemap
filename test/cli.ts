import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import ava from 'ava';
import {walkDirectory} from '../src/walkDirectory';
import {exec} from './exec.module';

ava('execute remove-sourcemap', async (t) => {
    const baseDirectory = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'remove-sourcemap'));
    const directory = path.join(baseDirectory, 'lib');
    await fs.promises.mkdir(directory);
    await fs.promises.writeFile(path.join(directory, 'a.js'), [
        'console.log(1)',
        '// #sourceMappingURL = b.js.map',
        'console.log(2)',
    ].join('\n'));
    await fs.promises.writeFile(path.join(directory, 'b.js.map'), '{}');
    await fs.promises.mkdir(path.join(directory, 'c'));
    await fs.promises.writeFile(path.join(directory, 'c/d.css'), [
        ':root {}',
        '/* #sourceMappingURL = e.js.map */',
        'body {}',
    ].join('\n'));
    await fs.promises.writeFile(path.join(directory, 'c/e.css.map'), '{}');
    await exec(`npx ts-node ${path.join(__dirname, '../src/cli.ts')} ${directory}`);
    const result: {[name: string]: string} = {};
    for await (const file of walkDirectory(directory)) {
        result[path.relative(directory, file)] = (await fs.promises.readFile(file, 'utf8')).trim();
    }
    t.deepEqual(result, {
        'a.js': [
            'console.log(1)',
            'console.log(2)',
        ].join('\n'),
        'c/d.css': [
            ':root {}',
            'body {}',
        ].join('\n'),
    });
});
