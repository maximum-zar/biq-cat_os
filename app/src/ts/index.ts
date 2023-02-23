import { NoElementsError } from "./lib/errors.js";
import { showOnScroll } from "./lib/animation.js";

void (function () {
    document.addEventListener("DOMContentLoaded", () => {
        const articles = document.querySelector("section.features")?.children;
        if (articles == null) {
            throw new NoElementsError("No articles provided");
        }
        for (let i = 0; i < articles.length; i++) {
            articles[i].classList.add("show-onscroll");
        }
    });
    document.addEventListener("scroll", showOnScroll);
})();
