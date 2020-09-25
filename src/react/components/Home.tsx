import { Link } from "react-router-dom";
import React from "react";

export function Home() {
  return (
    <>
      <section className={"hero is-info"}>
        <div className={"hero-body"}>
          <div className={"container"}>
            <h1 className="title">Welcome to the Home Page!</h1>
          </div>
        </div>
      </section>
      <section className="section">
        <div className={"container"}>
          <Link to="/create-recipe">
            <button className="button is-success is-light">
              Create Recipe!
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}