export interface PatternList extends Array<RegExp | string> {}

export interface Processor {
    name: string,
    pattern: PatternList,
    process: (filePath: string) => void | Promise<void>,
}

export interface ProcessorList extends Array<Processor> {}

export interface ProcessorResultMap {
    [key: string]: string | null,
}
