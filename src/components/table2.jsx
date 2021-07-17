import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import '../app.css';
import Axios from 'axios'

const Table2=(props)=> {

  
  const [profile,setProfile]=useState("")
  const [isLoading,setIsLoading]=useState(1)
  let uniqueEmails=[]
  let uniqueEmails24Hours=[]
  let emailOccourances7days=[]
  let emailOccourances24hours=[]
  let emails7=[]
  let emails24=[]

  let statusEmailOccour=[]
  let statusEmailOccour24=[]
  
  let unsuccesfulEmails=[]
  let unsuccesfulEmails24=[]

   let elem=[]

   const getAccountDetails=()=>{
    Axios.all([
      Axios({
          method: "get",
          url: "http://localhost:4000/api/getCrawlerPerformanceSevenDays",
            })
            .then(response => {
                if (response && response.data) {
                    console.log("==>",response.data['data'])
                    for(let i=0;i<response.data['data'].length;i++){
                      emails7[i]=response.data['data'][i]['task_performer']
                    }
                    emailOccourances7days=countOccourances(emails7)[1]
                    uniqueEmails=countOccourances(emails7)[0]
                    }
            }),
      Axios({
          method: "get",
          url: "http://localhost:4000/api/getCrawlerPerformance24Hours",
            })
            .then(response => {
                if (response && response.data) {
                    for(let i=0;i<response.data['data'].length;i++){
                        emails24[i]=response.data['data'][i]['task_performer']
                    }
                    
                    emailOccourances24hours=countOccourances(emails24)[1]
                    if(emailOccourances24hours.length==0){
                      emailOccourances24hours[0]="empty"
                    }
                    uniqueEmails24Hours=countOccourances(emails24)[0]
                                      
                    }
            }),
      Axios({
        method: "get",
        url: "http://localhost:4000/api/getUnsuccessfulStats",
          })
          .then(response => {
              if (response && response.data) {
                for(let i=0;i<response.data['data'].length;i++){
                  statusEmailOccour[i]=response.data["data"][i]['Count(task_success_time)']
                  unsuccesfulEmails[i]=response.data["data"][i]['task_performer']
                }
                
              }
              console.log("data",statusEmailOccour)
          }),
      Axios({
        method: "get",
        url: "http://localhost:4000/api/getUnsuccessfulStats24",
          })
          .then(response => {
              if (response && response.data) {
                for(let i=0;i<response.data['data'].length;i++){
                  statusEmailOccour24[i]=response.data["data"][i]['Count(task_success_time)']
                  unsuccesfulEmails24[i]=response.data["data"][i]['task_performer']
                }
                
              }
              
          }),
      
    ]).then(()=>{
      let total=[]
      let total24=[]
      let ratio=[]
      let ratio24=[]
 
      for(let i=0;i<emailOccourances7days.length;i++){
        total[i]=statusEmailOccour[i]+emailOccourances7days[i]
      }
      for(let i=0;i<emailOccourances7days.length;i++){
        total24[i]=statusEmailOccour24[i]+emailOccourances24hours[i]
      }

      for(let i=0;i<uniqueEmails.length;i++){
        for(let j=0;j<unsuccesfulEmails.length;j++){
          if(uniqueEmails[i].localeCompare(unsuccesfulEmails[j])==0){
            ratio[i]=Math.round(((emailOccourances7days[j]/total[j])*100),0)+"%"
            console.log(uniqueEmails[i]+" "+unsuccesfulEmails[j]+" =matched")
          }
          
        }
        
      }
      if(uniqueEmails24Hours.length>0){
      for(let i=0;i<uniqueEmails.length;i++){
        for(let j=0;j<unsuccesfulEmails24.length;j++){
          if(uniqueEmails[i].localeCompare(unsuccesfulEmails24[j])==0){
            ratio24[i]=Math.round(((emailOccourances24hours[j]/total24[j])*100),0)+"%"
          }
        }
        
      }
    }
    console.log(ratio24)
    for(let i=0;i<uniqueEmails.length;i++){
      if(ratio[i]==undefined){
        ratio[i]="100%"
      }
      if(ratio24[i]==undefined){
        ratio24[i]="100  %"
      }
    }



      for(let i=0;i<uniqueEmails.length;i++){
        if(uniqueEmails24Hours.length>0){
          for(let j=0;j<uniqueEmails24Hours.length;j++){
            if(uniqueEmails[i].localeCompare(uniqueEmails24Hours[j])==0){
              console.log(uniqueEmails[i],"matched ",uniqueEmails24Hours[j])
              elem[i]= {"email":uniqueEmails[i],"_7_days":emailOccourances7days[i]+" - "+ ratio[i],"_24_hours":emailOccourances24hours[j]+" - "+ratio24[i]}
              
              break
            }
            else{
              elem[i]= {"email":uniqueEmails[i],"_7_days":emailOccourances7days[i]+" - "+ratio[i]}
            }
          }
      }
      else{
       
        
        
        elem[i]= {"email":uniqueEmails[i],"_7_days":emailOccourances7days[i]+" - "+ratio[i]}
      }          
        }
        console.log(".......",elem)
        setProfile(elem)
        setIsLoading(0)
        
    })
        
        
        
       
    }
    const countOccourances=(arr)=> {
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

   const renderTableData=()=> {
    return profile.map((profile, index) => {
         const {email, _7_days, _24_hours} = profile 
       return (
          <tr key={email}>
             <td>{email}</td>
             <td>{_7_days}</td>
             <td>{_24_hours} </td>
          </tr>
        )
    })
    }
    const renderTableHeader=()=>{
        let header = ["Email","7 days","24 hours"]
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
     }  

      useEffect(() => {
        getAccountDetails()
      
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
                    Loading From Database...
                </h1>
            </div>
        )
    }
}
export default Table2