import * as path from 'path';
import ava from 'ava';
import {exec} from './exec.module';

ava('show help (-h)', async (t) => {
    const result = await exec(`npx ts-node ${path.join(__dirname, '../src/cli.ts')} -h`);
    t.true(result.stdout.startsWith('remove-sourcemap [options] <dir>'));
});

ava('show help (--help)', async (t) => {
    const result = await exec(`npx ts-node ${path.join(__dirname, '../src/cli.ts')} --help`);
    t.true(result.stdout.startsWith('remove-sourcemap [options] <dir>'));
});
