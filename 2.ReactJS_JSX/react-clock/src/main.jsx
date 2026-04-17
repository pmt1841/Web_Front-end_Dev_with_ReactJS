import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

const tick = () => {
    const now = new Date();

    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const dateString = `${day}/${month}/${year}`;

    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hour}:${minute}:${second}`;

        root.render(
            <div style={{textAlign: 'center', fontFamily: 'sans-serif', marginTop: '50px'}}>
                <h1>Hello, world!</h1>
                <h2>Today is {dateString}</h2>
                <h3>Time is {timeString}</h3>
            </div>
        );
};

setInterval(tick, 1000);