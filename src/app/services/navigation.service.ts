import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { NgxLazyLoaderService } from '@dotglitch/ngx-lazy-loader';


type NavigationArguments = {
    root: string,
    chunks: [string, ...string[]],
    args: {
        [key: string]: any;
    };
};

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    public virtualPath$ = new BehaviorSubject<NavigationArguments>(null);

    constructor(
        private readonly lazyLoader: NgxLazyLoaderService
    ) {
        window.onhashchange = () => this.loadRootPageFromUrl();
        this.loadRootPageFromUrl();
    }

    private loadRootPageFromUrl() {
        const hash = location.hash.split("?")[0];

        // If the URL is imprecisely set, we restore it to the landing page
        if (!this.lazyLoader.isComponentRegistered(hash))
            return this.loadRootPage("#/Landing");

        this.loadRootPage(location.hash);
    }

    private loadRootPage(url: string, data: Object = {}) {

        const [path, query] = url.split('?');
        const hash = path.replace(/^\/?#\/?/, '');
        const chunks = hash.split('/');

        // Get query params and pass them as @Input arguments.
        const params = query?.split('&')
            .reduce((pars, par) => {
                const [key, value] = par.split("=");
                const decoded = decodeURIComponent(value);
                pars[key] = decoded;
                return pars;
            }, {}) || {};


        console.log(`Root page navigate to '${hash}'`, params, chunks);

        this.virtualPath$.next({
            root: chunks[0],
            chunks: chunks as any,
            args: params
        });
    }
}
