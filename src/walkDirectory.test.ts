import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import ava from 'ava';
import {walkDirectory} from './walkDirectory';

ava('list files in a directory', async (t) => {
    const directory = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'walkDirectory'));
    await fs.promises.writeFile(path.join(directory, 'a'), 'body');
    await fs.promises.writeFile(path.join(directory, 'b'), 'body');
    await fs.promises.mkdir(path.join(directory, 'c'));
    await fs.promises.writeFile(path.join(directory, 'c/d'), 'body');
    await fs.promises.writeFile(path.join(directory, 'c/e'), 'body');
    await fs.promises.mkdir(path.join(directory, 'f'));
    await fs.promises.writeFile(path.join(directory, 'f/g'), 'body');
    await fs.promises.writeFile(path.join(directory, 'f/h'), 'body');
    await fs.promises.mkdir(path.join(directory, 'f/i'));
    await fs.promises.writeFile(path.join(directory, 'f/i/j'), 'body');
    await fs.promises.writeFile(path.join(directory, 'f/i/k'), 'body');
    const actual: Array<string> = [];
    for await (const file of walkDirectory(directory)) {
        actual.push(file);
    }
    actual.sort((a, b) => a < b ? -1 : 1);
    t.deepEqual(actual, [
        path.join(directory, 'a'),
        path.join(directory, 'b'),
        path.join(directory, 'c/d'),
        path.join(directory, 'c/e'),
        path.join(directory, 'f/g'),
        path.join(directory, 'f/h'),
        path.join(directory, 'f/i/j'),
        path.join(directory, 'f/i/k'),
    ]);
});
