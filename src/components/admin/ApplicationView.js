import React, { useContext } from 'react'
import { ApplicationViewContext } from '../../context/ApplicationViewContext'

function ApplicationView() {
    const { applicationDetails } = useContext(ApplicationViewContext)

    return (
        <div id='incubation-app'>
            <div className='incubation-box box'>
                <form className='incubation-form' aria-readonly aria-disabled>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <label htmlFor="name">Name</label>
                            <input type="text" readOnly value={applicationDetails.name}
                                tabIndex="1"   id='name' />
                        </div>
                        <div className='col-12 col-md-6'>
                            <label htmlFor="address">Address </label>
                            <input type="text" readOnly value={applicationDetails.address}
                                tabIndex="1"   id='address' />
                        </div>
                        <div className='col-12 col-md-6'>
                            <label htmlFor="city">City </label>
                            <input type="text" readOnly value={applicationDetails.city}
                                tabIndex="1"   id='city' />
                        </div>
                        <div className='col-12 col-md-6'>
                            <label htmlFor="state">State </label>
                            <input type="text" readOnly value={applicationDetails.state}
                                tabIndex="1"   id='state' />
                        </div>
                        <div className='col-12 col-md-6'>
                            <label htmlFor="email">Email </label>
                            <input type="text" readOnly value={applicationDetails.email}
                                tabIndex="1"   id='email' />
                        </div>
                        <div className='col-12 col-md-6'>
                            <label htmlFor="phone_number">Phone Number</label>
                            <input type="text" readOnly value={applicationDetails.phone_number}
                                tabIndex="1"  placeholder=" " id='phone_number' />
                        </div>
                        <div className='col-12 col-md-6'>
                            <label htmlFor="company_name">Company Name</label>
                            <input type="text" readOnly value={applicationDetails.company_name}
                                tabIndex="1"  placeholder=" " id='company_name' />
                        </div>
                        <div className='col-12 col-md-6'>
                            
                        </div>

                            <label htmlFor="team_and_background">Describe your team and background?</label>
                        <textarea readOnly value={applicationDetails.team_and_background}
                            name="team_and_background" id="team_and_background" rows="5" className='mt-3'></textarea>

                        <label htmlFor="company_and_products">Describe your company and products?</label>
                        <textarea readOnly value={applicationDetails.company_and_products}
                            name="company_and_products" id="company_and_products" rows="5" className='mt-3'></textarea>

                        <label htmlFor="problem_to_solve">Describe the problem you're trying to solve?</label>
                        <textarea readOnly value={applicationDetails.problem_to_solve}
                            name="problem_to_solve" id="problem_to_solve" rows="5" className='mt-3'></textarea>

                        <label htmlFor="solution">What is unique about your solution?</label>
                        <textarea readOnly value={applicationDetails.solution}
                            name="solution" id="solution" rows="5" className='mt-3'></textarea>

                        <label htmlFor="value_proposition_for_customer">What is your value proposition to the customer?</label>
                        <textarea readOnly value={applicationDetails.value_proposition_for_customer}
                            name="value_proposition_for_customer" id="value_proposition_for_customer" rows="5" className='mt-3'></textarea>

                        <label htmlFor="competetors">Who are your competetors and what are your competetive advantage?</label>
                        <textarea readOnly value={applicationDetails.competetors}
                            name="competetors" id="competetors" rows="5" className='mt-3'></textarea>

                        <label htmlFor="revenue_model">Explain your revenue model?</label>
                        <textarea readOnly value={applicationDetails.revenue_model}
                            name="revenue_model" id="revenue_model" rows="5" className='mt-3'></textarea>

                        <label htmlFor="market_size">What is the potential market size of the product?</label>
                        <textarea readOnly value={applicationDetails.market_size}
                            name="market_size" id="market_size" rows="5" className='mt-3'></textarea>
                        
                        <label htmlFor="market_plan">How do you market or plan to market your products and services? </label>
                        <textarea readOnly value={applicationDetails.market_plan}
                            name="market_plan" id="market_plan" rows="5" className='mt-3'></textarea>

                        <div className='radio'>
                            <p className='mt-3 mb-1'>Type of Incubation needed? </p>
                            <h6 className='mt-2' >{applicationDetails.type_of_incubation}</h6> <br />
                      
                        </div>

                        <textarea readOnly value={applicationDetails.business_proposal}
                            placeholder='Upload a detailed business proposal? '
                            name="business_proposal" id="business_proposal" rows="5" className='mt-3'></textarea>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ApplicationView