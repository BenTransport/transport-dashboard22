import React from 'react'
import './Loader.css'
function MainLoader() {
    return (
        <div className='h-screen flex flex-col gap-y-3  items-center justify-center dark:bg-slate-500'>
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation={12} />
                    <feColorMatrix values="0 0 0 0 0 
      0 0 0 0 0 
      0 0 0 0 0 
      0 0 0 48 -7" />
                </filter>
            </svg>
            <div className="loader" />
            <h1 className=' font-semibold text-xl bold-font '>
                Authenticating...

            </h1>
        </div>

    )
}

export default MainLoader