import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Loading from "../Components/Loading/Loading";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-carousel-minimal';
import { Tilt } from 'react-tilt';

export default function Livestock() {
    const [loading, setLoading] = useState(true);
    const [fishList, setFishList] = useState([]);
    const [selectedFish, setSelectedFish] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchFish = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/fish');
                setFishList(response.data);
            } catch (error) {
                console.error('Failed to fetch fish data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFish();
    }, []);

    const showModal = async (fishId) => {
        try {
            const response = await axios.get(`http://localhost:8070/api/fish/${fishId}`);
            setSelectedFish(response.data);
            setIsModalVisible(true);
        } catch (error) {
            console.error('Failed to fetch fish details', error);
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
            <Navbar activeKey="livestock" />
            <div className="vh-100" style={{ paddingTop: 64 }}>
                <div className="container">
                    <div className="row m-4">
                        {fishList.map((fish) => (
                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-4" key={fish._id}>
                                <Tilt options={{ max: 25, scale: 1, speed: 1000 }}>
                                    <div className="card shadow-lg" onClick={() => showModal(fish._id)}>
                                        <img src={fish.images[0]} className="card-img-top" alt={fish.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{fish.name}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{fish.species}</h6>
                                            <p className="card-text">${fish.price}</p>
                                        </div>
                                    </div>
                                </Tilt>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />

            {selectedFish && (
                <div className={`modal ${isModalVisible ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isModalVisible ? 'block' : 'none' }}>
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Fish Details</h5>
                                <button type="button" className="close" onClick={handleCancel} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-8">
                                        <Carousel
                                            data={selectedFish.images.map((image) => ({ image, caption: selectedFish.name }))}
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
                                            <h5>{selectedFish.name}</h5>
                                            <h6>{selectedFish.species}</h6>
                                            <p>${selectedFish.price}</p>
                                            <p dangerouslySetInnerHTML={{ __html: selectedFish.description }}></p>
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
