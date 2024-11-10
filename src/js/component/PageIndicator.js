import React from 'react'

export default function PageIndicator({ activeTab, isUploadingStep }) {
  
  return (
    <div className="page-indicator-bottom">
        <span className={(activeTab === 1 || isUploadingStep === 1) && "circle-current"}></span>
        <span className={(activeTab === 2 || isUploadingStep === 2) && "circle-current"}></span>
        <span className={(activeTab === 3 && isUploadingStep === 3) && "circle-current"}></span>
    </div>
  )
}
