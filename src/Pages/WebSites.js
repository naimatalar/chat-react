import React, { useEffect, useState } from "react"
import { confirmAlert } from "react-confirm-alert"
import { apiConstant, GetWithToken, PostWithToken } from "../apiCrud/datacrud"
import { Modal } from "../component/Modal"

export const WebSite = (props) => {

    const [webSiteData, setWebSiteData] = useState(
        []
    )
    const [showModal, setShowModal] = useState(false)
    const closeModal = () => {
        setShowModal(false)
        setSelectWebSite(null)
    }
    const [selectWebSite, setSelectWebSite] = useState(null)
    useEffect(() => {
        props.pageName()

        start()
    }, [])
    const submit = async (val) => {
        var isLogin
        if (val.values.id == undefined) {
            isLogin = await PostWithToken("Configuration/CreateEditWebSite", val.values).then(x => { return x.data }).catch(x => { return false })

        } else {
            isLogin = await PostWithToken("Configuration/CreateEditWebSite", val.values).then(x => { return x.data }).catch(x => { return false })
        }

        setSelectWebSite(null)
        start()
    }

    const start = async () => {
        var isLogin = await GetWithToken("Configuration/GetAllWebSite/").then(x => { return x.data }).catch(x => { return false })
        setWebSiteData(isLogin);
    }
    const deleteWebSite = async (id) => {
        confirmAlert({
            title: 'Sil',
            message: 'Kayıt Silinecek Onaylıyor musunuz?',
            buttons: [
                {
                    label: 'Evet',
                    onClick: async () => {
                        await GetWithToken("Configuration/DeleteWebSite/" + id).then(x => { return x.data }).catch(x => { return false })
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

    const editWebSite = (id) => {
        setSelectWebSite(webSiteData.find(x => { return x.id == id }))
        setShowModal(true)

    }

    let webSiteList = webSiteData.map((item, key) => {
        if (item.id == null) {
            return (null)
        }
        return (
            <tr key={key}>
                <td>{item.webSiteName}</td>
                <td>{item.messageTopicCount}</td>
                <td>{item.lastMessageDate}</td>

                <td>  <button className="btn btn-info" onClick={() => { editWebSite(item.id) }}>Edit</button>
                    <button className="btn btn-danger" onClick={() => { deleteWebSite(item.id) }}>Sil</button></td>
            </tr>
        )
    })

    return (<div>
        {showModal &&


            <Modal modalTitle={selectWebSite == null ? "Web Site Ekle" : "Web Site Düzenle"} closeModal={closeModal} submintButton="Kaydet" items={
                [{
                    props: {
                        name: "name",
                        type: "text",
                        className: "form-control",
                        label: "Web Site Adını Giriniz",
                        placeholder:"https://www.site.com"


                    },
                    rowCssClass: "col-12"
                }, 
                ]
            }
                initialValues={selectWebSite == null ? {
                    name: "",
                   

                } : selectWebSite}
                submit={submit}
            ></Modal>}
        <button className="btn btn-success" onClick={() => { setShowModal(true); setSelectWebSite(null) }}>Yeni Web Site Ekle</button>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Web Site Adı</th>
                    <th>Toplam Mesajlaşma</th>
                    <th>Son Gelen Mesaj Tarihi</th>


                    <th>
                        #
                    </th>

                </tr>
            </thead>
            <tbody>
                {webSiteList}
            </tbody>
        </table>




    </div>)
}