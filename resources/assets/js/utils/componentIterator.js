require('mutationobserver-shim'); // Polyfill for IE10

function runComponent(node) {
    const name = node.getAttribute('data-module');
    const nameSpace = name.substring(0, 3);

    if (nameSpace === 'TAGF') {
        window.TAGF[name].init(node);
    }
}

export function componentIterator() {
    const elements = document.querySelectorAll('[data-module]');

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        runComponent(element);
    }
}
