import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

window.jQuery = window.$ = require('jquery/dist/jquery');
require('foundation-sites/dist/plugins/foundation.core');
require('foundation-sites/dist/plugins/foundation.util.mediaQuery.js');
require('foundation-sites/dist/plugins/foundation.util.keyboard');
require('foundation-sites/dist/plugins/foundation.util.box');
require('foundation-sites/dist/plugins/foundation.util.nest');
require('foundation-sites/dist/foundation-flex.min.css');
require('foundation-icon-fonts/foundation-icons.css');

import addMenuItem from 'actions/addMenuItem';
import createQmbApp from 'components/qmbApp';
import createBoards from 'components/boards';
import createBoard from 'components/board';
import qmbApp from 'store/reducers/qmbApp';

const store = createStore(qmbApp);
const QmbApp = createQmbApp(React);
const Boards = createBoards(React);
const Board = createBoard(React);

render(
    <Provider store={store}>
        <Router history={browserHistory} >
            <Route path="/" component={QmbApp} >
                <IndexRoute component={Boards} />
                <Route path="boards" component={Boards} />
                <Route path="boards/:boardName" component={Board} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);

store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(addMenuItem({
    text: 'Home',
    icon: 'home',
    to: '/'
}));

store.dispatch(addMenuItem({
    text: 'Boards',
    icon: 'board',
    to: '/boards'
}));

store.dispatch(addMenuItem({
    text: 'My test board',
    to: '/boards/my-test-board',
    parentId: 'menu-item-2'
}));

window.store = store;
