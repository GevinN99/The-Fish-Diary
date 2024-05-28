import React, {useEffect, useState} from "react";
import Loading from "../../Components/Loading/Loading";
import AdminNavbar from "../../Components/Admin/AdminNavbar";
import Footer from "../../Components/Footer/Footer";

export default function AdminOrders() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loading/>;
    }

    return (
        <div className="overflow-hidden">
            <AdminNavbar activeKey="ad-orders"/>
            <div className="vh-100" style={{paddingTop: 64}}>
                <h1>Admin Orders</h1>
            </div>
            <Footer/>
        </div>
    );
}