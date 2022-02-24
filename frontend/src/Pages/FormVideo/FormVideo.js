import React, { useState, useCallback } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, courseCreate, getCourses, getCoursesTeacher } from "../../Actions/courses.actions";
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
import { getUserCredentials } from "../../Actions/login.actions";




function FormVideo() {
    let navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const dispatch = useDispatch();
    const { courses } = useSelector(state => state.courses);
    const [fileUploadLink, setFileUploadLink] = useState('');
    console.log(courses)
    const teacherCourses = useSelector(state => state.courses.courses);
    console.log(teacherCourses);
    const { userCredentials } = useSelector(state => state?.login);


    /* const setFileUploadedLinkCb = useCallback((val) => {
        setFileUploadLink(prevFileUploadLink => val)
        console.log(val)
    }, []) */

   /*  const coursesToOrder = teacherCourses.map((course) => {
        return {
            id: course.id,
            name: course.name,
        };
    });
    const orderedCourses = coursesToOrder.sort((a, b) =>
        a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    );
 */

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
        if (e.target.name === "title") {
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
        } else {
            MySwal.fire({
                position: "center-center",
                icon: "success",
                title: "Video creado con exito",
                showConfirmButton: false,
                timer: 2500,
            })
            navigate(-1);
        };
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
                showConfirmButton: false,x
                timer: 2500,
            }); */
        dispatch(createVideo(form))
    }

   /*  useEffect(() => {
        console.log(fileUploadLink)
        if (fileUploadLink !== "") {
            setForm({
                ...form,
                url: fileUploadLink
            })
        }
        return () => {
        }
    }, [fileUploadLink]) */
    useEffect(() => {
        dispatch(getCategories({}))
        dispatch(getUserCredentials());
        /* dispatch(getCourses({})) */
        dispatch(getCoursesTeacher(userCredentials.id));
    }, [])
    console.log(teacherCourses)
    console.log(userCredentials)

    useEffect(() => {
	}, [dispatch]);



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
                            teacherCourses.map((e) => {
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
                <div className="inputDiv">
                        <label>VideoURL</label>
                        <input
                            name="url"
                            type="text"
                            placeholder="Url..."
                            value={form.url}
                            onChange={handleChange}
                        />
                    </div>
                {/* <FileUploader maxFileSize={100000000} acceptedTypes={["video/*"]} fileUploadResponse={setFileUploadedLinkCb} /> */}
                
                <button type="button" onClick={handleClick} className="createBtn">CREATE</button>


            </form>
            <div className="homeBtn">
                <Button
                    btnVariant={'raised'}
                    text={'Volver atras'}
                    link={`/profile`}
                >
                </Button>
            </div>
        </div>
    )
}

export default FormVideo;