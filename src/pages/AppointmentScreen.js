import React from 'react';
import JsonData from './table.json';

function AppointmentScreen(){
    const DisplayData=JsonData.map(
        (info)=>{
            return(
                <tr>
                    <td>{info.title}</td>
                    <td>{info.value}</td>
                </tr>
            )
        }
    )
 
    return(
        <div>
            <h3>Upcoming Appointment</h3>
            <div>
            <table class="table table-striped">
                <tbody>

                    {DisplayData}
                    
                </tbody>
            </table>
            </div>
        </div>
    )
 }
 

export default AppointmentScreen;
