import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from '../../utils/axios';

function SlotBox(props) {
    const {authTokens} = useContext(AuthContext)
    const [companyName, setCompanyName] = useState('')

    const getCompany = () => {
        axiosInstance
          .get(`/incubations/${props.text}/`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(authTokens?.access),
            },
          })
          .then((response) => {
            setCompanyName(response.data.company_name);
          });
      };

    useEffect(() => {
        if (props.text){
            getCompany()
        }
    })
    
    
    return (
        <div className='slotBox'>
            <h6 className='slotText'>{companyName}</h6>
        </div>
    )
}

export default SlotBox