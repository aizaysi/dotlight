import { ExampleTooltipComponent } from 'src/app/pages/@showcase/ctx-menu/examples/08-tooltip/example';

export default {
    files: [
        {
            label: "example.ts",
            value: require('!!raw-loader!./08-tooltip/example.ts')
        },
        {
            label: "example.html",
            value: require('!!raw-loader!./08-tooltip/example.html')
        },
        {
            label: "example-child.ts",
            value: require('!!raw-loader!./07-child-template/example-child/example-child.ts')
        },
        {
            label: "example-child.html",
            value: require('!!raw-loader!./07-child-template/example-child/example-child.html')
        },
        {
            label: "example-child.scss",
            value: require('!!raw-loader!./07-child-template/example-child/example-child.scss')
        },

        {
            label: "monaco-editor.ts",
            value: require('!!raw-loader!./08-tooltip/monaco-editor/monaco-editor.ts')
        },
        {
            label: "monaco-editor.html",
            value: require('!!raw-loader!./08-tooltip/monaco-editor/monaco-editor.html')
        },
        {
            label: "monaco-editor.scss",
            value: require('!!raw-loader!./08-tooltip/monaco-editor/monaco-editor.scss')
        }
    ],
    component: ExampleTooltipComponent
};
