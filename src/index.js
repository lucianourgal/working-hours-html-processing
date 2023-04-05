import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as amplitude from '@amplitude/analytics-browser';

amplitude.init('7060b16e018f5be92b37b3c54c951e6d', undefined, { defaultTracking: { sessions: true, pageViews: true, formInteractions: true, fileDownloads: true }});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
