import {
	animation,
	trigger,
	animateChild,
	group,
	transition,
	animate,
	style,
	query,
	stagger,
	state,
	sequence
} from "@angular/animations";

export const transitionAnimation = animation([
	style({
		height: "{{ height }}",
		opacity: "{{ opacity }}",
		backgroundColor: "{{ backgroundColor }}"
	}),
	animate("{{ time }}")
]);

// Routable animations
export const slideInAnimation = trigger("routeAnimations", [
	transition("out <=> ", [
		style({ position: "relative" }),
		query(":enter, :leave", [
			style({
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%"
			})
		]),
		query(":enter", [style({ left: "-100%" })]),
		query(":leave", animateChild()),
		group([
			query(":leave", [
				animate(
					"300ms ease-out",
					style({ left: "100%" })
				)
			]),
			query(":enter", [
				animate("300ms ease-out", style({ left: "0%" }))
			])
		]),
		query(":enter", animateChild())
	]),
	transition("in <=> out", [
		style({ position: "relative" }),
		query(":enter, :leave", [
			style({
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%"
			})
		]),
		query(":enter", [style({ left: "-100%" })]),
		query(":leave", animateChild()),
		group([
			query(":leave", [
				animate(
					"200ms ease-out",
					style({ left: "100%" })
				)
			]),
			query(":enter", [
				animate("300ms ease-out", style({ left: "0%" }))
			])
		]),
		query(":enter", animateChild())
	])
]);
// export const listAnimation = trigger("toggleOpenClose", [
// 	transition(':enter', [
// 		query('nav-routing', [
// 		style({ transform: "translateY(0%)"}),
//           stagger(300, [animate('300ms ease-out', style({ transform: "translateY(200%)" }))])
//      	])
// 	]),
// 	transition('out => in', [
// 		query(':leave', [
// 		style({ transform: "translateY(200%)"}),
//           stagger(300, [animate('300ms ease-out', style({ transform: "translateY(0%)" }))])
//      	])
// 	])
//  ])