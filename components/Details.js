import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'


function Details(props) {

    const submit = useRef()


    const UpdateDetails = (e) => {
        e.preventDefault()

        if (props.myAccount) {

            if (e.target[8].value === e.target[9].value) {
                props.setUserDetail({ ...props.userDetail, name: e.target[0].value, email: e.target[1].value, phone: parseInt(e.target[2].value), address: e.target[6].value, pin: parseInt(e.target[3].value), state: e.target[4].value, city: (e.target[5].value), old: e.target[7].value, new: e.target[8].value })



                if (e.target[8].value.length === 0) {
                    props.myAccount.setStartSubmit(1)
                } else {
                    if (e.target[8].value.length !== 0 && e.target[7].value.length !== 0) {
                        props.myAccount.setStartSubmit(1)
                    } else {
                        toast.error("Please enter old password")
                    }
                }

            } else {
                toast.error("Your new password is not matching")
            }



        } else if (props.checkOut) {
            props.setUserDetail({ ...props.userDetail, name: e.target[1].value, email: e.target[2].value, phone: parseInt(e.target[3].value), address: e.target[7].value })
            props.checkOut.setStartSubmit(0)
        }
    }

    props.checkOut && useEffect(() => {
        if (props.checkOut.startSubmit === 1) {
            submit.current.click()
        }

    }, [props.checkOut.startSubmit])




    return (
        <form onSubmit={UpdateDetails} >

            {/* HEADING FOR MENTION */}
            {props.checkOut &&
                <div className='text-lg my-3 flex justify-between'>
                    <div>Delivery Details</div>
                    <input id='resetbtn' type="reset" className={` bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-white cursor-pointer `} value="Reset" />
                </div>
            }


            {/* SUBMIT DETAILS IN FORM */}
            <div className='bg-indigo-300 rounded-lg p-5 md:px-16 lg:px-32 md:flex md:justify-between md:flex-wrap'>

                <div className="relative mb-4  md:w-2/5">
                    <span className="leading-7 text-gray-600">Name </span>
                    <input type="text" className={`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} defaultValue={props.userDetail.name} required={true} />
                </div>

                <div className="relative mb-4 md:w-2/5 ">
                    <span className="leading-7 text-gray-600">Email </span>
                    <input type="email" className={`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} defaultValue={props.userDetail.email} required={props.checkOut && true} />
                </div>

                <div className="relative mb-4 md:w-2/5 ">
                    <span className="leading-7 text-gray-600">Phone </span>
                    <input type="number" className={`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} defaultValue={props.userDetail.phone ? props.userDetail.phone : ""} required={props.checkOut && true} />
                </div>

                <div className="relative mb-4 md:w-2/5 ">
                    <span className="leading-7 text-gray-600">Pin Code </span>
                    <input type="number" className={`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} onChange={props.checkOut && props.checkOut.onpinchange} defaultValue={props.userDetail.pin ? props.userDetail.pin : ""} required={props.checkOut && true} />

                </div>

                <div className="relative mb-4 md:w-2/5 ">
                    <span className="leading-7 text-gray-600">State </span>
                    <input type="text" className={`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} onChange={(e) => { props.setUserDetail({ ...props.userDetail, state: e.target.value }) }} value={props.userDetail.state} required={props.checkOut && true} />
                </div>

                <div className="relative mb-4 md:w-2/5 ">
                    <span className="leading-7 text-gray-600">City </span>
                    <input type="text" className={`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} onChange={(e) => { props.setUserDetail({ ...props.userDetail, city: e.target.value }) }} value={props.userDetail.city} required={props.checkOut && true} />
                </div>


                <div className="relative mb-4 md:w-full  ">
                    <span className="leading-7 text-gray-600">Address</span>
                    <textarea id="" cols="30" rows="4" className={`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} defaultValue={props.userDetail.address} required={props.checkOut && true}></textarea>
                </div>


                <div style={props.checkOut && { display: "none" }} className='w-full  border-t-2 border-black my-5 p-4'>

                    <div className='text-center text-xl my-4'>Change Password</div>

                    <div className="relative mb-4 md:w-2/5  ">
                        <span className="leading-7 text-gray-600">Old password</span>
                        <input type="password" className={`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} />
                    </div>

                    <div className=' md:flex justify-between  '>

                        <div className="relative mb-4 md:w-2/5  ">
                            <span className="leading-7 text-gray-600">New password</span>
                            <input type="password" className={`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} minLength={3} />
                        </div>

                        <div className="relative mb-4 md:w-2/5  ">
                            <span className="leading-7 text-gray-600">Confirm password</span>
                            <input type="password" className={`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} />
                        </div>

                    </div>

                    <div className='w-full flex text-xs md:text-sm justify-end flex-wrap'>
                        <input id='resetbtn' type="reset" className={` bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-white cursor-pointer `} value="Reset" />
                        <input ref={submit} type="submit" value="Submit" className={` bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-white cursor-pointer mx-3 `} />
                    </div>
                </div>


            </div>
        </form>
    )
}

export default Details

