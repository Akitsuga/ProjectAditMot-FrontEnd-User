import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux' 
import {Provider} from 'react-redux' 
import thunk from 'redux-thunk' // untuk menjalankan Middleware, jangan lupa ditambahkan applyMiddleware

import App from './components/App'
import reducers from './reducers'

const store = createStore(reducers,applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
    document.querySelector("#root") 
)