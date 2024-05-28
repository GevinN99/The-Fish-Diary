import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Loading from "../Components/Loading/Loading";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Cart() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="overflow-hidden">
            <Navbar activeKey="cart" />
            <div className="vh-100" style={{ paddingTop: 64 }}>

            </div>
            <Footer />
        </div>
    );
}
