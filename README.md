# Gulp, SASS and Babel Demo
 ### Installation
 * Clone the repository and open up the bash console in root of directory.
 * Open the bash console and type ```npm install``` to install all the dependecies.
 * There are three main gulp tasks they are the development, optimization and the babel task.
 * The development tasks include CSS to SCSS compilation, watching files for changes, autoprefixing vendor code and live browser sync.
 * The optimization tasks include concatenation of CSS and JS files, conversion of JavaScript ES6 to browser compatible ES5 code using        Babel, optimizing images and copying fonts to distribution directory.
 
 ### Running Tasks
 * Development task is the default task so run using ```gulp``` command.
 * Run optimization task using ```gulp build``` command in the console.
 * Clean distribution directory using ```clean:dist``` command.
 * Clear the image cache using ```cahce:clear``` command.
 
 ### List of gulp plugins used
 * gulp-sass [link](https://www.npmjs.com/package/gulp-sass)
 * browser-sync [link](https://www.npmjs.com/package/browser-sync)
 * gulp-useref [link](https://www.npmjs.com/package/gulp-useref)
 * gulp-uglifyes [link](https://www.npmjs.com/package/gulp-uglifyes)
 * gulp-cssnano [link](https://www.npmjs.com/package/gulp-cssnano)
 * gulp-if [link](https://www.npmjs.com/package/gulp-if)
 * gulp-imagemin [link](https://www.npmjs.com/package/gulp-imagemin)
 * gulp-cache [link](https://www.npmjs.com/package/gulp-cache)
 * del [link](https://www.npmjs.com/package/del)
 * run-sequence [link](https://www.npmjs.com/package/run-sequence)
 * gulp-autoprefixer [link](https://www.npmjs.com/package/gulp-autoprefixer)
 * gulp-sourcemaps [link](https://www.npmjs.com/package/gulp-sourcemaps)
 * gulp-babel [link](https://www.npmjs.com/package/gulp-babel)
 
 ### Plugin installation
 Use the following command -
 ```npm install plugin-name --save-dev```
