import React from 'react'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import { connect } from 'react-redux';
import { authRequest } from '../store/clients/actions';
import { Client } from '../store/clients/types';
import { AppState } from '../store';

interface PropsFromState {
    loading: boolean
    data: Client[]
    errors?: string
}

interface PropsFromDispatch {
    authRequest: typeof authRequest
}

const initialState = {
    username: "",
    password: "",
    loggedIn: false
}

const useStyles = {
    paper: {
        display: 'flex',
        alignItems: 'center',
    },
    form: {
        padding: '30px',
    },
    bigAvatar: {
        marginLeft: "auto",
        marginRight: "auto",
        width: 80,
        height: 80,
    },
    customFormControl: {
        marginTop: "35px",
    },
    customButton: {
        marginTop: "50px",
    }
};

type IState = Readonly<typeof initialState>

type AllProps = PropsFromState & PropsFromDispatch;

class LoginForm extends React.Component<any, IState, AllProps> {
    constructor(props: AllProps) {

        super(props);
        this.state = {
            username: '',
            password: '',
            loggedIn: false
        }

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public componentDidMount() {
        this.props.authRequest();
        if (this.props.authenticated) {
            this.props.history.push('/#dashboard');
        }
    }

    handleUsernameChange = (e: any) => {
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordChange = (e: any) => {
        this.setState({
            password: e.target.value
        })
    }


    handleSubmit = (e: any) => {
        this.props.onLogin({e});
        console.log(this.state);
    }

    componentWillMount() {
        document.body.style.backgroundColor = "#3f51b5";
    }

    componentWillUnmount() {
        document.body.style.backgroundColor = "#FFFFFF";
    }

    public render() {
        const { value } = this.props;

        return (
            <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '85vh' }}>
                <Grid item xs={12} md={3} >
                    <Paper className={this.props.classes.paper}>
                        <form title="props" className={this.props.classes.form} onSubmit={(e) => this.handleSubmit(e)}>
                            <Avatar alt="User" src="user.png" className={this.props.classes.bigAvatar} />
                            <FormControl margin="normal" className={this.props.classes.customFormControl} fullWidth>
                                <InputLabel htmlFor="username">Usuário</InputLabel>
                                <Input name="username" value={this.state.username} onChange={this.handleUsernameChange} />
                            </FormControl>
                            <FormControl margin="normal" className={this.props.classes.customFormControl} fullWidth>
                                <InputLabel htmlFor="password">Senha</InputLabel>
                                <Input name="password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                            </FormControl>
                            <Button type="submit" className={this.props.classes.customButton} fullWidth variant="contained" color="primary">Entrar</Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>

        );
    }
}

const mapStateToProps = ({ clients }: AppState) => ({
    loading: clients.loading,
    errors: clients.errors,
    data: clients.data
})

const mapDispatchToProps = {
    authRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles)(LoginForm))