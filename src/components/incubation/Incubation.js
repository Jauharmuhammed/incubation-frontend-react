import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './Incubation.css'
import axiosInstance from '../../utils/axios'
import { AuthContext } from '../../context/AuthContext'
import { MessagesContext } from '../../context/Messages'

function Incubation() {
  const { user, getIncubation} = useContext(AuthContext)
  const { incubationErrorMessage, setIncubationErrorMessage, incubationSuccessMessage, setIncubationSuccessMessage } = useContext(MessagesContext)

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyLogo, setCompanyLogo] = useState(null)
  const [teamAndBackground, setTeamAndBackground] = useState('')
  const [companyAndProducts, setCompanyAndProducts] = useState('')
  const [problemToSolve, setProblemToSolve] = useState('')
  const [solution, setSolution] = useState('')
  const [valueProposition, setValueProposition] = useState('')
  const [competetors, setCompetetors] = useState('')
  const [revenueModel, setRevenueModel] = useState('')
  const [marketSize, setMarketSize] = useState('')
  const [marketPlan, setMarketPlan] = useState('')
  const [typeOfIncubation, setTypeOfIncubation] = useState('')
  const [businessProposal, setBusinessProposal] = useState('')

  useEffect(() => {
    getIncubation();
    setIncubationErrorMessage('')
    setIncubationSuccessMessage('')

  }, [])
  

  const submitForm = async (e) => {
    e.preventDefault()
    if (name !== '' && address !== '' && state !== '' && city !== '' && email !== '' && phoneNumber !== '' && companyName !== '' && companyAndProducts !== '' && problemToSolve !== '' && solution !== '' && valueProposition !== '' && competetors !== '' && revenueModel !== '' && marketSize !== '' && marketPlan !== '' && typeOfIncubation !== '' && businessProposal !== '') {
      let data = JSON.stringify({
        'user':user.user_id,
        'name':name,
        'address':address,
        'state':state,
        'city':city,
        'email':email,
        'phone_number':phoneNumber,
        'company_name':companyName,
        // 'company_logo':companyLogo,
        'team_and_background':teamAndBackground,
        'company_and_products':companyAndProducts,
        'problem_to_solve':problemToSolve,
        'solution':solution,
        'value_proposition_for_customer':valueProposition,
        'competetors':competetors,
        'revenue_model':revenueModel,
        'market_size':marketSize,
        'market_plan':marketPlan,
        'type_of_incubation':typeOfIncubation,
        'business_proposal':businessProposal,
      })

      axiosInstance.post('/incubation/', data , {headers: {
        'Content-Type': 'application/json'
      }
      }).then((response)=>{
        if (response.status === 201){
          setIncubationSuccessMessage('Form submitted successfully')
          navigate('/')
        }
      }).catch((error)=>{
        if (error.response.status === 400){
          setIncubationErrorMessage(error.response.data?.email[0])
        }
      })
    }else{
      setIncubationErrorMessage('Please fill all fields')
    }
  }

  return (
    <div id='incubation-app'>
      <div className='incubation-box box'>
        <form className='incubation-form' encType="multipart/form-data" onSubmit={submitForm} >
          <div className='row'>
            <div className='col-12 col-md-6'>
              <input type="text" value={name} onChange={(e)=> setName(e.target.value)}
                tabIndex="1" name='name' placeholder="Name" />
            </div>
            <div className='col-12 col-md-6'>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                tabIndex="1" name='address' placeholder="Address * " />
            </div>
            <div className='col-12 col-md-6'>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)}
                tabIndex="1" name='city' placeholder="City * " />
            </div>
            <div className='col-12 col-md-6'>
              <input type="text" value={state} onChange={(e) => setState(e.target.value)}
                tabIndex="1" name='state' placeholder="State * " />
            </div>
            <div className='col-12 col-md-6'>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                tabIndex="1" name='email' placeholder="Email * " />
            </div>
            <div className='col-12 col-md-6'>
              <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                tabIndex="1" name='phone_number' placeholder="Phone Number *" />
            </div>
            <div className='col-12 col-md-6'>
              <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                tabIndex="1" name='company_name' placeholder="Company Name *" />
            </div>
            <div className='col-12 col-md-6'>
              <input type="file" onChange={(e) => setCompanyLogo(e.target.files[0])}
                tabIndex="1" name='company_logo'  />
            </div>
            
            <textarea value={teamAndBackground} onChange={(e) => setTeamAndBackground(e.target.value)}
              placeholder='Describe your team and background? *'
              name="team_and_background" id="team_and_background"rows="5" className='mt-3'></textarea>
            
            <textarea value={companyAndProducts} onChange={(e) => setCompanyAndProducts(e.target.value)}
              placeholder='Describe your company and products? *'
              name="company_and_products" id="company_and_products"rows="5" className='mt-3'></textarea>
            
            <textarea value={problemToSolve} onChange={(e) => setProblemToSolve(e.target.value)}
              placeholder="Describe the problem you're trying to solve? *"
              name="problem_to_solve" id="problem_to_solve"rows="5" className='mt-3'></textarea>
            
            <textarea value={solution} onChange={(e) => setSolution(e.target.value)}
              placeholder='What is unique about your solution? *'
              name="solution" id="solution"rows="5" className='mt-3'></textarea>
            
            <textarea value={valueProposition} onChange={(e) => setValueProposition(e.target.value)}
              placeholder='What is your value proposition to the customer? *'
              name="value_proposition_for_customer" id="value_proposition_for_customer"rows="5" className='mt-3'></textarea>
            
            <textarea value={competetors} onChange={(e) => setCompetetors(e.target.value)}
              placeholder='Who are your competetors and what are your competetive advantage? *'
              name="competetors" id="competetors"rows="5" className='mt-3'></textarea>
            
            <textarea value={revenueModel} onChange={(e) => setRevenueModel(e.target.value)}
              placeholder='Explain your revenue model? *'
              name="revenue_model" id="revenue_model"rows="5" className='mt-3'></textarea>
            
            <textarea value={marketSize} onChange={(e) => setMarketSize(e.target.value)}
              placeholder='What is the potential market size of the product? *'
              name="market_size" id="market_size"rows="5" className='mt-3'></textarea>
            
            <textarea value={marketPlan} onChange={(e) => setMarketPlan(e.target.value)}
              placeholder='How do you market or plan to market your products and services? *'
              name="market_plan" id="market_plan"rows="5" className='mt-3'></textarea>

            <div className='radio'>
              <p className='mt-3 mb-1'>Type of Incubation needed? *</p>
              <input type="radio" name="type_of_incubation" id="physical_incubation" value='Physical Incubation' onChange={(e) => setTypeOfIncubation(e.target.value)} />
              <label className='ms-2' htmlFor="physical_incubation"> Physical Incubation</label> <br />
              <input type="radio" name="type_of_incubation" id="virtual_incubation" value='Virtual Incubation' onChange={(e) => setTypeOfIncubation(e.target.value)} />
              <label className='ms-2' htmlFor="virtual_incubation"> Virtual Incubation</label> <br />
            </div>

            <textarea value={businessProposal} onChange={(e) => setBusinessProposal(e.target.value)}
              placeholder='Upload a detailed business proposal? *'
              name="business_proposal" id="business_proposal"rows="5" className='mt-3'></textarea>
          </div>
          
          {incubationErrorMessage && <p className='error-message'>{incubationErrorMessage}</p>}

          <input type="submit" className="btn btn-login" value="Submit" />
        </form>
      </div>
    </div>
  )
}

export default Incubation