import React, { Component } from 'react';
import { Row, Button, FormGroup, FormControl, ControlLabel, HelpBlock, Panel } from 'react-bootstrap';

 class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
          formData: {}, // Contains login form data
          errors: {}, // Contains login field errors
          formSubmitted: false, // Indicates submit status of login form 
          loading: false // Indicates in progress state of login form
      }
      }
      
      handleInputChange = ({target}) => {
          const { value, name } = target;
  
          const { formData } = this.state;
          formData[name] = value;
  
          this.setState({
              formData
          });
      }
  
      login = (e) => {
          e.preventDefault();
          // const errors = this.validateLoginForm();
  
          if (errors === true){
              this.props.changePassword(this.state.formData);
          } else {
              this.setState({
                  errors,
                  formSubmitted: true
              });
          }
      }
  
      getConfirmtionMessage() {
       let element = null;
       if (this.props.changePassword) {
          element = (
             <div>Password Changed SuccessFully.</div>
              ) 
        }
        return element;
      }
  
      render(){
          const { errors, formSubmitted } = this.state;
           const accesstoken = () => {
               return <div>Hello</div>
           }
  
          const goBack = () => {
              // alert('hit')
              // return <Link to='/dashboard'></Link>
              return <div>Hi there</div>
          }
          return(
            //   <div>
            //       Want assword Changed
            //   </div>
              <div className="loginForm">
                  <Panel>
                      <Panel.Heading>Change Password</Panel.Heading>
                      <Panel.Body>
                          <form onSubmit={this.login}>
                          <FormGroup controlId="email" >
                              {/* <FormGroup controlId="email" validationState={ formSubmitted ? (errors.email ? 'error' : 'success') : null }> */}
                                  {/* <ControlLabel>Email</ControlLabel> */}
                                  <FormGroup controlId="password" validationState={ formSubmitted ? (errors.password ? 'error' : 'success') : null }>
                                      {/* <ControlLabel>Old Password</ControlLabel> */}
                                      <FormControl type="password" name="password" placeholder="Old Password" onChange={this.handleInputChange} />
                                      { errors.password && 
                                          <HelpBlock>{errors.password}</HelpBlock> 
                                      }
                                  </FormGroup>
  
  
                                  <FormControl type="text" name="new_password" placeholder="New Password" onChange={this.handleInputChange} />
                                  { errors.email && 
                                      <HelpBlock>{errors.email}</HelpBlock> 
                                  }
                              </FormGroup >
                              <FormGroup controlId="password">
                              {/* <FormGroup controlId="password" validationState={ formSubmitted ? (errors.password ? 'error' : 'success') : null }> */}
                                  {/* <ControlLabel>Password</ControlLabel> */}
                                  <FormControl type="password" name="confirm_password" placeholder="Confirm Password" onChange={this.handleInputChange} />
                                  { errors.password && 
                                      <HelpBlock>{errors.password}</HelpBlock> 
                                  }
                              </FormGroup>
                              <Button type="submit" bsStyle="primary"onClick={(event) => { event.preventDefault(); goBack() }}>Go Back</Button>
                              <Button type="submit" bsStyle="primary">Submit</Button>
                          </form>
  
                          {/* {this.getConfirmtionMessage()} */}
                      
                      </Panel.Body>
                  </Panel>
              </div>
          );
      }
  }
  
  //old_pssword, new_password
  
  
  const mapStateToProps = (state) => {
      return {
          passwordChanged: state.loginData.passwordChanged
      };
  };
  
  const mapDispatchToProps = dispatch => ({
      changePassword: (data) => dispatch(changePassword(data))
  })

export default ChangePassword;