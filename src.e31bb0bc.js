// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"framework/hooks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFunctionElement = createFunctionElement;
exports.useState = useState;
exports.useEffect = useEffect;
exports.useContext = exports.current = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const current = {
  shouldReRender: true,
  wipComponent: null,
  hookIndex: null
};
exports.current = current;

function createFunctionElement(tag, props, children) {
  current.wipComponent = tag;
  current.hookIndex = 0;
  current.wipComponent.hooks = current.wipComponent.hooks || [];
  return tag(_objectSpread(_objectSpread({}, props), {}, {
    children
  }), children);
}

function useState(initial) {
  const {
    wipComponent,
    hookIndex
  } = current;
  const oldHook = wipComponent.hooks[hookIndex];
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: []
  };
  const actions = oldHook ? oldHook.queue : [];
  actions.forEach(action => {
    hook.state = typeof action === 'function' ? action(hook.state) : action;
  });

  const setState = action => {
    current.shouldReRender = true;
    hook.queue.push(action);
  };

  wipComponent.hooks[hookIndex] = hook;
  current.hookIndex++;
  return [hook.state, setState];
}

function useEffect(effect, deps) {
  const {
    wipComponent,
    hookIndex
  } = current;
  const oldHook = wipComponent.hooks[hookIndex];
  const oldDeps = oldHook ? oldHook.deps : undefined;
  const hasChanged = hasDepsChanged(oldDeps, deps);
  current.hookIndex++;
  if (!hasChanged) return;

  if (oldHook && oldHook.unmount) {
    window.removeEventListener('beforeunload', oldHook.unmount);
  }

  wipComponent.hooks[hookIndex] = {
    unmount: effect(),
    deps
  };
  window.addEventListener('beforeunload', wipComponent.hooks[hookIndex].unmount);
}

const hasDepsChanged = (prevDeps, nextDeps) => !prevDeps || !nextDeps || prevDeps.length !== nextDeps.length || prevDeps.some((dep, index) => dep !== nextDeps[index]);

const useContext = Context => Context.value;

exports.useContext = useContext;
},{}],"framework/element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFragment = exports.createElement = void 0;

var _hooks = require("./hooks");

/**
 * Creates DOM Node. Implements jsx-parser's createElement API
 * @param {string|Function} tag - HTML tag as string or Component function
 * @param {object} props - element properties as parsed by jsx-parser
 * @param {Node[]} children - child elements
 * @returns {DocumentFragment|Element}
 */
const createElement = (tag, props, ...children) => {
  if (typeof tag === 'function') {
    /*
      Passing children as the 2nd argument is required as jsx transformer puts component functions
      and regular tags in wrapper functions that expect children as the 2nd param
     */
    return (0, _hooks.createFunctionElement)(tag, props, children);
  }

  const element = tag === '' ? new DocumentFragment() : document.createElement(tag);
  Object.entries(props || {}).forEach(([name, value]) => {
    if (name.startsWith('on') && name.toLowerCase() in window) {
      element.addEventListener(name.toLowerCase().substr(2),
      /** @type {Function} */
      value);
    } else {
      try {
        if (!(element instanceof DocumentFragment)) {
          // Boolean attributes are considered to be true if they're present on the element at all, regardless of their actual value
          // https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute#example
          if (['disabled', 'checked'].includes(name) && !value) {
            element.removeAttribute(name);
          } else {
            element.setAttribute(name, value);
          }
        }
      } catch (e) {
        console.error('createElement caught', e, 'on', element);
      }
    }
  });
  children.forEach(child => appendChild(element, child));
  return element;
};
/**
 * Appends child elements from an unbound array of children, recursively
 * @param {Node} parent
 * @param {Node|[Node]} child
 */


exports.createElement = createElement;

const appendChild = (parent, child) => {
  if (Array.isArray(child)) {
    child.forEach(subChild => appendChild(parent, subChild));
  } else {
    // Skip null and undefined
    if (child != null) {
      parent.appendChild(child.nodeType ? child : document.createTextNode(child.toString()));
    }
  }
};
/**
 * Creates Fragment. Implements jsx-parser's createFragment API
 * @param {object} props - effectively a placeholder, fragment never has any properties
 * @param {Node[]} children - child elements
 * @returns {DocumentFragment}
 */


const createFragment = (props, ...children) => createElement('', props, ...children);

