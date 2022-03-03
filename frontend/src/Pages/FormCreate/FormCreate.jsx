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
import './FormCreate.css';

function CreateForm() {

    let navigate = useNavigate();
	const MySwal = withReactContent(Swal);
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.courses);
    const { courses } = useSelector(state => state.courses);
    console.log(categories)

    const categoriesToOrder = categories.map((category) => {
		return {
			id: category.id,
			name: category.name,
		};
	});
	const orderedCategories = categoriesToOrder.sort((a, b) =>
		a.name > b.name ? 1 : a.name < b.name ? -1 : 0
	);
    

    const [form, setForm] = useState({
        name: "",
        description: "",
        email: "",
        img: "",
        price: "",
        category: []
    });


    const [errors, setErrors] = useState({
        name: "",
        email: "",
        price: "",
    })

    const validateName = (name) => {
        /*  console.log(name) */
        let coursesN = courses.map(e => e.name)
        if (coursesN.find(e => e === name)) {
            setErrors({
                ...errors,
                name: "Ese nombre ya esta asignado a otro curso*"
            })
        } else if (!name) {
            setErrors({
                ...errors,
                name: "Ingrese un nombre*",
            })
        } else {
            setErrors({
                ...errors,
                name: ""
            })
        }
    }

    const validateEmail = (email) => {
        if (!email) {
            setErrors({
                ...errors,
                email: "Ingrese un Email*"
            })
        } else if (!/^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/.test(email)) {
            setErrors({
                ...errors,
                email: "Formato de Email no reconocido*"
            })
        } else {
            setErrors({
                ...errors,
                email: ""
            })
        }
    }

    const validatePrice = (price) => {
        if (!price) {
            setErrors({
                ...errors,
                price: "Debe asignar un precio*"
            })
        } else if (price < 0) {
            setErrors({
                ...errors,
                price: "El precio no puede ser negativo*"
            })
        } else {
            setErrors({
                ...errors,
                price: ""
            })
        }
    }

    const handleBlur = (e) => {
        if (e.target.name === "name") {
            validateName(e.target.value)
        }
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }


    const handleChange = (e) => {
        if (e.target.name === "name") {
            validateName(e.target.value)
        }
        if (e.target.name === "email") {
            validateEmail(e.target.value)
        }
        if (e.target.name === "price") {
            validatePrice(e.target.value)
        }
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleClick = (e) => {
        e.preventDefault();
        console.log(form)
        if (form.name === "" || form.description === "" || form.email === "" || form.price === "" || form.category === []) {
            MySwal.fire({
                position: "center-center",
                icon: "error",
                title: "Debe completar todos los campos",
                showConfirmButton: false,
                timer: 2500,
            });
            return;
        }
         else if (errors.name !== "" || errors.email !== "" || errors.price !== "") {
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
            });
            dispatch(courseCreate(form))
            setForm({
                name: "",
                description: "",
                email: "",
                img: "",
                price: "",
                category: []
            })
        }
    }

    const onClickCourse = (e) => {
        e.preventDefault()
        const categoryName = document.getElementById("selectCategory").value;
        if (categoryName === "") {
            MySwal.fire({
                position: "center-center",
                icon: "error",
                title: "Tiene que ingresar una categoria",
                showConfirmButton: false,
                timer: 2500,
            });
            return;
        }
        if (form.category.includes(categoryName)) {
            MySwal.fire({
                position: "center-center",
                icon: "error",
                title: "Ya agrego esa categoria",
                showConfirmButton: false,
                timer: 2500,
            });
            return;
        } else {
            setForm({
                ...form,
                category: [...form.category, categoryName]

            })
        }}

        const deleteCategory = (name) => {
            const deletes = form.category.filter(cat => cat !== name)
            setForm({
                ...form,
                category: deletes
            })
        }

        useEffect((e) => {
            dispatch(getCategories({}))
            dispatch(getCourses({}))
        }, [dispatch])

        return (
            <div className='formContainer'>
                <form className="realForm">
                    <h1 className="form-title">Crear Curso</h1>
                    <div>
                        <div className="inputDiv">
                            <label>Tu email</label>
                            <input
                                name="email"
                                type="text"
                                placeholder="Email..."
                                value={form.email}
                                onChange={handleChange}
                            />
                            {errors.email !== "" ? <p className="danger">{errors.email}</p> : null}
                        </div>
                        <div className="inputDiv">
                            <label>Nombre del curso</label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Nombre..."
                                value={form.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name !== "" ? <p className="danger">{errors.name}</p> : null}
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
                        <div className="inputDiv">
                            <label>Precio</label>
                            <input
                                // className="inputNumber"
                                className="price-input"
                                name="price"
                                type="number"
                                placeholder="Precio..."
                                value={form.price}
                                onChange={handleChange}
                            />
                            {errors.price !== "" ? <p className="danger">{errors.price}</p> : null}
                        </div>
                        <div className="selectContainer">
                            <select id="selectCategory"
                            className="filterings_category-select selectInput"
                            >
                                <option selected value="">
                                    Selecciona la Categoria
                                </option>
                                {orderedCategories.map((e) => {
                                   return (
                                    <option value={e.name} key={e.id}>
                                    {e.name}
                                </option>
                                   )

                                })}
                            </select>
                            <button className="addCategoryBtn" onClick={onClickCourse}>
                                <AddIcon />
                            </button>
                        </div>
                        <div>
                            <ul className="listContainer">
                                {form.category.length > 0
                                    ? form.category.map(category => (
                                        <li key={category} className='categorySelected'>
                                            <button
                                                className="deleteBtn"
                                                onClick={() => deleteCategory(category)}
                                            ><CloseIcon /></button>
                                            {category}
                                        </li>
                                    )): null}
                            </ul>
                        </div>
                    </div>
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


    export default CreateForm;

/* const { name, description, email, img, price, category } = req.body; */