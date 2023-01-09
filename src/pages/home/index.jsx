import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '../../utils/toastService';
import { Footer } from '../../components';
import { BsArrowClockwise as RefreshIcon, BsExclamationCircle as WarningIcon, BsX } from 'react-icons/all'
import Helmet from 'react-helmet';

const Home = () => {
    const [ conn, setConn ] = useState(true);
    const [ rotationState, setRotationState ] = useState(0);
    const [ popup, setPopup ] = useState(false);
    const [ serverMessage ] = useState();
    const [ requireAuth ] = useState(process.env.REACT_APP_REQUIRES_AUTH);
    const [ searchParam, setSearchParam ] = useState();
    const [ searchData, setSearchData ] = useState();

    function connectionCheck() {
        axios.get(process.env.REACT_APP_HOST+'search/instant?query=a')
        .then(_e => {
            setConn(true);
        })
        .catch(_e => {
            setConn(false)
            Toast.make('Gagal menghubungkan ke server Nutrio!', 'error');
        })
    }

    function credentialsCheck() {
        return true;
    }

    useEffect(() => {
        if(searchParam) {
            axios.get(process.env.REACT_APP_HOST+'search/instant?query='+searchParam)
            .then(e => {
                setSearchData(e.data);
            })
            .catch(e => {
                Toast.make('Gagal mencari '+searchParam+'!', 'error');
            })
        }
    }, [searchParam])

    useEffect(() => {
        connectionCheck();
        if(requireAuth && requireAuth !== "false") {
            credentialsCheck();
        }
        
        if(!sessionStorage.getItem('init')) {
            setPopup(true);
            sessionStorage.setItem('init', true);
        }
        
    }, [])

    return (
        <div className="mx-5 lg:mx-20 pb-5 select-none">
            <ToastContainer />
            <Helmet>
                <title>Nutrio</title>
            </Helmet>
            {
                popup ? 
                    <div className="fixed min-h-screen top-0 text-gray-800" style={{backgroundColor: "rgba(0,0,0,0.7)"}} onClick={e=>e.stopPropagation()}>
                        <div className="fixed bg-white shadow-lg top-1/2 left-1/2 border-2 rounded-lg" style={{transform: "translateX(-50%) translateY(-50%)"}}>
                            <div className="flex flex-row justify-between w-80">
                                <i className="w-10" />
                                <b className="text-green-600 text-xl mt-3">Nutrio</b>
                                <div className="w-10 text-right">
                                    <button onClick={e=>setPopup(false)} className="hover:bg-gray-200 rounded-none hover:text-gray-600 p-1"><BsX /></button>
                                </div>
                            </div>
                            <div className="mt-7 px-3 w-80 pb-5 text-center">
                                Selamat datang di Nutrio v{process.env.REACT_APP_VERSION}!
                                Terima kasih telah menjadi bagian dari keluarga Nutrio! Dengan menggunakan versi beta, anda 
                                turut membantu pengembangan Nutrio.
                                <br />
                                {
                                    serverMessage ? serverMessage : false
                                }
                            </div>
                        </div>
                    </div>
                : false
            }
            <div className="flex flex-col items-start h-screen justify-center space-y-5">
                <h1 className="text-7xl font-bold">Selamat datang di <span className="text-green-600">Nutrio</span>!</h1>
                {
                    conn ?
                        requireAuth && requireAuth != "false" ?
                            <div className="flex flex-row space-x-5">
                                <Link to="/account/login" className="px-3 py-2 bg-green-600 text-white rounded">Masuk</Link>
                                <Link to="/account/register" className="px-3 py-2 border-2 border-green-600 text-green-600 rounded hover:bg-green-700 hover:border-transparent hover:text-white">Daftar</Link>
                            </div>
                        : 
                        <div>
                            <input type="text" name="food" id="food" autoComplete="false" className="border-b-2 rounded border-transparent transition-all ease-in-out duration-500 focus:border-green-600 active:border-green-600 search-bar py-3 px-2 dark:bg-gray-800" placeholder="Cari makanan atau minuman..." onChange={e => setSearchParam(e.currentTarget.value)} />
                            {
                                searchData && searchParam != "" ?
                                <div className="relative top-1 shadow-lg py-1 px-2 flex flex-col max-h-64 overflow-y-auto rounded-lg dark:bg-gray-800 transition-all ease-in-out duration-500 search-result">
                                    {
                                        searchData.common.map(e => {
                                            return (
                                                <Link key={e.food_name} to={"/nutritioninfo/"+(e.food_name).replace('%', '%25')} className="hover:bg-gray-100 dark:hover:bg-gray-700 capitalize px-2 py-3 rounded flex flex-row items-center"><img src={e.photo.thumb} width="50px" className="mr-2" />{e.food_name}</Link>
                                            )
                                        })
                                    }
                                    {
                                        searchData.branded.map(e => {
                                            return (
                                                <Link key={e.food_name} to={"/nutritioninfo/"+(e.food_name).replace('%', '%25')} className="hover:bg-gray-100 capitalize px-2 py-3 rounded flex flex-row items-center"><img src={e.photo.thumb} width="50px" className="mr-2" />{e.food_name}</Link>
                                            )
                                        })
                                    }
                                </div> : false
                            }
                        </div>
                    :
                    <div className="flex flex-row space-x-3 items-center justify-start">
                        <div className="px-3 py-2 mt-5 bg-red-600 text-white rounded flex flex-col">
                            <h2 className="font-bold flex flex-row items-center"><WarningIcon className="mr-1" /> Koneksi ke server gagal!</h2>
                            Harap periksa koneksi internet anda.
                        </div>
                        <button onClick={ e => {
                            connectionCheck()
                            setRotationState(rotationState+360);
                            e.currentTarget.style.transform = `rotate(${rotationState}deg)`
                        }}
                        className="transition-all duration-300 transform-gpu"
                        >
                            <RefreshIcon 
                                
                            />
                        </button>
                    </div>
                }
            </div>
            <Footer />
        </div>
    )
}

export default Home;