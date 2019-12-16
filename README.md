# The Timber, Advanced Custom Fields, Gutenberg and Fractal Theme

This theme is based off of the Timber Starter Theme which can be found here https://github.com/timber/starter-theme. I have kept the Timber Starter Theme README.md below as there is some important information in there.

## Features

-   [Webpack](https://webpack.github.io/) for asset bundling / optimisation etc
-   [Timber](https://www.upstatement.com/timber/) for Twig templating
-   [Fractal](https://fractal.build/) for component based development / styleguide
-   [PostCSS](https://postcss.org/) for styles, with plugins for nesting, importing and modern presents & more
-   [CSSNano](https://cssnano.co) for asset minification
-   [BrowserSync](https://www.browsersync.io/)
-   [Purgecss](https://github.com/FullHuman/purgecss) for purging tailwind / built CSS
-   [Webpack Manifest](webpack-manifest-plugin) Manifest Filter / Caching
-   [Babel](https://babeljs.io/) compiler for ES6 Javascript
-   Javascript code chunking

## Requirements

-   [Wordpress](https://wordpress.org/) >= v5.8
-   [PHP](http://php.net/manual/en/install.php) >= v7.0
-   [Yarn](https://yarnpkg.com/en/) >= v1.7.0
-   [Nodejs](https://nodejs.org/en/) >= v8.11.1

## Running Locally

-   `yarn` to install packages
-   define your local URL in `build/config.js`
-   `yarn watch` to run a development server, as well as a Fractal server alongside at a seperate port
-   `yarn prod` to build for production

## Installing the Theme

See below for the instructions on [how to install this theme](#installing-the-starter-theme).

## Directory Structure

```
├── build/
│   ├── config.js                                   # Custom asset path / devUrl
│   └── webpack.config.js                           # Webpack config

├── data/                                           # SQL database dumps

├── fractal/                                        # Fractal Custom Theme

├── resources/                                      # Templating
│   ├── assets/                                     # Front-end assets
│   │   ├── fonts/                                  # Local fonts
│   │   ├── images/                                 # Local theme imagery
│   │   ├── js/                                     # Javascripts
│   │   ├── styles/                                 # Styles
│   ├── components/                                 # Fractal / Twig Components / CSS
│   ├── docs/                                       # Fractal Documentation
│   └── views/                                      # Theme Twig files
```

---

# The Timber Starter Theme

The "\_s" for Timber: a dead-simple theme that you can build from. The primary purpose of this theme is to provide a file structure rather than a framework for markup or styles. Configure your Sass, scripts, and task runners however you would like!

[![Build Status](https://travis-ci.org/timber/starter-theme.svg)](https://travis-ci.org/timber/starter-theme)

## Installing the Starter Theme

Install this theme as you would any other, and be sure the Timber plugin is activated. But hey, let's break it down into some bullets:

1. Make sure you have installed the plugin for the [Timber Library](https://wordpress.org/plugins/timber-library/) (and Advanced Custom Fields - they [play quite nicely](https://timber.github.io/docs/guides/acf-cookbook/#nav) together).
2. Download the zip for this theme (or clone it) and move it to `wp-content/themes` in your WordPress installation.
3. Rename the folder to something that makes sense for your website (generally no spaces and all lowercase). You could keep the name `timber-starter-theme` but the point of a starter theme is to make it your own!
4. Activate the theme in Appearance > Themes.
5. Do your thing! And read [the docs](https://github.com/jarednova/timber/wiki).

## What's here?

`static/` is where you can keep your static front-end scripts, styles, or images. In other words, your Sass files, JS files, fonts, and SVGs would live here.

`templates/` contains all of your Twig templates. These pretty much correspond 1 to 1 with the PHP files that respond to the WordPress template hierarchy. At the end of each PHP template, you'll notice a `Timber::render()` function whose first parameter is the Twig file where that data (or `$context`) will be used. Just an FYI.

`bin/` and `tests/` ... basically don't worry about (or remove) these unless you know what they are and want to.

## Other Resources

The [main Timber Wiki](https://github.com/jarednova/timber/wiki) is super great, so reference those often. Also, check out these articles and projects for more info:

-   [This branch](https://github.com/laras126/timber-acf-gutenberg-fractal/tree/tackle-box) of the starter theme has some more example code with ACF and a slightly different set up.
-   [Twig for Timber Cheatsheet](http://notlaura.com/the-twig-for-timber-cheatsheet/)
-   [Timber and Twig Reignited My Love for WordPress](https://css-tricks.com/timber-and-twig-reignited-my-love-for-wordpress/) on CSS-Tricks
-   [A real live Timber theme](https://github.com/laras126/yuling-theme).
-   [Timber Video Tutorials](http://timber.github.io/timber/#video-tutorials) and [an incomplete set of screencasts](https://www.youtube.com/playlist?list=PLuIlodXmVQ6pkqWyR6mtQ5gQZ6BrnuFx-) for building a Timber theme from scratch.
