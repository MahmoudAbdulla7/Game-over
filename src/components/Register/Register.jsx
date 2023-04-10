import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Joi from "joi";
import { Helmet } from "react-helmet";
export default function Register() {
  const [userData, setuserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: 0,
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
      `https://route-movies-api.vercel.app/signup`,
      userData
    );
    console.log(data.message);
    if (data.message != "success") {
      setError(data.message);
      setLoading(false);
    } else {
      navigate("/login");
      setLoading(false);
    }
  }

  function validation() {
    let schema = Joi.object({
      first_name: Joi.string().min(3).max(10).required(),
      last_name: Joi.string().min(3).max(10).required(),
      age: Joi.number().min(16).max(60).required(),
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
        <title>Register</title>
        <meta name="description" content="My page description" />
      </Helmet>

      <>
        <div className="row rgstr mt-5">
          <div className="left col-lg-6 m-0 p-0 bg-register"></div>
          <div className="col-lg-6 m-0 p-0 right">
            <form onSubmit={sendData} action="submit">
              <div className="container">
                <h3 className=" fw-bold text-center pt-3 fs-4">
                  Create My Account!
                </h3>
                {error && (
                  <p className="fs-6 alert alert-warning p-0 text-center rounded-2">
                    {error}
                  </p>
                )}
                <div className="row  pt-2">
                  <div className="firstName col-lg-6">
                    <input
                      onChange={getDataFromUser}
                      type="text"
                      placeholder="First name"
                      className="form-control bg-dark border-0 text-light mt-3"
                      name="first_name"
                    />
                    {errorList.filter(
                      (el) => el.context.label == "first_name"
                    )[0] && (
                      <div className="alert alert-warning p-0 text-center rounded-3">
                        Fitst name is required{" "}
                      </div>
                    )}
                  </div>
                  <div className="lastName col-lg-6">
                    <input
                      onChange={getDataFromUser}
                      type="text"
                      placeholder="Last name"
                      className="form-control bg-dark border-0 text-light mt-3"
                      name="last_name"
                    />
                    {errorList.filter(
                      (el) => el.context.label == "last_name"
                    )[0] && (
                      <div className="alert alert-warning p-0 text-center rounded-3">
                        Last name is required{" "}
                      </div>
                    )}
                  </div>
                </div>
                <input
                  onChange={getDataFromUser}
                  type="text"
                  placeholder="Email Address"
                  className="form-control mt-3 bg-dark border-0 text-light"
                  name="email"
                />
                {errorList.filter((el) => el.context.label == "email")[0] && (
                  <div className="alert alert-warning p-0 text-center rounded-3">
                    {" "}
                    {
                      errorList.filter((el) => el.context.label == "email")[0]
                        .message
                    }{" "}
                  </div>
                )}

                <input
                  onChange={getDataFromUser}
                  type="number"
                  placeholder="Age"
                  className="form-control mt-3 bg-dark border-0 text-light"
                  name="age"
                />
                {errorList.filter((el) => el.context.label == "age")[0] && (
                  <div className="alert alert-warning p-0 text-center rounded-3">
                    {" "}
                    must be greater than or equal to 16{" "}
                  </div>
                )}

                <input
                  type="password"
                  onChange={getDataFromUser}
                  placeholder="Password"
                  className="form-control mt-3 bg-dark border-0 text-light"
                  name="password"
                />
                {errorList.filter(
                  (el) => el.context.label == "password"
                )[0] && (
                  <div className="alert alert-warning p-0 text-center rounded-3">
                    {" "}
                    must begain with capital letter and follwed by 2 letters{" "}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn border-dark text-white submitButton w-100 mt-3 py-2 btn-user btn-block"
                >
                  {loading ? (
                    <i className="fas fa-circle-notch fa-spin"></i>
                  ) : (
                    "Create account"
                  )}
                </button>
                <p className="reg-p pt-1 my-2 text-center text-muted">
                  This site is protected by reCAPTCHA and the Google{" "}
                  <span>
                    <a
                      target="_blank"
                      href="https://policies.google.com/privacy"
                      className="text-secondary border-bottom"
                    >
                      Privacy Policy
                    </a>
                  </span>{" "}
                  and{" "}
                  <span className="border-bottom">
                    <a
                      target="_blank"
                      href="https://policies.google.com/terms"
                      className="text-secondary"
                    >
                      Terms of Service
                    </a>
                  </span>{" "}
                  apply.
                </p>
                <hr className="w-100 bg-dark" />
                <p className="text-center pb-5">
                  Already a member?{" "}
                  <Link className="text-info" to="/login">
                    Log In{" "}
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
