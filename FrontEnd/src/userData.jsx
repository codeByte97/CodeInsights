import { useState, useEffect } from 'react';
function useUserData() {
    const [username, setUsername] = useState('');
    const [useremail, setUseremail] = useState('');
    const [usertype, setUsertype] = useState('');

    useEffect(() => {

        return () => {
        };
    }, []);

    const setUser = (email,usertype) => {
        const username=email.substring(0,7);
        console.log(username);
        setUsername(username);
        setUseremail(email);
        setUsertype(usertype);
    };
    const logout = () => {
        setUsername('');
        setUseremail('');
        setUsertype('');
    };

    return {
        username,
        useremail,
        usertype,
        setUser,
        logout,
    };
}

export default useUserData;
