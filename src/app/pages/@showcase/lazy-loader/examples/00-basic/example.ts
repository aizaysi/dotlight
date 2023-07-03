import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgxLazyLoaderComponent, NgxLazyLoaderService } from '@dotglitch/ngx-lazy-loader';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-example',
    templateUrl: './example.html',
    styleUrls: ['./example.scss'],
    imports: [ NgIf, NgxLazyLoaderComponent, MatButtonModule ],
    standalone: true
})
export class ExampleBasicComponent {
    ttl = 0;

    constructor(private lazyLoader: NgxLazyLoaderService) {
        lazyLoader.registerComponent({
            id: "child",
            load: () => import('src/app/pages/@showcase/lazy-loader/examples/00-basic/example-child/example-child')
        })
    }

    private interval;
    ngOnInit() {
        this.interval = setInterval(() => {
            this.ttl--
        }, 1000)
    }
    ngOnDestroy() {
        clearInterval(this.interval);
    }
}
