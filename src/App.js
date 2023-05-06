import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, Routes } from 'react-router-dom';
import 'bootstrap';
import { NavDiv } from './App.style';
import Payments from './payments/Payments';
import Students from './students/Students';
import Courses from './courses/Courses';
import Expenses from './expenses/Expenses';
import Login from './login/Login'


function App() {

      const handleExit = () =>{
        localStorage.clear();
        window.location.reload()
      }

      const headerapp = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("item")}`,
        }}

        if(localStorage.item === undefined) return <Login/> ;
        else{ 
          return(
      <div style={{background:"#def2f1"}}>
        <header >
        <NavDiv className="navbar navbar-expand-lg navbar-light ">
          <div className="container-fluid">
            <Link className="navbar-brand logo" to={'/'}><img alt='logo' style={{width:"60px", height:"60px", marginLeft:"30px"}} src='http://payments.ingress.academy/ingress.jpg'/></Link>
            <button className="navbar-toggler hamburger" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon color-light"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">

                <li className="nav-item">
                  <Link className="nav-link link" to={'/'}>Ödənişlər</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link link" to={'/students'}>Tələbələr</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link link" to={'/courses'}>Kurslar</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link link" to={'/expenses'}>Xərclər</Link>
                </li>

              </ul>
            </div>
              <button style={{cursor:"pointer"}} className='btn exit btn-warning float-end me-5' onClick={handleExit}>Çıxış</button>
          </div>
        </NavDiv>
      </header>
      <Routes>
        <Route path='/' element={<Payments headerapp={headerapp}/>} />
        <Route path='/students' element={<Students headerapp={headerapp} />} />
        <Route path='/courses' element={<Courses headerapp={headerapp}/>} />
        <Route path='/expenses' element={<Expenses headerapp={headerapp}/>} />
      </Routes>
      </div>)
        }
       
}



export default App;
