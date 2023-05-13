import { useCallback, useEffect, useState } from "react";
import { ExpensesMain } from "./Expenses.style";
import axios from "axios";
import { FullScreen } from "../payments/Payments.style";
import { Pagination } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';



function Expenses() {

    const [amount, setAmount] = useState('')
    const [date, setdate] = useState('')
    const [paymentsName, setPaymentsName] = useState('')
    const [text, setText] = useState('')
    const [urlImg, setUrlImg] = useState('')
    const [amountEdit, setAmountEdit] = useState()
    const [dateEdit, setdateEdit] = useState('')
    const [paymentsNameEdit, setPaymentsNameEdit] = useState('')
    const [textEdit, setTextEdit] = useState('')
    const [urlImgEdit, setUrlImgEdit] = useState('')
    const [data, setData] = useState([])
    const [openPhotos, setOpenPhote] = useState(false)
    const [editBool, setEditBool] = useState(false)
    const [photos, setPhoto] = useState()
    const [editData, setEditData] = useState()
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalpages] = useState();
    const [show, setShow] = useState(false);
    const [showSecond, setShowSecond] = useState(false);


    const RefData = useCallback(() => {
        axios.get(`/payments/v1/expense/all?page=${currentPage}&size=5`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("item")}`,
            },


        }
        ).then(res => {
            return (
                setData(res.data.content),
                setTotalpages(res.data.totalPages)

            )
        }
        )
            .catch(er => console.log(er))
    }, [currentPage])
    useEffect(() => {
        RefData()
    }, [RefData])


    const handleEdit = (e, item) => {
        console.log(item, e);
        setEditData(item)
        setEditBool(true)
        setAmountEdit(item.amount)
        setdateEdit(item.receiptPaymentDate)
        setPaymentsNameEdit(item.name)
        setTextEdit(item.description)
        setUrlImgEdit(item?.receipt.base64EncodedPhoto)

    }

    const uploadPhoto = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setUrlImg(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const uploadPhotoEdit = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setUrlImgEdit(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const addExpenses = () => {
        if (amount !== '' && text !== '' && paymentsName !== '' && urlImg !== '' && date !== '') {
            axios.put('/payments/v1/expense', {
                amount: parseInt(amount, 10),
                description: text,
                name: paymentsName,
                receipt: urlImg,
                receiptPaymentDate: date
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("item")}`,
                },
            }
            ).then(res => {
                return (
                    res.request.status === 201 ?
                        (
                            setShowSecond(true),
                            setAmount(''),
                            setText(''),
                            setPaymentsName(''),
                            setUrlImg(''),
                            setdate(''),
                            setTimeout(() => {
                                RefData()
                            }, 200)
                        ) : ""

                )
            }
            ).catch(
                er => er.response.status === 404 ? setShow(true) : ""
            )
        } else {
            setShow(true)
        }
    }
    const editExpenses = () => {
        if (amountEdit !== '' && textEdit !== '' && paymentsNameEdit !== '' && urlImgEdit !== '' && dateEdit !== '') {
            axios.put('/payments/v1/expense', {
                amount: parseInt(amountEdit, 10),
                description: textEdit,
                id: editData.id,
                name: paymentsNameEdit,
                receipt: urlImgEdit === editData.receipt.base64EncodedPhoto ? `data:image/png;base64 , ${urlImgEdit}` : urlImgEdit,
                receiptPaymentDate: dateEdit
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("item")}`,
                },
            }
            ).then(res => {
                return (
                    res.request.status === 201 ?
                        (
                            setShowSecond(true),
                            setEditBool(false),
                            setTimeout(() => {
                                RefData()
                            }, 200)
                        ) : ""

                )
            }
            )
        } else (
            setShow(true)
        )
    }
    const openPhoto = (e, item) => {
        setOpenPhote(true)
        setPhoto(item)
    }
    const renderPagination = () => {
        const activePage = currentPage;
        const itemss = [];
        console.log(totalPage);

        for (let pageNumber = 0; pageNumber < totalPage; pageNumber++) {
            itemss.push(
                <Pagination.Item
                    key={pageNumber}
                    active={pageNumber === activePage}
                    onClick={() => handlePageClick(pageNumber)}
                >
                    {pageNumber + 1}
                </Pagination.Item>
            );
        }
        return (
            <div className="d-flex justify-content-center mt-5 align-items-center">
                <Pagination>{itemss}</Pagination>
            </div>
        );
    }
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <ExpensesMain>
            <Toast className="snackbar" onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Body className="bg-danger">Məlumatlar ya səhv doldurulub ya da boş saxlanılıb!</Toast.Body>
            </Toast>
            <Toast className="snackbar" onClose={() => setShowSecond(false)} show={showSecond} delay={3000} autohide>
                <Toast.Body className="bg-success">Uğurla yadda saxlanıldı</Toast.Body>
            </Toast>
            {editBool ?
                <form className="row form_show g-3 mx-5 rounded mt-5">
                    <div className="col-12">
                        <p className="formtitle text">Xərc daxil edin</p>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="validationDefault01" className="title text form-label">Xərc dəyəri</label>
                        <input onChange={e => setAmountEdit(e.target.value)} placeholder="Xərcin ödənişi" type="text" value={amountEdit} className="form-control input_form" id="validationDefault01" required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="validationDefaultUsername" className="title text form-label">Tarix</label>
                        <div className="input-group">
                            <input onChange={e => setdateEdit(e.target.value)} type="date" value={dateEdit} className="form-control input_form" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="validationDefault02" className="title text form-label">Xərcin adı</label>
                        <input onChange={e => setPaymentsNameEdit(e.target.value)} placeholder="Xərcin adı" type="text" value={paymentsNameEdit} className="form-control input_form" id="validationDefault02" required />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="validationDefault03" className="title text form-label">Mətn</label>
                        <input onChange={e => setTextEdit(e.target.value)} placeholder="Kartın sahibini daxil edin" type="text" value={textEdit} className="form-control input_form" id="validationDefault03" required />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="validationDefault05" className="title text form-label"> Şəkil</label>
                        <input type="file" accept=".jpg,.png" value={''} onChange={uploadPhotoEdit} className="form-control input_form" id="validationDefault05" required />
                    </div>
                    <div className="col-md-6">
                        <img src={urlImgEdit === editData.receipt.base64EncodedPhoto ? `data:image/png;base64 , ${urlImgEdit}` : urlImgEdit} alt="upload" style={{ width: "90px", height: "90px", display: "block", margin: "5px auto" }} />
                    </div>
                    <div className="col-12 mb-5 mt-5">
                        <button className="btn templet_button float-end" onClick={editExpenses} type="submit">Yadda Saxla</button>
                        <button className="btn cancel_button me-3 float-end" onClick={() => setEditBool(false)} type="submit">Geri qayıt</button>
                    </div>
                </form> :
                <form className="row form_show g-3 mx-5 rounded mt-5">
                    <div className="col-12">
                        <p className="formtitle text">Xərc daxil edin</p>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="validationDefault01" className="title text form-label">Xərc dəyəri</label>
                        <input onChange={e => setAmount(e.target.value)} placeholder="Xərcin ödənişi" type="text" value={amount} className="form-control input_form" id="validationDefault01" required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="validationDefaultUsername" className="title text form-label">Tarix</label>
                        <div className="input-group">
                            <input onChange={e => setdate(e.target.value)} type="date" value={date} className="form-control input_form" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="validationDefault02" className="title text form-label">Xərcin adı</label>
                        <input onChange={e => setPaymentsName(e.target.value)} placeholder="Xərcin adı" type="text" value={paymentsName} className="form-control input_form" id="validationDefault02" required />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="validationDefault03" className="title text form-label">Mətn</label>
                        <input onChange={e => setText(e.target.value)} placeholder="Kartın sahibini daxil edin" type="text" value={text} className="form-control input_form" id="validationDefault03" required />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="validationDefault05" className="title text form-label"> Şəkil</label>
                        <input type="file" accept=".jpg,.png" value={''} onChange={uploadPhoto} className="form-control input_form" id="validationDefault05" required />
                    </div>
                    <div className="col-md-6">
                        {urlImg === '' ? '' : <img src={urlImg} alt="upload" style={{ width: "90px", height: "90px", display: "block", margin: "5px auto" }} />}
                    </div>
                    <div className="col-12 mb-5">
                        <button className="btn templet_button float-end" onClick={addExpenses} type="submit">Daxil et</button>
                    </div>
                </form>
            }
            <div className="mx-5 mt-5 table-responsive-xl">
                <p className="my-5 fs-4 text">Xərclər</p>

                <table className="table table-bordered border form_show">
                    <thead className="t_head">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Foto</th>
                            <th scope="col">Məbləğ</th>
                            <th scope="col">Xərcin Adı</th>
                            <th scope="col">Mətn</th>
                            <th scope="col">Xərcin tarixi</th>
                            <th scope="col">Redaktə</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{item.id}</th>
                                    <td><img alt={item.cardName} src={`data:image/png;base64 , ${item?.receipt.base64EncodedPhoto}`} style={{ width: "45px", height: "45px", cursor: "pointer" }} onClick={e => openPhoto(e, item.receipt.base64EncodedPhoto)} /></td>
                                    <td>{item.amount} AZN</td>
                                    <td>{item.name} </td>
                                    <td>{item.description}</td>
                                    <td>{item.receiptPaymentDate}</td>
                                    <td><p onClick={e => handleEdit(e, item)} className="edit_button text bg-warning">Redaktə</p></td>
                                </tr>

                            )
                        })
                        }

                        {
                            openPhotos ?
                                <FullScreen>
                                    <div className="open_photo">
                                        <p onClick={() => setOpenPhote(false)} style={{ font: "400 20px tahoma", padding: "7px 7px", margin: "0 auto", cursor: "pointer" }}>x</p>
                                        <img style={{ width: "440px", height: "440px", margin: "0 auto" }} alt="moto" src={`data:image/png;base64 , ${photos}`} />
                                    </div>
                                </FullScreen> : ""
                        }
                    </tbody>
                </table>
            </div>
            {renderPagination()}
        </ExpensesMain>
    )
}

export default Expenses;
