import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/actions/userActions';

const UserList = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchUsers(1));
  }, []);

  return (
    <div>UserList</div>
  )
}

export default UserList