import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ContextMenuItem, NgxContextMenuDirective } from '@dotglitch/ngx-ctx-menu';

type Entry = {
    name: string,
    value: number,
    color: string;
};

@Component({
    selector: 'app-example',
    templateUrl: './example.html',
    styleUrls: ['./example.scss'],
    imports: [ NgForOf, NgxContextMenuDirective, MatButtonModule ],
    standalone: true
})
export class ExampleEntryContextComponent {

    readonly entries: Entry[] = [
        {
            name: "Apple",
            value: 55,
            color: "red"
        },
        {
            name: "Banana",
            value: 72,
            color: "yellow"
        },
        {
            name: "Lemon",
            value: 485,
            color: "yellow"
        },
        {
            name: "Coconut",
            value: 37,
            color: "brown"
        },
        {
            name: "Kiwi",
            value: 0,
            color: "green"
        }
    ];

    readonly ctxMenu: ContextMenuItem<Entry>[] = [
        {
            labelTemplate: item => "Edit " + item.name,

            // When the menu item is clicked,
            // action will be invoked with the context
            // entry
            action: item => alert("Editing item\m" + JSON.stringify(item, null, 4))
        },
        {
            label: "Delete",
            action: async item => console.log(item)
        },
        {
            label: "Visible for Yellow",

            // When the menu opens, we check if isVisible returns true
            // if false, no menu item will be shown.
            isVisible: (data) => data.color == "yellow"
        },
        {
            label: "Disabled for Red",

            // When the menu opens, we check if isDisabled returns true
            // if false, the menu item will be in a `disabled` state.
            // Similar to disabled buttons and switches.
            isDisabled: (data) => data.color == "red"
        }
    ];
}
