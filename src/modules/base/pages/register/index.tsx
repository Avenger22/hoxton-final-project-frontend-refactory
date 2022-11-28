import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../../../main/components/footer";
import Header from "../../../../main/components/header";
import { useStore } from "../../../../main/store/zustand/store";
import IRegister from "../../../../main/store/zustand/types/IRegister";
import IResponseLogin from "../../../../main/store/zustand/types/IResponseLogin";
import "./style.css";

export default function Register() {
  const {
    user,
    setUser
  } = useStore();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function onSubmit() {
    const payload: IRegister = {
      username,
      email,
      password
    };

    const response: IResponseLogin = await axios.post("http://localhost:4000/sign-up", payload).then(x => x.data);
    localStorage.setItem("token", response.token);
    setUser(response.user);
  }

  const navigate = useNavigate();

  if (user) {
    navigate("/movies");
  }

  return (
    <>
      <Header />
      <div className="signup-page-wrapper">
        <div className="left-main-wrapper">
          <img
            className="special-image-2"
            id="signup-page-img"
            src="/assets/images/netflix.png"
            alt=""
          />
        </div>
        <div className="right-main-wrapper">
          <form
            id="signup-form"
            onSubmit={function (e) {
              e.preventDefault();
              onSubmit();
            }}
          >
            <h1>MovieLandia24</h1>
            <label id="username" htmlFor="">
              <input
                type="text"
                placeholder="Enter your username"
                required
                onChange={function (e) {
                  setUsername(e.target.value);
                }}
              />
            </label>
            <label htmlFor="">
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                onChange={function (e) {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <label htmlFor="">
              <input
                type="password"
                name=""
                id="password"
                placeholder="Enter your password"
                required
                onChange={function (e) {
                  setPassword(e.target.value);
                }}
              />
            </label>
            <label htmlFor="">
              <button>Sign Up</button>
            </label>
            <label id="login-link-wrapper" htmlFor="">
              You have an account?
              <Link id="link" to={"../login"}>
                Log In
              </Link>
            </label>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}