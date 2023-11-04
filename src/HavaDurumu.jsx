import { useEffect, useState } from "react";

export default function HavaDurumu() {

    // const apiKey = 'cc0f73afcaf54266a8431cacb2fb13d4';

    // const lat = 40.1553; // Çanakkale'nin enlem koordinatı
    // const lon = 26.4142; // Çanakkale'nin boylam koordinatı
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=40.1553&lon=26.4142&appid=69acef542b7c3c50faab92f72b95ae5f`;

        
    const [location, setLocation] = useState('')
    const [weather, setWeather] = useState('')
    const [temperature, setTemperature] = useState('')

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(apiUrl);
                if (response.ok) {
                    const data = await response.json();
                    setLocation(data.name); // Şehir adı
                    setWeather(data.weather[0].description); // Hava durumu açıklaması
                    setTemperature((data.main.temp - 273.15).toFixed(2));

                } else {
                    console.error('Hava durumu verileri alınamadı.');
                }
            } catch (error) {
                console.error('Hava durumu verileri alınırken hata oluştu:', error);
            }
        };

        fetchWeather();
    }, [])




    return (
        <>
            <h3>Hava Durumu</h3>
            <p>Konum: {location}</p>
            <p>Hava Durumu: {weather}</p>
            <p>Sıcaklık: {temperature}°C</p>
        </>
    )
}