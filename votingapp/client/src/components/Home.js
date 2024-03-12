import React from 'react';
import Header from './Header';
import CandidateCard from './CandidateCard';
import SignInSignUpCard from './SignInSignUpCard'; // Import the registration/login card component

const Home = () => {
  return (
    <div>
      <Header />
      <div className="container">
        {/* Candidate Card */}
        <div className="row">
          <div className="col-lg-6">
            <CandidateCard />
          </div>
        </div>
        
        {/* Sign In/Sign Up Card */}
        <div className="row mt-4">
          <div className="col-lg-6">
            <SignInSignUpCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
