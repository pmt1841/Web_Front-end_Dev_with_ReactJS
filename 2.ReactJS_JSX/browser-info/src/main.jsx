import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
const element = (<h4 style={{textAlign: "center"}}>Browser's details: {navigator.userAgent}</h4>);
root.render(element);
