import classes from './Register.module.sass';
import PageBlock from '../PageBlock/PageBlock'
import RegisterForm from '../Form/RegisterForm';

const Register = () => {
    return (
        <div className={classes.Register}>
            <PageBlock>
                <RegisterForm />
            </PageBlock>
        </div>
    );
};

export default Register;