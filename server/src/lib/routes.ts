export interface Route {
    name: string;
    template?: string;
    path: string;
    contentName?: string;
    redirect?: string;
    active: boolean;
    show: boolean;
    assets?: Assets;
    user: boolean;
}

export interface Assets {
    css?: string[];
    js?: string[];
    other?: any;
}

let routes: Route[] = [
    {
        name: 'Index',
        path: '/',
        active: false,
        template: 'index',
        contentName: 'index',
        user: false,
        show: true,
        assets: {
            js: ['/js/index.js'],
            css: ['/css/index.css'],
        },
    },
    {
        name: 'About',
        path: '/about',
        active: false,
        template: 'index',
        contentName: 'about',
        user: false,
        show: true,
        assets: {
            css: ['/css/about.css'],
        },
    },
    {
        name: 'Downloads',
        path: '/downloads',
        active: false,
        template: 'index',
        contentName: 'downloads',
        show: true,
        user: false,
        assets: {
            css: ['/css/downloads.css'],
        },
    },
    { name: 'Get Involved', path: '/getinvolved', user: false, show: false, active: false },
    {
        name: 'Dashboard',
        path: '/users',
        template: 'index',
        contentName: 'dashboard',
        show: false,
        user: true,
        active: false,
    },
    {
        name: 'Sing up',
        path: '/users/singup',
        template: 'users',
        contentName: 'singup',
        show: false,
        user: false,
        active: false,
        assets: {
            css: ['/css/forms.css'],
            js: ['/js/validation.js'],
        },
    },
    {
        name: 'Log in',
        path: '/users/login',
        template: 'users',
        contentName: 'login',
        show: false,
        user: false,
        active: false,
        assets: {
            css: ['/css/forms.css'],
            js: ['/js/validation.js'],
        },
    },
];

export default routes;
