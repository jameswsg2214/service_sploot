const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
const zip = require('gulp-zip');
const clean = require('gulp-clean');
const jsonfile = require('jsonfile');

const eslint = require('gulp-eslint');
const friendlyFormatter = require("eslint-formatter-friendly");

const pkgPath = './package.json';
const lintrule = './.eslintrc';
const pkg = require(pkgPath);

gulp.task('eslint', function () {
    return gulp.src(['**/*.js', '!node_modules/**'])
        .pipe(eslint(lintrule))
        .pipe(eslint.format(friendlyFormatter))
        .pipe(eslint.failAfterError());
});

gulp.task('buildbin', () => {
    return gulp.src(['bin/**'])
        .pipe(uglify())
        .pipe(gulp.dest('../../../release/tmp/apiGateway/bin'))
});

gulp.task('buildmain', () => {
    return gulp.src(['index.js'])
        .pipe(uglify())
        .pipe(gulp.dest('../../../release/tmp/apiGateway/'))
});

gulp.task('buildpackagejson', () => {
    return gulp.src(['package.json'])
        .pipe(gulp.dest('../../../release/tmp/apiGateway/'))
});

gulp.task('buildsrc', () => {
    return gulp.src(['src/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('../../../release/tmp/apiGateway/src'))
});

gulp.task('buildjson', () => {
    return gulp.src(['src/**/*.json'])
        .pipe(gulp.dest('../../../release/tmp/apiGateway/src'))
});

gulp.task('buildzip', () => {
    updateVersion();
    return gulp.src(['../../../release/tmp/**'])
        .pipe(zip('oasys_apiGateway' + pkg.version + '.zip'))
        .pipe(gulp.dest('../../../release/'))
});


gulp.task('buildclean', function () {
    return gulp.src('../../../release/tmp')
        .pipe(clean({ force: true }));
});

function updateVersion() {
    var version = (pkg.version).split('.');
    var build = Number.parseInt(version[version.length - 1]);
    version[version.length - 1] = (build + 1).toString();
    pkg.version = version.join('.');
    console.log('Updated Package Version Number: ' + pkg.version);
    jsonfile.writeFileSync(pkgPath, pkg, { spaces: 2 });
    return pkg.version;
}


gulp.task('prodbuild',
    gulp.series('buildbin', 'buildmain', 'buildpackagejson', 'buildsrc',
        'buildjson', 'buildzip', 'buildclean')); // Combine

gulp.task('devbuild',
    gulp.series('buildbin', 'buildmain', 'buildpackagejson', 'buildsrc',
        'buildjson')); // Combine