import * as path from 'path';
import * as fs from 'fs';

export const walkDirectory = async function* (
    directoryPath: string,
): AsyncGenerator<string> {
    for await (const dirent of await fs.promises.opendir(directoryPath)) {
        const file = path.join(directoryPath, dirent.name);
        if (dirent.isDirectory()) {
            yield* walkDirectory(file);
        } else {
            yield file;
        }
    }
};
