import React from 'react';
import ex10 from '../../assets/images/sample/ex10.png';
import ex11 from '../../assets/images/sample/ex11.png';
import ex12 from '../../assets/images/sample/ex12.png';

const FishTankCarousel = () => (
    <div id="carouselControlsFishTank" className="carousel slide m-5" data-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active" onClick={() => window.location.href = '/tanks'}>
                <img className="d-block w-100 rounded-5" src={ex10} alt="First slide"/>
                <div className="carousel-caption d-none d-md-block">
                    <h5>First Slide</h5>
                    <p>Click here for more information</p>
                </div>
            </div>
            <div className="carousel-item" onClick={() => window.location.href = '/tanks'}>
                <img className="d-block w-100 rounded-5" src={ex11} alt="Second slide"/>
                <div className="carousel-caption d-none d-md-block">
                    <h5>Second Slide</h5>
                    <p>Click here for more information</p>
                </div>
            </div>
            <div className="carousel-item" onClick={() => window.location.href = '/tanks'}>
                <img className="d-block w-100 rounded-5" src={ex12} alt="Third slide"/>
                <div className="carousel-caption d-none d-md-block">
                    <h5>Third Slide</h5>
                    <p>Click here for more information</p>
                </div>
            </div>
        </div>
        <a className="carousel-control-prev" href="#carouselControlsFishTank" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselControlsFishTank" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
        </a>
    </div>
);
export default FishTankCarousel;