import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '../../utils/toastService';
import { BsPlusCircle } from 'react-icons/all'
import Piringku from '../../utils/Piringku';
import Helmet from 'react-helmet';

const Nutritioninfo = ({ props_takaran, props_unit }) => {

    const unitList = ["gram", "cup", "tsp", "kilo"];
    const PiringObj = new Piringku();

    //if(!props_title) props_title = 'rice';
    if(!props_takaran) props_takaran = 100;
    if(!props_unit) props_unit = unitList[0];

    const { id } = useParams();
    const [ title, setTitle ] = useState(id);
    const [ takaran, setTakaran ] = useState(props_takaran);
    const [ unit, setUnit ] = useState(props_unit);
    const [ data, setData ] = useState();

    

    useEffect(() => {
        console.log(id);
        axios.post(process.env.REACT_APP_HOST+'natural/nutrients', {
            query: `${takaran} ${unit} of ${id}`
        })
        .then(e => {
            //console.log('send request')
            console.log(e.data.foods[0]);
            setData(e.data.foods[0]);
            setTitle(e.data.foods[0].food_name)
            return e.data.foods[0];
        })
        .catch(e => {
            Toast.make('Gagal mencari informasi nutrisi', 'error');
        })

        
    }, [id, title, takaran, unit])

    function addToPiring() {
        let dataobject = {
            unit: unit,
            takaran: takaran,
            data: data
        }
        PiringObj.appendToPiring(dataobject);
        Toast.make("Berhasil menambahkan "+title+" ke piring anda!", "success", 3500)
    }


    return (
        <div className="mx-5 lg:mx-20 py-5">
            <Helmet>
                <title>Nutrisi {title} - Nutrio</title>
            </Helmet>
            <ToastContainer />
            <div className="flex flex-col items-start min-h-screen justify-start">
                <div className="flex flex-row items-center justify-between lg:space-x-20 bg-transparent pb-2" style={{width: '100%'}}>
                    <h1 className="text-4xl lg:text-7xl font-bold capitalize">{title}</h1>
                    <div className="border-2 rounded-lg p-1 dark:border-gray-100">
                        <span>Takaran saji</span>
                        <div className="flex flex-row items-center">
                            <input type="text" className="border-b-2 px-2 py-1 mr-1 outline-none focus:border-green-600 rounded w-24 dark:bg-gray-800" value={takaran} onChange={e=>setTakaran(e.currentTarget.value)} />
                            <select className="cursor-pointer p-1 outline-none dark:bg-gray-800" onChange={e=>setUnit(e.currentTarget.value)}>
                                {
                                    unitList.map(e => {
                                        return (
                                                <option key={e} value={e}>{e}</option>
                                        )
                                        
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between w-full">
                    {
                        data && data.photo.highres ? <img src={data.photo.highres} alt=""  width="400px"/> : false
                    }
                    <div className="flex flex-col">
                        <div className="ing border-2 rounded-lg border-gray-200 p-3 flex flex-col mt-5">
                            <div>
                                <h2 className="font-bold text-3xl lg:text-5xl">Informasi Nilai Gizi</h2>
                            </div>
                            <div className="flex flex-row justify-between">
                                <p>Takaran saji</p>
                                <p>{data ? data.serving_weight_grams : false} gram</p>
                            </div>
                            <div className="flex flex-row justify-between">
                                <p>Kalori</p>
                                <p>{data ? data.nf_calories+" kkal" : false}</p>
                            </div>
                            <div className="flex bg-gray-900 text-white">
                                <p className="w-72"></p>
                                <p className="w-36 text-right">Berat</p>
                                <p>%</p>
                            </div>
                            {
                                data ?
                                <div className="border-b-2 border-gary-300 mx-1 flex flex-col">
                                    <div className="flex mx-0 border-b-2 border-gray-300">
                                        <p className="w-72 font-bold">Lemak Total</p>
                                        <p className="w-36 text-right">{data.nf_total_fat} gr</p>
                                        <p></p>
                                    </div> 
                                    <div className="flex">
                                        <p className="w-72 pl-7">Lemak Jenuh</p>
                                        <p className="w-36 text-right">{data.nf_saturated_fat} gr</p>
                                        <p></p>
                                    </div>
                                </div>
                                : false
                            }
                            {
                                data ?
                                <div className="flex mx-1 border-b-2 border-gray-300">
                                    <p className="w-72">Kolesterol</p>
                                    <p className="w-36 text-right">{data.nf_cholesterol} mg</p>
                                    <p></p>
                                </div> : false
                            }
                            {
                                data ?
                                <div className="flex mx-1 border-b-2 border-gray-300">
                                    <p className="w-72">Natrium</p>
                                    <p className="w-36 text-right">{data.nf_sodium} mg</p>
                                    <p></p>
                                </div> : false
                            }
                            {
                                data ?
                                <div className="flex mx-1 border-b-2 border-gray-300">
                                    <p className="w-72">Potassium</p>
                                    <p className="w-36 text-right">{data.nf_potassium} mg</p>
                                    <p></p>
                                </div> : false
                            }
                            {
                                data ?
                                <div className="border-b-2 border-gray-300 mx-1 flex flex-col">
                                    <div className="flex mx-0 border-b-2 border-gray-300">
                                        <p className="w-72 font-bold">Karbohidrat Total</p>
                                        <p className="w-36 text-right">{data.nf_total_carbohydrate} gr</p>
                                        <p></p>
                                    </div> 
                                    <div className="flex border-b-2 border-gray-200">
                                        <p className="w-72 pl-7">Serat</p>
                                        <p className="w-36 text-right">{data.nf_dietary_fiber} gr</p>
                                        <p></p>
                                    </div>
                                    <div className="flex">
                                        <p className="w-72 pl-7">Gula</p>
                                        <p className="w-36 text-right">{data.nf_sugars} gr</p>
                                        <p></p>
                                    </div>
                                </div> : false
                            }
                            {
                                data ?
                                <div className="flex mx-1 border-b-2 border-gray-300">
                                    <p className="w-72">Protein</p>
                                    <p className="w-36 text-right">{data.nf_protein} gr</p>
                                    <p></p>
                                </div> : false
                            }
                            <hr className="mt-3" />
                            <p className="text-sm text-right">* Sesuai kebutuhan diet 2000 kkal per hari</p>
                        </div>
                        <div className="my-3">
                            <button className="bg-white dark:bg-transparent dark:text-gray-100 hover:bg-green-600 border-2 border-green-600 rounded-lg text-green-600 hover:text-white transition-all duration-300 w-full py-3 flex items-center justify-center" onClick={()=>{addToPiring()}}><BsPlusCircle className="mr-2 pt-0.5" /> Tambahkan ke piring</button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Nutritioninfo;