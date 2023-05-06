import { useState } from "react";
import { LoginDiv } from "./Login.style";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from 'react-bootstrap/Toast';



export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    // const[error, setError] = useState(false)
    // const[status, setStatus] = useState(0)
    const navigate = useNavigate()
    const [show, setShow] = useState(false);


    const HandleClick = e => {
        e.preventDefault()
        console.log(username, password);
        axios.post('http://payments.ingress.academy/users2/auth/sign-in/', {

            username: username,
            password: password,
        }
        ).then(res => {
            return (
                navigate("/students"),
                localStorage.setItem("item", res.data.jwt),
                // console.log(res.data.jwt),
                window.location.reload()

            )
        })
            .catch(er => er.response.status === 404 ? setShow(true) : "")
    }

    return (
        <LoginDiv>
            <Toast className="snackbar" onClose={() => setShow(false)} show={show} delay={3000} autohide>

                <Toast.Body className="bg-danger">Məlumatlar ya səhv doldurulub ya da boş saxlanılıb!          </Toast.Body>
            </Toast>
            <form className="formdiv form_show">
                <p className="form_title text">Login</p>
                {/* {
                    error ? <p className="error">Username və ya Parol səhvdir</p>  :""
                } */}
                <p className="login_title text">Username</p>
                <input onChange={e => setUsername(e.target.value)} value={username} className="input_form login_input" />
                <p className="login_title text">Parol</p>
                <input type="password" onChange={e => setPassword(e.target.value)} value={password} className="input_form login_input" />
                <p className="enter templet_button" onClick={HandleClick}>Daxil ol</p>
            </form>
        </LoginDiv>
    )
}
