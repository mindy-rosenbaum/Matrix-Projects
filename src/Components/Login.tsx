import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

import { useActiveUserAuth } from './auth-context';
import AlertMessage from './shared/alert-message';
import { AlertSeverity, LogStatus } from '../types/enums';
import { UsersService } from '../services/users-service';
import { CommonService } from '../services/common-service';
import { User, UserLoginInfo } from '../types/user';
import { Strings } from '../consts';
import { Translation } from '../translation';


interface AlertViewInfo {
    isOpen: boolean,
    massage: string,
    severity: AlertSeverity
}

const Login = (): JSX.Element => {
    const [formData, setFormData] = useState<UserLoginInfo>({
        name: '',
        password: '',
    });

    const [errors, setErrors] = useState<{ name: string; password: string }>({
        name: '',
        password: '',
    });

    const [alertInfo, setAlertInfo] = useState<AlertViewInfo>({ isOpen: false, massage: '', severity: AlertSeverity.SUCCESS });

    const navigate = useNavigate();

    useEffect(() => {
        const userString = localStorage.getItem(Strings.localStorageName.LOGGED_IN_USER);
        if (userString) {
            const user = JSON.parse(userString) as UserLoginInfo;
            const existedUser: User | undefined = UsersService.getUserIfExist(user);
            if (existedUser) {
                navigate('/mainScreen');
            }
        }
    }, []);

    const { login } = useActiveUserAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData: UserLoginInfo) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Validate the specific form field when the user leaves the  input
        const newErrors = validateField(name, value);
        setErrors(newErrors);
    };

    const handleCloseAlert = () => {
        setAlertInfo((prevAlertInfo) => ({
            ...prevAlertInfo,
            isOpen: false,
        }));
        if (alertInfo.severity === AlertSeverity.SUCCESS) {
            // Navigate to projects table page after successfull login
            navigate('/mainScreen');
            CommonService.log(Translation.massages.LOG_IN_SUCCESSFULL, LogStatus.INFO)
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.values(newErrors).every((error) => error === '')) {

            const existedUser = UsersService.getUserIfExist(formData)
            if (existedUser) {
                setAlertInfo({ isOpen: true, massage: Translation.massages.LOG_IN_SUCCESSFULL, severity: AlertSeverity.SUCCESS });
                login(existedUser);
            } else {
                setAlertInfo({ isOpen: true, massage: Translation.massages.INVALID_USER_NAME_OR_PASSWORD, severity: AlertSeverity.ERROR });
            }
        }
    };

    const validateField = (fieldName: string, value: string) => {
        const currentErrors: { name: string; password: string } = { ...errors };

        if (fieldName === Translation.fieldNames.NAME) {
            if (!value.trim()) {
                currentErrors.name = Translation.massages.USER_NAME_REQUIRED;
            } else if (value.length < 4) {
                currentErrors.name = Translation.massages.USER_NAME_MUST_BE_LONG;
            } else {
                currentErrors.name = '';
            }
        }

        if (fieldName === Translation.fieldNames.PASSWORD) {
            if (!value.trim()) {
                currentErrors.password = Translation.massages.PASSWORD_REQUIRED;
            } else if (value.length < 6) {
                currentErrors.password = Translation.massages.PASSWORD_MUST_BE_LONG;
            } else {
                currentErrors.password = '';
            }
        }

        return currentErrors;
    };

    const validateForm = (user: UserLoginInfo) => {
        return validateField(Translation.fieldNames.NAME, user.name);
    };

    return (
        <Container maxWidth="xs">
            <Box mt={4}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {Translation.titles.LOGIN}
                    </Typography>
                    <TextField
                        fullWidth
                        label="Username"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.name)}
                        helperText={errors.name || ' '}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.password)}
                        helperText={errors.password || ' '}
                    />
                    <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                        {Translation.titles.LOGIN}
                    </Button>
                </form>
            </Box>
            <AlertMessage
                isOpen={alertInfo.isOpen}
                severity={alertInfo.severity}
                message={alertInfo.massage}
                onClose={handleCloseAlert}
            />
        </Container>
    );
}

export default Login;
