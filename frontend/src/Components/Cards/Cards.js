import React, { useEffect, useState, useCallback } from "react";
import MaterialCard from "../Card/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import { getCourses, getCoursesTeacher } from "../../Actions/courses.actions";
import {
  getProfileStudent,
  getProfileTeacher,
} from "../../Actions/profile.action";
import { useDispatch, useSelector } from "react-redux";
import { getUserCredentials } from "../../Actions/login.actions";
import Button from "../Buttons/Buttons";
import "./Cards.css";

const Cards = ({
  searchTerm,
  isLoggedIn,
  limite,
  setlimite,
  valor,
  isProfile,
  hideButtoms = false,
}) => {
  // const [courses, setCourses] = useState([]);
  limite = limite || 20;
  const [hasMore, sethasMore] = useState(true);
  const [page, setPage] = useState(2);
  const allCourses = useSelector((state) => state.courses.courses);
  const teacherCourses = useSelector((state) => state.courses.courses);
  const longitud = allCourses?.length;
  const cursos = allCourses?.slice(0, limite);
  const dispatch = useDispatch();
  const { dataUser } = useSelector((state) => state?.student);
  const { userCredentials } = useSelector((state) => state?.login);

  const userCourses = () => {
    let arrayId = [];
    let results2 = [];
    if (isLoggedIn === "student") {
      arrayId = dataUser.courses?.map((element) => {
        return element;
      });
      allCourses.forEach((course) => {
        for (let index = 0; index < arrayId.length; index++) {
          if (course.id === arrayId[index]) results2.push(course);
        }
      });
    } else if (isLoggedIn === "teacher") {
      arrayId = teacherCourses?.map((element) => {
        return element;
      });
      results2 = [...arrayId];
    }
    return results2;
  };

  const handleReset = (e) => {
    dispatch(getCourses({}));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
		   in place of 'smooth' */
    });
  };

  // const getData = useCallback(async () => {
  // 	const res = await fetch(`http://localhost:3001/fakecourses`);
  // 	const data = await res.json();
  // 	setCourses(data);
  // }, []);
  function handleLimite(e) {
    e.preventDefault();
    setlimite(limite + valor);
  }
  const fetchMoreCourses = async () => {
    if (!userCourses().length) {
      if (allCourses.length === 0 || allCourses.length <= 40) {
        sethasMore(false);
      }
      setPage((prevPage) => page + 1);
    } else {
      if (userCourses().length === 0 || userCourses().length <= 40) {
        sethasMore(false);
      }
      setPage((prevPage) => page + 1);
    }
  };

  useEffect(() => {
    dispatch(getUserCredentials());
  }, []);

  useEffect(() => {
    if (isLoggedIn === "student") {
      dispatch(getProfileStudent(userCredentials.id));
      dispatch(getCourses({}));
    } else if (isLoggedIn === "teacher") {
      dispatch(getCoursesTeacher(userCredentials.id));
    }
  }, [dispatch, isLoggedIn]);

  return isProfile ? (
    <div className="cards">
      {!userCourses() ? (
        <div>No hay nada</div>
      ) : (
        userCourses().map((c) => {
          return (
            <MaterialCard
              key={c.id}
              id={c.id}
              name={c.name}
              description={c.description}
              image={c.img} // seria la url del video
              teacher={`${c.teacherName} ${c.teacherLastName}`}
              price={c.price}
              rating={c.meanReview}
              isLoggedIn={isLoggedIn}
            />
          );
        })
      )}
      {/* {allCourses ? (
        longitud > limite ? (
          <Button
            btnVariant={"flat"}
            text={"Mostrar más cursos"}
            link={""}
            onClick={handleLimite}
          />
        ) : (
          ""
        )
      ) : (
        ""
      )} */}
      <div className="buttomsContainer">
        {allCourses && !hideButtoms ? (
          longitud > limite ? (
            <Button
              btnVariant={"raised"}
              text={"Mostrar Más Cursos"}
              link={"other"}
              onClick={handleLimite}
            />
          ) : (
            ""
          )
        ) : (
          ""
        )}

        {allCourses && !hideButtoms ? (
          longitud > limite ? (
            <Button
              btnVariant={"raised"}
              text={"Volver Al Inicio"}
              onClick={handleReset}
              link={"other"}
            />
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
      {/* <button onClick={handleLimite}>Mostrar más cursos</button>  */}
    </div>
  ) : (
    //! Acá antes iba el InfiniteScroll pero se eliminó porque daba problemas...
    <React.Fragment>
      <div
        style={{ overflowX: "hidden" }}
        className="cards"
        dataLength={allCourses.length} //This is important field to render the next data
        next={fetchMoreCourses}
        hasMore={hasMore}
        loader={<Loader />}
        // endMessage={<Message msg="Has llegado al final!" bgColor="#444" />}
      >
        {cursos ? (
          cursos
            .filter((val) => {
              if (searchTerm === "") {
                document
                  .querySelector(".cards")
                  ?.classList?.remove("search-result-cards");
                return val;
              } else if (
                val.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                document
                  .querySelector(".cards")
                  ?.classList?.add("search-result-cards");
                return val;
              }
            })
            .map((c) => {
              return (
                <MaterialCard
                  key={c.id}
                  id={c.id}
                  name={c.name}
                  description={c.description}
                  image={c.img} // seria la url del video
                  teacher={`${c.teacherName} ${c.teacherLastName}`}
                  price={c.price}
                  rating={c.meanReview}
                  isLoggedIn={isLoggedIn}
                />
              );
            })
        ) : (
          <h2>No hay cursos disponibles!</h2>
        )}
        {/* {allCourses ? (
        longitud > limite ? (
          <Button
            btnVariant={"flat"}
            text={"Mostrar más cursos"}
            link={""}
            onClick={handleLimite}
          />
        ) : (
          ""
        )
      ) : (
        ""
      )} */}
        {/* <button onClick={handleLimite}>Mostrar más cursos</button>  */}
      </div>
      <div className="buttomsContainer">
        {allCourses && !hideButtoms ? (
          longitud > limite ? (
            <Button
              btnVariant={"raised"}
              text={"Mostrar Más Cursos"}
              link={""}
              onClick={handleLimite}
            />
          ) : (
            ""
          )
        ) : (
          ""
        )}

        {allCourses && !hideButtoms ? (
          longitud > limite ? (
            <Button
              btnVariant={"raised"}
              text={"Volver Al Inicio"}
              onClick={handleReset}
              link={"other"}
            />
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  );
};

export default Cards;
