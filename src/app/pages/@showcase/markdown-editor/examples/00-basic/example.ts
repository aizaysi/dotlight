import { Component } from '@angular/core';
import { StackEditorComponent } from 'ngx-stackedit';

@Component({
    selector: 'app-example',
    templateUrl: './example.html',
    styleUrls: ['./example.scss'],
    imports: [
        StackEditorComponent
    ],
    standalone: true
})
export class ExampleBasicComponent {

    defaultValue = `
# @dotglitch StackEdit

#### Basic Styling

Lorem **ipsum** _dolor_ sit amet, consectetur adipiscing elit, sed do _eiusmod tempor incididunt_ \
ut labore et dolore magna ~~aliqua~~. Ut enim ad minim veniam, quis nostrud exercitation \
ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in \
_reprehenderit_ in <span style="color: #ff0000">voluptate</span> velit esse cillum \
dolore eu fugiat nulla pariatur. Excepteur sint ~~occaecat cupidatat~~ non proident, \
sunt in culpa qui **officia deserunt mollit** anim id est laborum.

#### Colored text
 > Full-featured, <span style="color: #33b579">open-source <span style="color: #f4d679">Markdown</span> editor based </span> on PageDown, the <span style="color: #11b3a5">Markdown</span> library used by Stack Overflow and the other Stack <span style="color: #eaa100">Exchange</span> sites.

#### Images

![NPM version](https://cdn.dotglitch.dev/lowpoly%20(1).png)
![NPM version](https://cdn.dotglitch.dev/lowpoly%20(2).png)
![NPM version](https://cdn.dotglitch.dev/lowpoly%20(3).png)
![NPM version](https://cdn.dotglitch.dev/lowpoly%20(4).png)

#### Links

We autodetect links via the gfm extension
> Something Nice: https://www.npmjs.com/package/@dotglitch/ngx-common

But you can also embed links normally like [so](https://npmgraph.js.org/?q=ngx-stackedit).

#### Lists

 - A bulleted list from dashes
 - Can have n number of entries

 1. Now when we number a _list_, things can get spicy.
 2. we can add some pretty neat <span style="color: #36955f">colors</span>.
 3. We can also put a table inside of the list.

 - [X] Install Linux
 - [ ] Stop using Google

#### Tables

| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |


#### Code blocks
\`\`\`ts
import 'zone.js';  // Included with Angular CLI.

import { AppComponent } from './app/app.component';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(CommonModule, BrowserModule,
        MatButtonModule, MatSidenavModule, MatDialogModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        })),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));

\`\`\`

\`\`\`css
body { margin: 0 }
html, body {
    height: 100%;
    width: 100%;
    overflow: hidden;
    font-family: 'Fira Sans', Arial;
    background-color: var(--background-color, #121212);
    color: var(--text-color);
}
\`\`\`

\`\`\`bash
#!/usr/bin/env bash
KEEP_GOING=1

export SD_WEBUI_RESTART=tmp/restart
while [[ "$KEEP_GOING" -eq "1" ]]; do
    if [[ ! -z "\${ACCELERATE}" ]] && [ \${ACCELERATE}="True" ] && [ -x "$(command -v accelerate)" ]; then
        printf "\\n%s\\n" "\${delimiter}"
        printf "Accelerating launch.py..."
        printf "\\n%s\\n" "\${delimiter}"
        prepare_tcmalloc
        accelerate launch --num_cpu_threads_per_process=6 "\${LAUNCH_SCRIPT}" "$@"
    else
        printf "\\n%s\\n" "\${delimiter}"
        printf "Launching launch.py..."
        printf "\\n%s\\n" "\${delimiter}"
        prepare_tcmalloc
        "\${python_cmd}" -u "\${LAUNCH_SCRIPT}" "$@"
    fi

    if [[ ! -f tmp/restart ]]; then
        KEEP_GOING=0
    fi
done
\`\`\`

#### Mermaid Diagrams

\`\`\`mermaid
pie title Pets adopted by volunteers
    "Dogs": 386
    "Cats": 85
    "Rats": 15
\`\`\`

\`\`\`mermaid
classDiagram
    note "From Duck till Zebra"
    Animal <|-- Duck
    note for Duck "can fly
can swim
can dive
can help in debugging"

    Animal <|-- Fish
    Animal <|-- Zebra
    Animal: +int age
    Animal: +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck {
        +String beakColor
        +swim()
        +quack()
    }
    class Fish {
        -int sizeInFeet
        -canEat()
    }
    class Zebra {
        +bool is_wild
        +run()
    }
\`\`\`
    `

    constructor() {
    }
}
