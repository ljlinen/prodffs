import React from 'react'
import BeatPackageEdit from './Admin/BeatPackageEdit';
import BeatPackage from './BeatPackage';
import AddPackageSelect from '../elemet/AddPackageSelect';

export default function PackagesView({removePackage, packages, setPackages, isEditing ,isUploadingStep}) {

  return (
    <div className='beat-options-scroll'>

    { 
        (isUploadingStep && packages['packages']) ?
        Object.entries(packages['packages']).map((item, i) => {

            return (
            <>
                {
                isEditing ?
                <BeatPackageEdit
                    className={'beat beat-option beat-option-hide'}
                    handler={null} 
                    condition={(isUploadingStep === 2)} 
                    packageObj={item}
                    key={'edit' + item['package']}
                    index={i}
                    setMainObj={setPackages}
                /> :
                <BeatPackage
                    className={'beat beat-option beat-option-hide'}
                    handler={null} 
                    condition={(isUploadingStep === 2)} 
                    packageObj={item}
                    key={item['package']}
                    index={i}
                    removeHanlder={removePackage}
                />
                }
            </>
            )
        })
        : null
    }

    <AddPackageSelect />
  </div>
  )
}
