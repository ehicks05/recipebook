import { useState, useEffect } from 'react';

function useIsMobile(): boolean {

    const [size, setSize] = useState<number | undefined>(undefined)

    useEffect(() => {
        setSize(window.innerWidth);
        function handleResize() {
            setSize(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
    })

    return !!(size && size <= 768);
}

export default useIsMobile;