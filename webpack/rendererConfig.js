/**
 * @file Renderer configuration variables.
 */

const glob = require('glob')

/**
 * Common configuration variables.
 */
const config = require('./config')
/**
 * Absolute path to root folder.
 * @type {String}
 */
const root = require('./root')
/**
 * HTML files.
 * @type {Array}
 */
const htmlFiles = glob.sync(`${root}/src/renderer/*.@(html|pug)`)

module.exports = {
  browsers: ['Chrome >= 56'], // Electron's browser compatibility.
  entry: {
    app: [`${root}/src/renderer/js/app.js`, ...htmlFiles] // Adds HTML files (or equivalent) as entry points.
  },
  output: `${config.output}/renderer`,
  historyApiFallback: false,
  loaders: {
    // sass-loader options.
    sass: {
      includePaths: [
        ...require('bourbon').includePaths, // Bourbon files' path.
        `${root}/src/renderer/css`,
        `${root}/node_modules`
      ],
      indentWidth: 2,
      outputStyle: 'expanded'
    }
  },
  optimize: {
    imagemin: {
      gifsicle: {
        interlaced: true,
        optimizationLevel: 3
      },
      jpegtran: {
        progressive: true
      },
      optipng: {
        optimizationLevel: 5
      },
      svgo: {
        optimizationLevel: 5
      }
    }
  }
}
