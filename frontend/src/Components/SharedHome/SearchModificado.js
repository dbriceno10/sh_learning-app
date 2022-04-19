import { React } from "react";
import "./SearchModificado.css";

export default function SearchModificado({ onChange, value }) {
  // const dispatch = useDispatch();
  // const [input, setInput] = useState("")

  // const handleInputChange = (e) => {
  //     setInput(e.target.value)
  //     dispatch(getCourses(e.target.value))
  // }
  // console.log(value);
  return (
    <article className="search-bar">
      <input
        type="text"
        value={value}
        className="search-bar_input"
        onChange={onChange}
        placeholder="Busca cursos aqui..."
        maxLength={63}
      />
      {/*  <button className='searchIcon' onClick={handleSubmit}><Icon icon="line-md:search" height='40px' /></button> */}
    </article>
  );
}
