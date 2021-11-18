import classes from './Login.module.sass';
import PageBlock from '../PageBlock/PageBlock'
import LoginForm from '../Form/LoginForm';

const Login = () => {
    return (
        <div className={classes.Login}>
            <PageBlock>
                <LoginForm />
            </PageBlock>
        </div>
    );
};

export default Login;