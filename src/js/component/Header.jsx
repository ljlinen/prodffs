import React from "react";
import IconButton from "./IconButton";
import iconBack from "../../asset/img/icon/chevron-left.svg";

export default function Header({ resetCurrentTab, setActiveTab, activeTab, fullScreen, setFullScreen, setIsUploadingStep }) {


  const pOnclick = (tab, fullscreen, uploadingtep) => {
    setActiveTab(tab)
    if(fullscreen !== undefined) setFullScreen(fullscreen)
    if(uploadingtep !== undefined) setIsUploadingStep(uploadingtep)
  }

  const resetTab = () => {
    resetCurrentTab()
 };
  

  return (
    <header>
      <nav>
        <IconButton
          condition={true}
          handler={resetTab}
          src={activeTab === 3 || activeTab === 2 ? iconBack : null}
          value={activeTab === 3 || activeTab === 2 ? "Back" : "ProdFFS"}
          style={{display: 'flex'}}
        />
      </nav>

      <div className={(fullScreen && "beatlist-sorter beatlist-sorter-hide") || "beatlist-sorter"}>
        <div>
          <h2>{(fullScreen && "BUY BEAT") || "WELCOME LINEN"}</h2>
          <p className="by"><span>-</span>hope you good.</p>          
        </div>
        <div className={(fullScreen && " sorter-buttons hide") || "sorter-buttons hide-anim"}>
          <p onClick={() => pOnclick(1)}>statistics</p>
          <p onClick={() => pOnclick(2, true)}>manage inventory</p>
          <p onClick={() => pOnclick(3, true, 1)}>upload now</p>
        </div>
      </div>
    </header>
  );
}
