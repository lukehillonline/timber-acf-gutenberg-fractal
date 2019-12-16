import './utils/polyfil-nodeList-forEach'; // lt IE 12

export default class CodePenViewModel {
    constructor(module) {
        this.module = module;
        this.css = module.getAttribute('data-css');
        this.js = module.getAttribute('data-js');
        this.html = module.getAttribute('data-html');
        this.title = document.querySelector('.Pen-title').innerText.trim();

        this.buildQueryString();
        this.attachQueryString();
        this.clickHandler();
    }

    buildQueryString() {
        this.queryString = JSON.stringify({
            title: `Timber, ACF, Gutenberg & Fractal | ${this.title}`,
            html: this.html,
            css_external: `https://${window.location.hostname}${this.css}`,
            js_external: `https://${window.location.hostname}${this.js}`
        });
    }

    attachQueryString() {
        this.input = this.module.querySelector('.codepen-values');
        this.input.value = this.queryString;
    }

    clickHandler() {
        this.module.addEventListener('click', e => {
            e.preventDefault();
            e.currentTarget.querySelector('.codepen-form').submit();
        });
    }

    static init(module) {
        new CodePenViewModel(module);
    }
}

window.HCFractalTheme = window.HCFractalTheme || [];
window.HCFractalTheme.HCCodePen = CodePenViewModel;
