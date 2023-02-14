interface Route {
    path: string,
    component: HTMLElement
}

class Router {
    private _routes: Route[] = []
    public get routes() : Route[] {
        return this._routes
    }
    
    private root = '/'

    constructor(root ?: string) {
        if (root) this.root = root
    }

    add(path: string, component: HTMLElement) {
        this._routes.push({path: path, component: component})
        return this
    }

    remove(path: string) {
        
    }
}

export default Router