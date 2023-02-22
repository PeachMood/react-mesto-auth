import React, { useContext, createContext, useState } from 'react';

// Модуль для управлением состоянием информационного окна.
const TooltipContext = createContext();

export const TooltipProvider = (props) => {
  const { children } = props;
  const [tooltip, setTooltip] = useState(null);

  const openTooltip = (data) => {
    setTooltip(data);
  };

  const closeTooltip = () => {
    setTooltip(null);
  };

  return (
    <TooltipContext.Provider value={{ tooltip, openTooltip, closeTooltip }}>
      {children}
    </TooltipContext.Provider>
  );
};

export const useTooltipContext = () => {
  return useContext(TooltipContext);
};