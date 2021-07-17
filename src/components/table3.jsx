import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import '../app.css';
import Axios from 'axios'

const Table3=(props)=> {


    const [jobs,setJobs]=useState("")
    const [isLoading,setIsLoading]=useState(1)
    let uniqueDate=[]
    let uniqueDateArr=[]
    let jobsCreatedCount=[]
    let uniqueDateSecond=[]
    let jobsDuration=[]
    const getJobs=()=>{
        Axios.all([
            Axios({
                method: "get",
                url: "http://localhost:4000/api/getLinkedinJobs"
                })
                .then(response => {
                    if (response && response.data) {
                        
                        setJobs(response.data['data'])
                        console.log(response.data['data'][0])
                        for(let i=0;i<response.data['data'].length;i++){
                            uniqueDateArr[i]=chopData(response.data['data'][i]['task_start_time'])
                            jobsCreatedCount[i]=response.data['data'][i]['count(*)']
                        }
                       
                        
                        console.log("jobs created:  ",jobsCreatedCount)
                        
                        }
                }),
            Axios({
                method: "get",
                url: "http://localhost:4000/api/getLinkedinJobsDuration",
                })
                .then(response => {
                    if (response && response.data) {
                        for(let i=0;i<response.data['data'].length;i++){
                            uniqueDateSecond[i]=chopData(response.data['data'][i]['date'])
                            jobsDuration[i]=response.data['data'][i]['duration']
                            console.log("jobs duration: ",jobsDuration[i])
                        }

                    }
                })
            
                        
        ]).then(()=>{
            let elem=[]
            for(let i=0;i<uniqueDateArr.length;i++){
                for(let j=0;j<uniqueDateSecond.length;j++){
                    if(uniqueDateArr[i].localeCompare(uniqueDateSecond[j])==0){
                        console.log("matched")
                        console.log("jobs durationnnnnn",jobsDuration[j])
                        elem[i]= {"date":uniqueDateArr[i],"jobsCreated":jobsCreatedCount[i],"duration":jobsDuration[j]}
                        break
                    }
                    else{
                        elem[i]= {"date":uniqueDateArr[i],"jobsCreated":jobsCreatedCount[i]}
                    }
                }
               
                
                    
            }
            console.log(elem)
            setJobs(elem)
            setIsLoading(0)
        })
              
    }
    const chopData=(data)=>{
        let MasterData   
        MasterData=data.split("T",1)
        return MasterData.toString()
    }
   
      
   const renderTableData=()=> {
      
    return jobs.map((jobs, index) => {
         const {date, jobsCreated, duration} = jobs 
       return (
          <tr key={date}>
              <td>{date}</td>
             <td>{jobsCreated}</td>
             <td>{duration}</td>
          </tr>
        )
    })
    }

    const renderTableHeader=()=>{
        let header = ["Date","Jobs Created","Duration"]
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
     }  

      useEffect(() => {
        getJobs()
      },[]);
      if(isLoading==0){
    return(
        <div>
          <h1 id='title'>Accounts info</h1>
          <table id='accounts'>
             <tbody>
             <tr>{renderTableHeader()}</tr>
                  {renderTableData()}
             </tbody>
            
          </table>
       </div>
    )}
    else{
        return(
            <div>
                <h1>
                    Loading from database...
                </h1>
            </div>
        )
    }
}
export default Table3