import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Footer } from '../../components';
import Helmet from 'react-helmet';

const Help = () => {
    return (
        <div className="mx-5 lg:mx-20 pb-5 select-none">
            <Helmet>
                <title>Bantuan - Nutrio</title>
            </Helmet>
            <ToastContainer />
            <div className="flex flex-col items-start h-screen justify-center space-y-5">
                <h1 className="text-7xl font-bold">Dapatkan bantuan mengenai <span className="text-green-600">Nutrio</span></h1>
                <p>
                    Fitur ini akan datang pada versi mendatang.
                </p>
                
            </div>
            <Footer />
        </div>
    )
}

export default Help;