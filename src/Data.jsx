import { useEffect, useState } from "react"
import axios from 'axios';

export default function Data() {
    const [data, setData] = useState([])
    const [newItem, setNewItem] = useState('')
    const [pending, setPending] = useState(false)

    const fetchData = async () => {

        try {
            setPending(true)
            const response = await axios.get('http://localhost:5050/api/veri'); // Axios GET request
            const veri = response.data;
            console.log(veri);
            setData(veri);
            setPending(false)
        } catch (error) {
            setPending(true)
            console.error('Hata:', error);
        }
    }
    

    useEffect(() => {
        fetchData();
    }, []);
    //Loading Render 
    const handleAddItem = async () => {
        try {
            const response = await axios.post('http://localhost:5050/', {
                isim: newItem, // Assuming 'isim' should be 'name'
            });
            console.log(response)
            if (response.status === 201) {
                setNewItem('');
                fetchData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (itemId) => {
        const endpoint = `http://localhost:5050/api/veri/${itemId}`;
    
        try {
            const response = await axios.delete(endpoint); // Axios DELETE request
    
            if (response.status === 200) {
                fetchData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <input
                type="text"
                value={newItem}
                placeholder="Lütfen Birşeyler yaz"
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button onClick={handleAddItem}>post</button>
            
            { pending && (
                <>
                    <div className="loading">Loading&#8230;</div>
                </>
            )}
            
                <ul>
                    {data.map((item) => (
                        <li key={item._id}>
                            {item.body}
                            <button onClick={() => handleDelete(item._id)}>SİL</button>
                        </li>
                    ))}
                </ul>
        </div>
    )
}
