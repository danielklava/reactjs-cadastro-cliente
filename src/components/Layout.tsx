import React from 'react'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { CssBaseline, AppBar, Toolbar, Typography, Drawer, ListItemIcon, ListItemText, Divider, List, ListItem, Theme, createStyles, WithStyles, IconButton } from '@material-ui/core'
import 'typeface-roboto';

const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBarSpacer: theme.mixins.toolbar,
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
});

interface IProps {
    classes: {
        root: string;
        drawerPaper: string;
        drawerPaperClose: string;
        menuButton: string,
        menuButtonHidden: string;
        toolbarIcon: string;
        content: string;
        appBar: string;
        appBarShift: string;
        appBarSpacer: string;
    }
}

const initialState = {
    open: false
}

type IState = Readonly<typeof initialState>

const Layout = withStyles(styles)(
    class extends React.Component<IProps & WithStyles<'root'>, IState> {

        constructor(props: IProps) {
            super(props)
            this.state = {
                open: true
            }
        }

        handleDrawerOpen = () => {
            this.setState({ open: true });
        };

        handleDrawerClose = () => {
            this.setState({ open: false });
        };

        render() {
            const { classes } = this.props;

            return (
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                        position="absolute"
                        className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                    >
                        <Toolbar disableGutters={false}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(
                                    classes.menuButton,
                                    this.state.open && classes.menuButtonHidden,
                                )}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" noWrap>
                                Cadastro de clientes
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        classes={{
                            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                        }}
                        variant="permanent"
                        anchor="left"
                        open={this.state.open}
                    >
                        <div className={classes.toolbarIcon}>
                            <IconButton onClick={this.handleDrawerClose}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            <ListItem button key={'Clientes'}>
                                <ListItemIcon><AccountBoxIcon /></ListItemIcon>
                                <ListItemText>Clientes</ListItemText>
                            </ListItem>
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        {this.props.children}
                    </main>
                </div>
            )
        }
    }
)

export default Layout;