import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App/App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { StoreContext } from 'redux-react-hook';
import reducers from 'store/reducers';

import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

let theme = createMuiTheme({
  palette: {
    primary: { main: '#ffca28' },
    secondary: { main: '#ffc400' }
  }
});
theme = responsiveFontSizes(theme);

const store = createStore(reducers);
store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StoreContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
