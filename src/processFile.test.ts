import {testFunction} from '@nlib/test';
import {processFile} from './processFile';

const noop = () => {
    // noop
};

testFunction(processFile, {parameters: ['foo.js', []], expected: null});
testFunction(processFile, {
    parameters: ['foo.js', [{name: 'css', pattern: ['.css'], process: noop}]],
    expected: null,
});
testFunction(processFile, {
    parameters: ['foo.css', [{name: 'css', pattern: ['.css'], process: noop}]],
    expected: 'css',
});
testFunction(processFile, {
    parameters: ['foo.css', [
        {name: 'js', pattern: ['.js'], process: noop},
        {name: 'css1', pattern: [/\.css$/], process: noop},
        {name: 'css2', pattern: ['.css'], process: noop},
    ]],
    expected: 'css1',
});
