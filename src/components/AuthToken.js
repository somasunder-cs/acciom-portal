import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Row, Button, FormGroup, FormControl, ControlLabel, HelpBlock, Panel } from 'react-bootstrap';

class AuthToken extends Component{
    constructor(props){
        super(props);
        this.state = {
            isToken: false,
            value: '',
            copied: false,
        }
        this.generateToken = this.generateToken.bind(this);
    }

    generateToken = () => {
        this.setState({isToken : true})
    }

    // var buttonStyle = {}

    render(){
        var buttonStyle = {
            color: 'blue',
            right: '100px'
          };

        return(
            <div className='generateToken'>
                <Panel>
                    <Panel.Heading>
                        <h5>Message:</h5>
                        <input className= "needToken" placeholder="Why you need this Token ?"></input>
                    </Panel.Heading>
                    <Panel.Body><h5>Personal Access Token</h5>
                    <Button bsStyle="primary" className="gentokenButton" onClick={(event) => { event.preventDefault(); this.generateToken()}}>Generate Token</Button>                  
                    </Panel.Body>
                    {this.state.isToken ? (<Panel.Body className="tokenpanelBackground">
                                                <div>Make sure to copy your new personal access token now. You won’t be able to see it again!</div><br></br>
                                                    <input className="tokenField" value={this.state.value} onChange={({target: {value}}) => this.setState({value, copied: false})} />
                                                    <CopyToClipboard text={this.state.value} onCopy={() =>this.setState({copied: true})}>
                                                        <i class="fas fa-copy fa-lg clipboardOnhover"></i>
                                                    </CopyToClipboard>
                                            </Panel.Body>) : null}
                    
                </Panel>

            </div>
            
        )
    }
}

export default AuthToken;