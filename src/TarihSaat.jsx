import { useEffect, useState } from "react";

export default function TarihSaat() {


    const WEEK = ["SUNDAY (pazar)", "MONDAY (pazartesi)", "TUESDAY (salı)", "WEDNESDAY (çarşamba)", "THURSDAY (perşembe)", "FRIDAY (cuma)", "SATURDAY (cumartesi)"];

    const [time, setTime] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();

            setTime(
                zeroPadding(now.getHours(), 2) + ":" +
                zeroPadding(now.getMinutes(), 2) + ":" +
                zeroPadding(now.getSeconds(), 2)
            );

            setDate(
                now.getFullYear() + "-" +
                zeroPadding(now.getMonth() + 1, 2) + "-" +
                zeroPadding(now.getDate(), 2) + " " + 
                WEEK[now.getDay()]
            );
        };

        updateTime();
        const intervalid = setInterval(updateTime, 1000)

        return() => {
            clearInterval(intervalid)
        }
    }, [])


    function zeroPadding(num, digit) {
        return String(num).padStart(digit, '0');
    }


    return(
        <>
            <div className="clock">
                <p id="time">{date}</p>
                <p id="date">{time}</p>
            </div>
        </>
    )
}

