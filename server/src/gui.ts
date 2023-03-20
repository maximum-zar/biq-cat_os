import { Request, Response, Router } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import parseContent from './lib/content';
import routes, { Route } from './lib/routes';
import { verifyUserToken } from './middlewares/auth';

const router = Router();

routes.forEach((link: Route, index: number) => {
    if (link.contentName === undefined) return;
    let workingLinks = routes.map((a) => ({ ...a }));
    workingLinks[index].active = true;
    workingLinks = workingLinks.filter((link) => link.contentName !== undefined && link.template !== undefined);
    const data = {
        content: parseContent(link.contentName!),
        links: workingLinks.filter((link: Route) => link.show),
        css: link.assets?.css || [],
        js: link.assets?.js || [],
    };
    if (link.user)
        router.get(link.path, verifyUserToken, (req: Request & { user?: JwtPayload }, res) => {
            const user = req.user;
            if (!user) return res.sendStatus(500);
            data.content = parseContent(link.contentName!, user.payload);
            res.render(link.template!, data);
        });
    else router.get(link.path, (_, res: Response) => res.render(link.template!, data));
});

routes
    .filter((el: Route) => el.redirect !== undefined)
    .forEach((route: Route) => {
        router.get(route.path, (_, res: Response) => res.redirect(route.redirect!));
    });
export default router;
