import React from 'react'
import Table1 from './table1'
import '../app.css';
import SettingsForm from './form'
import ModalDashboard from './modal'

const DashboardSettings=()=>{
  


  return(
    <div>      
 
      <SettingsForm></SettingsForm>
      <Table1 >
        
      </Table1>
      <ModalDashboard>add more accounts</ModalDashboard>
    </div>
    
  )
}


export default DashboardSettings;