import React from 'react'

export default function PotentialTagsSelector({condition, potentialTags, tagTitles, handler}) {
    
  return (
    <div className={condition ? "potential-tags hide-up-anim" : "potential-tags hide-up-hide"}>
      <div className="potential-tags-clip">
        {
          potentialTags?.length ?
          potentialTags.map((item, i) => {
            return <>
              <div className={tagTitles?.includes(item) ? "potential-tag selected" : "potential-tag unselected"}
                onClick={() => handler(item)} key={'potential-tag' + i}>
                <p>{item}</p>
              </div>
              {
                potentialTags[i + 1] ?
                <p onClick={() => handler(item + potentialTags[i + 1], [item, potentialTags[i + 1]], i)} key={'add' + i}>
                +
                </p> :
                null
              }
            </>
          }) : null
        }
      </div>
    </div>
  )
}
