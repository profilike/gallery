import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[vpbDropdown]'
})

export class DropdownDirective {
    @HostBinding('class.collapsed') isOpen = true;
    
    @HostListener('click') onclick() {
        this.isOpen = !this.isOpen
    }
}