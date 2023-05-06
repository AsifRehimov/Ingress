import styled from "styled-components";

export const ExpensesMain = styled.div`

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