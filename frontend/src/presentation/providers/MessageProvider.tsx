import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { type Severity, SEVERITY } from '@/domain/types/constants/severity';
import { MessageContext } from '@/presentation/contexts/messageContext';

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<Severity>(SEVERITY.INFO);

  const showMessage = (msg: string, sev: Severity = SEVERITY.INFO) => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity={severity} variant="filled" onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </MessageContext.Provider>
  );
};
