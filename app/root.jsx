import {Outlet, LiveReload, Link, Links, Meta} from 'remix'
import globalStylesUrl from '~/styles/global.css'


export const links = () => [{rel:'stylesheet', href:globalStylesUrl}]
export const meta = () => {
  const description = "A cool blog built with Remix"
  const keywords = 'remix. react, javascript'

  return {
    description,
    keywords 
  }
} 

export default function App() {
  return (
  
  <Document>
    <Layout>
    <Outlet />
    </Layout>
  </Document>

  )
}

function Document ({children, title}){
  return (
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=\, initial-scale=1.0" />
      <Meta />
      <Links />
      <title>Document</title>
    </head>
    <body>
      { children }
      {process.env.NODE_ENV === 'development' ?
<LiveReload /> : null}
    </body>
    </html>
  )
}


function Layout ({children})
{
  return (
    <>
    <nav className="navbar">
      <Link to="/" className='logo'>Remix</Link>

      <ul className='nav'>
        <li>
        <Link to='/posts'>Posts</Link>
        </li>
        <li>
        <Link to='/auth/login'>Login</Link>
        </li>
      </ul>
    </nav>

    <div className='container'>
       {children}
    </div>
    </>
  )
}

//specify error messages
export function ErrorBoundary({error}){
  return (
    <Document>
      <Layout>
        <h1>Error</h1>
        <p>{error.message}</p>
      </Layout>
    </Document>
  )
}