import React from 'react'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

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
      customButton:{
          marginTop: "10px",
      }
};

type IState = Readonly<typeof initialState>

class LoginForm extends React.Component<any, IState> {
    constructor(props: any) {

        super(props);
        this.state = {
            username: ' ',
            password: ' ',
            loggedIn: false
        }

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        console.log(this.state);
    }

    componentWillMount() {
        document.body.style.backgroundColor = "#3f51b5";
    }

    componentWillUnmount() {
        document.body.style.backgroundColor = "#FFFFFF";
    }

    public render() {
        const {value} = this.props;
        
        return (
            <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '80vh' }}>
                <Grid item xs={12} md={5} >        
                        <Paper className={this.props.classes.paper}>
                            <form title="props" className={this.props.classes.form} onSubmit={(e) => this.handleSubmit(e)}>
                             <Avatar alt="User" src="user.png" className={this.props.classes.bigAvatar} />
                                <FormControl margin="normal"  className={this.props.classes.customFormControl} fullWidth>
                                    <InputLabel htmlFor="username">Usuário</InputLabel>
                                    <Input name="username" value={this.state.username} onChange={this.handleUsernameChange} />
                                </FormControl>
                                <FormControl margin="normal"  className={this.props.classes.customFormControl} fullWidth>
                                    <InputLabel htmlFor="password">Senha</InputLabel>
                                    <Input name="password"  value={this.state.password} onChange={this.handlePasswordChange} />
                                </FormControl>
                                <FormControlLabel control={<Checkbox value="lembrar" color="primary" />} label="Lembrar Senha"/>
                                <Button type="submit"   className={this.props.classes.customButton} fullWidth variant="contained" color="primary">Entrar</Button>                    
                            </form>
                        </Paper>
                </Grid>
            </Grid>

        );
    }
}


export default withStyles(useStyles)(LoginForm)