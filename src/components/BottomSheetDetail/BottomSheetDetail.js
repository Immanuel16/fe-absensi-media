import React from 'react'
import { CloseIcon } from '../../assets/icons'

const BottomSheetDetail = ({content, open, closeModal}) => {
  return (
    <>
      {open && (
        <section className='fixed width-bottom-sheet z-50 inset-0 overflow-x-hidden overflow-y-hidden mt-auto bottom-0'>
          <div className="flex items-end min-h-full text-center sm:p-0 bg-gray-900 bg-opacity-40">
            <div className={`animate__animated rounded-t-3xl inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w w-full ${
            open ? "animate__fadeInUp" : "animate__fadeOutDown"
          }`}>
              <div className="overflow-y-hidden py-6 px-4">
                {/* divider */}
                <div className="flex justify-center items-center w-full">
                  <div className="h-1.5 w-24 border-media-secondary-gray bg-media-secondary-gray rounded-2xl"></div>
                </div>

                <div className="flex justify-end mb-3">
                  <button onClick={closeModal}>
                    <CloseIcon />
                  </button>
                </div>

                <div className="flex flex-col">
                  {content}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default BottomSheetDetail