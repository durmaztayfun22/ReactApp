import React, { useEffect, useState } from 'react';

export default function Mat() {
    const url = "https://www.floatrates.com/daily/usd.json";
    const [DolarFiyati, setDolarFiyati] = useState(null);
    const [TlFiyati, setTlFiyati] = useState(null)
    const [TlDolarCeviri, setTlDolarCeviri] = useState(null)
    const [degerTL, setDegerTL] = useState("");
    const [degerDolar, setDegerDolar] = useState("");
    const [DolarTlCeviri, setDolarTlCeviri] = useState(null)
    const [pending, setPending] = useState(false)

    const DolarYazdir = async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const DolarFiyati = data.try.rate;

            // State'i güncelleyin
            setDolarFiyati(DolarFiyati);
        } catch (error) {
            console.error('Hata:', error);
        }
    };

    const TLYazdir = async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const TlFiyati = data.try.inverseRate;

            // State'i güncelleyin
            setTlFiyati(TlFiyati);
        } catch (error) {
            console.error('Hata:', error);
        }
    };

    const DolarCevir = async () => {
        try {
            setPending(true)
            const response = await fetch(url);
            const data = await response.json();
            const DolarFiyati = data.try.rate;
            const TlDolarCeviri = degerTL / DolarFiyati
            // State'i güncelleyin
            setTlDolarCeviri(TlDolarCeviri);
            setPending(false)
        } catch (error) {
            setPending(true)
            console.error('Hata:', error);
        }
    };

    const handleConclusion = () => {
        DolarCevir()
    };

    const TLCevir = async () => {
        try {
            setPending(true)
            const response = await fetch(url);
            const data = await response.json();
            const TlFiyati = data.try.rate;
            const DolarTlCeviri = degerDolar * TlFiyati
            // State'i güncelleyin
            setDolarTlCeviri(DolarTlCeviri);
            setPending(false)
        } catch (error) {
            setPending(true)
            console.error('Hata:', error);
        }
    }

    const handleConclusionTL = () => {
        TLCevir()
    }
    

    useEffect(() => {
        DolarYazdir();
        TLYazdir();
        DolarCevir()
        TLCevir()
    }, []);

    return (
        <div>
            <p>Dolar : {DolarFiyati}</p>
            <p>TÜRK LİRASI : {TlFiyati}</p>
            <div>
                <label>
                    TÜRK LİRASI değer girin: 
                    <input type="text" value={degerTL} onChange={(e) => setDegerTL(e.target.value)} />
                </label>
            </div>
            <br />
            <button  onClick={handleConclusion}>TL-Dolar Sonuc</button>
            <br />
            { pending && (
                <>
                    <div className="loading">Loading&#8230;</div>
                </>
            )}
            <span>{TlDolarCeviri} DOLAR</span>
            <br />
            <br />

            <div>
                <label>
                    Dolar değer girin: 
                    <input type="text" value={degerDolar} onChange={(e) => setDegerDolar(e.target.value)} />
                </label>
            </div>
            <br />
            <button  onClick={handleConclusionTL}>Dolar-TL Sonuc</button>
            <br />
            { pending && (
                <>
                    <div className="loading">Loading&#8230;</div>
                </>
            )}
            <span>{DolarTlCeviri} TÜRK LİRASI</span>
        </div>
    );
}
