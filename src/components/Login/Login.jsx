import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Joi from "joi";
import logo from "./logo192.png";
import { Helmet } from "react-helmet";
export default function Login({ saveUserData }) {
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorList, seterrorList] = useState([]);
  let navigate = useNavigate();

  function getDataFromUser(e) {
    let data = { ...userData };
    data[e.target.name] = e.target.value;
    setuserData(data);
  }

  async function postUserData() {
    let { data } = await axios.post(
      `https://route-movies-api.vercel.app/signin`,
      userData
    );
    // console.log(data.message);
    if (data.message != "success") {
      setError(data.message);
      setLoading(false);
    } else {
      setLoading(false);
      // console.log(data);
      localStorage.setItem("userData", data.token);
      saveUserData();
      navigate("/");
    }
  }

  function validation() {
    let schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .pattern(/^[A-Z][a-z]{2,6}/)
        .required(),
    });

    return schema.validate(userData, { abortEarly: false });
  }

  function sendData(e) {
    setLoading(true);
    e.preventDefault();
    let validate = validation();
    if (validate.error) {
      seterrorList(validate.error.details);
      // console.log(errorList);
      setLoading(false);
    } else {
      postUserData();
    }
  }

  return (


    <div className="container">

<Helmet>
        <title>Login</title>
        <meta name="description" content="My page description" />
      </Helmet>
      <>
        <div className="row rgstr mt-5">
          <div className="left col-lg-6 m-0 p-0 bg-register"></div>
          <div className="col-lg-6 m-0 p-0 right">
            <form onSubmit={sendData} action="submit">
              <div className="container w-75">
                <div className="d-flex justify-content-center pt-2">
                  <img src={logo} className="w-25" alt="" />
                </div>
                <h3 className=" fw-bold text-center pt-3 fs-4">
                  Log in to GameOver
                </h3>
                {error && (
                  <p className="fs-6 alert alert-warning p-0 text-center rounded-2">
                    {error}
                  </p>
                )}
                <input
                  onChange={getDataFromUser}
                  type="text"
                  placeholder="Email Address"
                  className="form-control mt-3 py1 border-0 text-black"
                  name="email"
                />
                {errorList.filter((el) => el.context.label == "email")[0] && (
                  <div className="alert alert-danger mt-1 p-0 text-center rounded-3">
                    {" "}
                    Email doesn't exist
                  </div>
                )}

                <input
                  type="password"
                  onChange={getDataFromUser}
                  placeholder="Password"
                  className="form-control mt-3 py1 border-0 text-black"
                  name="password"
                />
                {errorList.filter(
                  (el) => el.context.label == "password"
                )[0] && (
                  <div className="alert alert-danger mt-1 p-0 text-center rounded-3">
                    {" "}
                    Incorrect password
                  </div>
                )}

                <button
                  type="submit"
                  className="btn border-dark text-white submitButton w-100 mt-3 py-2 btn-user btn-block"
                >
                  {loading ? (
                    <i className="fas fa-circle-notch fa-spin"></i>
                  ) : (
                    "Login"
                  )}
                </button>
                <hr className="w-100 bg-dark" />
                <div className="text-center">
                  <Link
                    onClick={() => {
                      alert("ههه اعمل اكونت جديد");
                    }}
                    className="btn text-info small a2 cursor text-center"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <p className="text-center pb-5">
                  Not a member yet?{" "}
                  <Link className="text-info" to="/register">
                    Create account{" "}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </>
    </div>
  );
}
