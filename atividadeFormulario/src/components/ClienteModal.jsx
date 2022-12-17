import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col} from 'react-bootstrap';

const ClienteModal = ({show, setShow, handleClose}) => {
    const [cliente, setCliente] = useState({});
    const [status, setStatus] = useState({type:'', mensagem:''})


  const handleChangeCadastrar = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCliente((values) => ({ ...values, [name]: value }));
    console.log(cliente);
  };


  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    this.setState({
      itemvalues: [{}]
    });
  };

  async function handleClickCadastrar(event) {
    event.preventDefault();
        if(!validate()) return;

        const saveDataForm = true;
        if(saveDataForm){
            setStatus({
                type: 'success',
                mensagem: 'Cliente cadastrado com sucesso!'

            })
        }
    let response = await fetch('http://localhost:3500/clientes', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(cliente),
    })
      .then((response) => {
        return response;
      })
      .then((atualizador) => {
        window.location.reload()
      })
      .catch((error) => {
        console.log('Danou-se');
      });
    let clienteData = await response.json();
    return clienteData;
  }

  function validate(){
    if(!cliente.nome) return setStatus({type: 'error', mensagem: 'Campo Obrigatório: Nome'});
    if(!cliente.email) return setStatus({type: 'error', mensagem: 'Campo Obrigatório: E-mail'});
    if(!cliente.nascimento) return setStatus({type: 'error', mensagem: 'Campo Obrigatório: Nascimento'});
    if(!cliente.cep) return setStatus({type: 'error', mensagem: 'Campo Obrigatório: CEP'});


    return true;
  }

  return (
    <div>
        <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                      <Modal.Title>Formulário de Cadastramento</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  {status.type === 'success' ?<center><strong><p style={{background: "green", color:"white"}}>{status.mensagem}</p></strong></center>:""}
                  {status.type === 'error' ?<center><strong><p style={{background: "red", color:"white"}}>{status.mensagem}</p></strong></center>:""}
                  <Form>
                          <Form.Group>
                              <Form.Label>ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="id"
                                    controlid="id"
                                    disabled="disabled"
                                    value={cliente.id}
                                    onChange={handleChangeCadastrar}
                                  />
                          </Form.Group>
                          <Form.Group>
                              <Form.Label>Nome</Form.Label>
                                  <Form.Control
                                      type="text"
                                      name="nome"
                                      controlid="nome"
                                      value={cliente.nome}
                                      onChange={handleChangeCadastrar}
                                      />
                          </Form.Group>
                          <Form.Group>
                              <Form.Label>Email</Form.Label>
                                  <Form.Control
                                      type="email"
                                      name="email"
                                      controlid="email"
                                      value={cliente.email}
                                      onChange={handleChangeCadastrar}
                                      />
                          </Form.Group>
                      <Row className="mb-3">
                          <Form.Group as={Col} md="6">
                                  <Form.Label>Nascimento</Form.Label>
                                      <Form.Control
                                          type="date"
                                          name="nascimento"
                                          controlid="nascimento"
                                          value={cliente.nascimento}                
                                          onChange={handleChangeCadastrar}
                                          />
                              </Form.Group>
                              <Form.Group as={Col} md="6">
                                  <Form.Label>CEP</Form.Label>
                                      <Form.Control
                                          type="text"
                                          name="cep"
                                          controlid="cep"
                                          value={cliente.cep}
                                          onChange={handleChangeCadastrar}
                                          />
                              </Form.Group>
                      </Row>
                  </Form>
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="danger" onClick={handleReset}>Limpar</Button>
                      <Button variant="primary" onClick={handleClickCadastrar}>Salvar</Button>
                  </Modal.Footer>
              </Modal>
        </div>

    );
};

export default ClienteModal;