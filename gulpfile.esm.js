import { rmSync } from "fs";
import { dest, parallel, src, watch } from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import { createProject } from "gulp-typescript";
import { join } from "path";
// import imagemin from "gulp-imagemin";

const tsProjectClient = createProject("./app/tsconfig.json");
const tsProjectServer = createProject("./server/tsconfig.json");
const sass = gulpSass(dartSass);

function typescript() {
    return tsProjectClient.src().pipe(tsProjectClient());
}

function images() {
    return (
        src("app/src/images/*")
            // .pipe(imagemin())
            .pipe(dest("app/dist/images"))
    );
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

exports.clean = (callback) => {
    rmSync(join(".", "app", "dist"), { recursive: true });
    rmSync(join(".", "server", "dist"), { recursive: true });
    callback();
};

exports.build = (callback) => {
    let js = () => typescript().pipe(dest("./app/dist/js"));
    let css = () => scss().pipe(dest("./app/dist/css"));
    parallel(js, css, server)(callback);
};

exports.watch = (callback) => {
    let js = () => typescript().pipe(dest("app/dist/js"));
    let css = () => scss().pipe(dest("app/dist/css"));
    parallel(js, css, server, images)();
    watch("app/src/ts/**/*.ts", js);
    watch("app/src/scss/**/*.scss", css);
    watch("server/src/**/*.ts", server);
    callback();
};
