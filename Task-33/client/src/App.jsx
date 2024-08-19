import React, { useState } from 'react';
import axios from 'axios';
import { ROUTE_URL } from './config';

axios.defaults.withCredentials = true;

function App() {
    const [cookieName, setCookieName] = useState('');
    const [cookieValue, setCookieValue] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [cookies, setCookies] = useState(null);

    const handleSetCookie = async () => {
        try {
            const response = await axios.post(`${ROUTE_URL}/set-cookie`, {
                name: cookieName,
                value: cookieValue
            }, { withCredentials: true });
            setResponseMessage(response.data.message);
            setCookieName('');
            setCookieValue('');
            console.log(response.data.message);
        } catch (error) {
            setResponseMessage('Failed to set cookie');
            console.error(error);
        }
    };

    const handleGetCookies = async () => {
        try {
            const response = await axios.get(`${ROUTE_URL}/get-cookies`, { withCredentials: true });
            setCookies(response.data);
            setResponseMessage(JSON.stringify(response.data, null, 2));
            console.log(response.data);
        } catch (error) {
            setCookies(null);
            setResponseMessage('Failed to retrieve cookies');
            console.error(error);
        }
    };

    const handleStatusCode = async (url) => {
        try {
            const response = await axios.get(url, { withCredentials: true });
            setResponseMessage(response.data.message);
            console.log(response.data.message);
        } catch (error) {
            if (error.response) {
                setResponseMessage(error.response.data.message);
                console.error(error.response.data.message);
            } else {
                setResponseMessage('An error occurred');
                console.error('An error occurred');
            }
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Cookie Handling & HTTP Response Codes</h1>

            <div className="mb-4">
                <input
                    type="text"
                    value={cookieName}
                    onChange={(e) => setCookieName(e.target.value)}
                    placeholder="Cookie Name"
                    className="border p-2 rounded mr-2"
                />
                <input
                    type="text"
                    value={cookieValue}
                    onChange={(e) => setCookieValue(e.target.value)}
                    placeholder="Cookie Value"
                    className="border p-2 rounded mr-2"
                />
                <button onClick={handleSetCookie} className="bg-blue-500 text-white py-2 px-4 rounded">
                    Set Cookie
                </button>
            </div>

            <div className="mb-4">
                <button onClick={handleGetCookies} className="bg-green-500 text-white py-2 px-4 rounded">
                    Get All Cookies
                </button>
                {cookies && (
                    <ul className="mt-2">
                        {Object.entries(cookies).map(([name, value]) => (
                            <li key={name}>{`${name}: ${value}`}</li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="mb-4">
                <button onClick={() => handleStatusCode(`${ROUTE_URL}/created`)} className="bg-purple-500 text-white py-2 px-4 rounded mr-2">
                    201 Created
                </button>
                <button onClick={() => handleStatusCode(`${ROUTE_URL}/bad-request`)} className="bg-red-500 text-white py-2 px-4 rounded mr-2">
                    400 Bad Request
                </button>
                <button onClick={() => handleStatusCode(`${ROUTE_URL}/not-found`)} className="bg-yellow-500 text-white py-2 px-4 rounded mr-2">
                    404 Not Found
                </button>
                <button onClick={() => handleStatusCode(`${ROUTE_URL}/server-error`)} className="bg-gray-500 text-white py-2 px-4 rounded">
                    500 Server Error
                </button>
            </div>

            <div className="mb-4">
                <textarea
                    value={responseMessage}
                    readOnly
                    className="w-full h-32 p-2 border rounded"
                    placeholder="Response message will appear here"
                />
            </div>
        </div>
    );
}

export default App;
