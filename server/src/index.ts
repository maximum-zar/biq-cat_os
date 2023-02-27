import express, { Request, Response } from "express";
import { join } from "path";
import index from "./routes/gui";
import browserSync from "browser-sync";
const app = express();

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const staticDir = join(__dirname, "..", "..", "app", "dist");
const viewsDir = join(__dirname, "..", "..", "app", "views");

const port = process.env.PORT || 4000;

app.set("views", join(viewsDir));
app.set("view engine", "ejs");

app.use("/css", express.static(join(staticDir, "css")));
app.use("/js", express.static(join(staticDir, "js")));
app.use("/img", express.static(join(staticDir, "images")));
app.use("/data/pages", express.static(join(viewsDir, "pages")));

app.use("/", index);

app.listen(port, () => {
    console.log(`[server]: Server is running at port ${port}`);
});
