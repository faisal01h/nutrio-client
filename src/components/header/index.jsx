import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsPerson } from 'react-icons/all'
import Toast from '../../utils/toastService';

const Header = () => {
    const [ searchParam, setSearchParam ] = useState();
    const [ searchData, setSearchData ] = useState();

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

    return (
        <div className="flex flex-row px-5 lg:px-20 py-3 sticky top-0 bg-white dark:bg-gray-900 justify-between items-center">
            <Link className="text-green-600 font-bold text-4xl lg:text-5xl w-64" to="/">Nutrio</Link>
            <input type="text" name="food" id="food" autoComplete="false" className="border-b-2 rounded border-transparent transition-all ease-in-out duration-500 focus:border-green-600 active:border-green-600 search-bar py-3 px-2 text-center dark:bg-gray-800" placeholder="Cari makanan atau minuman..." onChange={e => setSearchParam(e.currentTarget.value)} />
            {
                searchData && searchParam != "" ? 
                <div className="fixed top-16 left-1/2 w-96 max-h-64 overflow-y-auto search-result shadow-lg p-1 z-10 bg-white dark:bg-gray-800 rounded-lg" style={{transform: "translateX(-50%)"}}>
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
                                <Link key={e.food_name} to={"/nutritioninfo/"+(e.food_name).replace('%', '%25')} className="hover:bg-gray-100 dark:hover:bg-gray-700 capitalize px-2 py-3 rounded flex flex-row items-center"><img src={e.photo.thumb} width="50px" className="mr-2" />{e.food_name}</Link>
                            )
                        })
                    }
                </div>
                : false
            }
            <div className="w-64 flex flex-row justify-end">
                {
                    process.env.REACT_APP_REQUIRES_AUTH && process.env.REACT_APP_REQUIRES_AUTH != "false" ?
                    <button className="flex items-center">
                        <BsPerson className="mr-1" />
                    </button>
                    : false
                }
            </div>
        </div>
    )
}

export default Header;