import * as path from 'path';
import ava from 'ava';
import {exec} from './exec.module';

ava('show version (-v)', async (t) => {
    const result = await exec(`npx ts-node ${path.join(__dirname, '../src/cli.ts')} -v`);
    t.true((/^\d+\.\d+\.\d+$/).test(result.stdout));
});

ava('show version (--version)', async (t) => {
    const result = await exec(`npx ts-node ${path.join(__dirname, '../src/cli.ts')} --version`);
    t.true((/^\d+\.\d+\.\d+$/).test(result.stdout));
});
