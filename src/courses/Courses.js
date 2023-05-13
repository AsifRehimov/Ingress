import { useCallback, useEffect, useState } from "react";
import { CoursesMain, FullScreen } from "./Courses.style";
import axios from "axios";
import { Pagination } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';



function Courses() {

    const [connectStudent, setconnectStudent] = useState('')
    const [addcourse, setAddCourse] = useState('')
    const [data, setData] = useState([])
    const [dataforAdd, setDataforAdd] = useState([])
    const [courseSearch, setCourseSearch] = useState('')
    const [editCourse, setEditCourse] = useState('')
    const [change, setChange] = useState(0)
    const [editId, setEditId] = useState()
    const [editBoolen, setEditBoolen] = useState(false)
    const [show, setShow] = useState(false);
    const [showSecond, setShowSecond] = useState(false);
    const [showThird, setShowThird] = useState(false);
    const [search, setSearch] = useState(0)
    const [student, setStudent] = useState(false)
    const [studentItem, setStudentItem] = useState()
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalpages] = useState();
    const [filterData, setFilterData] = useState();

    useEffect(() => {
            axios.get(`/payments/v1/courses/all`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("item")}`,
                },
            }
            ).then(res => {
                return (
                    setDataforAdd(res.data.content)
                )
            }
            )
                .catch(er => console.log(er))
        },[])

        const RefData = useCallback(() => { if (search === 0) {
             axios.get(`/payments/v1/courses/all?page=${currentPage}&size=5`, {
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
         } else {
             const url = `/payments/v1/courses/?name=${courseSearch}&page=${currentPage}&size=5`
 
             axios.get(url, {
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
         }}, [courseSearch, search, currentPage])
    useEffect(() => {
        RefData()
    }, [RefData])

    const handleSearch = () => {

        setSearch(1)

    }


    const handleAddCourse = () => {
       if(addcourse !== ""){axios.put('/payments/v1/courses',
            {
                name: addcourse
            }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("item")}`,
            }
        }).then( res =>{
            return(
                res.request.status === 201 ?
                (setTimeout(() => {
                RefData()
            }, 200),
            setAddCourse(''),
            setShowSecond(true)): "",
            console.log(res.request)
            
            )}
        )}else{
            setShow(true)
        }
    }

    const handleEnable = (e, item) => {
        let answe ;
        if(item.isEnable === true)  {answe = "disable"}
        else answe = "enable"
        axios.post(`/payments/v1/courses/${item.id }/${answe}`, {
         
            // id: item.id,
            // accounts: item.accounts,
            // name: item.name,
            // slackResponse:null,
            // isEnable: false ,
        
        header:{
                'Authorization': `Bearer ${localStorage.getItem("item")}`,
                'Content-Type': "application/json"
                    }
            })
    }
    const handleEdit = (e, item) => {
        console.log(item, e);
        setEditBoolen(true)
        setEditCourse(item?.name)
        setEditId(item?.id)
    }

    const handleEditSave = () => {
        if (editCourse !== '') {
            
            axios.put('/payments/v1/courses',
    
                {
                    id: editId,
                    name: editCourse
                }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("item")}`,
                }
            }).then( res =>{
                return(
                    res.request.status === 201 ?
                    (setTimeout(() => {
                    RefData()
                }, 200)): "",
                res.request.status === 201 ? setEditBoolen(false) : "",
                res.request.status === 201 ? setShowSecond(true) : "",
                console.log(res.request)
                
                )}
            ).catch(er => er.response.status === 404 ? setShow(true) : "")
        } else{
            setShow(true)
        }

    }
    const handleConndent = (e) => {
        e.preventDefault()
        if(connectStudent.length === 12 && change !== 0)
        {axios.post(`/payments/v1/courses/add-student/?username=${connectStudent}&courseId=${change}`,
        {
            id: parseInt(change, 10),
            name:[filterData].name,
            isEnable: [filterData].isEnable
        },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("item")}`
                }
            }).then( res =>{
                return(
                    res.request.status === 200 ?
                    (setTimeout(() => {
                    RefData()
                }, 200),
                setChange(0),
                setconnectStudent(''),
                setShowSecond(true)): ""
                
                )}
            ).catch(er => er.response.status === 404 ? setShow(true) : "")} else{
                setShow(true)
            }
        dataforAdd.filter(x =>{
             
                return(x.id === parseInt(change, 10) ? setFilterData(x) : "")
            
        })
        console.log(connectStudent, change, filterData);


    };

    const lookStudent = (e, item) => {
        e.preventDefault();
        setStudent(true)
        setStudentItem(item)
    }
    const handleDelete = (e, item) => {
        axios.delete(`/payments/v1/courses/delete-student/?username=${item.username}&courseId=${studentItem.id}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("item")}`,
                }
            }).then(
                res => {
                    return(
                        res.request.status === 200 ? 
                        (setTimeout(() => {
                            RefData()
                        }, 200),
                        setStudent(false),
                        setShowSecond(true)
                        ) : ""
                    )
                }
            )

    }
    const renderPagination = () => {
        const activePage = currentPage ;
        const itemss = [];
    
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
        <div>
            {student ? <FullScreen className="student">
                <div className="divdrop">
                    <div className="title_div text">
                        {studentItem.name} kursunun tələbələri
                        <span className="close" onClick={() => setStudent(false)}>x</span>
                    </div>
                    <div style={{ width: "80%", height: "200px", overflowY: "scroll", margin: "10px auto" }}>
                        <table className="table border table-bordered mx-auto" data-bs-config='static' style={{ width: "100%", display: "table" }}>
                            <thead className="t_head" >
                                <tr >
                                    <th scope="col">№</th>
                                    <th scope="col">Ad</th>
                                    <th scope="col">Soyad</th>
                                    <th scope="col">Nömrə</th>
                                    <th scope="col">Sil</th>
                                </tr>
                            </thead>

                            <tbody >
                                {
                                    ((studentItem.accounts).map((item, index) => {
                                        return (
                                            <tr key={index} style={{ width: "100%" }}>
                                                <th scope="row">{item?.id}</th>
                                                <td>{item?.accountName}</td>
                                                <td>{item?.surname}</td>
                                                <td>{item?.username}</td>
                                                <td><p onClick={e => handleDelete(e, item)} className="cancel_button bg-danger">Sil</p></td>
                                            </tr>
                                        )
                                    }))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </FullScreen>
                : ""}
            <CoursesMain>
            <Toast className="snackbar" onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Body className="bg-danger">Məlumatlar ya səhv doldurulub ya da boş saxlanılıb!</Toast.Body>
            </Toast>
            <Toast className="snackbar" onClose={() => setShowSecond(false)} show={showSecond} delay={3000} autohide>
                <Toast.Body className="bg-success">Uğurla yadda saxlanıldı</Toast.Body>
            </Toast>
            <Toast className="snackbar" onClose={() => setShowThird(false)} show={showThird} delay={3000} autohide>
                <Toast.Body className="bg-success">Uğurla silindi !</Toast.Body>
            </Toast>
                <form className="row g-3 mx-5 mt-5">
                    {editBoolen ?
                        <div className="col-md-4 form_show rounded">
                            <div className="col-12">
                                <p className="formtitle text">Kurs daxil edin</p>
                            </div>
                            <div className="col-md-10  ms-5">
                                <input onChange={e => setEditCourse(e.target.value)} placeholder="Kursun adı" type="text" value={editCourse} className="form-control input_form" id="validationDefault01" required />
                            </div>
                            <div className="addcourse">
                                <button className="btn cancel_button float-end me-3" onClick={() => setEditBoolen(false)} type="submit">Geri qayit</button>
                                <button className="btn templet_button float-end" onClick={handleEditSave} type="submit">Daxil et</button>
                            </div>
                        </div> :
                        <div className="col-md-4 form_show rounded">
                            <div className="col-12">
                                <p className="formtitle text">Kurs daxil edin</p>
                            </div>
                            <div className="col-md-10  ms-5">
                                <input onChange={e => setAddCourse(e.target.value)} placeholder="Kursun adı" type="text" value={addcourse} className="form-control input_form" id="validationDefault01" required />
                            </div>
                            <div className="addcourse">
                                <button className="btn templet_button float-end" onClick={handleAddCourse} type="submit">Daxil et</button>
                            </div>
                        </div>
                    }
                    <div className="col-md-7 ms-5 form_show rounded">
                        <div className="col-12">
                            <p className="formtitle text text">Tələbəni kursa əlavə edin</p>
                        </div>
                        <div className="col-md-6 ms-3 float-start ">
                            <input onChange={e => setconnectStudent(e.target.value)} placeholder="Tələbənin nömrəsi" type="number" value={connectStudent} className="form-control input_form" id="validationDefault01" required />
                        </div>
                        <div className="col-md-5 float-end me-3">
                            <select onChange={e => setChange(e.target.value)} value={change} className="form-select input_form col-md-6 " aria-label=".form-select-lg example">
                                <option selected value="" >Kursu seçin</option>
                                {dataforAdd.map((index, key) => {
                                    return (<option key={key} value={index.id}>{index?.name}</option>)
                                })}

                            </select>
                        </div>
                        <div className="addcourse">
                            <button className="btn templet_button float-end" onClick={handleConndent} >Daxil et</button>
                        </div>
                    </div>
                </form>

                <div className="mx-5 mt-5 table-responsive-xl">
                    <p className="my-5 text fs-4">Kurslar</p>
                    <div className="input-group col-md-3 float-end">
                        <input type="text" className=" ps-3 border-0 input_form col-md-3 mb-4" value={courseSearch} onChange={e => setCourseSearch(e.target.value)} placeholder="Kursun adı" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button className="btn templet_button shadow mb-4" onClick={handleSearch} type="button" id="button-addon2">Axtar</button>
                    </div>

                    <table className="table table-bordered border">
                        <thead className="t_head">
                            <tr>
                                <th scope="col">№</th>
                                <th scope="col">Kurs</th>
                                <th scope="col">Aç/Bağla</th>
                                <th scope="col">Redaktə</th>
                                <th scope="col">Tələbələr</th>
                            </tr>
                        </thead>
                        <tbody>
                            {search === 0 ?
                                (data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{item?.id}</th>
                                            <td>{item?.name}</td>
                                            <td><div className="form-check form-switch " ><input onChange={e => handleEnable(e, item)} className="form-check-input mx-auto" type="checkbox" id="flexSwitchCheckChecked" checked={item?.isEnable} /></div></td>
                                            <td><p onClick={e => handleEdit(e, item)} className="edit_button text bg-warning">Redaktə</p></td>
                                            <td><p onClick={e => lookStudent(e, item)} className="edit_button  text bg-primary">Tələblər</p></td>
                                        </tr>
                                    )
                                })) : ([data].map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{item?.id}</th>
                                            <td>{item?.name}</td>
                                            <td><input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked /></td>
                                            <td><p onClick={e => handleEdit(e, item)} className="edit_button text bg-warning">Redaktə</p></td>
                                            <td><p onClick={e => lookStudent(e, item)} className="edit_button text bg-primary">Tələbələr</p></td>
                                        </tr>
                                    )
                                }))}
                        </tbody>
                    </table>
                </div>
            {renderPagination()}

            </CoursesMain >


        </div>)
}

export default Courses;
