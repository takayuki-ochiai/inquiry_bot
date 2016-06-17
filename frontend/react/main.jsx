import React from 'react';
import { render } from 'react-dom';

// Redux 用ライブラリ
import { Provider } from 'react-redux';

// ルーティング用ライブラリ
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Material UI 用ライブラリ
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { indigo700, redA200 } from 'material-ui/styles/colors';

import LayoutCtrl from './containers/LayoutCtrl';
import Root from './components/Root';
import store from './store';


// Material UIを使用する場合、ReactがV1.0になるまでは必要らしい
injectTapEventPlugin();


const Layout = props => (
  <LayoutCtrl {...props} />
);

// immutable.jsとreact-router-reduxを併用する場合はselectLocationStateオプションに下記をセットする必要がある
// redux-immutableを使っていないのでstate.get('routing')ではない
const history = syncHistoryWithStore(hashHistory, store, {
  selectLocationState: state => state.routing.toJS(),
});


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo700,
    accent1Color: redA200,
  },
});

render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Root} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
