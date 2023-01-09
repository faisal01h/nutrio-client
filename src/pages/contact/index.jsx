import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '../../utils/toastService';
import { Footer } from '../../components';
import { FaEnvelope } from 'react-icons/all'
import Helmet from 'react-helmet';

const Contact = () => {

    return (
        <div className="mx-5 lg:mx-20 pb-5 select-none">
            <Helmet>
                <title>Hubungi Nutrio</title>
            </Helmet>
            <ToastContainer />
            <div className="flex flex-col items-start h-screen justify-center space-y-5">
                <h1 className="text-7xl font-bold">Hubungi pengembang <span className="text-green-600">Nutrio</span>!</h1>
                <a href={"mailto:faisal@faisalhnf.com"} className="border-2 border-gray-600 rounded mt-5 p-3 hover:bg-green-600 hover:text-white hover:border-transparent transition-all duration-500 ease-in-out">
                    <div className="flex items-center">
                        <FaEnvelope className="mr-3" /> Lead Software Engineer
                    </div>
                </a>
                <p className="w-80">
                Please only contact us if you encounter a technical problem such as bugs and glitches and if you are going to 
                send a legal inquiry such as cease and desist.
                </p>
            </div>
            <Footer />
        </div>
    )
}

export default Contact;