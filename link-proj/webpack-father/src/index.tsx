import React from 'react';
import ReactDOM from 'react-dom';
import {add} from 'aa-utils-lib'
function App() {
    return (
        <div>
            <h1>Hello, World! {add(1,2)}</h1>
        </div>
    );
}
ReactDOM.render(<App />, document.getElementById('root'));
