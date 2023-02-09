import express, { Request, Response } from "express";
import { join } from "path";

const app = express()

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const staticDir = join(__dirname, "..", "..", "app")

const port = process.env.PORT || 4000

app.use("/css", express.static(join(staticDir, "css")));
app.use("/gui", express.static(join(staticDir, "html")));
app.use("/js", express.static(join(staticDir, "js")))
app.use("/img", express.static(join(staticDir, "images")))
app.get("/", (_: Request, res: Response) => res.redirect("/gui"))


app.listen(port, () => {
    console.log(`[server]: Server is running at port ${port}`);
});