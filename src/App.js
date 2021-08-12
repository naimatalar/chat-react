import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { Login } from './Pages/Login';
import { GetWithToken } from './Pages/apiCrud/datacrud';
import NavigationTree from './Pages/component/navigationTree';
function App() {
  const [trueLogin, setTrueLogin] = useState(false)
      
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
    
        <div className="" style={{ background: "white" }}>
          <div className="wrapper">
            <div className="sidebar" data-color="purple" data-background-color="white" data-image="../../assets/image/mutlu.pmg">

              <NavigationTree ></NavigationTree>
            </div>
            <div className="main-panel">
              <Navbar pageName={pageName}></Navbar>



              <Switch>

                {
                  trueLogin &&
                  <>

                    <div className="content" id="rootcontent">

                      <div className="container-fluid">
                        <Route exact path="/"
                          render={props => <Home {...props} pageName={() => { setPageName("Analiz") }} />}>
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

      gfd
      dfg
    </div>
  );
}
export default App;
