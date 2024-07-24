import '@styles/globals.css';
import Nav from '@components/nav'
import Provider from '@components/Provider'
import { Suspense } from 'react';
export const metadata ={
    title:"Urbiness",
    description:"La città del business"
}

const RootLayout = ( {children} ) => {
  return (
    <html lang="it">
        <body>
            <Provider>
                
            <div className="main">
                <div className="gradient" />
            </div>

            <main className="App">
                <Nav />
                <Suspense>
                    {children}
                    </Suspense>
                </main>
                
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;