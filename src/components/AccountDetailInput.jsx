import React from 'react'
import { Component } from 'react';

class AccountDetailInput extends Component{
    constructor(props){
    super(props);
    }
    
    render(){
        return(
            <div>
                <input></input>
                <input></input>
                <input></input>
                <input></input>
                <button>Add more</button>
            </div>
        );
    }
}
export default AccountDetailInput;