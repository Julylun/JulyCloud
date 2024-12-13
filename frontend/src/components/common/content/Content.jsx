import React from "react";
import MyCloud from "../../mycloud/MyCloud";
import Test from "../../../pages/Test";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const Content = ({ContentPage}) => {
    return (
        <div id="main-content" className="w-full bg-SoftGradient h-screen flex-1">
            <ContentPage />
        </div>
    )
}

export default Content;