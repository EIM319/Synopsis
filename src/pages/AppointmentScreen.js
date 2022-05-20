import React from 'react';
import JsonData from './table.json';

function AppointmentScreen(){
    const DisplayData=JsonData.map(
        (info)=>{
            return(
                <tr>
                    <td>{info.Purpose}</td>
                    <td>{info.Date}</td>
                    <td>{info.Day}</td>
					<td>{info.Time}</td>
                    <td>{info.Clinic}</td>
                    <td>{info.ConsultingDoctor}</td>
					<td>{info.EstimatedTime}</td>
                </tr>
            )
        }
    )
 
    return(
        <div>
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th>Purpose</th>
                    <th>Date</th>
                    <th>Day</th>
					<th>Time</th>
                    <th>Clinic</th>
                    <th>ConsultingDoctor</th>
					<th>EstimatedTime</th>
                    </tr>
                </thead>
                <tbody>
                 
                    {DisplayData}
                    
                </tbody>
            </table>
             
        </div>
    )
 }
 

export default AppointmentScreen;
