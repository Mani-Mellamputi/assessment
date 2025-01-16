import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../Api';
import { toast } from 'react-toastify';
const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/change-password', { token, newPassword ,oldPassword });
      toast.success('Password reset successful!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error resetting password');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        required/>
        <br></br>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required/>
        <br></br>
      <button type="submit">Reset Password</button>
    </form>
  );
};
export default ResetPassword;