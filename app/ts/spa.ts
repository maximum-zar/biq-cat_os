interface Route {
    path: string,
    component: string
}
interface Options {
    root?: string,
    routes?: Route[],
}
class Router { 
    private routes: Route[] = [];
    private root = "/"
    
    /**
     *
     */
    constructor(options: Options) {
        if (options.root) {
            this.root = options.root
        }
        if (options.routes) {
            this.routes = options.routes
        }
    }

    /**
     * add
     */
    public addRoute(route: Route) {
        this.routes.push(route)
        return this
    }
    /**
     * add
     */
    public add(path: string, component: string) {
        this.routes.push({
            path,
            component
        })
    }
}