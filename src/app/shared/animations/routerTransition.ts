import { animate, state, style, transition, trigger } from '@angular/animations';

export function appModuleAnimation() {
    return slideFromBottom();
}

export function accountModuleAnimation() {
    return slideFromUp();
}

export function slideFromBottom() {
    return trigger('routerTransition', [
        state('void', style({ 'padding-top': '20px', opacity: '0' })),
        state('*', style({ 'padding-top': '0px', opacity: '1' })),
        transition(':enter', [
            animate('0.33s ease-out', style({ opacity: '1', 'padding-top': '0px' }))
        ])
    ]);
}

export function slideFromUp() {
    return trigger('routerTransition', [
        state('void', style({ 'transform': 'translateY(20px)', opacity: '0' })),
        transition(':enter', [
            animate('0.3s ease-in', style({ opacity: '1', 'transform': 'translateY(0)' }))
        ])
    ]);
}
