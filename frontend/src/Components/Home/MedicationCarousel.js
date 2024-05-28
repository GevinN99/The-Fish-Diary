import React from 'react';
import ex4 from '../../assets/images/sample/ex4.png';
import ex5 from '../../assets/images/sample/ex5.png';
import ex6 from '../../assets/images/sample/ex6.png';

export default function MedicationCarousel() {
    const carouselId = "carouselControlsMedication";

    return (
        <div id={carouselId} className="carousel slide m-4" data-ride="carousel">
            <div className="carousel-inner pe-auto" onClick={() => window.location.href = '/medic'}>
                <div className="carousel-item active">
                    <img className="d-block w-100 rounded-5" src={ex4} alt="First slide"/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>First Slide</h5>
                        <p>Click here for more information</p>
                    </div>
                </div>
                <div className="carousel-item" onClick={() => window.location.href = '/medic'}>
                    <img className="d-block w-100 rounded-5" src={ex5} alt="Second slide"/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Second Slide</h5>
                        <p>Click here for more information</p>
                    </div>
                </div>
                <div className="carousel-item" onClick={() => window.location.href = '/medic'}>
                    <img className="d-block w-100 rounded-5" src={ex6} alt="Third slide"/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Third Slide</h5>
                        <p>Click here for more information</p>
                    </div>
                </div>
            </div>
            <a className="carousel-control-prev" href={`#${carouselId}`} role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href={`#${carouselId}`} role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    );
}
