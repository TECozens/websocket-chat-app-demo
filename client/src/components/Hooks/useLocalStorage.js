import {useEffect, useState} from 'react'

const PREFIX = 'realtime-chat-app'



// NOTE Function to resolve a value from local storage and store it in the useState saving is done with useEffect
export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key;

    const [value, setValue] = useState(()=> {
        const jsonValue = localStorage.getItem(prefixedKey)
        if (jsonValue != null) return JSON.parse(jsonValue)
        if (typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }
    });

    useEffect(() => {
      localStorage.setItem(prefixedKey, JSON.stringify(value))  
    }, [prefixedKey, value]);
    
    return [value, setValue]
}
