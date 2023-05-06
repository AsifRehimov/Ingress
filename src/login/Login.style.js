import styled from "styled-components";

export const LoginDiv = styled.div`
    background-color: #def2f1;
    margin: 0;
    display: block;
    padding: 100px;
.formdiv{
    display: block;
    margin: 50px auto;
    border-radius: 5px;
    width: 250px;
    height: 350px;
}
.form_title{
    width:fit-content ;
    margin: 30px auto;
    font: 500 23px tahoma;
    padding-top: 20px;
}
.login_title{
    margin: 0 0 0 20px;
    font: 300 18px tahoma;
}
.login_input{
    margin: 5px 0 5px 20px;
    width: 210px;
    height: 30px;
    padding: 0 10px;
}
.enter{
    width: fit-content;
    height: 30px;
    border-radius: 5px;
    background-color: green;
    display: flex;
    margin: 40px 0 0 160px;
    padding: 5px 10px;
    font: 300 18px tahoma;
    cursor: pointer;
}
.error{
    margin: 15px auto;
    width: fit-content;
    font: 300 18px tahoma;
    color: red;
}


.templet_button{
    background: #2b7a78;
    border-radius: 20px;
    color: white;
    font-family: bahnschrift;
}
.templet_button:hover{
    background: #3aafa9;
}
.cancel_button{
    background: #eca0a8;
    border-radius: 20px;
    color: white;
}
.text{
    color: #17252a;
    font-family: bahnschrift;
}
.form_show{
    box-shadow: 0 0 40px 0 #2b7a78;
}
.input_form{
    background: #feffff;
    border: 0;
    border-radius: 20px;
    box-shadow: #2b7a78 5px 5px 5px;
}
.snackbar{
    position: absolute;
    margin: -50px 0 0 40px;
    color:white;
}
`