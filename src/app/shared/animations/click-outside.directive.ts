import {
	Directive,
	ElementRef,
	EventEmitter,
	HostListener,
	Output
} from "@angular/core";
import { fromEvent } from "rxjs";
import { first, take } from "rxjs/operators";

@Directive({
	selector: "[clickOutside]"
})
export class ClickOutsideDirective {
	@Output() clickOutside = new EventEmitter();

	captured = false;

	constructor(private elRef: ElementRef) {}

	@HostListener("document:click", ["$event.target"])
	onClick(target: any) {
		if (!this.captured) {
			return;
		}

		if (!this.elRef.nativeElement.contains(target)) {
			this.clickOutside.emit();
		}
	}

	ngOnInit() {
		console.log(this.captured);
		fromEvent(document, "click", { capture: true })
			.pipe(take(1))
			.subscribe(() => (this.captured = true));
	}
}
