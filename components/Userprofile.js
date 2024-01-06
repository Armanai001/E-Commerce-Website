import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiFillSetting, AiOutlineUserSwitch } from 'react-icons/ai'
import { BiListUl } from 'react-icons/bi'
import { HiOutlineLogout } from 'react-icons/Hi'


function Userprofile(props) {

    const [UserDetail, setUserDetail] = useState({})
    const router = useRouter()


    useEffect(() => {
        setUserDetail(props.userData)
    }, [props.userData])


    const signOut = () => {
        localStorage.clear()
        props.changeLoginState(false);
    }


    return (
        <>


            <div >
                <div className="  bg-blue-100 rounded-lg p-5 flex flex-col md:ml-1/2  w-full mt-0">

                    <span className="text-gray-900 text-sm md:text-lg font-medium title-font mb-0 flex justify-center  flex-wrap">
                        <span id='signIn' >User Profile</span>
                    </span>

                    <div className="text-white flex justify-center flex-wrap text-sm md:text-lg mt-1">
                        <button id='submitbtn' className={` bg-indigo-500 border-0 py-2 px-3 mx-1 md:mx-3 my-3 focus:outline-none hover:bg-indigo-600 rounded `} title="Sign out" onClick={signOut} > <HiOutlineLogout /> </button>
                        <button id='add' className={` bg-indigo-500 border-0 py-2 px-3 mx-1 md:mx-3 my-3 focus:outline-none hover:bg-indigo-600 rounded `} title="My Orders" onClick={() => { router.push('/order/Order') }}> <BiListUl /> </button>
                        <button id='add' className={` bg-indigo-500 border-0 py-2 px-3 mx-1 md:mx-3 my-3 focus:outline-none hover:bg-indigo-600 rounded `} title="Switch Between accounts"> <AiOutlineUserSwitch /> </button>
                        <button id='add' className={` bg-indigo-500 border-0 py-2 px-3 mx-1 md:mx-3 my-3 focus:outline-none hover:bg-indigo-600 rounded `} title="Settings" onClick={() => { router.push('/Myaccount') }}> <AiFillSetting /> </button>
                    </div>



                    <div className="relative mb-4 bg-blue-100 ">
                        <span className="leading-7 text-xs md:text-sm text-gray-600">Full Name </span>
                        <div className="leading-7 text-2xl md:text-3xl mt-1 md:mt-3 text-black">{UserDetail.name} </div>
                    </div>

                    <div className="relative mb-4 bg-blue-100 ">
                        <span className="leading-7 text-xs md:text-sm text-gray-600">E-mail address </span>
                        <div className="leading-7 text-2xl md:text-3xl mt-1 md:mt-3 text-black">{UserDetail.email} </div>
                    </div>







                </div>
            </div>
        </>
    )
}

export default Userprofile