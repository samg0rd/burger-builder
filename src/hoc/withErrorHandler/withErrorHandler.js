import React,{Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';


const withErrorHandler = (WrappedComponent, axios) => {
  // a higher order components which returns an unnamed class component
  return class extends Component{

    state = {
      error: null
    }

    // component will mount will be called before the child components are rendered
    componentWillMount(){            
      this.requestInterceptor =  axios.interceptors.request.use(request=>{
        this.setState({ error: null })
        return request;
      })
      this.responseInterceptor = axios.interceptors.response.use(res=>res,error=>{
        this.setState({error:error});                       
      })      
    }

    componentWillUnmount(){      
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error:null})
    }

    render(props){
      return (      
        <Aux>
          <Modal show={this.state.error} closeModal={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props}/>
        </Aux>
      );      
    }
  }
};

export default withErrorHandler;