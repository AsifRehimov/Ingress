import { useCallback, useEffect, useState } from "react";
import { FullScreen, PaymentsMain } from "./Payments.style";
import axios from "axios";
import { Pagination } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';


function Payments() {

    const [data, setData] = useState([])
    const [dataStudent, setDataStudent] = useState([])
    const [courseData, setSourceData] = useState([])
    const [amount, setAmount] = useState('')
    const [checkStory, setCheckStory] = useState('')
    const [courseMonth, setCourseMonth] = useState('')
    const [course, setCourse] = useState('')
    const [student, setStudent] = useState('')
    const [checkPhoto, setCheckPhoto] = useState('')
    const [cart, setCart] = useState('')
    const [amountEdit, setAmountEdit] = useState('')
    const [checkStoryEdit, setCheckStoryEdit] = useState('')
    const [courseMonthEdit, setCourseMonthEdit] = useState('')
    const [courseEdit, setCourseEdit] = useState('')
    const [studentEdit, setStudentEdit] = useState('')
    const [checkPhotoEdit, setCheckPhotoEdit] = useState()
    const [cartEdit, setCartEdit] = useState('')
    const [search, setSearch] = useState(0)
    const [openPhotos, setOpenPhote] = useState(false)
    const [photos, setPhoto] = useState()
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [editData, setEditData] = useState()
    const [searchNumber, setSearchNumber] = useState('')
    const [editBool, setEditBool] = useState(false)
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalpages] = useState();
    const [show, setShow] = useState(false);
    const [showSecond, setShowSecond] = useState(false);


    useEffect(() => {
            axios.get('/payments/v1/accounts/all', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("item")}`,
                },


            }
            ).then(res => {
                return (
                    setDataStudent(res.data.content)
                )
            }
            )
                .catch(er => console.log(er))
        },[])
    useEffect(() => {
            axios.get('/payments/v1/courses/all/enable', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("item")}`,
                },


            }
            ).then(res => {
                return (
                    setSourceData(res.data.content)
                )
            }
            )
                .catch(er => console.log(er))
        },[])
        const RefData = useCallback(() => {
            if (search === 0) {
                axios.get(`/payments/v1/payments/all?page=${currentPage}&size=5`, {
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
            } else if( search === 1){
                const url = `/payments/v1/payments/filter?from=${fromDate}&to=${toDate}&page=${currentPage}&size=5`
    
                axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("item")}`,
                    },
    
    
                }
                ).then(res => {
                    return(
                        setTotalpages(res.data.totalPages),
                        setData(res.data.content)
                    )}
                )
                    .catch(er => console.log(er))
            
            } else {
                const url = `/payments/v1/payments/search?username=${searchNumber}&page=${currentPage}&size=5`
    
                axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("item")}`,
                    },
    
    
                }
                ).then(res => {
                    return(
                        setTotalpages(res.data.totalPages),
                        setData(res.data.content)
                    )}
                )
                    .catch(er => console.log(er))
            }
    },[search, fromDate, toDate, searchNumber, currentPage])
    useEffect(() => {
        RefData()
    }, [RefData])

    const handleEdit = (e, item) => {
        console.log(item, e);
        setEditBool(true)
        setEditData(item)
        setAmountEdit(item.amount)
        setCheckStoryEdit(item.receiptPaymentDate)
        setCourseMonthEdit(item.coursePaymentMonth)
        setCourseEdit(item.course.id)
        setStudentEdit(item.account.id)
        setCheckPhotoEdit(item?.receipt.base64EncodedPhoto )
        setCartEdit(item.cardName)    
      
    }
    const openPhoto = (e, item) => {
        setOpenPhote(true)
        setPhoto(item)
    }
    const handleSearch = () => {
        console.log(fromDate, toDate);
        (fromDate !=='' && toDate !=='') ? setSearch(1) : setSearch(0)
    }
    const addPayment = () => {
        if(student !=='' && amount !=='' && cart !== '' && course !== '' && courseMonth !== '' && checkPhoto !== '' && checkStory !== '')
        {axios.put('/payments/v1/payments', {
            accountId:student,
            amount:amount,
            cardName:cart,
            courseId:course,
            coursePaymentMonth:courseMonth,
            receipt:checkPhoto,
            receiptPaymentDate:checkStory
        },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("item")}`,
            },
        }
        ).then(
            setShowSecond(true),
            setStudent(''),
            setAmount(''),
            setCart(''),
            setCourse(''),
            setCourseMonth(''),
            setCheckPhoto(''),
            setCheckStory(''),
            setTimeout(() => {
                RefData()
            }, 200)
            ).catch(
                
                )}else{
                    setShow(true)
                }
              
            }
    const editPayment = () => {
        if(studentEdit !=='' && amountEdit !=='' && cartEdit !== '' && courseEdit !== '' && courseMonthEdit !== '' && checkPhotoEdit !== '' && checkStoryEdit !== '')
        
        { axios.put('/payments/v1/payments', {
            accountId:studentEdit,
            amount:amountEdit,
            cardName:cartEdit,
            courseId:courseEdit,
            coursePaymentMonth:courseMonthEdit,
            id: editData.id,
            receipt:checkPhotoEdit === editData.receipt.base64EncodedPhoto ? `data:image/png;base64 , ${checkPhotoEdit}` : checkPhotoEdit,
            receiptPaymentDate:checkStoryEdit
        },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("item")}`,
            },


        }
        ).then(
            setShowSecond(true),
            setEditBool(false),
            setTimeout(() => {
                RefData()
            }, 200)
            ).catch(
                )   
            } else{
                setShow(true)
            }   
        }
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
          setCheckPhoto(reader.result);
        };
    
        reader.readAsDataURL(file);
      };
    const handleFileInputChangeEdit = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
          setCheckPhotoEdit(reader.result);
        };
    
        reader.readAsDataURL(file);
      };
      const renderPagination = () => {
        const activePage = currentPage ;
        const itemss = [];
        console.log(totalPage);
    
        for (let pageNumber = 0; pageNumber < totalPage ; pageNumber++) {
          itemss.push(
            <Pagination.Item
              key={pageNumber}
              active={pageNumber === activePage  }
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber +1}
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
        <PaymentsMain>
                        <Toast className="snackbar" onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Body className="bg-danger">Məlumatlar ya səhv doldurulub ya da boş saxlanılıb!          </Toast.Body>
            </Toast>
            <Toast className="snackbar" onClose={() => setShowSecond(false)} show={showSecond} delay={3000} autohide>
                <Toast.Body className="bg-success">Uğurla yadda saxlanıldı</Toast.Body>
            </Toast>
            {
            editBool ?
             <form className="row form_show g-3 mx-5 rounded mt-5">
                <div className="col-12">
                    <p className="formtitle text">Ödəniş daxil edin</p>
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationDefault01" className="title text form-label">Məbləğ</label>
                    <input onChange={e => setAmountEdit(e.target.value)} placeholder="Dərsin ödənişi" type="text" value={amountEdit} className="form-control input_form" id="validationDefault01" required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationDefaultUsername" className="title text form-label">Çekin Tarixi</label>
                    <div className="input-group">
                        <input onChange={e => setCheckStoryEdit(e.target.value)} type="date" value={checkStoryEdit} className="form-control input_form" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required />
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationDefault02" className="title text form-label">Kursun Ayı</label>
                    <input onChange={e => setCourseMonthEdit(e.target.value)} placeholder="Ayı daxil et" type="text" value={courseMonthEdit} className="input_form form-control" id="validationDefault02" required />
                </div>

                <div className="col-md-6">
                    <label htmlFor="validationDefault03" className="title text form-label">Kursu</label>
                    <select onChange={e => setCourseEdit(e.target.value)} value={courseEdit} className="form-select col-md-6 input_form" aria-label=".form-select-lg example">
                                {/*<option selected value="" >Kursu seçin</option> */}
                                {courseData.map((index, key) => {
                                    return (<option key={key} value={index?.id}>{index?.name}</option>)
                                })}

                    </select>                
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationDefault03" className="title text form-label">Tələbə</label>
                    <select onChange={e => setStudentEdit(e.target.value)} value={studentEdit} className="form-select col-md-6 input_form" aria-label=".form-select-lg example">
                                {/*} <option selected value="" >Kursu seçin</option> */}
                                {dataStudent.map((index, key) => {
                                    return (<option key={key} value={index?.id}>{index?.accountName} {index?.surname}</option>)
                                })}

                    </select>
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationDefault05" className="title text form-label">Çekin Şəkli</label>
                    <input type="file" onChange={handleFileInputChangeEdit} accept=".jpg,.png" alt="saad" value={''} className="form-control input_form" id="validationDefault05" required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationDefault03" className="title text form-label">Kartın Sahib</label>
                    <input onChange={e => setCartEdit(e.target.value)} placeholder="Kartın sahibin daxil et" type="text" value={cartEdit} className="form-control input_form" id="validationDefault03" required />
                </div>
                <div className="col-md-6">
                    {<img alt="choose" src={checkPhotoEdit === editData.receipt.base64EncodedPhoto ? `data:image/png;base64 , ${checkPhotoEdit}` : checkPhotoEdit} style={{width:"90px", height:"90px", display:"block", margin:"5px auto"}}/>}
                </div >
                <div className="col-12 mb-5 mt-5">
                    <button className="btn templet_button float-end" onClick={editPayment}  type="submit">Daxil et</button>
                    <button className="btn cancel_button me-3 float-end" onClick={()=> setEditBool(false)}  type="submit">Geri qayıt</button>
                </div>
            </form> 
            :
            
            <form className="row form_show g-3 mx-5 rounded mt-5">
                <div className="col-12">
                    <p className="formtitle text">Ödəniş daxil edin</p>
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationDefault01" className="title text form-label">Məbləğ</label>
                    <input onChange={e => setAmount(e.target.value)} placeholder="Dərsin ödənişi" type="text" value={amount} className="form-control input_form" id="validationDefault01" required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationDefaultUsername" className="title text form-label">Çekin Tarixi</label>
                    <div className="input-group">
                        <input onChange={e => setCheckStory(e.target.value)} type="date" value={checkStory} className="form-control input_form" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required />
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationDefault02" className="title text form-label">Kursun Ayı</label>
                    <input onChange={e => setCourseMonth(e.target.value)} placeholder="Ayı daxil et" type="text" value={courseMonth} className="form-control input_form" id="validationDefault02" required />
                </div>

                <div className="col-md-6">
                    <label htmlFor="validationDefault03" className="title text form-label">Kursu</label>
                    <select onChange={e => setCourse(e.target.value)} value={course} className="form-select col-md-6 input_form" aria-label=".form-select-lg example">
                                <option selected value="" >Kursu seçin</option>
                                {courseData.map((index, key) => {
                                    return (<option key={key} value={index?.id}>{index?.name}</option>)
                                })}

                    </select>                
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationDefault03" className="title text form-label">Tələbə</label>
                    <select onChange={e => setStudent(e.target.value)} value={student} className="form-select col-md-6 input_form" aria-label=".form-select-lg example">
                                 <option selected value="" >Tələbəni seçin</option> 
                                {dataStudent.map((index, key) => {
                                    return (<option key={key} value={index?.id}>{index?.accountName} {index?.surname}</option>)
                                })}

                    </select>
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationDefault05" className="title text form-label">Çekin Şəkli</label>
                    <input type="file" onChange={handleFileInputChange} accept=".jpg,.png" alt="saad" value={''} className="form-control input_form" id="validationDefault05" required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationDefault03" className="title text form-label">Kartın Sahib</label>
                    <input onChange={e => setCart(e.target.value)} placeholder="Kartın sahibin daxil et" type="text" value={cart} className="form-control input_form" id="validationDefault03" required />
                </div>
                <div className="col-md-6">
                    {checkPhoto === "" ? "" :<img alt="choose" src={checkPhoto} style={{width:"90px", height:"90px", display:"block", margin:"5px auto"}}/>}
                </div >

                <div className="col-12 mb-5">
                    <button className="btn templet_button float-end" onClick={addPayment}  type="submit">Daxil et</button>
                </div>
            </form>}
            <div className="mx-5 mt-5 table-responsive-xl">
                <p className="my-5 fs-4 text">Ödənişlər</p>
                <div className="input-group  col-md-3 float-end">
                    <input type="text" onChange={e => setSearchNumber(e.target.value)} value={searchNumber} className="input_form ps-3 border-0 col-md-3 mb-4" placeholder="Kursun adı" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button className="btn shadow templet_button mb-4" onClick={() =>setSearch(3)} type="button" id="button-addon2">Axtar</button>
                </div>
                <div className="input-group mb-4 " style={{width:"400px"}}>
                    <input type="date" className="form-control input_form border-0 shadow" onChange={e => setFromDate(e.target.value)}/>
                    <input type="date" className="form-control border-0 shadow" onChange={e => setToDate(e.target.value)}/>
                    <button className="btn templet_button shadow" onClick={handleSearch} type="submit">Tarix (axtar)</button>
                </div>

                        <table className="table table-bordered border form_show mt-5 table-responsive-xl" >
                            <thead className=" t_head">
                                <tr>
                                    <th scope="col">№</th>
                                    <th scope="col">Çek</th>
                                    <th scope="col">Mebleğ</th>
                                    <th scope="col">Çekin tarixi</th>
                                    <th scope="col">Aylıq</th>
                                    <th scope="col">Kurs</th>
                                    <th scope="col">İstifadəçi</th>
                                    <th scope="col">Kartın sahibi</th>
                                    <th scope="col">Redaktə</th>
                                </tr>
                                
                            </thead>
                            <tbody>
                                {search === 0 ?
                                    (data.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{item.id}</th>
                                                <td><img alt={item.cardName} src={`data:image/png;base64 , ${item?.receipt.base64EncodedPhoto}`} style={{ width: "45px", height: "45px", cursor:"pointer"  }} onClick={e => openPhoto(e, item.receipt.base64EncodedPhoto)} /></td>
                                                <td>{item.amount} AZN</td>
                                                <td>{item.receiptPaymentDate}</td>
                                                <td>{item.coursePaymentMonth} ay</td>
                                                <td>{item.course.name} </td>
                                                <td>{item.account.accountName} {item.account.surname}</td>
                                                <td>{item.cardName}</td>
                                                <td><p onClick={e => handleEdit(e, item)} className="edit_button text bg-warning">Redaktə</p></td>
                                            </tr>

                                        )
                                    }))
                                    :
                                    (data.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{item.id}</th>
                                                <td>dvds{/*<img alt={item.cardName} src={`data:image/png;base64 , ${item?.receipt.base64EncodedPhoto}`} style={{ width: "45px", height: "45px" }} onClick={e => openPhoto(e, item.receipt.base64EncodedPhoto)} />*/}</td>
                                                <td>{item.amount} AZN</td>
                                                <td>{item.receiptPaymentDate}</td>
                                                <td>{item.coursePaymentMonth} ay</td>
                                                <td>dcds{/*{item?.course.name}*/}</td>
                                                <td>ds{/*{item?.account.accountName} {item?.account.surname}*/}</td>
                                                <td>{item.cardName}</td>
                                                <td><p onClick={e => handleEdit(e, item)} className="edit_button text bg-warning">Redaktə</p></td>
                                            </tr>
                                        )
                                    }))
                                }
                                
                                {
                                    openPhotos ?
                                        <FullScreen>
                                            <div className="open_photo">
                                                <p onClick={() => setOpenPhote(false)} style={{ font: "400 20px tahoma", padding: "7px 7px", margin: "0 auto" , cursor:"pointer" }}>x</p>
                                                <img style={{ width: "440px", height: "440px", margin: "0 auto"}} alt="moto" src={`data:image/png;base64 , ${photos}`} />
                                            </div>
                                        </FullScreen> : ""
                                }
                            </tbody>
                        </table>
                </div>
                        {renderPagination()}
                
        </PaymentsMain>
    )
}

export default Payments;
