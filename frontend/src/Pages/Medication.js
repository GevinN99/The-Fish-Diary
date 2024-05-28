import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Loading from "../Components/Loading/Loading";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-carousel-minimal';
import { Tilt } from 'react-tilt';
import axios from 'axios';

export default function Medication() {
    const [loading, setLoading] = useState(true);
    const [medicList, setMedicList] = useState([]);
    const [selectedMedic, setSelectedMedic] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchMedics = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/medics');
                setMedicList(response.data);
            } catch (error) {
                console.error('Failed to fetch medic data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMedics();
    }, []);

    const showModal = async (medicId) => {
        try {
            const response = await axios.get(`http://localhost:8070/api/medics/${medicId}`);
            setSelectedMedic(response.data);
            setIsModalVisible(true);
        } catch (error) {
            console.error('Failed to fetch medic details', error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    if (loading) {
        return <Loading />;
    }

    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
    };
    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    };

    const defaultOptions = {
        reverse: false,
        max: 25,
        perspective: 1000,
        scale: 1,
        speed: 1000,
        transition: true,
        axis: null,
        reset: true,
        easing: "cubic-bezier(.03,.98,.52,.99)",
    };

    return (
        <div className="overflow-hidden">
            <Navbar activeKey="medication" />
            <div className="vh-100" style={{ paddingTop: 64 }}>
                <div className="container">
                    <div className="row m-4">
                        {medicList.map((medic) => (
                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-4" key={medic._id}>
                                <Tilt options={{ max: 25, scale: 1, speed: 1000 }}>
                                    <div className="card shadow-lg" onClick={() => showModal(medic._id)}>
                                        <img src={medic.images[0]} className="card-img-top" alt={medic.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{medic.name}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{medic.species}</h6>
                                            <p className="card-text">${medic.price}</p>
                                        </div>
                                    </div>
                                </Tilt>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />

            {selectedMedic && (
                <div className={`modal ${isModalVisible ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isModalVisible ? 'block' : 'none' }}>
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Medic Details</h5>
                                <button type="button" className="close" onClick={handleCancel} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-8">
                                        <Carousel
                                            data={selectedMedic.images.map((image) => ({ image, caption: selectedMedic.name }))}
                                            time={3000}
                                            width="100%"
                                            height="500px"
                                            captionStyle={{ fontSize: '2em', fontWeight: 'bold' }}
                                            radius="10px"
                                            slideNumber={true}
                                            slideNumberStyle={{ fontSize: '20px', fontWeight: 'bold' }}
                                            captionPosition="bottom"
                                            automatic={true}
                                            dots={true}
                                            pauseIconColor="white"
                                            pauseIconSize="40px"
                                            slideBackgroundColor="white"
                                            slideImageFit="cover"
                                            thumbnails={true}
                                            thumbnailWidth="100px"
                                            style={{
                                                textAlign: "center",
                                                maxWidth: "100%",
                                                maxHeight: "500px",
                                                margin: "0 auto",
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fish-details">
                                            <h5>{selectedMedic.name}</h5>
                                            <h6>{selectedMedic.species}</h6>
                                            <p>${selectedMedic.price}</p>
                                            <p dangerouslySetInnerHTML={{ __html: selectedMedic.description }}></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
