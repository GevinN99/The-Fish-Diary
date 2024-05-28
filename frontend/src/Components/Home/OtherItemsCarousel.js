import React from 'react';
import ex7 from '../../assets/images/sample/ex7.png';
import ex8 from '../../assets/images/sample/ex8.png';
import ex9 from '../../assets/images/sample/ex9.png';

export default function OtherItemsCarousel() {
    const carouselId = "carouselControlsOtherItems";

    return (
        <div id={carouselId} className="carousel slide m-4" data-ride="carousel">
            <div className="carousel-inner" onClick={() => window.location.href = '/other'}>
                <div className="carousel-item active">
                    <img className="d-block w-100 rounded-5" src={ex7} alt="First slide"/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>First Slide</h5>
                        <p>Click here for more information</p>
                    </div>
                </div>
                <div className="carousel-item" onClick={() => window.location.href = '/other'}>
                    <img className="d-block w-100 rounded-5" src={ex8} alt="Second slide"/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Second Slide</h5>
                        <p>Click here for more information</p>
                    </div>
                </div>
                <div className="carousel-item" onClick={() => window.location.href = '/other'}>
                    <img className="d-block w-100 rounded-5" src={ex9} alt="Third slide"/>
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
