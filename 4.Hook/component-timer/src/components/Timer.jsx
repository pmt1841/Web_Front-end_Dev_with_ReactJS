import {useEffect, useState} from 'react'

function Timer() {
    const [timer, setTimer] = useState(10);


    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevState => prevState > 0 ? prevState - 1 : 0);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            Count down: {timer}
        </div>
    );
}

export default Timer