import { useCallback, useEffect, useState } from "react";
import { StudentsMain } from "./Students.style";
import axios from "axios";
import { Pagination } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';


function Students() {

    const [number, setNumber] = useState('')
    const [numberEdit, setNumberEdit] = useState('')
    const [email, setEmail] = useState('')
    const [emailEdit, setEmailEdit] = useState('')
    const [name, setName] = useState('')
    const [nameEdit, setNameEdit] = useState('')
    const [surname, setSurname] = useState('')
    const [surnameEdit, setSurnameEdit] = useState('')
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(false)
    const [editId, setEditId] = useState()
    const [numberSearch, setNumberSearch] = useState('')
    const [search, setSearch] = useState(0)
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalpages] = useState();
    const [show, setShow] = useState(false);
    const [showSecond, setShowSecond] = useState(false);

    const RefData = useCallback(() => {
        if (search === 0) {
            axios.get(`/payments/v1/accounts/all?page=${currentPage}&size=5`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("item")}`,
                },


            }
            ).then(res => {
                return (
                    setTotalpages(res.data.totalPages),
                    setData(res.data.content)
                )
            }
            )
                .catch(er => console.log(er))
        } else {
            console.log(numberSearch === "");
            const url = `/payments/v1/accounts/?username=${numberSearch}&page=${currentPage}&size=5`

            axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("item")}`,
                },


            }
            ).then(res => {
                return (
                    setTotalpages(res.data.totalPages),
                    setData(res.data.content)
                )
            }
            )
                .catch(er => console.log(er))
        }
    }, [currentPage, search, numberSearch])
    useEffect(() => {
        RefData()

    }, [RefData])



    const handleSearch = () => {

        setSearch(1)

    }

    const handleEdit = (e, item) => {
        console.log(item, e);
        setEdit(true)
        setEditId(item.id)
        setNumberEdit(item.username.substring(3))
        setEmailEdit(item.email)
        setNameEdit(item.accountName)
        setSurnameEdit(item.surname)
    }

    const handleAdd = () => {
        if (number.length === 9 && email !== "" && surname !== "" && name !== "") {
            axios.put('/payments/v1/accounts',
                {
                    accountName: name,
                    email: email,
                    surname: surname,
                    username: 994 + number
                }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("item")}`,
                }
            }).then(
                    setShowSecond(true),
                    setNumber(''),
                    setEmail(''),
                    setSurname(''),
                    setName('')
            ).catch(
                // window.location.reload()
            )

        } else {
            setShow(true)
        }
        setTimeout(() => {
            RefData()
        }, 200);
    }


    const handleSave = () => {
        setTimeout(() => {
            RefData()
        }, 200);
        if (numberEdit.length === 9 && emailEdit !== "" && surnameEdit !== "" && nameEdit !== "") {
            axios.put('/payments/v1/accounts',

                {
                    accountName: nameEdit,
                    email: emailEdit,
                    id: editId,
                    surname: surnameEdit,
                    username: 994 + numberEdit
                }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("item")}`,
                }
            }).then(res => {
                return (
                    setShowSecond(true),
                    setEdit(false)
                )
            }
            ).catch(
                // window.location.reload()
            )
        } else {
            setShow(true)
        }
    }
    const renderPagination = () => {
        const activePage = currentPage;
        const itemss = [];

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
        <StudentsMain>
            <Toast className="snackbar" onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Body className="bg-danger">Məlumatlar ya səhv doldurulub ya da boş saxlanılıb!          </Toast.Body>
            </Toast>
            <Toast className="snackbar" onClose={() => setShowSecond(false)} show={showSecond} delay={3000} autohide>
                <Toast.Body className="bg-success">Uğurla yadda saxlanıldı</Toast.Body>
            </Toast>
            {edit ?
                (<form className="row form_show g-3 mx-5 rounded mt-5">
                    <div className="col-12">
                        <p className="formtitle text">Tələbəni Redaktə Et</p>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="validationDefault01" className="title text form-label text">Email</label>
                        <input onChange={e => setEmailEdit(e.target.value)} placeholder="Emaili daxil edin" type="text" value={emailEdit} className="form-control input_form" id="validationDefault01" required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="validationDefaultUsername" className="title text form-label">Mobil Nömrə</label>
                        <div className="input-group">
                            <span className="input-group-text text shadow" id="basic-addon1">+994</span>
                            <input onChange={e => setNumberEdit(e.target.value)} type="number" placeholder="Nömrəni daxil edin" value={numberEdit} className="form-control input_form" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="validationDefault02" className="title text form-label">Adı</label>
                        <input onChange={e => setNameEdit(e.target.value)} placeholder="Tələbənin adı" type="text" value={nameEdit} className="form-control input_form" id="validationDefault02" required />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="validationDefault03" className="title text form-label">Soyad</label>
                        <input onChange={e => setSurnameEdit(e.target.value)} placeholder="Tələbənin soyadı" type="text" value={surnameEdit} className="form-control input_form" id="validationDefault03" required />
                    </div>


                    <div className="col-12 mb-5">
                        <p className="btn templet_button float-end" onClick={handleSave} type="submit">Yadda saxla</p>
                        <button className="btn cancel_button float-end me-3" onClick={() => setEdit(false)} type="submit">Geri qayit</button>
                    </div>
                </form>

                ) :
                <form className="row form_show g-3 mx-5 rounded mt-5">
                    <div className="col-12">
                        <p className="formtitle text">Tələbəni daxil edin</p>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="validationDefault01" className="title text form-label">Email</label>
                        <input onChange={e => setEmail(e.target.value)} placeholder="Emaili daxil edin" type="text" value={email} className="form-control input_form" id="validationDefault01" required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="validationDefaultUsername" className="title text form-label">Mobil Nömrə</label>
                        <div className="input-group">
                            <span className="input-group-text shadow text" id="basic-addon1">+994</span>
                            <input onChange={e => setNumber(e.target.value)} max="13" type="number" placeholder="Nömrəni daxil edin" value={number} className="form-control input_form" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="validationDefault02" className="title text form-label">Adı</label>
                        <input onChange={e => setName(e.target.value)} placeholder="Tələbənin adı" type="text" value={name} className="form-control input_form" id="validationDefault02" required />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="validationDefault03" className="title text form-label">Soyad</label>
                        <input onChange={e => setSurname(e.target.value)} placeholder="Tələbənin soyadı" type="text" value={surname} className="form-control input_form" id="validationDefault03" required />
                    </div>


                    <div className="col-12 mb-5">
                        <p className="btn templet_button float-end" onClick={handleAdd} type="submit">Daxil et</p>
                    </div>
                </form>
            }
            <div className="mx-5 mt-5 table-responsive-xl">
                <p className="my-5 text fs-4">Tələbələr</p>
                <div className="input-group col-md-3 mb-5 float-end">
                    <input type="number" value={numberSearch} onChange={e => setNumberSearch(e.target.value)} className=" ps-3 border-0 input_form col-md-3 mb-4" placeholder="Tələbənin əlaqə nömrəsi" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button className="btn templet_button shadow mb-4" onClick={handleSearch} type="button" id="button-addon2">Axtar</button>
                </div>

                <table className="table table-bordered border  form_show ">
                    <thead className=" t_head">
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Ad</th>
                            <th scope="col">Soyad</th>
                            <th scope="col">Email</th>
                            <th scope="col">Nömrə</th>
                            <th scope="col">Redaktə</th>
                        </tr>
                    </thead>
                    <tbody>
                        {search === 0 ?
                            (data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.accountName}</td>
                                        <td>{item.surname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.username}</td>
                                        <td><p style={{ cursor: "pointer" }} onClick={e => handleEdit(e, item)} className="edit_button text bg-warning">Redaktə</p></td>
                                    </tr>
                                )
                            })) : ([data].map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.accountName}</td>
                                        <td>{item.surname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.username}</td>
                                        <td><p style={{ cursor: "pointer" }} onClick={e => handleEdit(e, item)} className="edit_button text bg-warning">Redaktə</p></td>
                                    </tr>
                                )
                            }))}
                    </tbody>
                </table>
            </div>
            {renderPagination()}

        </StudentsMain >
    )
}

export default Students;
