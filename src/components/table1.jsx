import React,{useState,useEffect} from 'react';
import {Loading3QuartersOutlined} from '@ant-design/icons'

import 'antd/dist/antd.css';

import Axios from 'axios'
import { DeleteTwoTone } from '@ant-design/icons';

import { Button, Table } from 'antd';
const { Column } = Table;

const Table1=()=>{

  function refreshPage() {
    window.location.reload();
  }

  let editable=false
  const [accounts,setAccounts]=useState("")
  const [weightUpdate,setWeightUpdate]=useState("")
  const [emailUpdate,setemailUpdate]=useState("")
  const [passwordUpdate,setpasswordUpdate]=useState("")
  const [ipUpdate,setipUpdate]=useState("")
  const [accountLastActive,setAccountLastActive]=useState("")

  const deleteAccount=(proxy_email)=>{
    const dAccounts=[...accounts]
    var index = dAccounts.map(e => e.proxy_email).indexOf(proxy_email);
    dAccounts.splice(index,1)
    console.log(dAccounts)
    // setAccounts(dAccounts)
    refreshPage()
    Axios.post("http://localhost:4000/api/deleteAccount",{
       proxy_email:proxy_email
  })
  }
  const updateAccount=(proxy_email,emailU,passwordU,ipU,weightU)=>{
       Axios.post("http://localhost:4000/api/updateAccount",{
          email:proxy_email,
          emailU:emailU,
          passwordU:passwordU,
          ipU,ipU,
          weightU:weightU
     })
    
     refreshPage()
     }
  
  const getAccountDetails=async ()=>{
   
      Axios({
        method: "get",
        url: "http://localhost:4000/api/getAccounts",
    })
    .then(response => {
          if (response && response.data) {
            console.log(response.data['data'])
            setAccounts(response.data['data'])
          }
    })
    .catch(error => console.log(error));
    }

useEffect(()=>{
      getAccountDetails()
  },[])

  const resetStatus=(updateStatusEmail)=>{
    Axios.post("http://localhost:4000/api/resetStatus",{
          updateStatusEmail:updateStatusEmail        
     })
     refreshPage()
  }

  const solveCapcha=(capchaEmail)=>{
    console.log("eeeeeeeee",capchaEmail)
    Axios.post("http://localhost:4000/api/accLogin",{
      email:capchaEmail
    }).then(()=>{
      refreshPage()
    })
  }
 
return(
  <div>

    <Table dataSource={accounts}
    
      pagination={{
        total: accounts.length,
        pageSize: accounts.length,
        hideOnSinglePage: true
        
    }}
    style={{
      marginBottom:20
    }}
    > 

    <Column title="Email"  dataIndex="proxy_email" key="proxy_email" align="center" render={ (value, row, index) => { return <input  style={{ width: "250px" }} placeholderTextColor={'black'} onChange={(e)=>{setemailUpdate(e.target.value)}} defaultValue={value} /> }} />
    <Column title="Password" dataIndex="password" key="password"  align="center" render={ (value, row, index) => { return <input style={{ width: "120px" }} onChange={(e)=>{setpasswordUpdate(e.target.value)}} defaultValue={value} /> }}/>
    <Column title="Proxy ip" dataIndex="proxy_ip" key="proxy_ip" align="center"  render={ (value, row, index) => { return <input onChange={(e)=>{setipUpdate(e.target.value)}} defaultValue={value} /> }}/>
    <Column title="Weight" dataIndex="weight" key="weight"  align="center"  render={ (value, row, index) => { return <input style={{width:"30px"}} onChange={(e)=>{setWeightUpdate(e.target.value)}} defaultValue={value} /> }} ></Column>
    
    <Column
      title="Status"
      dataIndex="account_last_active"
      key="account_last_active"
      align="left"
      render={(text, record)=>{
        return {
          
          props: {
            style: { color:record["proxy_current_status"] == "active" ? "green" : "red" }   
          },
          children: <div>{text}</div>          
        };
        
      }}
      
    />
    
  
    <Column
      
      dataIndex="proxy_current_status"
      key="proxy_current_status"
      align="center"
      render={(text, record)=>{
        return {
          
          props: {
            style: { color:record["proxy_current_status"] == "active" ? "green" : "red" }
          },
          children: <div>{text}</div>
        };
      }}
      
    />
    <Column
      
      dataIndex="resetBtn"
      key="resetBtn"
      align="center"
      width="1px"
      render={(text, record)=>{
        if(record["proxy_current_status"]=="capcha"){
          
        return (
          <div>
            <Button onClick={()=>resetStatus(record.proxy_email)}>Reset</Button>
          </div>
        )
      }
      
      }}
      
    />
    <Column
      title="Configure profile"
      dataIndex="resetBtn"
      key="resetBtn"
      align="center"
      width="1px"
      render={(text, record)=>{
       
          
        return (
          <div>
            <Button onClick={()=>solveCapcha(record.proxy_email)}>Solve</Button>
          </div>
        )
      
      
      }}
      
    />
    
    
    <Column
      title="Update Account"
      key="update "
      align="center"
      
      render={(text, record) => (
        
          <Loading3QuartersOutlined onClick={()=>{
            console.log("text==>",text)
              updateAccount(text.proxy_email,emailUpdate,passwordUpdate,ipUpdate,weightUpdate)
          }}></Loading3QuartersOutlined>
      )}

      
      
    />
    <Column
      title="Delete Account"
      key="delete "
      align="center"
      render={(text, record) => (
          <DeleteTwoTone onClick={()=>{
            let email=record["proxy_email"]
            deleteAccount(email)
          }}></DeleteTwoTone>
      )}
    />


    </Table>
  </div>
)
}
export default Table1