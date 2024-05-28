import React, { useEffect, useState } from "react";
import axios from 'axios';
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Loading from "../Components/Loading/Loading";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-carousel-minimal';
import { Tilt } from 'react-tilt';

export default function Tanks() {
    const [loading, setLoading] = useState(true);
    const [tankList, setTankList] = useState([]);
    const [selectedTank, setSelectedTank] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchTanks = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/tanks'); // Adjust the URL if necessary
                setTankList(response.data);
            } catch (error) {
                console.error('Failed to fetch tank data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTanks();
    }, []);

    const showModal = async (tankId) => {
        try {
            const response = await axios.get(`http://localhost:8070/api/tanks/${tankId}`); // Adjust the URL if necessary
            setSelectedTank(response.data);
            setIsModalVisible(true);
        } catch (error) {
            console.error('Failed to fetch tank details', error);
        }
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="overflow-hidden">
            <Navbar activeKey="tanks" />
            <div className="vh-100" style={{ paddingTop: 64 }}>
                <div className="container">
                    <div className="row m-4">
                        {tankList.map((tank) => (
                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-4" key={tank._id}>
                                <Tilt options={{ max: 25, scale: 1, speed: 1000 }}>
                                    <div className="card shadow-lg" onClick={() => showModal(tank._id)}>
                                        <img src={tank.images[0]} className="card-img-top" alt={tank.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{tank.name}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{tank.species}</h6>
                                            <p className="card-text">${tank.price}</p>
                                        </div>
                                    </div>
                                </Tilt>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />

            {selectedTank && (
                <div className={`modal ${isModalVisible ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isModalVisible ? 'block' : 'none' }}>
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Tank Details</h5>
                                <button type="button" className="close" onClick={handleCancel} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-8">
                                        <Carousel
                                            data={selectedTank.images.map((image) => ({ image, caption: selectedTank.name }))}
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
                                        <div className="tank-details">
                                            <h5>{selectedTank.name}</h5>
                                            <h6>{selectedTank.species}</h6>
                                            <p>${selectedTank.price}</p>
                                            <p dangerouslySetInnerHTML={{ __html: selectedTank.description }}></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleOk}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
