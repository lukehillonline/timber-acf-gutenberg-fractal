'use strict';

const path = require('path');
const fs = require('fs');

const fractal = (module.exports = require('@frctl/fractal').create());

const mandelbrot = require('@frctl/mandelbrot');
const twigAdapter = require('@frctl/twig');
fractal.components.set('ext', '.twig');

fractal.set('project.title', 'Timber, ACF, Gutenberg & Fractal');

fractal.components.set('path', __dirname + '/resources/components');

fractal.components.set('default.status', null);

fractal.components.engine(
    twigAdapter({
        filters: {
            rev: filePath => assetManifest[filePath] || filePath
        },
        functions: {
            isBuild: () => process.argv.includes('build')
        },
        namespaces: {
            components: ''
        }
    })
);
fractal.components.set('ext', '.twig');

fractal.docs.set('path', __dirname + '/resources/docs');

fractal.web.set('static.path', __dirname + '/static');
fractal.web.set('builder.dest', __dirname + '/styleguide');

fractal.web.set('server.sync', true);
fractal.web.set('server.syncOptions', {
    notify: true,
    open: true,
    browser: ['google chrome']
});

// Custom Fractal Mandelbrot UI
const customTheme = mandelbrot({
    lang: 'en-gb',
    rtl: false,
    format: 'json',
    favicon: '/images/favicon/favicon-144x144.png',
    skin: 'default',
    nav: ['components', 'docs'],
    panels: [],
    styles: [
        'default',
        `/css/design-system.css?cachebust=${Math.round(new Date().getTime())}`
    ],
    scripts: [
        'default',
        `/js/theme.js?cachebust=${Math.round(new Date().getTime())}`
    ]
});
customTheme.addLoadPath(path.join(__dirname, '/fractal/HC-theme/views'));
fractal.web.theme(customTheme);
