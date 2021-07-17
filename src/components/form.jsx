import React from 'react';
import { useState,useEffect } from 'react'

import 'antd/dist/antd.css';
import { Form, Input, Button,Card, message} from 'antd';
import Axios from 'axios'
import '../app.css'

const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 6,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 0,
    span: 0,
  },
};

const SettingsForm = () => {
  let i=0
    const [form] = Form.useForm();

    const [daily_max_url,setDaily_max_url]=useState("")
    const [wait1,setWait1]=useState("")
    const [wait2,setWait2]=useState("")
    const [people_you_may_know,setPeople_you_may_know]=useState("")
    const [notifications,setNotifications]=useState("")
    const [messages,setMessages]=useState("")
    const [weight,setWeight]=useState("")


    const [old_daily_max_url,set_old_daily_max_url]=useState("")
    const [old_wait,set_old_wait]=useState("")
    const [old_wait2,set_old_wait2]=useState("")
    const [old_people_you_may_know,set_old_people_you_may_know]=useState("")
    const [old_notif,set_old_notif]=useState("")
    const [old_messages,set_old_messages]=useState("")
    const [old_weight,set_old_weight]=useState("")
    const [loading,setLoading]=useState(true)
    const submitDetails=()=>{
     Axios.post("http://localhost:4000/api/insert",{ 
        daily_max_url:daily_max_url,
        wait1:wait1,
        wait2:wait2,
        people_you_may_know:people_you_may_know,
        notifications:notifications,
        messages:messages,
        weight:weight

    });
    form.resetFields()
    window.location.reload();
    }
    const getDetails= ()=>{
       Axios({
        method: "get",
        url: "http://localhost:4000/api/getCrawlerSettings",
        
    })

    .then(response => {
        if (response && response.data) {
          set_old_daily_max_url(response.data["data"][0]["daily_max_url"])
          set_old_wait(response.data["data"][0]["randomWait1"])
          set_old_wait2(response.data["data"][0]["randomWait2"])
          set_old_people_you_may_know(response.data["data"][0]["people_you_may_know"])
          set_old_notif(response.data["data"][0]["notifications"])
          set_old_messages(response.data["data"][0]["messages"])
          
        }   
      })
      .catch(error => console.log(error));  
    }
  useEffect(()=>{
    
    getDetails()
    setLoading(false)
    form.setFieldsValue({
      daily_max_url: old_daily_max_url,
      random_wait1:old_wait,
      random_wait2:old_wait2,
      people_You_May_Know:old_people_you_may_know,
      messages:old_messages,
      notifications:old_notif
      
});
    
    
  })
  if(loading==false){
    
  return (
    
    <div className="site-card-border-less-wrapper">
    <Card title="Global Settings" bordered={false} style={{ width: '84vw',marginBottom:20 }}>

    <form action="" style={{display:'inline-block'}}>

      

      <label htmlFor="dailyMaxUrl">Daily Max Url</label>
      <input style={{margin:"15px",marginRight:"30px"}} type="text" name="dailt_max_url" defaultValue={old_daily_max_url} onChange={(e)=>{
        setDaily_max_url(e.target.value)
      }}/>
      <br></br>

      <label htmlFor="randomWait1">Random wait from</label>
      <input style={{margin:"15px"}} type="text" name="dailt_max_url" defaultValue={old_wait} onChange={(e)=>{
        setWait1(e.target.value)
      }}/>     to

      <input className="secondwait" style={{margin:"15px"}} type="text" name="dailt_max_url" defaultValue={old_wait2} onChange={(e)=>{
        setWait2(e.target.value)
      }}/>      <br></br>
      <h1><b>Navigation Action Frequency</b></h1>
      <label htmlFor="peopleYouMayKnow">People you may know</label>
      <input style={{margin:"15px"}} type="text" name="dailt_max_url" defaultValue={old_people_you_may_know} onChange={(e)=>{
        setPeople_you_may_know(e.target.value)
      }}/>      <br></br>

      <label htmlFor="notifications">Notifications</label>
      <input style={{margin:"15px"}} type="text" name="dailt_max_url" defaultValue={old_notif} onChange={(e)=>{
        setNotifications(e.target.value)
      }}/>      <br></br>

      <label htmlFor="messages">Messages</label>
      <input style={{margin:"15px"}} type="text" name="dailt_max_url" defaultValue={old_messages} onChange={(e)=>{
        setMessages(e.target.value)
      }}/>      <br></br>

<Button type="submit" onClick={()=>{submitDetails()}}>
          Submit  
        </Button>
    </form>

    </Card>
  </div>
  );
      }
    else{
      return(
        <h1>
          rendering
        </h1>
      )
    }
};

export default SettingsForm