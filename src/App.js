import React from "react";
import Main from "./Component/Main";
import {BrowserRouter} from 'react-router-dom'; // 추가
import {Provider} from 'react-redux';
import store from './auth/store';

const App = () => {
    return (


    <Provider store={store}>]
        <BrowserRouter basename="/">
            <div className="App">
                <Main/>
            </div>
        </BrowserRouter>
    </Provider>
)
    ;
};

export default App;
