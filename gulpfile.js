const gulp = require('gulp');
const execFile = require('child_process').execFile;

const goFiles = './*.go';

const start = () => execFile(`${__dirname}/shell_ops.sh`, [ 3 ]);

const started = () => execFile(
	`${__dirname}/shell_ops.sh`,
	[ 4 ],
	(error, stdout, stderr) => {
		if (stdout.length > 0) console.log(stdout);
		if (stderr) console.log('rsd_stderr:', stderr);
	}
);

const build = () => execFile(
	`${__dirname}/shell_ops.sh`,
	[ 2 ],
	(error, stdout, stderr) => {
		if (error) {
			console.error('b_error', error);
		} else {
			if (stdout.length > 0) {
				const buildStatus = stdout.split('')[0];
				if (buildStatus === '0') {
					console.log('--- BUILD SUCCESSFUL ---');
					start();
					started();
				}
				else {
					if (stderr) console.log('b_stderr', stderr);
				}
			}
		}
	}
);

gulp.task('build', [ 'destroy' ], build);

const destroy = () => {
	execFile(
		`${__dirname}/shell_ops.sh`,
		[ 1 ],
		(error, stdout, stderr) => {
			if (stdout.length > 0) console.log(stdout);
			if (stderr) console.log('rs_stderr:', stderr);
		}
	);
}

gulp.task('destroy', destroy);

gulp.task('default', [ 'build' ], () => gulp.watch(goFiles, [ 'build' ]));
