import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsExclamationCircle as ExclamationIcon } from 'react-icons/all'
import { Footer } from '../../components';

const About = () => {
    Date.prototype.getReadable = function (language) {
        let date = new Date(this);
        let month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
        
        return date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear();
    }
    return (
        <div className="px-5 lg:px-20 pb-5 select-none overflow-x-hidden">
            <ToastContainer />
            <div className="flex flex-col items-start min-h-screen justify-center space-y-5 my-10 sm:max-w-screen-sm md:max-w-screen-md">
                <h1 className="text-7xl font-bold mt-40">Tentang <span className="text-green-600">Nutrio</span></h1>
                <div>
                    Nutrio adalah suatu proyek hobi yang dikembangkan oleh <span className="text-blue-600">Faisal Hanif</span>. 
                    Semua data makanan dan informasi nilai gizi pada Nutrio diperoleh dari penyedia API <a href="https://developer.nutritionix.com/docs/v2" target="_blank">Nutritionix</a>.
                    <hr className="my-3" />
                    Saat ini, anda menggunakan klien Nutrio versi {process.env.REACT_APP_VERSION}.
                    {
                        process.env.REACT_APP_VERSION.split(" ")[1] == "beta" ? 
                            <div className="bg-yellow-500 rounded-lg p-3 mt-5 flex items-center">
                                <ExclamationIcon className="mr-2" />
                                <div>
                                    Versi BETA mungkin tidak stabil. Silahkan <Link to="/contact" className="font-semibold">hubungi kami</Link> jika anda menemui bug atau glitch.
                                </div>
                            </div>
                        : false
                    }
                </div>
                <div className="overflow-x-auto">
                    <div className="flex flex-col flex-nowrap overflow-x-auto py-5">
                        <div className="flex flex-col mt-5 shadow-lg border-t-4 border-green-600 rounded-lg p-3 dark:bg-gray-800 transition-all duration-300 ease-in-out w-11/12 lg:w-full">
                            <div className="p-3 text-green-600 font-bold text-xl rounded-lg font-theme">
                                Apa yang baru di Nutrio versi {process.env.REACT_APP_VERSION || "ini"}?
                            </div>
                            <div className="px-3 mb-3">
                                <ul className="list-disc list-inside ml-1">
                                    <li>Isi Piringku berdasarkan Kementerian Kesehatan Republik Indonesia</li>
                                    <li>Perubahan UI: Implementasi font Plus Jakarta Sans</li>
                                    <li>Pembaruan masa aktif klien: {new Date(process.env.REACT_APP_EXPIRE).getReadable()}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 shadow-lg border-t-4 border-green-600 rounded-lg p-3 dark:bg-gray-800 transition-all duration-300 ease-in-out w-11/12 lg:w-full">
                            <div className="p-3 text-green-600 font-bold text-xl rounded-lg font-theme">
                                Apa yang baru di Nutrio versi 0.14.1 beta?
                            </div>
                            <div className="px-3 mb-3">
                                <ul className="list-disc list-inside ml-1">
                                    <li>Mode gelap 🌙!</li>
                                    <li>Halaman placeholder untuk Bantuan</li>
                                    <li>Perbaikan bug: Dropdown berada di belakang nama makanan</li>
                                    <li>Pembaruan masa aktif klien: 20 Oktober 2021</li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About;