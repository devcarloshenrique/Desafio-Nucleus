import React, { useState } from 'react';
import AddBoxIcon from '@material-ui/icons/AddBox';
import api from '../../../api/api';
import {Link} from '@material-ui/core';
import history from '../../../Context/history';
import { maskCNPJ, maskCPF } from '../../Maks/Maks';

import './ModalRegister.css';


const ModalRegister = () => {

  const  [form, setForm] = useState({
    release_type: 'receita'
  });

  const [error, setError] = useState({});

  function handleInputChange({ target }) {
    const { name, value } = target;

    setForm({ ...form, [name]: value });

  }

  function handleSubmit(event) {
    event.preventDefault();

    (async () => {
      try {
        
        if(!form?.CPF?.length)
          delete form?.CPF;
        
        if(!form?.CNPJ?.length)
          delete form?.CNPJ;

        const response = await api.post('register-launch', form);

        alert('Usuário cadastrado com sucesso !');

        setError({});

      } catch (error) {

        setError(error.response.data.error);

      }
    })();
  }

  return (

    <>

    <AddBoxIcon fontSize="medium"color="action" data-toggle="modal" data-target="#modalExemplo"/>    

    <div className="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Cadastrar um novo Lançamento</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            
            <form onSubmit={handleSubmit}>
              <div className="row">   
                <div className="col">  
                  <div className="form-group">
                    <label for="select_recipe">Tipo de despesa</label>            
                    <select class="form-control" id="select_recipe" name="release_type" onChange={handleInputChange}>
                      <option value="receita" selected="selected">Receita</option>
                      <option value="despesa">Despesa</option>
                    </select>
                    <small id="select_recipe" className="form-text text-muted"></small>
                  </div>
                </div>

                <div className="col">          
                  <div className="form-group">
                    <label for="creditor">Creditor</label>
                    <input type="text" onChange={handleInputChange} className="form-control" id="creditor" name="creditor" aria-describedby="emailHelp" placeholder="Nome do credor" />
                    <small id="creditor" className="form-text text-muted">{error && error.creditor}</small>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label for="description">Descrição</label>
                    <input type="text" onChange={handleInputChange} className="form-control" id="description" name="description" aria-describedby="emailHelp" placeholder="Descrição" maxLength="100" />
                    <small id="description" className="form-text text-muted"></small>
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label for="cpf">CPF</label>
                    <input type="text" onChange={handleInputChange} className="form-control" id="cpf" name="CPF" aria-describedby="emailHelp" placeholder="CPF" maxLength="100" onKeyPress={maskCPF}/>
                    <small id="cpf" className="form-text text-muted">{error && error.CPF}</small>
                  </div>
                </div>
              
                <div className="col">
                  <div className="form-group">
                    <label for="cnpj">CNPJ</label>
                    <input type="text" onChange={handleInputChange} className="form-control" id="cnpj"  name="CNPJ" aria-describedby="emailHelp" placeholder="CNPJ" maxLength="100" onKeyPress={maskCNPJ}/>
                    <small id="cnpj" className="form-text text-muted">{error && error.CNPJ}</small>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label for="due_date">Data de vencimento</label>
                    <input type="date" onChange={handleInputChange} className="form-control" id="due_date" name="due_date" aria-describedby="emailHelp" placeholder="Data de vencimento"/>
                    <small id="due_date" className="form-text text-muted"></small>
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <label for="value">Valor</label>
                    <input type="text" onChange={handleInputChange} className="form-control" id="value" name="value" aria-describedby="emailHelp" placeholder="" min="1"/>
                    <small id="value" className="form-text text-muted">{error && error.value}</small>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">Cadastrar</button>
            </form> 
          
          </div>
          {/* <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
            <button type="button" className="btn btn-primary">Salvar mudanças</button>
          </div> */}
        </div>
      </div>
    </div>

    </>
  );
}

export default ModalRegister;