exports.createFragment = createFragment;
},{"./hooks":"framework/hooks.js"}],"framework/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;
exports.default = void 0;

var _element = require("./element");

var _hooks = require("./hooks");

/** @jsx createElement */

/*** @jsxFrag createFragment */

/**
 * Renders a component and attaches it to the target DOM element
 * @param Component - function
 * @param target - DOM element to attach component to
 */
let timer;

function render(Component, target) {
  function workLoop() {
    if (_hooks.current.shouldReRender) {
      _hooks.current.shouldReRender = false;
      target.replaceChildren((0, _element.createElement)(Component, null));
    }

    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(workLoop);
  }

  timer = requestAnimationFrame(workLoop);
}

var _default = render;
exports.default = _default;
},{"./element":"framework/element.js","./hooks":"framework/hooks.js"}],"framework/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createElement", {
  enumerable: true,
  get: function () {
    return _element.createElement;
  }
});
Object.defineProperty(exports, "createFragment", {
  enumerable: true,
  get: function () {
    return _element.createFragment;
  }
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function () {
    return _render.render;
  }
});
Object.defineProperty(exports, "useState", {
  enumerable: true,
  get: function () {
    return _hooks.useState;
  }
});
Object.defineProperty(exports, "useEffect", {
  enumerable: true,
  get: function () {
    return _hooks.useEffect;
  }
});
exports.default = void 0;

var _element = require("./element");

var _render = require("./render");

var _hooks = require("./hooks");

var _default = {
  createElement: _element.createElement,
  createFragment: _element.createFragment,
  useState: _hooks.useState,
  useEffect: _hooks.useEffect,
  render: _render.render
};
exports.default = _default;
},{"./element":"framework/element.js","./render":"framework/render.js","./hooks":"framework/hooks.js"}],"data/spaceXAPI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRockets = getRockets;
exports.getMissions = getMissions;
exports.getLandpads = getLandpads;
exports.getHistories = getHistories;

function getRockets() {
  return fetch('https://api.spacexdata.com/v4/rockets').then(res => res.json()).then(res => res);
}

function getMissions() {
  // return fetch('https://api.spacexdata.com/v3/missions')
  // return fetch('https://api.spacexdata.com/v3/missions')
  //   .then(res => res.json())
  //   .then(res => res);
  return [];
}

function getLandpads() {
  return fetch('https://api.spacexdata.com/v4/landpads').then(res => res.json()).then(res => res);
}

function getHistories() {
  return fetch('https://api.spacexdata.com/v4/history').then(res => res.json()).then(res => res);
}
},{}],"data/spaceData.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAndGetData = validateAndGetData;

var _render = _interopRequireDefault(require("../framework/render"));

var _spaceXAPI = require("./spaceXAPI");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function validateAndGetData() {
  window.dataStore.isDataLoading = true;
  window.dataStore.error = null;
  Promise.all([(0, _spaceXAPI.getRockets)(), (0, _spaceXAPI.getLandpads)(), (0, _spaceXAPI.getHistories)()]).then(values => {
    window.dataStore = _objectSpread(_objectSpread({}, window.dataStore), {}, {
      rockets: values[0],
      missions: values[1],
      histories: values[2]
    });
    window.dataStore.isDataLoading = false;
    (0, _render.default)();
  }).catch(error => {
    window.dataStore.isDataLoading = false;
    window.dataStore.error = error;
    (0, _render.default)();
  });
}
},{"../framework/render":"framework/render.js","./spaceXAPI":"data/spaceXAPI.js"}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"components/RocketCard/RocketCard.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "rocket__card": "_rocket__card_bea2e",
  "card__image": "_card__image_bea2e",
  "card__content": "_card__content_bea2e",
  "card__description": "_card__description_bea2e",
  "card__title": "_card__title_bea2e",
  "card__table": "_card__table_bea2e",
  "card__td": "_card__td_bea2e"
};
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"components/RocketCard/RocketCard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RocketCard = RocketCard;

var _element = require("../../framework/element");

