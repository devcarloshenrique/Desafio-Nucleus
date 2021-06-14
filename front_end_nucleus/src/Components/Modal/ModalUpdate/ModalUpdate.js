import React, {useState, useEffect} from 'react';
import EditIcon from '@material-ui/icons/Edit';
import {Link} from '@material-ui/core';
import api from '../../../api/api';


import './ModalUpdate.css';

const ModalUpdate = ({id}) => {

  const  [form, setForm] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});

  function handleInputChange({ target }) {
    const { name, value } = target;

    setForm({ ...form, [name]: value });

  }


  // function handleListRelease( event ) {

  //   const launch_id = event?.target?.attributes?.value?.value;

  //   (async () => {

  //     const response = await api.get('find-launch/' + launch_id);
      
  //     const data = response?.data?.launch;

  //       setForm(data);

  //   })();
    
  // }


function handleListRelease( event ) {

  event.preventDefault();

  // useEffect( async () => {
        
  (async () => {
    
    setForm({}); 

    const launch_id = event?.target?.attributes?.value?.value;

    const response = await api.get('find-launch/' + launch_id);

    setForm(response?.data?.launch)
    
    console.log(form);

  })();

  // },[]);
  
}


  return (

    <>

    <Link href="#" data-toggle="modal" data-target="#modalExemplo2" value={id} data-toggle="modal" data-target="#modalExemplo2" onClick={handleListRelease}>
      {/* <EditIcon style={{display: 'block'}}/>         */}
      Editar {form.id}
    </Link>

    <div className="modal fade" id="modalExemplo2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Atualizar Lançamento</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            
            <form>
              <div className="row">   
                <div className="col">  
                  <div className="form-group">
                    <label for="select_recipe">Tipo de despesa</label>            
                    <select class="form-control" id="select_recipe" name="release_type" value={form?.release_type}>
                      <option value="receita">Receita</option>
                      <option value="despesa">Despesa</option>
                    </select>
                    <small id="select_recipe" className="form-text text-muted"></small>
                  </div>
                </div>

                <div className="col">          
                  <div className="form-group">
                    <label for="creditor">Creditor</label>
                    <input type="text" className="form-control" id="creditor" name="creditor" aria-describedby="emailHelp" placeholder="Nome do credor" value={form?.creditor}/>
                    <small id="creditor" className="form-text text-muted">{error && error.creditor}</small>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label for="description">Descrição</label>
                    <input type="text" className="form-control" id="description" name="description" aria-describedby="emailHelp" placeholder="Descrição" maxLength="100" />
                    <small id="description" className="form-text text-muted"></small>
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label for="cpf">CPF</label>
                    <input type="text" className="form-control" id="cpf" name="CPF" aria-describedby="emailHelp" placeholder="CPF" maxLength="100" />
                    <small id="cpf" className="form-text text-muted">{error && error.CPF}</small>
                  </div>
                </div>
              
                <div className="col">
                  <div className="form-group">
                    <label for="cnpj">CNPJ</label>
                    <input type="text" className="form-control" id="cnpj"  name="CNPJ" aria-describedby="emailHelp" placeholder="CNPJ" maxLength="100" />
                    <small id="cnpj" className="form-text text-muted">{error && error.CNPJ}</small>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label for="due_date">Data de vencimento</label>
                    <input type="date" className="form-control" id="due_date" name="due_date" aria-describedby="emailHelp" placeholder="Data de vencimento"/>
                    <small id="due_date" className="form-text text-muted"></small>
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <label for="value">Valor</label>
                    <input type="text" className="form-control" id="value" name="value" aria-describedby="emailHelp" placeholder="" min="1"/>
                    <small id="value" className="form-text text-muted">{error && error.value}</small>
                  </div>
                </div>
              </div>

              <button type="button" className="btn btn-primary" disabled>Atualizar</button>

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

export default ModalUpdate;