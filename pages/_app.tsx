import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from 'next/router'


// Admin
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/theme/theme";
import FullLayout from "../src/layouts/FullLayout";



export default function App({ Component, pageProps }: AppProps) {

  // TOP LOADING BAR RELATED STUFF
  const [progress, setProgress] = useState(0)
  const router = useRouter();

  useEffect(() => {

    router.events.on('routeChangeStart', () => {
      setProgress(70)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })

  }, [router.query])



  // USER PROFILE RELATED STUFF
  const [isLogin, setIsLogin] = useState(false)
  const [userData, setUserData] = useState({})
  const [refreshDetails, setRefreshDetails] = useState(false)

  const userDetails = async (token: string) => {

    if (token !== null) {
      let data = { "token": JSON.parse(token) }
      let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/verifyUser/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.status === 200) {
        let msg = await response.json()
        setUserData(msg)
        setIsLogin(true)
      } else {
        localStorage.clear()
        setIsLogin(false)
      }
      // console.clear()
    }
  }


  useEffect(() => {
    if (typeof window !== 'undefined') {
      let token = (localStorage.getItem('defaultToken'))

      if (token) {
        userDetails(token)
      }

      setRefreshDetails(false)
    }
  }, [isLogin, refreshDetails])


  return (
    <>

      <LoadingBar color='#6366f1' progress={progress} onLoaderFinished={() => setProgress(0)} waitingTime={500} />
      <ToastContainer position="top-left" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />

      {!router.route.startsWith('/admin') ?
        <>
          <Navbar isLogin={isLogin} setIsLogin={setIsLogin} userData={userData} />
          <div className="my-16">
            <Component {...pageProps} isLogin={isLogin} userData={userData} refreshDetails={setRefreshDetails} />
          </div>

          <Footer />
        </> : <>

          <ThemeProvider theme={theme}>
            <FullLayout>
              <Component {...pageProps} />
            </FullLayout>
          </ThemeProvider>

        </>
      }

    </>
  )
}
