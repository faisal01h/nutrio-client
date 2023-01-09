import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Piringku from '../../utils/Piringku';
import { BsExclamationCircle as ExclamationIcon, BsCheckCircle, BsXCircle, BsTrash, BsX } from 'react-icons/all'
import { Footer } from '../../components';
import logoKemenkes from '../../assets/images/kemenkes.png';
import logoGermas from '../../assets/images/germas.png';
import Helmet from 'react-helmet';

const IsiPiringku = () => {
    const PiringObj = new Piringku();
    Date.prototype.getReadable = function (language) {
        let date = new Date(this);
        let month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
        
        return date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear();
    }

    const [ piring, setPiring ] = useState(PiringObj.getPiring());
    const [ isiPiringkuCompliant ] = useState(false);
    const [ natriumLimitFailureLevel, setNatriumLimitFailureLevel ] = useState("safe"); // safe/soft/hard / soft@2000mg
    const [ sugarLimitFailureLevel ] = useState("safe"); // safe/soft/hard / soft@5400mg
    const [ nutrition, setNutriton ] = useState();
    const [ moreInfo, setMoreInfo ] = useState(false);

    useEffect(() => {
        // Carb: 42.2 gr
        // Protein: 

        setNutriton(PiringObj.calculatePiring());

    }, [piring])

    useEffect(() => {
        let isCarbsCompliant = false;
        let isProteinCompliant = false;
        if(nutrition) {
            let _e = nutrition.tot_sodium*1000 >= 2000 ? setNatriumLimitFailureLevel("soft") : setNatriumLimitFailureLevel("safe");

            if(nutrition.tot_carbs >= 42.2) isCarbsCompliant = true

        }
    }, [nutrition])

    return (
        <div className="mx-5 lg:mx-20 pb-5 select-none">
            <Helmet>
                <title>Isi Piringmu - Nutrio</title>
            </Helmet>
            <ToastContainer />
            <div className="flex flex-col items-start min-h-screen justify-start space-y-5 mt-12">
                <div id="attribution" className="flex items-baseline space-x-5 dark:bg-gray-200 p-2 rounded-lg">
                    <img src={logoKemenkes} alt="Logo Kementerian Kesehatan" width="100" />
                    <img src={logoGermas} alt="Logo Germas" width="100" />
                </div>
                <h1 className="text-7xl font-bold">Isi <span style={{color: '#16B3AC'}}>Piringmu</span></h1>
                <p>
                    Isi Piringmu adalah aplikasi untuk menghitung jumlah nutrisi yang dikonsumsi dari daftar makanan yang anda tambahkan di Nutrio. Isi Piringmu menggunakan Isi Piringku sebagai standar acuan.
                </p>
                <div className="px-5 py-5 rounded-lg shadow-lg bg-gray-50 dark:bg-gray-800 w-full transition-all duration-300 ease-in-out">
                    <div className="flex justify-between pb-1 items-center">
                        <h2 className="px-3 font-semibold text-xl">Isi piringmu</h2>
                        <div>
                            <button className="px-2 py-1 acrylic hover:text-red-600 shadow" onClick={e=>{setPiring([]);PiringObj.emptyPiring()}}><BsTrash /></button>
                        </div>
                    </div>
                    <hr />
                    <div className="px-3 max-h-72 overflow-y-auto">
                    {piring.length > 0 ? piring.map(e=> {
                        return (
                            <div key={e.data.food_name} className="flex justify-between">
                                <div className="">{e.data.serving_weight_grams} gram  <span className="capitalize">{e.data.food_name}</span></div>
                                <button className="hover:text-red-600"><BsX /></button>
                            </div>
                            
                        )
                    }): <div className="text-center py-2">Tidak ada makanan atau minuman di piringmu.</div>}

                    <div className="my-5">
                        Total Nutrisi
                        <div className="flex flex-col">
                            <div>Karbohidrat: {nutrition ? nutrition.tot_carbs : false} gr</div>
                            <div>Protein: {nutrition ? nutrition.tot_protein : false} gr</div>
                            <div className={natriumLimitFailureLevel === "soft" ? "text-yellow-600" : natriumLimitFailureLevel === "hard" ? "text-yellow-600" : ""}>
                                Natrium: {nutrition ? nutrition.tot_sodium : false} gr
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        {isiPiringkuCompliant?<div className="flex items-center"><BsCheckCircle className="mr-2 text-green-600" /> Isi piring anda telah memenuhi kriteria Isi Piringku!</div>
                        : <div className="flex items-center"><ExclamationIcon className="mr-2 text-yellow-600" /> Isi piringmu belum memenuhi kriteria Isi Piringku</div>
                        }
                        {natriumLimitFailureLevel === "soft" ? <div className="flex items-center"><ExclamationIcon className="mr-2 text-yellow-600" /> Jumlah konsumsi garam anda melebihi batas harian!</div> : false}
                        {natriumLimitFailureLevel === "hard" ? <div className="flex items-center"><BsXCircle className="mr-2 text-red-600" /> Jumlah konsumsi garam anda jauh diatas batas harian!</div> : false}

                        {sugarLimitFailureLevel === "soft" ? <div className="flex items-center"><ExclamationIcon className="mr-2 text-yellow-600" /> Jumlah konsumsi gula anda melebihi batas harian!</div> : false}
                        {sugarLimitFailureLevel === "hard" ? <div className="flex items-center"><BsXCircle className="mr-2 text-red-600" /> Jumlah konsumsi gula anda jauh diatas batas harian!</div> : false}
                    </div>
                    </div>
                </div>

                <div className="mt-5 flex flex-col w-full h-full mb-12">
                        <button 
                            className="w-48 px-3 py-1 rounded-lg border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-gray-50 transition-all duration-300 ease-in-out"
                            onClick={_e=>setMoreInfo(!moreInfo)}
                        >
                            Keterangan lebih lanjut
                        </button>
                        {
                            moreInfo === true ?
                            <div className="flex flex-col rounded-lg shadow acrylic px-5 py-3 mt-5 mb-12 transition-all">
                                <h2 className="text-xl font-semibold">Parameter yang diukur</h2>
                                <hr className="my-1" />
                                <p>
                                    Karbohidrat &gt;= 42.2 gr (sesuai 150 gr Nasi) <br />
                                    Protein undefined <br />
                                    Lemak undefined <br />
                                    Garam &gt; undefined, &lt;= 2000 mg <br />
                                    Gula max 5400 mg <br />
                                    Serat undefined
                                </p>
                            </div>: false
                        }
                </div>
                
            </div>
            <Footer />
        </div>
    )
}

export default IsiPiringku;