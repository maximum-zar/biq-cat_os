import { readFileSync } from "fs";
import { join } from "path";

export function readContent(name: string) {
    return readFileSync(
        join(
            __dirname,
            "..",
            "..",
            "..",
            "app",
            "views",
            "pages",
            name + ".html"
        )
    ).toString("utf-8");
}
