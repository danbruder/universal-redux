'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = create;

var _lodash = require('lodash');

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reactRouterRedux = require('react-router-redux');

var _reactRouter = require('react-router');

var _createMemoryHistory = require('react-router/lib/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _devtools = require('../client/devtools');

var _redux = require('redux');

var _reduxLocalstorage = require('redux-localstorage');

var _reduxLocalstorage2 = _interopRequireDefault(_reduxLocalstorage);

var _modules = require('../../../../src/redux/modules');

var _modules2 = _interopRequireDefault(_modules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hmr(store) {
  if (module.hot) {
    module.hot.accept('../../../../src/redux/modules', function () {
      var nextRootReducer = require('../../../../src/redux/modules/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }
}

// explicit path required for HMR to function. see #7


// TODO: parameterize react-router


function create(providedMiddleware, data) {
  // TODO: parameterize react-router
  var router = void 0;
  if (__CLIENT__) {
    router = (0, _reactRouterRedux.syncHistory)(_reactRouter.browserHistory);
  } else {
    router = (0, _reactRouterRedux.syncHistory)((0, _createMemoryHistory2.default)());
  }

  var defaultMiddleware = [router];

  // backward compatibility to 2.x api expecting object for middleware instead of array:
  var customMiddleware = !providedMiddleware.concat ? (0, _lodash.map)(providedMiddleware, function (m) {
    return m;
  }) : providedMiddleware;

  var middleware = customMiddleware.concat(defaultMiddleware);

  if (__CLIENT__ && __LOGGER__) {
    middleware.push((0, _reduxLogger2.default)({ collapsed: true }));
  }

  var useDevtools = __DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__;
  //const finalCreateStore = useDevtools ? composeDevtools(middleware)(createStore) : applyMiddleware(...middleware)(createStore);
  var enhancer = compose.apply(undefined, (0, _toConsumableArray3.default)(middleware).concat([(0, _reduxLocalstorage2.default)()]));

  var store = (0, _redux.createStore)(_modules2.default, data, enhancer);

  (0, _devtools.listenToRouter)(router, store);

  hmr(store);

  return store;
}