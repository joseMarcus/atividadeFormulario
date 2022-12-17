import { useState, useEffect } from "react";
import { Button, Form, Table, Col, Container} from "react-bootstrap";
import ClienteModal from './ClienteModal';


const Clientes =  () => {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    fetch('http://localhost:3500/clientes', { method: 'GET' })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Resultado da busca.
        setClientes(data);
      })
      .catch((error) => {});
  }, []);

  const handleChangeBuscar = (event) => {
    setNome(event.target.value);
  };
  
  const handleClickBuscar = (event) => {
    fetch(`http://localhost:3500/clientes?q=${nome}`, { method: 'GET' })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setClientes(data);
      })
      .catch((error) => {
        console.log('Resposta com insucesso!');
      })
      .finally();
  };


  return(
      <>
      <div>
          <Container>
              <center ><h1 class="display-4 mb-7">Clientes</h1></center>
                  <Button variant="primary"className=" my-5 float-end rounded-circle mr-4 font-weight-bold mb-4" onClick={handleShow}>Adicionar</Button>
                  <Form inline="true">
                          <Form.Group as={Col} md="4">
                          <Form.Control className="mb-3"
                            type="text"
                            placeholder="Digite o nome do cliente"
                            name="nome"
                            controlid="nome"
                            value={nome}
                            onChange={handleChangeBuscar}
                            />
                          </Form.Group>
                          <Button
                            className="rounded-circle mr-4 font-weight-bold mb-3"
                            variant="primary"
                            onClick={handleClickBuscar}>
                            Consultar
                          </Button>

                  </Form>
              
                      <Table striped bordered hover variant="white">
                          <thead>
                              <tr>
                                  <th>ID</th>
                                  <th>Nome</th>
                                  <th>E-mail</th>
                                  <th>Nascimento</th>
                                  <th>CEP</th>
                              </tr>
                          </thead>
                          <tbody>
                            {clientes.map((cliente) => {
                                return (
                                    <tr key={cliente.id}>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.nascimento}</td>
                                    <td>{cliente.cep}</td>
                                    </tr>
                                );
                                }) || ''}
                            </tbody>
                      </Table>
          </Container>
          <ClienteModal show={show} setShow={setShow} handleClose={handleClose} />
        </div>

      </>

  );
}

export default Clientes;
