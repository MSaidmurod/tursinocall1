import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
//firebase
import { db } from "../firebase/firebase";
import { set, ref, get, onValue } from "firebase/database";

function Home() {
  const [password, setPasword] = useState("");
  const [login, setLogin] = useState("");
  const [error, setError] = useState(false);
  const { pathname } = useLocation();

  // get data login
  const [data, setData] = useState();
  useEffect(() => {
    const dataRef = ref(db);
    onValue(dataRef, (snapshot) => {
      const newData = snapshot.val();
      if (newData != null) {
        Object.values(newData).map((prev) => {
          setData(prev.hodimlar);
        });
      }
    });
  }, []);

  const hendelSubmit = (e) => {
    e.preventDefault();
    data &&
      Object.values(data).map((prev) => {
        if (
          prev.admin == "admin" &&
          login == prev.login &&
          password == prev.key
        ) {
          window.location.href = "/adminpanel";
        } else if (login == prev.login && password == prev.key) {
          window.location.href = `/employees/${login}`;
        } else {
          setError(true);
        }
      });

    setLogin("");
    setPasword("");
  };

  return (
    <div className="bgimgurl">
      <form onSubmit={hendelSubmit}>
        <div className="flex justify-center h-screen w-screen items-center">
          <div className="w-full md:w-1/2 flex flex-col items-center ">
            <h1 className="text-center text-2xl font-bold text-gray-200 mb-6">
              LOGIN
            </h1>
            <div className="w-3/4 mb-6">
              <input
                type="text"
                className={
                  error != true
                    ? "w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-green-500"
                    : "w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 border-x-2 border-y-2 border-red-500  outline-red-500"
                }
                value={login}
                placeholder="User Name"
                required
                onChange={(e) => {
                  setLogin(e.target.value);
                }}
              />
            </div>
            <div className="w-3/4 mb-6">
              <input
                type="password"
                className={
                  error != true
                    ? "w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-green-500"
                    : "w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1  border-x-2 border-y-2 border-red-500 outline-red-500"
                }
                placeholder="Password"
                required
                value={password}
                onChange={(e) => {
                  setPasword(e.target.value);
                }}
              />
            </div>

            <div className="w-3/4 mt-4">
              <button
                type="submit"
                className="py-4 bg-green-500 w-full rounded text-blue-50 font-bold hover:bg-green-700"
              >
                {" "}
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

// <Link to="/connected">
//   <div classNameName="p-[100px] max-[650px]:p-[70px] text-center border cursor-pointer select-none rounded-3xl shadow-xl hover:shadow-2xl hover:bg-green-100">
//     <h1>Boglanilgan </h1>
//   </div>
// </Link>
// <Link to="/unbound">
//   <div classNameName="p-[100px] max-[650px]:p-[70px] text-center border cursor-pointer select-none rounded-3xl shadow-xl hover:shadow-2xl hover:bg-red-100">
//     <h1>Boglanilmagan </h1>
//   </div>
// </Link>
export default Home;
