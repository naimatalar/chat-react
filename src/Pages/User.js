import React, { useEffect, useState } from "react"
import { confirmAlert } from "react-confirm-alert"
import { apiConstant, GetWithToken, PostWithToken } from "../apiCrud/datacrud"
import { Modal } from "../component/Modal"

export const User = (props) => {

    const [userData, setUserData] = useState(
        []
    )
    const [showModal, setShowModal] = useState(false)
    const closeModal = () => {
        setShowModal(false)
        setSelectUser(null)
    }
    const [selectUser, setSelectUser] = useState(null)
    useEffect(() => {
        props.pageName()

        start()
    }, [])
    const submit = async (val) => {
        var isLogin
        debugger
        if (val.values.id == undefined) {
            isLogin = await PostWithToken("Configuration/CreateEditUser", val.values).then(x => { return x.data }).catch(x => { return false })

        } else {
            isLogin = await PostWithToken("Configuration/CreateEditUser", val.values).then(x => { return x.data }).catch(x => { return false })
        }
       
        setSelectUser(null)
        start()
    }

    const start = async () => {
        var isLogin = await GetWithToken("Configuration/GetAllUser/").then(x => { return x.data }).catch(x => { return false })
        setUserData(isLogin);
    }
    const deleteUser = async (id) => {
        confirmAlert({
            title: 'Sil',
            message: 'Kayıt Silinecek Onaylıyor musunuz?',
            buttons: [
                {
                    label: 'Evet',
                    onClick: async () => {
                        await GetWithToken("Configuration/DeleteUser/" + id).then(x => { return x.data }).catch(x => { return false })
                        start()
                    }
                },
                {
                    label: 'Hayır',
                    onClick: () => { }
                }
            ]
        });


    }

    const editUser = (id) => {
        setSelectUser(userData.find(x => { return x.id == id }))
        setShowModal(true)

    }

    let userList = userData.map((item, key) => {
        if (item.id == null) {
            return (null)
        }
        return (
            <tr key={key}>
                <td>{item.name}</td>
                <td>{item.mail}</td>
           
                <td>  <button className="btn btn-info" onClick={() => { editUser(item.id) }}>Edit</button>
                    <button className="btn btn-danger" onClick={() => { deleteUser(item.id) }}>Sil</button></td>
            </tr>
        )
    })

    return (<div>
        {showModal &&


            <Modal modalTitle={selectUser == null ? "Kullanıcı Ekle" : "Kullanıcı Düzenle"} closeModal={closeModal} submintButton="Kaydet" items={
                [{
                    props: {
                        name: "name",
                        type: "text",
                        className: "form-control",
                        label: "Kullanıcı Adı"

                    },
                    rowCssClass:"col-12 col-md-6"
                }, {
                    props: {
                        name: "mail",
                        type: "text",
                        className: "form-control",
                        label: "E-Mail"

                    },
                    rowCssClass:"col-12 col-md-6"
                }, 
                {
                    props: {
                        name: "password",
                        type: "password",
                        className: "form-control",
                        label: "Şifre"

                    },
                    rowCssClass :"col-12 col-md-6"
                }
                ]
            }
                initialValues={selectUser == null ? {
                    name: "",
                    mail: "",
                    password: "",
                

                } : selectUser}
                submit={submit}
            ></Modal>}
        <button className="btn btn-success" onClick={() => { setShowModal(true); setSelectUser(null) }}>Yeni Kullanıcı Ekle</button>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Adı</th>
                    <th>Mail</th>
                    
                    <th>
                        #
                    </th>

                </tr>
            </thead>
            <tbody>
                {userList}
            </tbody>
        </table>




    </div>)
}