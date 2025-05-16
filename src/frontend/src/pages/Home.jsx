import React from 'react';

const Home = () => {
    return (
        <div className="container" style={{ textAlign: 'center', marginTop: '50px', color:'black' }}>
            <h1>Welcome to the Home Page</h1>
            <p>This is the home page of the application.</p>
            <button onClick={() => window.location.href = '/login'}>Login/Register</button>
        </div>
    );
};

export default Home;

//