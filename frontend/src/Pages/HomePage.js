import React, {useEffect, useState} from 'react';
import Navbar from '../Components/Navbar/Navbar';
import TopCarousel from "../Components/Home/TopCarousel";
import '../App.css'
import MedicationCarousel from "../Components/Home/MedicationCarousel";
import OtherItemsCarousel from "../Components/Home/OtherItemsCarousel";
import FishTankCarousel from "../Components/Home/FishTankCarousel";
import Footer from "../Components/Footer/Footer";
import Loading from "../Components/Loading/Loading";

export default function HomePage() {
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
            <Navbar activeKey="home"/>
            <div style={{paddingTop: 64}}>
                <div className="main-topic text-center w-100 mt-3 fs-3">
                    L i v e s t o c k
                </div>
                <div>
                    <TopCarousel/>
                </div>

                <div className="main-topic bg-dark text-center w-100 mt-3 fs-3">
                    T a n k s &nbsp; & &nbsp; T a n k  S e t u p s
                </div>
                <div>
                    <FishTankCarousel/>
                </div>

                <div className="container mt-5">
                    <div className="row">
                        <div className="col">
                            <div className="main-topic text-center w-100 mt-3 fs-3 bg-black rounded-5">
                                Water Medication & Conditioner
                            </div>
                            <div>
                                <MedicationCarousel/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="main-topic text-center w-100 mt-3 fs-3 bg-black rounded-5">
                                Other Items
                            </div>
                            <div>
                                <OtherItemsCarousel/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
