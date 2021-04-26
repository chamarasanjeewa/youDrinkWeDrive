import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({
    selector: '[spinner2]'
})

export class SpinnerDirective {
    private isHidden: boolean = true;
    private isBackground: boolean = true;

    constructor(private el: ElementRef,
        private renderer: Renderer) {
    }

    @Input('spinner2') public set isRunning(value: Object) {
        this.isHidden = value && value['isHidden'] ? true : false;
        this.isBackground = value && value['isBackground'] ? true : false;

        if (this.isHidden) {
            this.renderer.setElementClass(this.el.nativeElement, 'spinner-hide', true);
            this.renderer.setElementClass(this.el.nativeElement, 'spinner-show', false);
        }
        else {
            this.renderer.setElementClass(this.el.nativeElement, 'spinner-hide', false);
            this.renderer.setElementClass(this.el.nativeElement, 'spinner-show', true);
        }

        if (this.isBackground) {
            this.renderer.setElementClass(this.el.nativeElement, 'spinner-bg', true);
            this.renderer.setElementClass(this.el.nativeElement, 'spinner-no-bg', false);
        }
        else {
            this.renderer.setElementClass(this.el.nativeElement, 'spinner-bg', false);
            this.renderer.setElementClass(this.el.nativeElement, 'spinner-no-bg', true);
        }
    }
}