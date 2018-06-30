import App from 'fusion-react';
import { FetchToken } from 'fusion-tokens';
import Router from 'fusion-plugin-react-router';
import UniversalEvents, { UniversalEventsToken } from 'fusion-plugin-universal-events';
import Styletron from 'fusion-plugin-styletron-react';
import fetch from 'unfetch';

// Redux
import Redux, {
  ReduxToken,
  ReducerToken,
  EnhancerToken,
  GetInitialStateToken,
} from 'fusion-plugin-react-redux';
import ReduxActionEmitterEnhancer from 'fusion-plugin-redux-action-emitter-enhancer';

// I18n
import I18n, {
  I18nToken,
  I18nLoaderToken
} from 'fusion-plugin-i18n-react';

// Local
import root from './root.js';
import getInitialState from './initialState.js';
import reducers from './reducers';
import TodoPlugin from './plugins/TodoPlugin';
import TodoI18nLoader from './plugins/TodoI18nLoader';

export default () => {
  const app = new App(root);

  app.register(UniversalEventsToken, UniversalEvents);
  app.register(Router);
  app.register(Styletron);

  // Enable Redux and initial state hydration
  app.register(ReduxToken, Redux);
  app.register(EnhancerToken, ReduxActionEmitterEnhancer);
  app.register(ReducerToken, reducers);
  __NODE__ && app.register(GetInitialStateToken, getInitialState);

  // Enable I18N
  app.register(I18nToken, I18n);
  __NODE__ && app.register(I18nLoaderToken, TodoI18nLoader());
  __BROWSER__ && app.register(FetchToken, fetch);

  // Enable custom TodoPlugin for styling and i18n logic
  __NODE__ && app.register(TodoPlugin);

  return app;
};

