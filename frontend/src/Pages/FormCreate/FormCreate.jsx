import React, {useState} from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, courseCreate } from "../../Actions/courses.actions";

function CreateForm() {

    const dispatch = useDispatch();
    const {categories} = useSelector(state => state.courses);
    console.log(categories)
    const [form, setForm] = useState({
        name: "",
        description: "",
        email: "",
        img: "",
        price: "",
        category: ["css"]
    });
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const selectCategoria = (e) => {
        setForm({
          ...form,
          category: e.target.value
        });
      };

    const handleClick = (e) => {
        e.preventDefault();
        console.log(form)
        dispatch(courseCreate(form))
    }

    useEffect((e) => {
        dispatch(getCategories({}))
    }, [dispatch])

    return (
        <div>
            <form>
                <h1>Crear Curso</h1>
                <div>
                    <div>
                        <label>Nombre</label>
                        <input
                            name="name"
                            type="text"
                            placeholder="Nombre..."
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Descripcion</label>
                        <input
                            name="description"
                            type="text"
                            placeholder="Descripcion..."
                            value={form.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            name="email"
                            type="text"
                            placeholder="Email..."
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Imagen</label>
                        <input
                            name="img"
                            type="text"
                            placeholder="Imagen..."
                            value={form.img}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Precio</label>
                        <input
                            name="price"
                            type="number"
                            placeholder="Precio..."
                            value={form.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div >
          <select  onChange={selectCategoria}>
            <option selected value="">
              Selecciona la Categoria
            </option>
            {categories?.map((e) => {
              return (
                <option name="categories" value={e.name}>
                  {e.name}
                 { console.log(e.category)}
                </option>
              );
            })}
          </select>
          
        </div>
                </div>
                <button type="button" onClick={handleClick}>CREATE</button>
            </form>
        </div>
    )
}


export default CreateForm;

/* const { name, description, email, img, price, category } = req.body; */