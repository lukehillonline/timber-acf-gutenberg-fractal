import { addClass, removeClass } from './utils/classModifiers';
import './utils/polyfil-nodeList-forEach'; // lt IE 12

export default class CodeSnippetsViewModel {
    constructor(module) {
        this.module = module;
        this.moduleNav = this.getNav();
        this.moduleNavLinks = this.getNavLinks();
        this.hookNavLinkClick();
    }

    getNav() {
        return this.module.querySelector('#code-snippets__nav');
    }

    getNavLinks() {
        return this.moduleNav.querySelectorAll('.code-snippets__nav-link');
    }

    hookNavLinkClick() {
        this.moduleNavLinks.forEach(navLink => {
            navLink.addEventListener(
                'click',
                e => {
                    e.preventDefault();
                    this.handleNavClick(navLink);
                },
                this
            );
        });
    }

    handleNavClick(navLink) {
        const panelID = CodeSnippetsViewModel.getPannelID(navLink);
        const panel = CodeSnippetsViewModel.getPannel(panelID);
        const isActive = navLink.classList.contains('active-panel');

        this.clearAllPanels();

        if (!isActive) {
            addClass(navLink.parentElement, 'active-panel');
            addClass(navLink, 'active-panel');
            addClass(panel, 'active-panel');
        }
    }

    clearAllPanels() {
        const activeItems = this.module.querySelectorAll('.active-panel');

        activeItems.forEach(item => {
            removeClass(item, 'active-panel');
        });
    }

    static getPannelID(element) {
        return element.getAttribute('href');
    }

    static getPannel(elementID) {
        return document.querySelector(elementID);
    }

    static init(module) {
        new CodeSnippetsViewModel(module);
    }
}

window.HCFractalTheme = window.HCFractalTheme || [];
window.HCFractalTheme.HCCodeSnippets = CodeSnippetsViewModel;
