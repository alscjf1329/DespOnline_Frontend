import React from "react";
import Main from "./Component/Main";
import { Provider } from 'react-redux';
import store from './auth/store';

const App = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <Main/>
            </div>
        </Provider>
    );
};

export default App;
