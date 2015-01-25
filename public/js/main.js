/* global requirejs */
/* global define */

requirejs.config({
  paths: {
    react: '../vendor/react/react-with-addons',
    reflux: '../vendor/reflux/dist/reflux',
    router: '../vendor/react-router/dist/react-router'
  }
});

define([], function() {
  console.log("Loaded main.js!");
});
