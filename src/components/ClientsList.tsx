import React from 'react';
import { connect } from 'react-redux';
import { fetchRequest } from '../store/clients/actions';
import { Client } from '../store/clients/types';
import { AppState } from '../store';

import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

interface PropsFromState {
    loading: boolean
    data: Client[]
    errors?: string
}

interface PropsFromDispatch {
    fetchRequest: typeof fetchRequest
}

const initialState = {
    openDialog: false,
    clientDetails: 0
}

type IState = Readonly<typeof initialState>

type AllProps = PropsFromState & PropsFromDispatch;

class ClientList extends React.Component<AllProps, IState> {

    constructor(props: AllProps) {
        super(props);
        this.state = {
            openDialog: false,
            clientDetails: 0
        }
    }

    public componentDidMount() {
        this.props.fetchRequest();
    }

    handleDetails(index: number) {
        this.setState({
            clientDetails: index,
            openDialog: true
        });
    }

    render() {
        const { data } = this.props;

        const activeRow = this.props.data.find(c => c.id == this.state.clientDetails);
        console.log(activeRow);

        return (
            <div>
                <Typography variant="h4" gutterBottom component="h2">
                    Clientes
                </Typography>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Nome fantasia</TableCell>
                                <TableCell>Logradouro</TableCell>
                                <TableCell>Bairro</TableCell>
                                <TableCell>U.F.</TableCell>
                                <TableCell>Limite de crédito</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data !== undefined && data.map(client => (
                                <TableRow key={client.id} >
                                    <TableCell>{client.nome}</TableCell>
                                    <TableCell>{client.nomeFantasia}</TableCell>
                                    <TableCell>{client.logradouro}</TableCell>
                                    <TableCell>{client.bairro}</TableCell>
                                    <TableCell>{client.uf}</TableCell>
                                    <TableCell>{client.limiteCredito}</TableCell>
                                    <TableCell>
                                        <Button color="primary" onClick={() => { this.handleDetails(client.id); }}>Detalhes</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Dialog open={this.state.openDialog}>

                        <DialogTitle id="dialog-title">{activeRow !== undefined && activeRow.nome}</DialogTitle>
                        <DialogContent>
                            <FormGroup row>
                                <FormControl >
                                    <InputLabel>Nome</InputLabel>
                                    <Input value={activeRow !== undefined && activeRow.nome} readOnly={true}></Input>
                                </FormControl>
                            </FormGroup>
                            <FormGroup row>
                                <FormControl>
                                    <InputLabel>Nome fantasia</InputLabel>
                                    <Input value={activeRow !== undefined && activeRow.nomeFantasia} readOnly={true}></Input>
                                </FormControl>
                            </FormGroup>
                            <FormGroup row>
                                <FormControl>
                                    <InputLabel>Logradouro</InputLabel>
                                    <Input value={activeRow !== undefined && activeRow.logradouro} readOnly={true}></Input>
                                </FormControl>
                            </FormGroup>
                            <FormGroup row>
                                <FormControl>
                                    <InputLabel>Bairro</InputLabel>
                                    <Input value={activeRow !== undefined && activeRow.Bairro} readOnly={true}></Input>
                                </FormControl>
                            </FormGroup>
                            <FormGroup row>
                                <FormControl>
                                    <InputLabel>Limite de crédito</InputLabel>
                                    <Input value={activeRow !== undefined && activeRow.limiteCredito} readOnly={true}></Input>
                                </FormControl> 
                            </FormGroup>
                            <Table>
                                <TableHead>
                                    <TableCell>Código</TableCell>
                                    <TableCell>Descrição</TableCell>
                                </TableHead>
                                <TableBody>
                                    {activeRow !== undefined && activeRow.condicoes.length && activeRow.condicoes.map(condicao => (
                                        <TableRow key={condicao.id}>
                                            <TableCell>{condicao.codigo}</TableCell>
                                            <TableCell>{condicao.descricao}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { this.setState({ openDialog: false }) }} color="primary">
                                Fechar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </div >
        )
    }
}

const mapStateToProps = ({ clients }: AppState) => ({
    loading: clients.loading,
    errors: clients.errors,
    data: clients.data
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
    fetchRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientList)