import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Details from '../components/Details'
import { AiOutlineLogin } from 'react-icons/ai'


function Myaccount(props) {
    // const [userDetail, setUserDetail] = useState({ name: "Arman", email: "123@dk", phone: 12345, state: "Raj", city: "kota", pin: 335524, address: "Always open gli" })
    const [userDetail, setUserDetail] = useState(props.userData)
    const [startSubmit, setStartSubmit] = useState(false)

    const updateData = async (token) => {
        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/accountUpdate/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...userDetail, token })
        })

        let msg = await response.text()

        if (response.status === 401) {
            toast.error(msg)
        } else if (response.status === 404) {
            toast.error("Please sign in first")

            setTimeout(() => {
                localStorage.clear()
                location.reload()
            }, 3000);
        } else if (response.status === 200) {
            toast.success("Account details successfully Updated.")
            localStorage.setItem("defaultToken", JSON.stringify(msg))
            props.refreshDetails(true)

        }
    }


    useEffect(() => {
        if (startSubmit === 1) {
            setStartSubmit(0)
            if (typeof window !== 'undefined') {
                let token = JSON.parse(localStorage.getItem('defaultToken'))
                updateData(token)
            }
        }
    }, [startSubmit])



    return (
        <>


            <div className=" my-9 text-sm w-full mb-32 bg-indigo-200 p-3">
                <div className="text-xl text-center m-3">My Account </div>

                {
                    !props.isLogin ? <>

                        <div className='m-3 flex justify-center text-xl items-center '>
                            <div>Login First</div>
                            <button onClick={() => { document.getElementById('userLogin').click() }} className={` bg-indigo-500 border-0 py-2 px-3 mx-2 md:mx-7 my-3 focus:outline-none hover:bg-indigo-600 rounded `} title="Log In"> <AiOutlineLogin /> </button>
                        </div>

                    </> : <>
                        <div className='bg-indigo-300 rounded-lg p-2 w-full md:flex md:justify-around md:flex-wrap text-sm'>
                            <Details userDetail={userDetail} setUserDetail={setUserDetail} myAccount={{ startSubmit: startSubmit, setStartSubmit: setStartSubmit }} />
                            <div className='border-t-2 border-black w-full flex justify-evenly mt-4 p-5'>
                                <span>Account created At : {props.userData.createdAt}</span>
                                <span> Last Change : {props.userData.updatedAt} </span>
                            </div>
                        </div>
                    </>}
            </div >

        </>
    )
}

export default Myaccount