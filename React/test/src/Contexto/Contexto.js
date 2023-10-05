import React, { createContext, useContext, useState } from 'react';

const ContextoUsuario = createContext();

export const Contexto = ({ children }) => {
  const [arreglo, SetArreglo] = useState(["inicial"]);

  const agregar = (item) => {
    SetArreglo([...arreglo, item]);
  };

  const eliminar = (itemId) => {
    const arregloModificado = arreglo.filter((item) => item.id !== itemId);
    SetArreglo(arregloModificado);
  };

  return (
    <ContextoUsuario.Provider value={{ arreglo, agregar, eliminar }}>
      {children}
    </ContextoUsuario.Provider>
  );
};

export const useContexto = () => {
  return useContext(ContextoUsuario);
};
