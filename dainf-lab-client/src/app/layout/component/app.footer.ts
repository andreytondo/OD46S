import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        Sistema de Gerenciamento da Sala de Apoio do DAINF -
        <a href="https://www.utfpr.edu.br" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">UTFPR</a>
    </div>`
})
export class AppFooter {}
