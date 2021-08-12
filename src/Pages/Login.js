import React, { useState } from "react"
import { PostWithToken } from "./apiCrud/datacrud";

export const Login = () => {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const login = async () => {


        let data = {
            mail: userName,
            password: password
        }
        var isLogin = await PostWithToken("Home/GetToken/", data).then(x => { return x.data.token }).catch(x => { return false })
        debugger
        if (isLogin) {
            localStorage.setItem("ultumtoken", isLogin)
            window.location.reload()
        } else {
            alert("Hatalı Giriş")
        }


    }
    return (

        <div className="row justify-content-center mt-5 ">
            <div className="col-12 col-md-5 col-lg-5 row p-5 mt1s justify-content-center">
                <div className="row">
                    <img src={require("../assets/image/mutlu.png").default} style={{ width: 200, margin: "0 auto" }}></img>
                </div>
                <div className="row">
                    <h4 className="text-center">
                        Müşteri Canlı
                        İiletişim Paneline Giriş
                    </h4>
                </div>
                <div className="row justify-content-center">
                    <div className="row justify-content-center">
                        <div className="col-12 row mt-3">
                            <div className="row col-12 ">
                                <label>Kullanıcı Adı</label>
                                <input className="form-control mb-4" onChange={(x) => { setUserName(x.target.value) }}></input>
                                <label>Şifre</label>
                                <input className="form-control " onChange={(x) => { setPassword(x.target.value) }}></input>
                            </div>


                        </div>
                    </div>

                    <div className="row col-10 justify-content-end">
                        <div className="row col-5 mt-3 justify-content-end">
                            <div className="row ">
                                <button className="btn btn-outline-success " onClick={() => { login(); }}> Giriş Yap</button>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}