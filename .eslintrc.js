module.exports = {
  "extends": "standard",

  globals: {
    "alert": true,
    "console": true,
    "jQuery": true,
    "$": true,
    "RAUL": true,
    "Document": true,
    "DocumentFragment": true,
    "Element": true,
    "HTMLElement": true,
    "Node": true,
    "NodeList": true,
    "Event": true,
    "CustomEvent": true,
    "Dropzone": true,
  },

  rules: {
    "space-before-function-paren": ["error", {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always",
    }],

    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "never",
      "exports": "never",
      "functions": "never",
    }],
  },

  "overrides": [
    {
      "files": [
        "js/components/header.js",
        "js/components/left-navigation.js",
        "js/components/list-groups.js",
        "js/components/messages.js",
        "js/components/nav.js",
        "js/components/page-header.js",
        "js/components/qa.js",
      ],

      "rules": {
        // TODO: temporarily turned off to avoid beaking functionality in initial
        //       refactor.  this should be revisited and fixed
        "eqeqeq": ["off"],

        // TODO: temporarily turned off to avoid beaking functionality in initial
        //       refactor.  this should be revisited and fixed
        "no-unused-vars": ["off"],

        // Decision made to include this due to browser restrictions and problems
        // when using unminified code
        "semi": ["error", "always"],
      },
    },
  ],
};
