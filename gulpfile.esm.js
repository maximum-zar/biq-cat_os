import { existsSync, lstatSync, readdirSync, rmSync } from "fs";
import { dest, parallel, series, src, task, watch } from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import { createProject } from "gulp-typescript";
import { join } from "path";
import babel from "gulp-babel";
import browserify from "browserify";
import vinylSourceStream from "vinyl-source-stream";
import nodemon from "gulp-nodemon";
import browserSync from "browser-sync";

const tsProjectClient = createProject("./app/tsconfig.json");
const tsProjectServer = createProject("./server/tsconfig.json");
const sass = gulpSass(dartSass);
let scripts = readdirSync(join(__dirname, "app", "src", "ts"))
    .filter((file) =>
        lstatSync(join(__dirname, "app", "src", "ts", file)).isFile()
    )
    .map((file) => file.split(".")[0]);

function typescript() {
    return tsProjectClient.src().pipe(tsProjectClient());
}

function images() {
    return src("app/src/images/**/*").pipe(dest("app/dist/images"));
}

function server() {
    return tsProjectServer
        .src()
        .pipe(tsProjectServer())
        .pipe(dest("server/dist"));
}

function scss() {
    return src("app/src/scss/**/*.scss").pipe(
        sass.sync().on("error", sass.logError)
    );
}

function rmDist(parent) {
    const dist = join(__dirname, parent, "dist");
    if (existsSync(dist)) rmSync(dist, { recursive: true });
}

function bundle(name) {
    return browserify(`app/dist/babel/${name}.js`)
        .bundle()
        .pipe(vinylSourceStream(name + ".js"))
        .pipe(dest("app/dist/js"));
}

function startNodemon(done) {
    const STARTUP_TIMEOUT = 5000;
    const server = nodemon({
        env: { NODE_ENV: "development" },
        watch: ["server/dist"],
        script: "server/dist/index.js",
    });
    let starting = false;

    const onReady = () => {
        starting = false;
        done();
    };

    server.on("start", () => {
        starting = true;
        setTimeout(onReady, STARTUP_TIMEOUT);
    });

    server.on("stdout", (stdout) => {
        process.stdout.write(stdout); // pass the stdout through
        if (starting) {
            onReady();
        }
    });
}
function startBrowserSync(done) {
    browserSync.init(
        {
            proxy: "http://localhost:4000",
            files: ["app/dist/**/*", "app/views/**/*"],
            port: 7000,
        },
        done
    );
}

function startWatching(callback) {
    let js = () => typescript().pipe(dest("app/dist/js"));
    let css = () => scss().pipe(dest("app/dist/css"));
    watch("app/src/ts/**/*.ts", js);
    watch("app/src/scss/**/*.scss", css);
    watch("server/src/**/*.ts", server);
    watch("app/src/images/**/*", images);
    callback();
}

// Tasks

task("clean", (callback) => {
    rmDist("app");
    rmDist("server");
    callback();
});

task("build", (callback) => {
    let js = () => typescript().pipe(babel()).pipe(dest("./app/dist/babel"));
    let css = () => scss().pipe(dest("./app/dist/css"));
    let bundlers = scripts.map((file) => () => bundle(file));
    series(parallel(js, css, server), ...bundlers)(callback);
});

task("build-dev", (callback) => {
    let js = () => typescript().pipe(dest("app/dist/js"));
    let css = () => scss().pipe(dest("app/dist/css"));
    parallel(js, css, server, images)(callback);
});

task("dev", series("build-dev", startNodemon, startBrowserSync, startWatching));
