import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="flex flex-row lg:items-baseline items-center">
                <Link to="/" className="font-extrabold text-green-600 text-2xl mr-7 font-theme">Nutrio</Link>
                <div className="flex flex-row flex-wrap">
                    <Link to="/about" className="mr-7">Tentang Nutrio</Link>
                    <Link to="/help" className="mr-7">Bantuan</Link>
                    <Link to="/contact" className="mr-7">Hubungi Kami</Link>
                    <Link to="/isipiringku" className="mr-7">Isi Piringmu <sup className="px-1 bg-green-600 text-white rounded text-xs">BETA</sup></Link>
                </div>
            </div>
        </div>
    )
}

export default Footer;