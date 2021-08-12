import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { Login } from './Pages/Login';
import { GetWithToken } from './apiCrud/datacrud';
import NavigationTree from './component/navigationTree';
import { Navbar, NavbarPage } from './component/NavbarPage';
import { User } from './Pages/User';
import 'react-confirm-alert/src/react-confirm-alert.css'; // 
import { WebSite } from './Pages/WebSites';
import { Messages } from './Pages/Messages';
function App() {
  const [trueLogin, setTrueLogin] = useState(false)
  const [pageName, setPageName] = useState("")
  useEffect(() => {



    loginControl()
    // localStorage.removeItem("tokenkredicomtr")
  }, [])
  const loginControl = async () => {

    var isLogin = await GetWithToken("Home/CehckLogin/").then(x => { return x.data }).catch(x => { return false })
    setTrueLogin(isLogin)

  }
  if (trueLogin == null || trueLogin == false) {
    if (trueLogin == null) {
      return (<div style={{ width: "20%", margin: "0 auto", marginTop: 50 }}><img style={{ width: "100%" }} src={require("./assets/image/loading.gif").default}></img></div>)
    } else {
      return (<Login></Login>)

    }
  } else {
    return (
      <Router>
        <object class="nns" type="text/html" data="http://localhost:3001/test.html" >
          
        </object>
        <div className="" style={{ background: "white" }}>
          <div className="wrapper">
            <div className="sidebar" data-color="purple" data-background-color="white" data-image="../../assets/image/mutlu.pmg">

              <NavigationTree ></NavigationTree>
            </div>
            <div className="main-panel">
              <NavbarPage></NavbarPage>



              <Switch>

                {
                  trueLogin &&
                  <>

                    <div className="content" id="rootcontent">

                      <div className="container-fluid">
                        <Route exact path="/"
                          render={props => <Home {...props} />}>
                        </Route>
                        <Route path="/user"
                          render={props => <User {...props} pageName={() => { setPageName("Kullanıcılar") }} />}>
                        </Route>
                        <Route path="/sites"
                          render={props => <WebSite {...props} pageName={() => { setPageName("Web Siteler") }} />}>
                        </Route>
                        <Route path="/message"
                          render={props => <Messages {...props} pageName={() => { setPageName("Mesajlar") }} />}>
                        </Route>
                      </div>


                    </div>
                  </>
                }

              </Switch>

            </div>
          </div>
        </div>





      </Router >
    )
  }
}
function Home() {
  return (
    <div>

    </div>
  );
}
export default App;
