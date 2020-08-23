import * as path from 'path';
import * as fs from 'fs';
import {removeSourceMapLines} from './removeSourceMapLines';
import {PatternList} from './types';
import {processFilesInDirectory} from './processFilesInDirectory';

export const removeSourceMap = async (
    directory: string,
    {
        filter = ['.js', '.css'],
        remove = ['.js.map', '.css.map'],
    }: {
        filter?: PatternList,
        remove?: PatternList,
    } = {},
) => await processFilesInDirectory(directory, [
    {
        name: 'remove sourcemap lines',
        pattern: filter,
        process: async (filePath) => {
            console.log(`Filter: ${path.relative(directory, filePath)}`);
            await fs.promises.writeFile(
                filePath,
                removeSourceMapLines(await fs.promises.readFile(filePath, 'utf8')),
            );
        },
    },
    {
        name: 'delete sourcemap files',
        pattern: remove,
        process: async (filePath) => {
            console.log(`Delete: ${path.relative(directory, filePath)}`);
            await fs.promises.unlink(filePath);
        },
    },
]);
