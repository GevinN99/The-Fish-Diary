import React from 'react';
import './Loading.css';
import LoadingFish from '../../assets/images/LoadingFish.gif';

export default function Loading() {
    return (
        <div className="loading-body">
            <img src={LoadingFish} alt="loading" style={{ height: '30%' }} />
            <div className="words word-1">
                <span>L</span>
                <span>O</span>
                <span>A</span>
                <span>D</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
            </div>
        </div>
    );
}