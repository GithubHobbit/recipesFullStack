/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from 'store/userSlice'

const Dashboard = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.users.isLogin);
    const usersLoading = useSelector(state => state.users.status);
    const error = useSelector(state => state.users.error);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (isAuth === false) {
            history('/login');
        }
    }, [isAuth]);

    useEffect(() => {
        dispatch(getUsers()).then(res => setUsers(res.payload));        
    }, []);
 
    let content;
    if (usersLoading === 'loading') {
        content = <h4>...Loading</h4>
    } 
    else if (usersLoading === 'failed') {
        content = <div>{error}</div>
    }
    else if (usersLoading === 'succeeded') {
        content = 
        (<table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>    
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))} 
                </tbody>
        </table>)
    }

    return (
        <div className="container mt-5">
            <h1>Welcome Back</h1>
            {content}
        </div>
    )
}
 
export default Dashboard