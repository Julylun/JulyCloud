import React from "react";
import SideBar from "../components/common/sidebar/SideBar.jsx";
import Content from "../components/common/content/Content.jsx";

function Home({ContentPage}) {
  return (
    <div className="w-screen h-screen flex">
      <SideBar />
      <Content ContentPage={ContentPage}/>
    </div>
  );
}

export default Home;
