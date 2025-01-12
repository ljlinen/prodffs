import React from "react";

export default function Header({ setActiveTab, fullScreen, setFullScreen, setIsUploadingStep }) {

  const pOnclick = (tab, fullscreen, uploadingtep) => {
    
    setActiveTab(tab)
    if(fullscreen !== undefined) setFullScreen(fullscreen)
    if(uploadingtep !== undefined) setIsUploadingStep(uploadingtep)
  }
  
  return (
    <header>
      <nav>
        <p className="logo">ProdLinen</p>
        <ul>
          <li>Request beat</li>
          <li>Donate</li>
          <li>Contact</li>
        </ul>
      </nav>

      <div className={(fullScreen && "beatlist-sorter beatlist-sorter-hide") || "beatlist-sorter"}>
        <h2>{(fullScreen && "BUY BEAT") || "WELCOME LINEN"}</h2>
        <p className="by"><span>-</span>hope you good.</p>
        {/* <div className={(fullScreen && " sorter-buttons hide") || "sorter-buttons hide-anim"}>
          <p onClick={() => setActiveTab(1)}>statistics</p>
          <p onClick={() => {setActiveTab(2); setFullScreen(true)}}>manage inventory</p>
          <p onClick={() => { setActiveTab(3); setFullScreen(true); setIsUploadingStep(1)}}>upload now</p>
        </div> */}
        <div className={(fullScreen && " sorter-buttons hide") || "sorter-buttons hide-anim"}>
          <p onClick={() => pOnclick(1)}>statistics</p>
          <p onClick={() => pOnclick(2, true)}>manage inventory</p>
          <p onClick={() => pOnclick(3, true, 1)}>upload now</p>
        </div>
      </div>
    </header>
  );
}
