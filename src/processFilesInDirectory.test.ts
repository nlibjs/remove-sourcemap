import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import ava from 'ava';
import {processFilesInDirectory} from './processFilesInDirectory';

const noop = () => {
    // noop
};

ava('list files in a directory', async (t) => {
    const directory = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'walkDirectory'));
    const write = async (prefix: string): Promise<void> => {
        await fs.promises.writeFile(`${prefix}.css`, 'body');
        await fs.promises.writeFile(`${prefix}.js`, 'body');
        await fs.promises.writeFile(`${prefix}.test.js`, 'body');
    };
    await write(path.join(directory, 'a'));
    await fs.promises.mkdir(path.join(directory, 'b'));
    await write(path.join(directory, 'b/c'));
    const actual = await processFilesInDirectory(directory, [
        {name: 'testjs', pattern: ['.test.js'], process: noop},
        {name: 'js', pattern: ['.js'], process: noop},
        {name: 'css', pattern: ['.css'], process: noop},
    ]);
    t.deepEqual(actual, {
        [path.join(directory, 'a.css')]: 'css',
        [path.join(directory, 'a.js')]: 'js',
        [path.join(directory, 'a.test.js')]: 'testjs',
        [path.join(directory, 'b/c.css')]: 'css',
        [path.join(directory, 'b/c.js')]: 'js',
        [path.join(directory, 'b/c.test.js')]: 'testjs',
    });
});
