import React, {useEffect} from 'react';
import './App.css';
import ToDo from './components/ToDoList/ToDo'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import NotFound from './components/pages/NotFound/NotFound';
import NavMenu from './components/NavMenu/NavMenu';
import SingleTask from './components/pages/SingleTask/SingleTask';
import Spinner from './components/Spinner/Spinner';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {history} from './helpers/history';

const troastProps = {
  position: "bottom-left",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  }

function App(props) {

  useEffect(()=>{
      if(props.successMessage){
        toast.success(props.successMessage, troastProps);
      }
      if(props.errorMessage){
        toast.error(props.errorMessage, troastProps);
      }
  }, [props.successMessage, props.errorMessage])
  



  return (
    <div className="App">

      <Router history={history}>

        <NavMenu />

        <Switch>

          <Route
            path='/'
            component={ToDo}
            exact={true}
          />



          <Route
            path='/about'
            component={About}
            exact
          />

          <Route
            path='/contact'
            component={Contact}
            exact
          />

          <Route
            path='/task/:taskId'
            component={SingleTask}
            exact={true}
          />

          <Route
            path='/not-found'
            component={NotFound}
            exact
          />
          <Redirect to='/not-found' />

        </Switch>

      </Router>

      {props.loading && <Spinner />}
      <ToastContainer />

    </div>

  );
}

const mapStateToProps = (state) => {
  return ({
    loading: state.loading,
    successMessage : state.successMessage,
    errorMessage : state.errorMessage
  });
}




export default connect(mapStateToProps)(App);
