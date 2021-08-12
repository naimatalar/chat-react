import { useFormik } from "formik";
import React, { useEffect, useState } from "react"
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import SunEditor from 'suneditor-react';
// import SunEditorCore from "suneditor/src/lib/core";
// import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

export const Modal = (props) => {

    const [uplodFile, setUploadFile] = useState(null)
    const [listVal, setListVal] = useState("")
    const [listSelectVal, setListSelectVal] = useState("")

    const [refreshDom, setRefreshDom] = useState()
    const [fullScreenEditor, setFullScreenEditor] = useState("")
    const [editorValue, setEditorValue] = useState("")

    const getBase64 = (e) => {
        var file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {

            setUploadFile(reader.result)

        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        }
    }

    

    const formik = useFormik({
        initialValues: props.initialValues,
        onSubmit: values => {
            if (props.closeWhenSumbit == false) {

            } else {
                props.closeModal()
            }


            props.submit({ values: values, file: uplodFile })
        },
    });
    const listChange = (name, value) => {
        setListVal("")
        formik.values[name].push(value);
        setRefreshDom(new Date().getMilliseconds() + new Date().getSeconds())
        // formik.handleChange(x)
    }
    const listSelectChange = (name, value) => {
        setListSelectVal("")
        
        formik.values[name].push(value);
        setRefreshDom(new Date().getMilliseconds() + new Date().getSeconds())
        // formik.handleChange(x)
    }
    const editorChange = (name, value) => {
  
        formik.values[name] = value;
        // setRefreshDom(new Date().getMilliseconds() + new Date().getSeconds())
        // formik.handleChange(x)
    }

    const deleteListValue = (name, value) => {

        setListVal("")
        var newdata = formik.values[name].filter(x => x != value);
        formik.values[name] = newdata
        setRefreshDom(new Date().getMilliseconds() + new Date().getSeconds())
        // formik.handleChange(x)
    }
    const deleteListSelectValue = (name, value) => {

        setListSelectVal("")
        var newdata = formik.values[name].filter(x => x != value);
        formik.values[name] = newdata
        setRefreshDom(new Date().getMilliseconds() + new Date().getSeconds())
        // formik.handleChange(x)
    }
    useEffect(() => {

    }, [])
    return (
        <>
            <div className='light-view' onClick={() => { props.closeModal() }}></div>
            <div className="kc-modal">
                {
                 
                    props.child &&
                    <div className="row col-12 mb-4 mt-4">
                        {props.child}
                    </div>
                }

                <h2 className="mb-4">{props.modalTitle}</h2>
                <form onSubmit={formik.handleSubmit} className="row">
                    {
                        props.items.map((item, key) => {
                            <div key={key}>

                            </div>
                            if (item.props.type == "text" || item.props.type == "number" || item.props.type == "password") {

                                return (
                                    <div key={key} className={"mb-4 form-item " + (item.rowCssClass == undefined ? "col-12" : item.rowCssClass)}>
                                        <label className="description-label">{item.props.label}</label>
                                        <input autoComplete="off" value={formik.values[item.props.name]} {...item.props} onChange={formik.handleChange} ></input>
                                    </div>
                                )
                            }

                            if (item.props.type == "hidden") {

                                return (
                                    <div key={key} className={"mb-4 form-item " + (item.rowCssClass == undefined ? "col-12" : item.rowCssClass)}>
                                        <label className="description-label">{item.props.label}</label>
                                        <input autoComplete="off" value={formik.values[item.props.name]} {...item.props} onChange={formik.handleChange} ></input>
                                    </div>
                                )
                            }
                            if (item.props.type == "textarea") {

                                return (
                                    <div key={key} className={"mb-4 form-item " + (item.rowCssClass == undefined ? "col-12" : item.rowCssClass)}>
                                        <label className="description-label">{item.props.label}</label>
                                        <textarea value={formik.values[item.props.name]} {...item.props} onChange={formik.handleChange} ></textarea>
                                    </div>
                                )
                            }

                            // if (item.props.type == "value-text") {

                            //     return (
                            //         <div key={key} className="col-12 row p-5 mb-5 mt-5 m-0" style={{ border: "1px solid black", borderRadius: 10 }}>
                            //             {formik.values[item.props.name]&& 

                            //             }
                            //             <div className={"mb-4 form-item " + (item.rowCssClass == undefined ? "col-6" : item.rowCssClass)}>
                            //                 <label className="description-label">Özellik</label>
                            //                 <input value={formik.values[item.props.name]} {...item.props} type="text" onChange={formik.handleChange} ></input>
                            //             </div>

                            //             <div className={"mb-4 col-6 form-item " + (item.rowCssClass == undefined ? "col-6" : item.rowCssClass)}>
                            //                 <label className="description-label">Değer</label>
                            //                 <input value={formik.values[item.props.name]} {...item.props} type="text" onChange={formik.handleChange} ></input>
                            //             </div>


                            //             <div className="row col-12 justify-content-end">
                            //                 <div className="item-add-button " style={{width:60,height:30}} onClick={() => { listChange(item.props.name, listVal) }}>
                            //                     <div>
                            //                         {item.butonName ?? "Ekle"}
                            //                     </div>
                            //                 </div>

                            //             </div>
                            //         </div>
                            //     )
                            // }
                            if (item.props.type == "editor") {

                                return (
                                    <div key={key} className={fullScreenEditor}>
                                        {/* <div className="get-full-screen" onClick={() => { setFullScreenEditor("ckeditor-big") }}>Büyük Ekran</div> */}
                                        {
                                            fullScreenEditor == "ckeditor-big" &&
                                            <>

                                                <div onClick={() => { setFullScreenEditor("") }} className="close-full-screen">Tamam</div>
                                                <div style={{ marginRight: 120 }} onClick={() => { window.open("allfiles", "popUpWindow"); }} className="close-full-screen">Resimler</div>
                                            </>
                                        }
                                        {/* <SunEditor defaultValue={formik.values[item.props.name]} onChange={editor => {
                                            editorChange(item.props.name, editor);
                                            formik.setFieldValue(item.props.name,editor)
                                        }} setOptions={{
                                            buttonList: [

                                                ['undo', 'redo'],
                                                [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
                                                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                                                ['fontColor', 'hiliteColor', 'textStyle'],
                                                ['removeFormat'],
                                                ['outdent', 'indent'],
                                                ['align', 'horizontalRule', 'list', 'lineHeight'],
                                                ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template'],
                                                // ['-right', ':r-More Rich-default.more_plus', 'table', 'math', 'imageGallery'],
                                                ['-right', 'image', 'video', 'audio', 'link']



                                            ]
                                        }} /> */}
                                        <div id="letters"></div>
                                    </div>


                                    // <div key={key} className="mb-4 form-item">
                                    //     <label className="description-label">{item.props.label}</label>
                                    //     <textarea value={formik.values[item.props.name]} {...item.props} onChange={formik.handleChange} ></textarea>
                                    // </div>
                                )
                            }
                            if (item.props.type == "file") {

                                return (
                                    <div key={key} className={"mb-4 form-item " + (item.rowCssClass == undefined ? "col-12" : item.rowCssClass)}>
                                        <label className="description-label">{item.props.label}</label>
                                        <input   {...item.props} onChange={getBase64} ></input>
                                    </div>
                                )
                            }

                            if (item.props.type == "select") {

                                return (
                                    <div key={key} className={"mb-4 form-item " + (item.rowCssClass == undefined ? "col-12" : item.rowCssClass)}>
                                        <label className="description-label">{item.props.label}</label>
                                        <select value={formik.values[item.props.name]}  {...item.props} onChange={
                                            (x) => {

                                                formik.handleChange(x)
                                                try {

                                                    if (item["effectedchange"] != undefined) {
                                                        item.effectedchange(x)
                                                    }
                                                } catch (error) {
                                                }
                                            }} >
                                            <option >Seç</option>

                                            {
                                                item.data.map((item2, key2) => {

                                                    return (
                                                        <option key={key2} value={item2.id}>{item2.text}</option>
                                                    )

                                                })
                                            }

                                        </select>
                                    </div>
                                )
                            }

                            if (item.props.type == "list") {
                                return (
                                    <div key={key} className={"mb-4 form-item " + (item.rowCssClass == undefined ? "col-12" : item.rowCssClass)}>
                                        <label className="description-label">{item.props.label}</label>
                                        <div className="row">
                                            <div className="col-8">


                                                <input autoComplete="off" {...item.props} onKeyUp={(x) => { if (x.target.value.includes("+")) { listChange(item.props.name, listVal.replace("+", "")) } }} value={listVal} onChange={(x) => { setListVal(x.target.value) }} type="text" >


                                                </input>

                                            </div>
                                            <div className="col-4">
                                                <div className="item-add-button" onClick={() => { listChange(item.props.name, listVal) }}>
                                                    <div>
                                                        {item.butonName ?? "ekle"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3 pb-3">
                                            {
                                                formik.values[item.props.name].map((item2, key2) => {
                                                    return (
                                                        <div className="term-items" key={key2}>{item2}
                                                            <span style={{ marginLeft: 10 }} onClick={() => { deleteListValue(item.props.name, item2) }}>x</span>
                                                        </div>
                                                    )

                                                })}
                                        </div>

                                    </div>
                                )
                            }

                            if (item.props.type == "listselect") {
                                return (
                                    <div key={key} className={"mb-4 form-item " + (item.rowCssClass == undefined ? "col-12" : item.rowCssClass)}>
                                        <label className="description-label">{item.props.label}</label>
                                        <div className="row">
                                            <div className="col-8">
                                                <select {...item.props} value={listSelectVal} onChange={(x) => { setListSelectVal(x.target.value) }}  >
                                                    <option >Seç</option>

                                                    {
                                                        item.data.map((item2, key2) => {

                                                            return (
                                                                <option key={key2} value={item2.id}>{item2.text}</option>
                                                            )

                                                        })
                                                    }
                                                </select>

                                            </div>
                                            <div className="col-4">
                                                <div className="item-add-button" onClick={() => { listSelectChange(item.props.name, listSelectVal) }}>
                                                    <div>
                                                        Ekle
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3 pb-3">
                                            {
                                                formik.values[item.props.name]?.map((item2, key2) => {
                                                    
                                                    return (
                                                        <div className="term-items" key={key2}>{item.data.find(x => x.id == item2).text}
                                                            <span style={{ marginLeft: 10 }} onClick={() => { deleteListSelectValue(item.props.name, item2) }}>x</span>
                                                        </div>
                                                    )

                                                })}
                                        </div>

                                    </div>
                                )
                            }


                        })
                    }
                    <div className="row col-12 justify-content-end">
                        <button className="btn btn-danger mr-5" style={{width:150}} onClick={() => { props.closeModal() }}>Kapat</button>
                        <button type="submit" style={{width:150}} className="btn btn-success">{props.submintButton ?? "Gönder"}</button>

                    </div>

                </form>

            </div>


        </>
    )

}
