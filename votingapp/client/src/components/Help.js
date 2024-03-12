import React from 'react';
import './Help.css';
import Feature from './Feature';

const featuresData = [
    {
      title: '1. How to Register as a Voter',
      text: 'Click on the "Register" button located at the top of the page to navigate to the registration page. Follow the prompts to complete your registration. Once registered successfully, you will be redirected to the login page. Log in to access the page where you can cast your vote.'
    },
    {
      title: '2. How to Vote',
      text: 'After successfully logging in, you will be directed to the ballot interface. On the ballot interface, select your preferred candidate. Click the "Vote" button to cast your vote.'
    },
    {
      title: '3. Viewing Real-Time Polling Results',
      text: 'Click on the "View Results" button. You will be presented with graphical representations of the current results.'
    },
    {
      title:'4. Frequently Asked Questions (FAQs)',
      text: 'Q: Can I log in again once I cast my vote and vote again? A: Unfortunately, once you cast your vote, it is final. Voters will not be allowed to vote again.'
    }

  ];
const Help = () => {
  return (
    <div className='help__features section__padding' id='features'>
      <div className='help__features-heading'>
        <h1 className='gradient__text'>Welcome to the Voting and Election Process Help page! This guide will walk you through the steps of participating in the election and understanding the voting process. Whether you're a registered voter or a guest visitor, this guide will assist you in navigating the platform effectively.

</h1>
      </div>
      <div className='help__features-container'>
        {
          featuresData.map((item, index) => (
            <Feature title={item.title} text={item.text} key={item.title + index} /> 
          ))}
      </div>
    </div>
  )
}

export default Help;
