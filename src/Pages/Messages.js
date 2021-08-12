import react, { useEffect, useState } from "react"
import { GetWithToken } from "../apiCrud/datacrud";

export const Messages = () => {
    const [website, setWebsite] = useState([]);
    const [selectedSiteTopic, setSelectedSiteTopic] = useState([])
    useEffect(() => {
        start()
    })
    const start = async () => {
        var d = await GetWithToken("Configuration/GetAllWebSite/").then(x => { return x.data }).catch(x => { return false })
        setWebsite(d);
    }
    const selecTopicByWebSiteId = async (id) => {
        var d = await GetWithToken("Configuration/GetTopicById/" + id).then(x => { return x.data }).catch(x => { return false })
        setSelectedSiteTopic(d);
    }
    return (
        <div className="container">


            <div className="row p-4 web-site-list">
                {
                    website.map((item, key) => {
                        return (
                            <div key={key} className="col-3">
                                <button onClick={() => { selecTopicByWebSiteId(item.id) }} className="btn btn-outline-success">
                                    {item.webSiteName}
                                </button>

                            </div>
                        )
                    })
                }


            </div>
            <div className="row">

                <div className="col-12 col-md-3 col-lg-3">
                    {
                        selectedSiteTopic.map((item, key) => {
                            return (
                                <div key={key} className="col-3">
                                    <button onClick={() => { selecTopicByWebSiteId(item.id) }} className="btn btn-outline-success">
                                        {item.riderName}
                                    </button>

                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )

}