var _RocketCard = _interopRequireDefault(require("./RocketCard.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx createElement */

/** @jsxFrag createFragment */
function RocketCard({
  name,
  description,
  flickr_images,
  wikipedia,
  height,
  diameter,
  mass
}) {
  return (0, _element.createElement)("div", {
    className: _RocketCard.default.rocket__card
  }, (0, _element.createElement)("img", {
    className: _RocketCard.default.card__image,
    src: flickr_images[0],
    alt: name
  }), (0, _element.createElement)("div", {
    className: _RocketCard.default.card__content
  }, (0, _element.createElement)("h3", {
    className: _RocketCard.default.card__title
  }, (0, _element.createElement)("a", {
    href: wikipedia
  }, name)), (0, _element.createElement)("p", {
    className: _RocketCard.default.card__description
  }, description), (0, _element.createElement)("table", {
    className: _RocketCard.default.card__table
  }, (0, _element.createElement)("tbody", null, (0, _element.createElement)("tr", null, (0, _element.createElement)("td", {
    className: _RocketCard.default.card__td
  }, "HEIGHT:"), (0, _element.createElement)("td", {
    className: _RocketCard.default.card__td
  }, height.meters, " m")), (0, _element.createElement)("tr", null, (0, _element.createElement)("td", {
    className: _RocketCard.default.card__td
  }, "DIAMETER:"), (0, _element.createElement)("td", {
    className: _RocketCard.default.card__td
  }, diameter.meters, " m")), (0, _element.createElement)("tr", null, (0, _element.createElement)("td", {
    className: _RocketCard.default.card__td
  }, "MASS:"), (0, _element.createElement)("td", {
    className: _RocketCard.default.card__td
  }, mass.kg, " kg"))))));
}
},{"../../framework/element":"framework/element.js","./RocketCard.css":"components/RocketCard/RocketCard.css"}],"components/Rockets/Rockets.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "rockets__menu": "_rockets__menu_795d5",
  "rockets__label": "_rockets__label_795d5",
  "rockets__label_active": "_rockets__label_active_795d5",
  "rockets__input": "_rockets__input_795d5"
};
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"components/Rockets/Rockets.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rockets = Rockets;

var _framework = require("../../framework");

var _RocketCard = require("../RocketCard/RocketCard");

var _Rockets = _interopRequireDefault(require("./Rockets.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx createElement */

/** @jsxFrag createFragment */
function Rockets() {
  const [selectedRocket, setSelectedRocket] = (0, _framework.useState)('Falcon 1');
  const [rockets, setRockets] = (0, _framework.useState)();

  const selectRocket = rocket => {
    setSelectedRocket(rocket);
  };

  (0, _framework.useEffect)(() => {
    fetch('https://api.spacexdata.com/v4/rockets').then(res => res.json()).then(res => setRockets(res));
  }, []);
  return (0, _framework.createElement)("div", null, (0, _framework.createElement)("h2", null, "Rockets"), (0, _framework.createElement)("div", {
    className: _Rockets.default.rockets__menu
  }, rockets && rockets.map(({
    name
  }) => (0, _framework.createElement)("label", {
    className: name === selectedRocket ? [_Rockets.default.rockets__label, _Rockets.default.rockets__label_active] : _Rockets.default.rockets__label
  }, (0, _framework.createElement)("span", null, name), (0, _framework.createElement)("input", {
    className: _Rockets.default.rockets__input,
    type: "radio",
    value: name,
    name: "missions",
    onChange: ({
      target
    }) => selectRocket(target.value),
    checked: name === selectedRocket
  })))), rockets && rockets.length ? (0, _RocketCard.RocketCard)(rockets.find(({
    name
  }) => name === selectedRocket)) : (0, _framework.createElement)("p", null, "No rockets"));
}
},{"../../framework":"framework/index.js","../RocketCard/RocketCard":"components/RocketCard/RocketCard.js","./Rockets.css":"components/Rockets/Rockets.css"}],"components/MissionCard/MissionCard.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "card__title": "_card__title_fc7ba"
};
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"components/MissionCard/MissionCard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MissionCard = MissionCard;

var _element = require("../../framework/element");

var _MissionCard = _interopRequireDefault(require("./MissionCard.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx createElement */

/** @jsxFrag createFragment */
function MissionCard({
  wikipedia,
  full_name,
  details
}) {
  return (0, _element.createElement)("div", null, (0, _element.createElement)("h3", {
    className: _MissionCard.default.card__title
  }, (0, _element.createElement)("a", {
    href: wikipedia
  }, full_name)), (0, _element.createElement)("p", null, details));
}
},{"../../framework/element":"framework/element.js","./MissionCard.css":"components/MissionCard/MissionCard.css"}],"components/Missions/Missions.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "missions__menu": "_missions__menu_0f4fc",
  "missions__label": "_missions__label_0f4fc",
  "missions__label_active": "_missions__label_active_0f4fc",
  "missions__input": "_missions__input_0f4fc"
};
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"components/Missions/Missions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Missions = Missions;

