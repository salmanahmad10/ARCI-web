import React,{Component} from 'react';
import {Bar} from 'react-chartjs-2'
import Axios from 'axios'
import {Button, Input} from 'antd';
class Chart2 extends Component{
    constructor(props){
        super(props)
        this.state={
            chartData1:{
                labels:['1 nov','2 nov','3 nov','4 nov','5 nov','6 nov','7 nov','8 nov','9 nov','10 nov'],
                datasets:[
                    {
                        label:'LinkedIn Individuals',
                        data:this.props.sData,
                        backgroundColor:'rgba(255,127,80,1)',
                        stack: 1,
                        borderWidth: 1, 
                    },
                    {
                        label:'LinkedIn Companies',
                        data:this.props.sData,
                        backgroundColor:'rgba(255,69,0,1)' ,
                        stack: 1,
                        borderWidth: 1,
                    },
                    {
                        label:'PubMed tasks',
                        data:this.props.sData,
                        backgroundColor:'rgba(255,215,0,1)' ,
                        stack: 1,
                        borderWidth: 1,
                    }
            ],  
            },
            dataArray:[],
            dataArray2:[] ,
            dataArray3:[],
            labelArray1:[],
            input:0,
            clicked:false,
            task_type:[]
        } 
    }
    handleChange=(e)=> {
    this.setState({ input:e.target.value} );
   } 
    getPreviousXDays=(noOfDays)=>{
        const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        let dateArray=[]    
        for (let i=0;i<=noOfDays;i++){
            var date = new Date();
            date.setDate(date.getDate() - i)
            dateArray[i]=date.getDate() +" "+monthNames[date.getMonth()]

        }
        return dateArray
    }    
    getLinkedinPendingTasks=()=>{
        
        
           Axios({
            method: "get",
            params:{
                filter:this.state.input
            },
            url:'http://localhost:4000/api/getLinkedinPendingTasks/'
            
        })
        .then (response => {
            if (response && response.data) {
                
                let temp1=[]
                let temp2=[]
                let temp3=[]
                let temp4=[]

                for(let i=0;i<response.data['data'].length;i++){
                    temp1[i]=this.chopData(response.data['data'][i]['date'])
                    temp2[i]=response.data['data'][i]['linkedinTasks']
                    temp3[i]=response.data['data'][i]['linkedinCompanies']
                    temp4[i]=response.data['data'][i]['pubmedTasks']
                    
                }
              
                this.state.chartData1.labels=temp1
                
               
                this.setState({labelArray1:temp1}) 
                this.setState({dataArray:temp2})
                
                this.setState({dataArray2:temp3 })
                this.setState({dataArray3:temp4})          
                this.state.chartData1.datasets[0]["data"]=this.state.dataArray
                
                this.state.chartData1.datasets[1]["data"]=this.state.dataArray2
                this.state.chartData1.datasets[2]["data"]= this.state.dataArray3
            
            }   
        })
        .catch(error => console.log(error));  
    }
    getTaskType=()=>{   
            Axios({
             method: "get",
             url:'http://localhost:4000/api/getJobType/'
             
         })
         .then (response => {
             let tempJobType=[]
             if (response && response.data) {
                for(let i=0;i<response.data['data'].length;i++){
                    tempJobType[i]=response.data['data'][i]['task_type']            
                }
                this.setState({task_type:tempJobType})
                this.state.chartData1.datasets[0].label="wewe"
                this.state.chartData1.datasets[1].label=this.state.task_type[0]
                this.state.chartData1.datasets[2].label=this.state.task_type[2]
             }   
           
         })
         .catch(error => console.log(error));  
         }



    
    handleClick=(e)=> {  
        this.setState({clicked:true})
      }
      
    componentDidMount(){
        this.getLinkedinPendingTasks()
        this.getTaskType()
        
    }
   componentDidUpdate(prevProps,prevState){
    if((prevState.clicked!==this.state.clicked)){
        this.getLinkedinPendingTasks()
        this.setState({clicked:false})
       
        
    }
   }
    chopData=(data)=>{
        let MasterData
        for(let i=0;i<data.length;i++){
            MasterData=data.split("T",1)
        }
        return MasterData.toString()
    }
    render(){
        return (
            <div className="chart">
                <b><h1>JOB QUEUE STATUS</h1></b>
               <Bar  
               width={"5%"} 
               height={"2%"}
               options={{ maintainAspectRatio: true }}
                data={this.state.chartData1} 
                options={{
                    title:{
                        display:true,
                    },
                    legend:{
                        display:true,
                        position:'right'
                    }
                }}/>
                 <Input style={{ width: 300,marginBottom:20 }} placeholder="filter by Days" onChange={ this.handleChange } ></Input>
                <Button onClick={this.handleClick}>Filter</Button>
            </div>
        )
    }
}
export default Chart2