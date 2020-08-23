import {ProcessorList, ProcessorResultMap} from './types';
import {walkDirectory} from './walkDirectory';
import {processFile} from './processFile';

export const processFilesInDirectory = async (
    directory: string,
    processorList: ProcessorList,
): Promise<ProcessorResultMap> => {
    const promises: Array<Promise<void>> = [];
    const results: {[key: string]: string | null} = {};
    for await (const filePath of walkDirectory(directory)) {
        promises.push(processFile(filePath, processorList).then((result) => {
            results[filePath] = result;
        }));
    }
    await Promise.all(promises);
    return results;
};
