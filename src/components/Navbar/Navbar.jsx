import React from "react";
import { Link, NavLink, Navigate } from "react-router-dom";
import logo from "./logo192.png";
import axios from "axios";

export default function Navbar({ logOut , userData }) {

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-lg position-sticky top-0">
        <div className="container">
          <NavLink to="/" className="navbar-brand">
            <img src={logo} className="nav-img" alt="" />{" "}
            <h1 className="fw-bold fs-6 d-inline-block">Game Over</h1>
          </NavLink>
          <button
            className="navbar-toggler bg-dark"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars fa-beat text-muted"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-light nav-link" : "nav-link "
                    }
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-light nav-link" : "nav-link "
                    }
                    to="all"
                  >
                    All
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <NavLink to={'/platform'}
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Platform
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to={'/platform/pc'} className="dropdown-item text-dark fw-bold" href="#">
                        Pc
                      </Link>
                    </li>
                    <li><hr className="w-100 bg-black p-0 m-0" /></li>
                    <li>
                      <Link to={'/platform/browser'} className="dropdown-item text-dark fw-bold" href="#">
                        Browser
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sort-by
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to={'sort-by/release-date'} className="dropdown-item text-black fw-bold" href="#">
                      release-date
                      </Link>
                    </li>
                    <li>
                      <Link to={'sort-by/popularity'} className="dropdown-item text-black fw-bold" href="#">
                      popularity
                      </Link>
                    </li>
                    <li>
                      <Link to={'sort-by/alphabetical'} className="dropdown-item text-black fw-bold" href="#">
                      alphabetical
                      </Link>
                    </li>
                    <li>
                      <Link to={'sort-by/relevance'} className="dropdown-item text-black fw-bold " href="#">
                      relevance
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Category
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to={'category/racing'} className="dropdown-item text-black fw-bold" href="#">
                      racing
                      </Link>
                    </li>
                    <li>
                      <Link to={'category/sports'} className="dropdown-item text-black fw-bold" href="#">
                      sports
                      </Link>
                    </li>
                    <li>
                      <Link to={'category/social'} className="dropdown-item text-black fw-bold" href="#">
                      social
                      </Link>
                    </li>
                    <li>
                      <Link to={'category/shooter'} className="dropdown-item text-black fw-bold" href="#">
                      shooter
                      </Link>
                    </li>
                    <li>
                      <Link to={'category/open-world'} className="dropdown-item text-black fw-bold" href="#">
                      open-world
                      </Link>
                    </li>
                    <li>
                      <Link to={'category/zombie'} className="dropdown-item text-black fw-bold" href="#">
                      zombie
                      </Link>
                    </li>
                    <li>
                      <Link to={'category/fantasy'} className="dropdown-item text-black fw-bold" href="#">
                      fantasy
                      </Link>
                    </li>
                    <li>
                      <Link to={'category/action-rpg'} className="dropdown-item text-black fw-bold" href="#">
                      action-rpg
                      </Link>
                    </li>
                    <li>
                      <Link to={'category/action'} className="dropdown-item text-black fw-bold" href="#">
                      action
                      </Link>
                    </li>
                    <li>
                      <Link to={'category/flight'} className="dropdown-item text-black fw-bold" href="#">
                      flight
                      </Link>
                    </li>
                    <li>
                      <Link to={'category/battle-royale'} className="dropdown-item text-black fw-bold" href="#">
                      battle-royale
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            ):''}

            <ul className="list-unstyled ms-auto d-flex m-0">
              {userData ? (
                <li>
                  <button
                    onClick={logOut}
                    className="btn btn-outline-info mx-1 text-muted"
                  >
                    Log Out
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <button className="btn btn-outline-info mx-1">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "text-light nav-link" : "nav-link"
                        }
                        to="register"
                      >
                        Join free
                      </NavLink>
                    </button>
                  </li>
                  <li>
                    <button className="btn btn-outline-info mx-1">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "text-light nav-link" : "nav-link"
                        }
                        to="login"
                      >
                        login
                      </NavLink>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
