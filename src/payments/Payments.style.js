import styled from "styled-components";

export const PaymentsMain = styled.div`

.formtitle{
    width: fit-content;
    margin: 20px auto;
    font: 400 25px tahoma;
}

.title{
    font: 400 20px Tahoma;
}
.edit_button{
    padding: 5px 10px;
    border-radius: 20px;
    /* text-align: center; */
    width: fit-content;
    margin:0;
    margin: auto;
    cursor: pointer;
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
.shadow{
    box-shadow: #2b7a78 5px 5px 5px !important;
}
.t_head{
    background-color: #2b7a78;
    color: #feffff;
    font-family: bahnschrift;
}
.border{
    border-color: #2b7a78 !important;
}
.snackbar{
    position: fixed;
    bottom: 40px;
    left:40px;
    color:white;
    z-index: 99;
}
`
export const FullScreen = styled.div`
    background-color: rgba(0,0,0,0.1);
    width: 100%;
    height: 100vh;
    display: block;
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    backdrop-filter: blur(5px);
    .open_photo{
    width: 500px;
    height: 500px;
    margin: 6% auto 0 auto;
    background: white;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 25px;
    display: grid;
    }
    `