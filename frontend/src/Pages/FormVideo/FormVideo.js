import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, courseCreate, getCourses } from "../../Actions/courses.actions";
import Button from "../../Components/Buttons/Buttons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import '../FormCreate/FormCreate.css'
import { createVideo } from "../../Actions/videos.actions";
import FileUploader from "../../Components/FileUploader/FileUploader"



function FormVideo() {
    const dispatch = useDispatch();
    const { courses } = useSelector(state => state.courses);
    console.log(courses)



    let navigate = useNavigate();

    const MySwal = withReactContent(Swal);

    const coursesToOrder = courses.map((course) => {
        return {
            id: course.id,
            name: course.name,
        };
    });
    const orderedCourses = coursesToOrder.sort((a, b) =>
        a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    );


    const [form, setForm] = useState({
        title: "",
        description: "",
        url: "",
        cursoId: "",
        img: ""
    });


    const [errores, setErrores] = useState({
        title: "",
        curso: "",
    })

    const validateTitle = (title) => {
        if (!title) {
            setErrores({
                ...errores,
                title: "Debe ingresar un titulo"
            })
        } else {
            setErrores({
                errores,
                title: ""
            })
        }
    }



    const handleBlur = (e) => {
        if(e.target.name === "title"){
            validateTitle(e.target.value)
        }
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }


    const handleChange = (e) => {
        if (e.target.name === "title") {
            validateTitle(e.target.value)
        }
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelect = (e) => {
        console.log(e);
        console.log(e.target.name);
        setForm({
            ...form,
            cursoId: e.target.value
        })
    }

    const handleClick = (e) => {
        
        e.preventDefault();
        if (form.title === "" || form.img === "" || form.cursoId === "") {
            MySwal.fire({
                position: "center-center",
                icon: "error",
                title: "Debe completar todos los campos",
                showConfirmButton: false,
                timer: 2500,
            });
            return;
        }
         else if (errores.title !== "") {
            MySwal.fire({
                position: "center-center",
                icon: "error",
                title: "Campos con errores",
                showConfirmButton: false,
                timer: 2500,
            });
            return;
        } else{
            MySwal.fire({
                position: "center-center",
                icon: "success",
                title: "Video creado con exito",
                showConfirmButton: false,
                timer: 2500,
            })};
        console.log(form)
        /* if (form.title === "" || form.description === "" ) {
            MySwal.fire({
                position: "center-center",
                icon: "error",
                title: "Debe completar todos los campos",
                showConfirmButton: false,
                timer: 2500,
            });
            return;
        }
         else if (errors.title !== "" || errors.description !== "") {
            MySwal.fire({
                position: "center-center",
                icon: "error",
                title: "Campos con errores",
                showConfirmButton: false,
                timer: 2500,
            });
            return;
        } else{
            MySwal.fire({
                position: "center-center",
                icon: "success",
                title: "Curso creado con exito",
                showConfirmButton: false,
                timer: 2500,
            }); */
        dispatch(createVideo(form))
    }


    useEffect((e) => {
        dispatch(getCategories({}))
        dispatch(getCourses({}))
    }, [dispatch])

    return (
        <div className='formContainer'>
            <form className="realForm">
                <h1>Crear Video</h1>
                <div>
                    <div className="inputDiv">
                        <label>Titulo Del Video</label>
                        <input
                            name="title"
                            type="text"
                            placeholder="Nombre..."
                            value={form.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errores.title !== "" ? <p className="danger">{errores.title}</p> : null}
                    </div>
                    <div className="inputDiv">
                        <label>Descripcion</label>
                        <input
                            name="description"
                            type="text"
                            placeholder="Descripcion..."
                            value={form.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inputDiv">
                        <label>Imagen</label>
                        <input
                            name="img"
                            type="text"
                            placeholder="Imagen..."
                            value={form.img}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <select onChange={handleSelect}>
                        <option selected value="">
                            Seleccione el curso
                        </option>
                        {
                            orderedCourses.map((e) => {
                                console.log(e.id)
                                return (
                                    <option name="cursoId" value={e.id}>
                                        {e.name}
                                    </option>
                                )
                            })
                        }

                    </select>
                    {errores.curso !== "" ? <p className="danger">{errores.curso}</p> : null}
                </div>
                <FileUploader maxFileSize={100000000} acceptedTypes={["video/*"]}/>
                <button type="button" onClick={handleClick} className="createBtn">CREATE</button>
              
                
            </form>
            <div className="homeBtn">
                <Button
                    type={'raised'}
                    text={<HomeIcon />}
                    link={'/home'}
                >
                </Button>
            </div>
        </div>
    )
}

export default FormVideo;