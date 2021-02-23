import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../../components/Header';
import Datatable from '../../../components/Datatable/Datatable';
import { getPreferences } from '../../../store/actions/preferences.actions';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import AddModal from './AddModal'
import AddNewPreference from './AddNewPreference'
import EditPreference from './EditPreference'

class PreferencesListingScreen extends Component {
  state = {
    preferen: [
      {
        id:0,
        option_name:'Login with username',
        option_value:'No',
        description:'Default = No. if user can login with username and password. By default only a valid email is allowed'
      },
      {
        id:1,
        option_name:'Login splash images URL',
        option_value:'https://cfg.jmmb.com/app/media/image',
        description:'Default = a images link from media library'
      },
      {
        id:2,
        option_name:'NUmber of point give to timeline post',
        option_value:'0',
        description:'Default = 0'
      }
    ],
    preference:this.props.preferences,
    AddOpen:false,
    EditOpen:false,
    selectedRow:{}
  };

  componentDidMount() {
    
    let abc= this.props['getPreferences']();
    // console.log(getPreferences())
    abc.then((res)=>{
      this.setState({preference:this.props.preferences})
    })
  
    
   
  }
  handleAddOpen=()=>{
this.setState({AddOpen:true})
  }
  handleEditOpen=()=>{
    this.setState({EditOpen:true})
      }
  handleClose=()=>{
    this.setState({AddOpen:false,EditOpen:false})
      }
      onSave=(e)=>{

let newArr=[...this.state.preference,...[e]]
this.setState({preference:newArr})
      }
      onEdit=(e)=>{
console.log(e)
        let newArr=[...this.state.preference]
        newArr[ newArr.indexOf(this.state.selectedRow)]=e
        this.setState({preference:newArr})
      }

      onRowClicked=(e)=>{
console.log(e)
this.setState({selectedRow:e});
this.handleEditOpen()
      }

  render() {
   
    const columns = [
      //   {
      //     name: 'ID',
      //     selector: 'id',
      //     sortable: true,
      //   },
      {
        name: 'Option',
        selector: 'option_name',
      },
      {
        name: 'Value',
        selector: 'option_value',
      },
      {
        name: 'Description',
        selector: 'description',
      },
    ];
   
    const conditionalRowStyles = [
      {
        when: (row) => !row.isEven,
        style: {
          backgroundColor: '#E8F8FF',
        },
      },
    ];

    return (
      <>
      {console.log(this.state.preference)}
        <article>
          <Helmet>
            <title>Preferences</title>
            <meta
              name='description'
              content='A React.js Boilerplate application homepage'
            />
          </Helmet>
        </article>
        <Header />
        <main>
          <div className='dash-wrapper'>
            <div className='row dash-session-header'>
              <div className='col-md-8'>
                <label
                  style={{ marginLeft: -20, fontWeight: 700, color: '#6A6A6A' }}
                >
                  {' '}
                  Preferences{' '}
                </label>
               
              
              </div>
            </div>
            <div className={'row'}>

              <div className={'col-md-12'}>
                <Datatable
                  // data={this.props.preferences}
                  data={this.state.preference}
                  columns={columns}
                  handleSelected={this.handleSelected}
                  conditionalRowStyles={conditionalRowStyles}
                  onRowClicked={this.onRowClicked}
                />
              </div>
             
            </div>
          </div>
          <AddModal title='Add preference' index={this.state.preference.length} onClose={this.handleClose} open={this.state.AddOpen} ><AddNewPreference onClose={this.handleClose} onSave={(e)=>this.onSave(e)}/></AddModal>
          <AddModal title='Edit preference' onClose={this.handleClose} open={this.state.EditOpen} ><EditPreference selectedRow={this.state.selectedRow} onClose={this.handleClose} onSave={e=>this.onEdit(e)}/></AddModal>
       
        </main>
      </>
    );
  }
}

function mapPropsToState(store) {
  return {
    preferences: _.get(store, 'preferences.all', []),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPreferences: () => dispatch(getPreferences()),
    push: (param) => dispatch(push(param)),
  };
};
export default connect(
  mapPropsToState,
  mapDispatchToProps
)(PreferencesListingScreen);
