import React from 'react'
import { Modal, Button } from 'antd';
import { Form} from 'antd';

class ModalDashboard extends React.Component {
  state = {
    modal1Visible: false,
    modal2Visible: false,

    email:"",
    passowrd:"",
    proxy:"",
    weight:"",
    proxy_status:""

  };

   submitDetails=()=>{
    let data=[]
    Axios.post("http://localhost:4000/api/insert",{ 
        

    }).then(()=>{
        alert("Crawler Settings Updated")
    });
    form.resetFields()
    }

  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  render(props) {
    const [form] = Form.useForm();
    return (
      <>
        
       
        <Button type="primary" onClick={() => this.setModal2Visible(true)}>
          {this.props.children}
        </Button>
        <Modal
          title="Add more accounts"
          centered
          visible={this.state.modal2Visible}
          onOk={() => this.setModal2Visible(false)}
          onCancel={() => this.setModal2Visible(false)}
        >
            {this.props.children}
          
        </Modal>
      </>
    );

  }
}

export default ModalDashboard