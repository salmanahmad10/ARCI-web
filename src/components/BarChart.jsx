import React,{Component} from 'react';
import {Bar} from 'react-chartjs-2'
import Axios from 'axios'
import {Button, Input} from 'antd';


class Chart extends Component{

    constructor(props){
        super(props)

        this.state={
            chartData1:{
                labels:['1 nov','2 nov','3 nov','4 nov','5 nov','6 nov','7 nov','8 nov','9 nov','10 nov'],
                datasets:[
                    {
                    
                        label:'successful links Crawled',
                        data:this.props.sData,
                        backgroundColor:'rgba(255,127,80,1)' ,
                        stack: 1,
                        borderWidth: 1,
                          

                    },
                    {
                        
                        label:'unsuccesful links Crawled',
                        data:this.props.uData,
                        
                        backgroundColor:'rgba(255,69,0,1)' ,
                        stack: 1,
                        borderWidth: 1,
                        
                        
                    },
               
                
                
            ],
            
            },
            
            dataArray:[],
            dataArray2:[],
            CrawlingStatus:"Links Crawled Succesfully",
            labelArray:[],
            labelArray2:[],
            clicked:false,
            input:0
        } 
       
    }

    

    divideData=(arr)=>{
        var a = [],
        b = [],
        prev;

        arr.sort();
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] !== prev) {
                a.push(arr[i]);
                b.push(1);
            } else {
                b[b.length - 1]++;
            }
            prev = arr[i];
        }

        return [a, b];
    }
    getPreviousXDays=(noOfDays)=>{
        const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        let dateArray=[]
       
       
        for (let i=noOfDays;i>=0;i--){
            console.log(i)
            var date = new Date();
            date.setDate(date.getDate()-1 - i)
            dateArray[i]=date.getDate() +" "+monthNames[date.getMonth()]
            
        }
               
    
        return dateArray
    }
    chopData=(data)=>{
        let MasterData
        for(let i=0;i<data.length;i++){
            MasterData=data.split("T",1)
        }
        return MasterData.toString()
    }


        
    getAccountSStats=()=>{
        let splitData=[]
        Axios({
            method: "get",
            
            params:{
                filter:this.state.input
            },
            url: "http://localhost:4000/api/getCrawlerSdata"
        })


        .then(response => {
            if (response && response.data) {
                for(let i=0;i<response.data['data'].length;i++){
                    splitData[i]=(this.chopData(response.data['data'][i]['task_success_time']))
                }
                console.log(splitData)
                let limit=10
                if(this.state.input!=0){
                    limit=this.state.input
                }
              
                let temp1=[]
                let temp2=[]
                for(let i=0;i<limit;i++){
                    
                    temp1[i]=this.divideData(splitData)[1][i]
                    temp2[i]=this.divideData(splitData)[0][i]
                }
                this.setState({dataArray:temp1})
                this.setState({labelArray:temp2})
                this.state.chartData1.datasets[0]["data"]=this.state.dataArray
                this.state.chartData1.labels=this.state.labelArray
                console.log(this.state.chartData1)
                this.forceUpdate()
            }   
        })
        .catch(error => console.log(error));  
        console.log("3",this.state.chartData1)    
        }
    

    getAccountUStats=()=>{
    
        let splitData=[]
        Axios({
            method: "get",
            url: "http://localhost:4000/api/getCrawlerUdata",
            params:{
                filter:this.state.input
            }
            
        })

        .then(response => {
            if (response && response.data) {
                for(let i=0;i<response.data['data'].length;i++){
                    splitData.push(this.chopData(response.data['data'][i]['task_success_time']))
                }
                let limit=10
                if(this.state.input!=0){
                    limit=this.state.input
                }
                let temp1=[]
                let temp2=[]
                for(let i=0;i<limit;i++){
                    
                    temp1[i]=this.divideData(splitData)[1][i]
                    temp2[i]=this.divideData(splitData)[0][i]
                  
                    
                }
                this.setState({dataArray2:temp1})
                this.setState({labelArray2:temp2})
                this.state.chartData1.datasets[1]["data"]=this.state.dataArray2
                
                this.forceUpdate()
            }   
        })
        .catch(error => console.log(error));  
        }
    
    handleChange=(e)=> {
        this.setState({ input:e.target.value} );
    } 

    handleClick=(e)=> {  
        this.setState({clicked:true})
    }
    
    componentDidMount(){
        this.getAccountSStats()
        this.getAccountUStats()
    }
   
   componentDidUpdate(prevProps,prevState){
    if((prevState.clicked!==this.state.clicked)){
        this.getAccountSStats()
        this.getAccountUStats()
        this.setState({clicked:false})
    }
   }
    render(){
        return (

            <div className="chart">
                <h1><b>AGGREGATE CRAWLER STATS</b></h1>
    
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
                     
                }}
                />
                <Input style={{ width: 300,marginBottom:20 }} placeholder="filter by Days" onChange={ this.handleChange } ></Input>
                <Button onClick={this.handleClick}>Filter</Button>
            </div>
        )
    }
}
export default Chart