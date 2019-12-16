import './code-snippets';
import './codepen';

import { componentIterator, listenForDynamicComponents } from './utils/componentIterator';

document.addEventListener('DOMContentLoaded', () => {

    window.resizeIframe = function resizeIframe(iframe) {
        const iframeObj = iframe;
        iframeObj.style.height = `${iframe.contentWindow.document.body.scrollHeight}px`;
    };

    componentIterator();
    listenForDynamicComponents();

});
