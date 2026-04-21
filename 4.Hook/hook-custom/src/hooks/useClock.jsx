import {useState, useEffect} from "react";

export default function useClock() {
    const [time, setTime] = useState("");
    const [ampm, setAmpm] = useState("");

    const updateTime = () => {
        const dateInfo = new Date();

        let hour;
        let currentHour = dateInfo.getHours();

        if (currentHour === 0) {
            hour = 12;
        } else if (currentHour > 12) {
            hour = currentHour - 12;
        } else {
            hour = currentHour;
        }

        const minute = dateInfo.getMinutes() < 10
            ? "0" + dateInfo.getMinutes()
            : dateInfo.getMinutes();

        const second = dateInfo.getSeconds() < 10
            ? "0" + dateInfo.getSeconds()
            : dateInfo.getSeconds();

        setAmpm(currentHour >= 12 ? "PM" : "AM");
        setTime(`${hour}:${minute}:${second}`);
    }

    useEffect(() => {
        updateTime();
        const timer = setInterval(updateTime, 1000);

        return () => clearInterval(timer);
    });

    return [time, ampm];
}