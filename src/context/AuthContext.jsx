import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null); // Lưu thông tin hạng/điểm (Gamification)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/users/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setCurrentUser(data);
          setUserProfile(data);
        } else {
          localStorage.removeItem('token');
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const loginGoogle = () => {
    alert("Đăng nhập Google hiện yêu cầu Setup OAuth Firebase. Vui lòng đăng nhập bằng Email tạm thời với MERN Backend!");
  };

  const loginEmail = async (email, password) => {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    
    localStorage.setItem('token', data.token);
    setCurrentUser(data.user);
    setUserProfile(data.user);
    return data;
  };

  const registerEmail = async (email, password) => {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, displayName: email.split('@')[0] })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    
    return loginEmail(email, password);
  };

  const toggleWishlist = async (productId) => {
    if (!currentUser || !userProfile) {
      alert("Đăng nhập để sử dụng tính năng Lưu lại!");
      return;
    }
    const currentList = userProfile.wishlist || [];
    const isSaved = currentList.includes(productId);
    const newList = isSaved 
      ? currentList.filter(id => id !== productId)
      : [...currentList, productId];
    
    setUserProfile({ ...userProfile, wishlist: newList });
    
    const token = localStorage.getItem('token');
    await fetch('http://localhost:5000/api/users/me', {
       method: 'PUT',
       headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
       body: JSON.stringify({ wishlist: newList })
    });
  };

  const addXP = async (amount) => {
    if (!currentUser || !userProfile) return;
    const newPoints = (userProfile.points || 0) + amount;
    setUserProfile({ ...userProfile, points: newPoints });

    const token = localStorage.getItem('token');
    await fetch('http://localhost:5000/api/users/me', {
       method: 'PUT',
       headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
       body: JSON.stringify({ points: newPoints })
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setUserProfile(null);
  };

  const value = {
    currentUser,
    userProfile,
    loginGoogle,
    loginEmail,
    registerEmail,
    logout,
    toggleWishlist,
    addXP,
    isConfigured: true
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
