import React, { useEffect, useState } from "react";
import axios from 'axios';
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import OtherImg from "../assets/images/sample/other.png";
import Loading from "../Components/Loading/Loading";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-carousel-minimal';
import { Tilt } from 'react-tilt';

export default function OtherItems() {
    const [loading, setLoading] = useState(true);
    const [accessories, setAccessories] = useState([]);
    const [selectedAccessory, setSelectedAccessory] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchAccessories = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/accessories');
                setAccessories(response.data);
            } catch (error) {
                console.error('Failed to fetch accessory data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAccessories();
    }, []);

    const showModal = async (accessoryId) => {
        try {
            const response = await axios.get(`http://localhost:8070/api/accessories/${accessoryId}`);
            setSelectedAccessory(response.data);
            setIsModalVisible(true);
        } catch (error) {
            console.error('Failed to fetch accessory details', error);
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
            <Navbar activeKey="other"/>
            <div className="vh-100" style={{paddingTop: 64}}>
                <div className="container">
                    <div className="row m-4">
                        {accessories.map((accessory) => (
                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-4" key={accessory._id}>
                                <Tilt options={{ max: 25, scale: 1, speed: 1000 }}>
                                    <div className="card shadow-lg" onClick={() => showModal(accessory._id)}>
                                        <img src={accessory.images[0]} className="card-img-top" alt={accessory.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{accessory.name}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{accessory.category}</h6>
                                            <p className="card-text">${accessory.price}</p>
                                        </div>
                                    </div>
                                </Tilt>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>

            {selectedAccessory && (
                <div className={`modal ${isModalVisible ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{display: isModalVisible ? 'block' : 'none'}}>
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Accessory Details</h5>
                                <button type="button" className="close" onClick={handleCancel} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-8">
                                        <Carousel
                                            data={selectedAccessory.images.map((image) => ({ image, caption: selectedAccessory.name }))}
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
                                        <div className="accessory-details">
                                            <h5>{selectedAccessory.name}</h5>
                                            <h6>{selectedAccessory.category}</h6>
                                            <p>${selectedAccessory.price}</p>
                                            <p dangerouslySetInnerHTML={{ __html: selectedAccessory.description }}></p>
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
