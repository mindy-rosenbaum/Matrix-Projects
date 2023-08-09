import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { AlertSeverity } from '../../types/enums';

interface AlertMessageProps {
    isOpen: boolean;
    severity: AlertSeverity;
    message: string;
    onClose: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ isOpen, severity, message, onClose }) => {
    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default AlertMessage;