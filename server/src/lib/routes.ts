export interface Route {
    name: string;
    template?: string;
    path: string;
    contentName?: string;
    redirect?: string;
    active: boolean;
    show: boolean;
    assets?: Assets;
    data?: Object;
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
        assets: {
            css: ['/css/downloads.css'],
        },
    },
    { name: 'Get Involved', path: '/getinvolved', show: false, active: false },
    {
        name: 'Dashboard',
        path: '/users',
        redirect: '/users/singup',
        show: false,
        active: false,
    },
    {
        name: 'Sing up',
        path: '/users/singup',
        template: 'users',
        contentName: 'singup',
        show: false,
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
        active: false,
        assets: {
            css: ['/css/forms.css'],
            js: ['/js/validation.js'],
        },
    },
];

export default routes;
