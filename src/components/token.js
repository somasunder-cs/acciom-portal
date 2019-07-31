import React, { Component } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import { Link } from 'react-router-dom';


// const styles=makeStyles(theme => ({
// 	root: {
// 		display: 'flex',
//     },
// ));

class Token extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
            <div>
                <h2>Personal Access Tokens</h2>
                <button>Generate Token</button>
            </div>
        )
    }
}

export default Token;