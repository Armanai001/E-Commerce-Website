import React from 'react'
import { AiFillLinkedin, AiFillRobot, AiFillTwitterCircle } from 'react-icons/ai'

function Footer() {
    return (
        <div className='fixed bottom-0 w-full'>

            <footer className="text-gray-600 body-font mt-3">
                <div className="bg-gray-100">
                    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">

                        <p className="text-gray-500 mx-4 text-sm text-center sm:text-left">© 2020 AiEmperor —
                            <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">@aiemperor</a>
                        </p>

                        <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                            <a className="text-gray-500 mx-4">
                                <span className='text-2xl'>
                                    <AiFillLinkedin />
                                </span>
                            </a>
                            <a className="text-gray-500 mx-4">
                                <span className='text-2xl'>
                                    <AiFillRobot />
                                </span>
                            </a>

                            <a className="text-gray-500 mx-4">
                                <span className='text-2xl'>
                                    <AiFillTwitterCircle />
                                </span>
                            </a>
                        </span>

                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Footer
