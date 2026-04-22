import React, { useState } from "react";
import { Formik } from "formik";
import "./App.css";

export default function App() {
  const REGEX = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  };

  const [form, setForm] = useState({});

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleValidate() {
    const errors = {};

    if (!form.email) {
      errors.email = "Required";
    } else if (!REGEX.email.test(form.email)) {
      errors.email = "Invalid email address";
    }

    if (!form.password) {
      errors.password = "Required";
    }

    return errors;
  }

  function handleSubmit() {
    alert("Login successfully!!!");
  }

  return (
      <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
        <h1>Login</h1>
        <Formik
            initialValues={form}
            validate={handleValidate}
            onSubmit={handleSubmit}
        >
          {({ errors, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className={`custom-input ${errors.email ? "custom-input-error" : ""}`}>
                  <label>Email</label>
                  <input
                      type="email"
                      name="email"
                      value={form.email || ""}
                      onChange={handleChange}
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div className={`custom-input ${errors.password ? "custom-input-error" : ""}`}>
                  <label>Password</label>
                  <input
                      type="password"
                      name="password"
                      value={form.password || ""}
                      onChange={handleChange}
                  />
                  {errors.password && <p className="error">{errors.password}</p>}
                </div>

                <button type="submit">Submit</button>
              </form>
          )}
        </Formik>
      </div>
  );
}