import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import { MTableToolbar } from 'material-table';
import Pagination from '@material-ui/lab/Pagination';
import './Table.css';
import api from '../../api/api';
import {Link} from '@material-ui/core';

import ModalRegister from '../Modal/ModalRegister/ModalRegister';
import ModalUpdate from '../Modal/ModalUpdate/ModalUpdate';
import EditIcon from '@material-ui/icons/Edit';
import Header from  '../../Components/Header/Header';

function Table() {
  const [request, setRequest] = useState([]);

  const [lastPage, setLastPage] = useState(0);
  const [page, setPage] = useState(1);
  const [date, setDate] = useState(dateToday());
  const [form, setForm] = useState({});
  const [error, setError] = useState({});

  const [ accountBalance, setAccountBalance ] = useState();

  const columns = [
    { title: 'Creditor', field: 'creditor' },
    { title: 'Descrição', field: 'description' },
    { title: 'Tipo de Despesa', field: 'release_type' },
    { title: 'Data de Vencimento', field: 'due_date' },
    { title: 'Valor', field: 'value' },
    { title: 'Data Pagamento', field: 'payment_date'},
    { title: 'CPF', field: 'CPF'},
    { title: 'CNPJ', field: 'CNPJ'},
  ];

  const actions = [
    {
      icon: () => {
        return (
          <>
            <ModalRegister />            
          </>
        )
      },
      tooltip: 'Adicionar Lançamento',
      isFreeAction: true,
      // onClick: (event) => alert('Adicionar Lançamento'),
    },
    (rowData) => ({
      icon: () => (
        // <ModalUpdate id={rowData.id}/>
        <Link href="#" data-toggle="modal" data-target="#modalExemplo2" value={rowData.id} data-toggle="modal" data-target="#modalExemplo2" onClick={handleListRelease}>
          <EditIcon style={{display: 'block'}}/>        
        </Link>
      ),
      tooltip: 'Editar Usuário', 
    }),
    (rowData) => ({
      icon: 'delete',
      tooltip: 'Delete User',
      onClick: (event, rowData) => {
        alert('Excluir Lançamento');
      },
    }),
  ];

  function handleChangePagination(event, value) {
    setPage(value);
  }

  function handleChangeDate({ target }) {
    setDate(target.value);
  }

  function dateToday () {

      const data = new Date(),
      dia = data.getDate().toString(),
      diaF = dia.length == 1 ? '0' + dia : dia,
      mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
      mesF = mes.length == 1 ? '0' + mes : mes,
      anoF = data.getFullYear();
      return anoF + '-' + mesF + '-' + diaF;

  }

  useEffect(() => {
    const form = {
      page: page,
      per_page: '10',
      launch_date: date,
    };

    (async () => {
      try {
        const formtData = (value) => {
          var data = new Date(value),
            dia = data.getDate().toString(),
            diaF = dia.length == 1 ? '0' + dia : dia,
            mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = mes.length == 1 ? '0' + mes : mes,
            anoF = data.getFullYear();
          return diaF + '/' + mesF + '/' + anoF;
        };

        const formtText = (value) => {
          return value[0].toUpperCase() + value.substr(1);
        };

        await api.post('find-all-launch-user', form).then((data) => {

          const array = [];

          if(data?.data?.launchs?.data.length === 0){
            setLastPage(1);
            setPage(1);
          }

          if(data?.data?.launchs?.last_page)
            setLastPage(data?.data?.launchs?.last_page);
   
          data?.data?.launchs?.data.map((launch,key) => {
            array.push({
              id: launch.id ,
              release_type: launch.release_type ,
              creditor: launch.creditor === null ? '-' : launch.creditor,
              description: launch.description === null ? '-' : launch.description,
              CPF: launch.CPF === null ? '-' : launch.CPF,
              CNPJ: launch.CNPJ === null ? '-' : launch.CNPJ,
              // value: launch.value ,
              value: parseInt(
                launch.value,
              ).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              }),
              due_date: launch.due_date ===  null ? '-' : formtData(launch.due_date),
              payment_date: launch.payment_date === null ? '-' : formtData(launch.payment_date),
              user_id: launch.user_id ,
              created_at: launch.created_at ,
              updated_at: launch.updated_at
            });            
          });
          
          setRequest(array);

        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [page, date]);

  function handleListRelease( event ) {

    const launch_id = event;

    console.log(launch_id);
    
    event.preventDefault();
            
    (async () => {
      
      setForm({}); 
  
      const launch_id = event?.target?.attributes?.value?.value;
  
      const response = await api.get('find-launch/' + launch_id);
  
      console.log(form);

      setForm(response?.data?.launch)
      
  
    })();
    
  }

  useEffect(() => {
    const request = api.post('list-balance', {launch_date: date}).then((response) => {
      // console.log();
      setAccountBalance(response?.data);
    });

    
  },[]);
  
  return (
    <>
      <Header data={accountBalance}/>
      <div style={{ maxWidth: '90%' }} className="table-container">                    
        <MaterialTable
          columns={columns}
          data={request}
          title="Lançamentos"
          options={{
            search: false,
            actionsColumnIndex: -1,
          }}
          actions={actions}
          components={{
            Pagination: (props) => {
              return (
                <>
                  <div style={{ margin: '10px' }}>
                    <Pagination
                      count={lastPage}
                      page={page}
                      color="primary"
                      hidePrevButton
                      hideNextButton
                      onChange={handleChangePagination}
                    />
                  </div>
                </>
              );
            },
            Toolbar: (props) => {
              return (
                <div>
                  <MTableToolbar {...props} />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <form noValidate style={{ margin: '20px' }}>
                      <TextField
                        id="date"
                        label="Birthday"
                        type="date"
                        defaultValue={date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleChangeDate}
                      />
                    </form>
                  </div>
                </div>
              );
            },
          }}
        />
      </div>

    {/* ModalUpdate */}

    <div className="modal fade" id="modalExemplo2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel"></h5>
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

              <button type="button" className="btn btn-secondary" disabled>Atualizar</button>

            </form> 
          
          </div>
        </div>
      </div>
    </div>

    </>
  );
}

export default Table;
