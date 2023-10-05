import { createContext, useReducer, useContext, useState } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { isAuthenticated: true };
    case 'LOGOUT':
      return { isAuthenticated: false };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { isAuthenticated: false });
  const [usuario, setUsuario] = useState({});
  return (
    <AuthContext.Provider value={{ state, dispatch, usuario, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
   return useContext(AuthContext);
};

export { AuthProvider, useAuth };
