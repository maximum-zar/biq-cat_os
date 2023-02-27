import { Response, Router } from "express";
import { readContent } from "../lib/content";
import routes, { Route } from "../lib/routes";

const router = Router();

routes.forEach((link: Route, index: number) => {
    if (link.contentName === undefined) return;
    let workingLinks = routes.map((a) => ({ ...a }));
    workingLinks[index].active = true;
    workingLinks = workingLinks.filter(
        (link) => link.contentName !== undefined && link.template !== undefined
    );
    router.get(link.path, (_, res: Response) =>
        res.render(link.template!, {
            content: readContent(link.contentName!),
            links: workingLinks.filter((link: Route) => link.show),
            css: link.assets?.css || [],
            js: link.assets?.js || [],
        })
    );
});

routes
    .filter((el: Route) => el.redirect !== undefined)
    .forEach((route: Route) => {
        router.get(route.path, (_, res: Response) =>
            res.redirect(route.redirect!)
        );
    });
export default router;
