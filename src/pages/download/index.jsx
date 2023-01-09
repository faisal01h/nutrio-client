import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Footer } from '../../components';
import { FaWindows } from 'react-icons/all'
import Helmet from 'react-helmet';

const Download = () => {

    useEffect(() => {
        console.log(navigator);
    })

    return (
        <div className="mx-5 lg:mx-20 pb-5 select-none">
            <Helmet>
                <title>Unduh Nutrio</title>
            </Helmet>
            <ToastContainer />
            <div className="flex flex-col items-start h-screen justify-center space-y-5">
                <h1 className="text-7xl font-bold">Unduh <span className="text-green-600">Nutrio</span>!</h1>

                {navigator.userAgent.search('Windows NT 10') > 0 ?
                <a href={"mailto:faisal@faisalhnf.com"} className="border-2 border-gray-600 rounded mt-5 p-3 hover:bg-green-600 hover:text-white hover:border-transparent transition-all duration-500 ease-in-out">
                    <div className="flex items-center">
                        <FaWindows className="mr-3 text-lg" /> 
                        <div className="flex flex-col">
                            <p>Windows</p>
                            <hr />
                            <p className="text-xs">v0.15.0 BETA</p>
                        </div>
                    </div> 
                </a> 
                    
                : false}
                
                <p className="w-80">
                {navigator.userAgentData.platform !== "Windows" ? "Maaf, untuk saat ini, klien Nutrio tidak tersedia untuk platform "+ navigator.userAgentData.platform:false}
                </p>
            </div>
            <Footer />
        </div>
    )
}

export default Download;