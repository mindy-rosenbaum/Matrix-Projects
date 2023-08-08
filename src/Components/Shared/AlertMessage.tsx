import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AlertSeverity } from '../../Types/enums';

interface AlertMessageProps {
    open: boolean;
    severity: AlertSeverity;
    message: string;
    onClose: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ open, severity, message, onClose }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default AlertMessage;