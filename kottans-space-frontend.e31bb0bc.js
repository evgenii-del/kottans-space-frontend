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
})({"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomInt = getRandomInt;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

if (module.not) {
  module.not.accept();
}

window.dataStore = {
  rockets: [],
  selectedRocket: 'Falcon 1',
  missions: [],
  selectedMission: 'Thaicom',
  histories: [],
  isDataLoading: false,
  error: null
};

function renderApp() {
  document.getElementById('app-root').innerHTML = `${App()}`;
}

window.renderApp = renderApp;

function getRockets() {
  return fetch('https://api.spacexdata.com/v3/rockets').then(res => res.json()).then(res => res);
}

function getMissions() {
  return fetch('https://api.spacexdata.com/v3/missions').then(res => res.json()).then(res => res);
}

function getHistories() {
  return fetch('https://api.spacexdata.com/v3/history').then(res => res.json()).then(res => res);
}

function validateAndGetData() {
  window.dataStore.isDataLoading = true;
  window.dataStore.error = null;
  Promise.all([getRockets(), getMissions(), getHistories()]).then(values => {
    window.dataStore = _objectSpread(_objectSpread({}, window.dataStore), {}, {
      rockets: values[0],
      missions: values[1],
      histories: values[2]
    });
    window.dataStore.isDataLoading = false;
    renderApp();
  }).catch(error => {
    window.dataStore.isDataLoading = false;
    window.dataStore.error = error;
  });
}

validateAndGetData();

function RocketCard({
  rocket_name,
  description,
  flickr_images,
  wikipedia,
  height,
  diameter,
  mass
}) {
  return `<div>
            <div>
                <img src="${flickr_images[0]}" alt="${rocket_name}">
                <p>${description}</p>
            </div>
            <div>
                <h3><a href="${wikipedia}">${rocket_name}</a></h3>
                <table>
                    <tbody>
                        <tr>
                            <td>HEIGHT:</td>
                            <td>${height.meters} m</td>
                        </tr>
                        <tr>
                            <td>DIAMETER:</td>
                            <td>${diameter.meters} m</td>
                        </tr>
                        <tr>
                            <td>MASS:</td>
                            <td>${mass.kg} kg</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>`;
}

const selectRocket = rocket => {
  window.dataStore.selectedRocket = rocket;
  renderApp();
};

function Rockets() {
  const {
    rockets
  } = window.dataStore;
  return `<div>
        <h2>Rockets</h2>
        <div>
        ${rockets.map(({
    rocket_name
  }) => `<label>${rocket_name}<input type="radio" value="${rocket_name}" name="missions" onchange="(${selectRocket})(this.value);" ${rocket_name === window.dataStore.selectedRocket ? 'checked' : ''}/></label>`)}
        </div>
       ${RocketCard(rockets.find(({
    rocket_name
  }) => rocket_name === window.dataStore.selectedRocket))}
    </div>`;
}

function MissionCard({
  wikipedia,
  mission_name,
  description
}) {
  return `<div>
            <a href="${wikipedia}">${mission_name}</a>
            <p>${description}</p>
        </div>`;
}

const selectMission = mission => {
  window.dataStore.selectedMission = mission;
  renderApp();
};

function Missions() {
  const {
    missions
  } = window.dataStore;
  return `<div>
        <h2>Missions</h2>
        <div>
        ${missions.map(({
    mission_name
  }) => `<label>${mission_name}<input type="radio" value="${mission_name}" name="rockets" ${mission_name === window.dataStore.selectedMission ? 'checked' : ''} onchange="(${selectMission})(this.value);"/></label>`)}
        </div>
        ${MissionCard(missions.find(({
    mission_name
  }) => mission_name === window.dataStore.selectedMission))}
    </div>`;
}

function Event() {
  const randomId = (0, _utils.getRandomInt)(window.dataStore.histories.length);
  const event = window.dataStore.histories[randomId];
  return `<div>
      <h2>Random event</h2>
      <div>
          <p>${event.title}</p>
          <p>${event.details}</p>
      </div>
  </div>`;
}

function App() {
  if (window.dataStore.isDataLoading) {
    return `<div>Loading...</div>`;
  } else {
    return `<div>
        <h1>SpaceX info app</h1>
        ${Rockets()}
        <hr>
        ${Missions()}
        <hr>
        ${Event()}
    </div>`;
  }
}
},{"./utils":"utils.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52153" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/kottans-space-frontend.e31bb0bc.js.map