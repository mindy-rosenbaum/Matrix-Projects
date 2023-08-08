import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

import { useActiveUserAuth } from './AuthContext';
import AlertMessage from './Shared/AlertMessage';
import { AlertSeverity, LogStatus } from '../Types/enums';
import { UsersService } from '../Services/UsersService';
import { CommonService } from '../Services/CommonService';
import { User, UserLoginInfo } from '../Types/User';
import { Strings } from '../Const';

const Login = (): JSX.Element => {
    const [formData, setFormData] = useState<UserLoginInfo>({
        name: '',
        password: '',
    });

    const [errors, setErrors] = useState<{ name: string; password: string }>({
        name: '',
        password: '',
    });

    //todo- alert data objecct that contains all data of alert.
    //interface
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<AlertSeverity>(
        AlertSeverity.SUCCESS
    );

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
        setOpenAlert(prevOpenAlert => !prevOpenAlert);//to false
        if (alertSeverity === AlertSeverity.SUCCESS) {
            // Navigate to the main screen - projects table page after successful login
            navigate('/mainScreen');
            CommonService.log(Strings.massages.LOG_IN_SUCCESSFULL, LogStatus.info)
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.values(newErrors).every((error) => error === '')) {

            const existedUser = UsersService.getUserIfExist(formData)
            if (existedUser) {
                setAlertSeverity(AlertSeverity.SUCCESS);
                setAlertMessage(Strings.massages.LOG_IN_SUCCESSFULL);
                setOpenAlert(prevOpenAlert => !prevOpenAlert);//to true
                login(existedUser);
            } else {
                setAlertSeverity(AlertSeverity.ERROR);
                setAlertMessage(Strings.massages.INVALID_USER_NAME_OR_PASSWORD);
                setOpenAlert(prevOpenAlert => !prevOpenAlert);//to true
            }
        }
    };


    const validateField = (fieldName: string, value: string) => {
        const currentErrors: { name: string; password: string } = { ...errors };

        if (fieldName === Strings.fieldNames.NAME) {
            if (!value.trim()) {
                currentErrors.name = Strings.massages.USER_NAME_REQUIRED;
            } else if (value.length < 4) {
                currentErrors.name = Strings.massages.USER_NAME_MUST_BE_LONG;
            } else {
                currentErrors.name = '';
            }
        }

        if (fieldName === Strings.fieldNames.PASSWORD) {
            if (!value.trim()) {
                currentErrors.password = Strings.massages.PASSWORD_REQUIRED;
            } else if (value.length < 6) {
                currentErrors.password = Strings.massages.PASSWORD_MUST_BE_LONG;
            } else {
                currentErrors.password = '';
            }
        }

        return currentErrors;
    };

    const validateForm = (user: UserLoginInfo) => {
        return validateField(Strings.fieldNames.NAME, user.name);
    };

    return (
        <Container maxWidth="xs">
            <Box mt={4}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Login
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
                        Login
                    </Button>
                </form>
            </Box>
            <AlertMessage
                open={openAlert}
                severity={alertSeverity}
                message={alertMessage}
                onClose={handleCloseAlert}
            />
        </Container>
    );
}

export default Login;