var _framework = require("../../framework");

var _MissionCard = require("../MissionCard/MissionCard");

var _Missions = _interopRequireDefault(require("./Missions.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx createElement */

/** @jsxFrag createFragment */
function Missions() {
  const [selectedMission, setSelectedMission] = (0, _framework.useState)('Landing Zone 1');
  const [missions, setMissions] = (0, _framework.useState)();

  const selectMission = mission => {
    setSelectedMission(mission);
  };

  (0, _framework.useEffect)(() => {
    fetch('https://api.spacexdata.com/v4/landpads').then(res => res.json()).then(res => setMissions(res));
  }, []);
  return (0, _framework.createElement)("div", null, (0, _framework.createElement)("h2", null, "Missions"), (0, _framework.createElement)("div", {
    className: _Missions.default.missions__menu
  }, missions && missions.map(({
    full_name,
    name
  }) => (0, _framework.createElement)("label", {
    className: full_name === selectedMission ? [_Missions.default.missions__label, _Missions.default.missions__label_active] : _Missions.default.missions__label
  }, (0, _framework.createElement)("span", null, name), (0, _framework.createElement)("input", {
    className: _Missions.default.missions__input,
    type: "radio",
    value: full_name,
    name: "rockets",
    onChange: ({
      target
    }) => selectMission(target.value),
    checked: full_name === selectedMission
  })))), missions && missions.length ? (0, _MissionCard.MissionCard)(missions.find(({
    full_name
  }) => full_name === selectedMission)) : `<p>No missions</p>`);
}
},{"../../framework":"framework/index.js","../MissionCard/MissionCard":"components/MissionCard/MissionCard.js","./Missions.css":"components/Missions/Missions.css"}],"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomInt = getRandomInt;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
},{}],"components/Event/Event.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "event": "_event_5ccc6",
  "event__title": "_event__title_5ccc6"
};
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"components/Event/Event.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Event = Event;

var _framework = require("../../framework");

var _utils = require("../../utils");

var _Event = _interopRequireDefault(require("./Event.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx createElement */

/** @jsxFrag createFragment */
function Event() {
  const [event, setEvent] = (0, _framework.useState)();
  (0, _framework.useEffect)(() => {
    fetch('https://api.spacexdata.com/v4/history').then(res => res.json()).then(res => {
      const randomId = (0, _utils.getRandomInt)(res.length);
      setEvent(res[randomId]);
    });
  }, []);

  if (event) {
    return (0, _framework.createElement)("div", {
      className: _Event.default.event
    }, (0, _framework.createElement)("h2", {
      className: _Event.default.event__title
    }, event.title), (0, _framework.createElement)("p", null, event.details));
  }

  return (0, _framework.createElement)("p", null, "No events");
}
},{"../../framework":"framework/index.js","../../utils":"utils.js","./Event.css":"components/Event/Event.css"}],"components/App.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "wrapper": "_wrapper_9de3c"
};
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"components/App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = App;

var _framework = require("../framework");

var _Rockets = require("./Rockets/Rockets");

var _Missions = require("./Missions/Missions");

var _Event = require("./Event/Event");

var _App = _interopRequireDefault(require("./App.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx createElement */

/** @jsxFrag createFragment */
function App() {
  return (0, _framework.createElement)("div", {
    className: _App.default.wrapper
  }, (0, _framework.createElement)("h1", null, "SpaceX info app"), (0, _framework.createElement)(_Rockets.Rockets, null), (0, _framework.createElement)(_Missions.Missions, null), (0, _framework.createElement)(_Event.Event, null));
}
},{"../framework":"framework/index.js","./Rockets/Rockets":"components/Rockets/Rockets.js","./Missions/Missions":"components/Missions/Missions.js","./Event/Event":"components/Event/Event.js","./App.css":"components/App.css"}],"index.js":[function(require,module,exports) {
"use strict";

var _framework = require("./framework");

var _spaceData = require("./data/spaceData");

var _App = require("./components/App");

if (module.not) {
  module.not.accept();
}

(0, _framework.render)(_App.App, document.getElementById('app-root')); // validateAndGetData();
},{"./framework":"framework/index.js","./data/spaceData":"data/spaceData.js","./components/App":"components/App.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64858" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map