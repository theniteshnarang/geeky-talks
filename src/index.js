import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './config'
import './assets/scss/styles.css'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { loadVideos } from './features/videos/videoSlice'
import 'react-toastify/dist/ReactToastify.min.css'

store.dispatch(loadVideos())

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <App />
            </Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)
