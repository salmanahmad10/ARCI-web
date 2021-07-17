import React from 'react'
import { Modal, Button } from 'antd';
import { Form, Input} from 'antd';
import Axios from 'axios'
import {PlusCircleFilled} from '@ant-design/icons'
class ModalDashboard extends React.Component {
  state = {
    modal1Visible: false,
    modal2Visible: false,

    email:"",
    passowrd:"",
    proxy:"",
    weight:"",
    proxy_status:"",
    chrome_profile:""

  };

   submitDetails=()=>{
    Axios.post("http://localhost:4000/api/insertAccountDetails",{ 
        proxy_email:this.state.email,
        password:this.state.passowrd,
        weight:this.state.weight,
        proxy_ip:this.state.proxy,
        proxy_current_status:this.state.proxy_status,
        chrome_profile:this.state.chrome_profile

    }).then(()=>{
        alert("account added")
    });
    window.location.reload();
    }

    layout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 15,
      },
    };
  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  render() {
    return (
      <>
        <PlusCircleFilled style={{ fontSize: '40px', color: '#4c8bf5' }} onClick={() => this.setModal2Visible(true)} />

        
        <Modal
          footer={null}
          title="Add more accounts"
          centered
          visible={this.state.modal2Visible}
          onOk={() => this.setModal2Visible(false)}
          onCancel={() => this.setModal2Visible(false)}
        >
            <Form
                {...this.layout}            
            >
                
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                          required: true,
                          message: 'Please input your username!',
                        },
                      ]}
                    
                >
                    <Input onChange={(e)=>{
                        this.state.email=e.target.value
                    }}  />
                </Form.Item>

                <Form.Item
                    label="Passowrd"
                    name="password"
                    rules={[
                        {
                          required: true,
                          message: 'Please input your username!',
                        },
                      ]}
                    
                >
                    <Input onChange={(e)=>{
                        this.state.passowrd=e.target.value
                    }}  />
                </Form.Item>


                <Form.Item
                    label="Proxy"
                    name="proxy"
                    rules={[
                        {
                          required: true,
                          message: 'Please input your username!',
                        },
                      ]}
                    
                >
                    <Input onChange={(e)=>{
                        this.state.proxy=e.target.value
                    }}  />
                </Form.Item>


                <Form.Item
                    label="Weight"
                    name="weight"
                    rules={[
                        {
                          required: true,
                          message: 'Please input your username!',
                        },
                      ]}
                    
                >
                    <Input onChange={(e)=>{
                        this.state.weight=e.target.value
                    }}  />
                </Form.Item>


                <Form.Item
                    label="Proxy Status"
                    name="proxyStatus"
                    rules={[
                        {
                          required: true,
                          message: 'Please input your username!',
                        },
                      ]}
                    
                >
                    <Input onChange={(e)=>{
                        this.state.proxy_status=e.target.value
                    }}  />
                </Form.Item>

                <Form.Item
                    label="Chrome Profile"
                    name="chrome_profile"
                    rules={[
                        {
                          required: true,
                          message: 'Please input chrome profile',
                        },
                      ]}
                    
                >
                    <Input onChange={(e)=>{
                        this.state.chrome_profile=e.target.value
                    }}  />
                </Form.Item>



                <Button onClick={()=>{this.submitDetails()}}>Submit</Button>


            </Form>
            
          
        </Modal>
      </>
    );

  }
}

export default ModalDashboard