import React, { useState } from 'react';
import Sidebar from "../components/Sidebar"
import Barchart2 from "../components/Barchart2"
import Table3 from "../components/table3"
import {Button, Input} from 'antd';
const { Search } = Input;


function MainPage(){
  const options = {
    scales: {
         xAxes: [{
             stacked: true
         }],
         yAxes: [{
             stacked: true
         }]
     }
 }

  return(
    <div>  

        <Sidebar>

          <Barchart2 options={options} ></Barchart2>
          
         
          <Table3></Table3>
        </Sidebar>
        
    </div>
  )
  }


export default MainPage;
