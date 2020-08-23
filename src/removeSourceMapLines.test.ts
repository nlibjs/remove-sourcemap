import {testFunction} from '@nlib/test';
import {removeSourceMapLines} from './removeSourceMapLines';

testFunction(removeSourceMapLines, {
    input: ['foo'].join('\n'),
    expected: ['foo'].join('\n'),
});
testFunction(removeSourceMapLines, {
    input: [
        '',
        '  // # sourceMappingURL = ',
        'foo',
        '  /* # sourceMappingURL = ',
        'bar',
    ].join('\n'),
    expected: ['', 'foo', 'bar'].join('\n'),
});
