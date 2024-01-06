import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';


function UserAuth(props) {

    const User = useRef()

    const signInHeading = useRef()
    const signUpHeading = useRef()
    const forgetHeading = useRef()


    const username = useRef()
    const usernameInput = useRef()

    const emailInput = useRef()
    const emailBox = useRef()

    const userPassword = useRef()
    const userPasswordInput = useRef()

    const userRePassword = useRef()
    const userRePasswordInput = useRef()

    const verificationBox = useRef()
    const verificationInput = useRef()

    const Submit = useRef()
    const Forgot = useRef()


    const setDisplay = (items, display) => {
        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            element.current.style.display = display
        }
    }




    // Sign In States :
    // 1 = Sign In , 2 = Sign Up , 3+ = Forget password states

    const [SignIn, setSignIn] = useState(1)
    const [verificationCode, setVerificationCode] = useState(null)
    const [email, setEmail] = useState(null)


    //  User Auth's Design
    const signIn = () => {
        if (SignIn === 1) {
            signUpHeading.current.className = 'cursor-pointer bg-gray-300 p-2 rounded-lg border-2 border-b-0';
            signInHeading.current.className = 'cursor-pointer  p-2 rounded-lg';
            setDisplay([username, userRePassword], "block")
            setDisplay([Forgot], "none")
            Submit.current.innerText = 'Sign Up'
            setSignIn(2)

        } else {
            signInHeading.current.className = 'cursor-pointer bg-gray-300 p-2 rounded-lg border-2 border-b-0';
            signUpHeading.current.className = 'cursor-pointer  p-2 rounded-lg';
            setDisplay([username, userRePassword], 'none')
            setDisplay([Forgot], 'block')
            Submit.current.innerText = 'Sign In'
            setSignIn(1)
        }

    }


    const forgetPassword = (e) => {
        if (e.target.innerText === "Forget password") {
            e.target.innerText = "Sign in instand"
            Submit.current.innerText = "Send verification email"
            setDisplay([userPassword, signInHeading, signUpHeading], 'none')
            setDisplay([forgetHeading], 'block')
            setSignIn(3)
        } else {
            e.target.innerText = "Forget password"
            setDisplay([userPassword, signInHeading, signUpHeading, emailBox], 'block')
            setDisplay([forgetHeading, verificationBox, userRePassword], 'none')
            signIn(1)
        }
    }



    const getVerificationCode = async () => {
        if (email) {
            let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/forgetPassword/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })

            let msg = await response.text()
            if (response.status === 200) {
                toast.info("Verification Code sent.", { autoClose: 3000 })
                toast.info(msg, { autoClose: 3000 })
                setVerificationCode(msg)
                setSignIn(4)
                setDisplay([verificationBox], "block")
                Submit.current.innerText = "Continue"
            } else {
                toast.error(msg)
            }
        }
    }




    // Submit btn actions
    const UserSubmit = async (e) => {
        e.preventDefault()


        let name = e.target[0].value
        let code = e.target[2].value
        let password = e.target[3].value
        let uRepass = e.target[4].value


        // Setting Token in localStorage
        const setToken = (newToken) => {
            // let token = JSON.parse(localStorage.getItem('token'))

            // TODO:Multiple accounts
            // if (token) {
            //     token = token.concat(newToken)
            //     localStorage.setItem("token", JSON.stringify(token))
            // } else {
            //     localStorage.setItem("token", JSON.stringify([newToken]))
            // }

            localStorage.setItem('defaultToken', JSON.stringify(newToken))

        }


        // Sign Up
        if (SignIn === 2 && password !== uRepass) {
            toast.error("Password not matched")
            e.target[3].value = ""
        } else if (SignIn === 2 && password === uRepass) {

            let data = { "name": name, "email": email, "password": password }

            let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/signUp/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            let msg = await response.text()

            if (response.status === 200) {
                toast.success("Account Created.")

                let UserAuth = document.getElementById('UserAuth')
                UserAuth.classList.remove('translate-x-0')
                UserAuth.classList.add('translate-x-full')
                setToken(msg)
                props.changeLoginState(true)


            } else {
                toast.error(msg)
            }
        }



        // Sign in
        if (SignIn === 1) {

            let data = { email, password }

            let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/signIn/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            let msg = await response.text()

            if (response.status === 200) {
                toast.success("Sign In Successfully", { autoClose: 500 })
                setToken(msg)
                document.getElementById('resetBtn').click()

                let UserAuth = document.getElementById('UserAuth')
                UserAuth.classList.remove('translate-x-0')
                UserAuth.classList.add('translate-x-full')
                props.changeLoginState(true)

            } else {
                toast.error(msg)
            }
        }



        // forgot
        if (SignIn === 3) {
            getVerificationCode()
        }

        if (SignIn === 4) {
            if (parseInt(code) === parseInt(verificationCode)) {
                toast.info("Verification Success", { autoClose: 3000 })
                setDisplay([userPassword, userRePassword], 'block')
                setDisplay([emailBox, verificationBox], 'none')
                setSignIn(5)
            } else {
                toast.error("Code Not matched")
            }
        }

        if (SignIn === 5) {
            if (password === uRepass) {
                let data = { email, password }

                let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/forgetPassword/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })

                let msg = await response.text()

                if (response.status === 200) {
                    setToken(msg)
                    props.changeLoginState(true)
                } else {
                    toast.error("Some Problem occurred , try again later.")
                }
            } else {
                toast.error("Password Not Matched")
            }
        }
    }



    return (
        <>

            <div ref={User}>
                <div className="  bg-blue-100 rounded-lg p-8 flex flex-col md:ml-1/2 w-full mt-0">



                    <form onSubmit={UserSubmit}>

                        <span className="text-gray-900 text-sm md:text-lg font-medium title-font mb-5 flex justify-center  flex-wrap">
                            <span ref={signInHeading} className='cursor-pointer  p-2 rounded-lg bg-gray-300  border-2 border-b-0' onClick={signIn} >Sign In</span>
                            <span ref={signUpHeading} className='cursor-pointer p-2 rounded-lg ' onClick={signIn} >Sign Up</span>
                            <span ref={forgetHeading} className='hidden p-2 rounded-lg ' >Forget password</span>
                        </span>

                        <div ref={username} className="hidden relative mb-4 bg-blue-100 ">
                            <span className="leading-7 text-sm text-gray-600">Full Name </span>
                            <input ref={usernameInput} type="text" className={`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} required={SignIn === 2 ? true : false} />
                        </div>

                        <div ref={emailBox} className="relative mb-4 bg-blue-100 ">
                            <span className="leading-7 text-sm text-gray-600">Email </span>
                            <input ref={emailInput} type="email" className={`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} onChange={(e) => { setEmail(e.target.value) }} disabled={(SignIn === 4 || SignIn === 5) ? true : false} required={true} />
                        </div>

                        <div ref={verificationBox} className="hidden relative mb-4 bg-blue-100 ">
                            <span className="leading-7 text-sm text-gray-600 flex justify-between"> <span>Verification Code</span> <span className='text-xs text-red-700 cursor-pointer pt-2 hover:text-red-900' onClick={getVerificationCode}>Resend</span></span>
                            <input ref={verificationInput} type="number" className={`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} required={(SignIn === 4) ? true : false} />
                        </div>


                        <div ref={userPassword} className="relative mb-4 bg-blue-100 ">
                            <span className="leading-7 text-sm text-gray-600">Password </span>
                            <input ref={userPasswordInput} type="password" className={`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} required={SignIn === 1 ? true : false} minLength={3} />
                        </div>

                        <div ref={userRePassword} className="hidden relative mb-4 bg-blue-100 ">
                            <span className="leading-7 text-sm text-gray-600" > Re-enter Password  </span>
                            <input ref={userRePasswordInput} type="password" className={`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} required={SignIn === 2 ? true : false} minLength={3} />
                        </div>

                        <p ref={Forgot} className="text-xs text-red-900 my-4 cursor-pointer " onClick={forgetPassword} > Forget password</p>

                        <div className="text-white flex justify-around flex-wrap text-sm md:text-lg">
                            <button ref={Submit} className={` bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded `}> Sign In </button>
                            <input id='resetBtn' type="reset" className={` bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded `} value="Reset" />
                        </div>

                    </form>




                </div>
            </div>
        </>

    )
}

export default UserAuth