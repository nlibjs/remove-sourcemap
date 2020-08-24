import * as childProcess from 'child_process';

export const exec = async (
    command: string,
): Promise<{stdout: string, stderr: string}> => await new Promise(
    (resolve, reject) => {
        childProcess.exec(
            command,
            (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        stdout: stdout.trim(),
                        stderr: stderr.trim(),
                    });
                }
            },
        );
    },
);
