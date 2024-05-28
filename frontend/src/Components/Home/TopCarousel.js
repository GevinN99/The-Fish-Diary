import React from 'react';
import ex1 from '../../assets/images/sample/ex1.png';
import ex2 from '../../assets/images/sample/ex2.png';
import ex3 from '../../assets/images/sample/ex3.png';

const TopCarousel = () => (
    <div id="carouselControlsTopCarousel" className="carousel slide m-4" data-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active" onClick={() => window.location.href = '/livestock'}>
                <img className="d-block w-100 rounded-5" src={ex1} alt="First slide" />
                <div className="carousel-caption d-none d-md-block">
                    <h5>First Slide</h5>
                    <p>Click here for more information</p>
                </div>
            </div>
            <div className="carousel-item" onClick={() => window.location.href = '/livestock'}>
                <img className="d-block w-100 rounded-5" src={ex2} alt="Second slide"/>
                <div className="carousel-caption d-none d-md-block">
                    <h5>Second Slide</h5>
                    <p>Click here for more information</p>
                </div>
            </div>
            <div className="carousel-item" onClick={() => window.location.href = '/livestock'}>
                <img className="d-block w-100 rounded-5" src={ex3} alt="Third slide"/>
                <div className="carousel-caption d-none d-md-block">
                    <h5>Third Slide</h5>
                    <p>Click here for more information</p>
                </div>
            </div>
        </div>
        <a className="carousel-control-prev" href="#carouselControlsTopCarousel" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselControlsTopCarousel" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
        </a>
    </div>
);
export default TopCarousel;