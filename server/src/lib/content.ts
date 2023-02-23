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
            "data",
            "pages",
            name + ".html"
        )
    );
}
