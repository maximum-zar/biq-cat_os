import { Request, Response, Router } from "express";
import { readFileSync } from "fs";
import { readContent } from "../lib/content";

const router = Router();
router.get("/", (req: Request, res: Response) =>
    res.render("index", { content: readContent("index") })
);

export default router;
