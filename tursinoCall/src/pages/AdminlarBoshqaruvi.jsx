import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
//firebase
import { db } from "../firebase/firebase";
import { set, ref, get, onValue, remove } from "firebase/database";
import { GoArrowLeft } from "react-icons/go";
import { CgAddR } from "react-icons/cg";

function AdminlarBoshqaruvi() {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [daletLogin, setDaletLogin] = useState();
  const [daletName, setDaletName] = useState();
  // get data login
  const [data, setData] = useState();
  useEffect(() => {
    const dataRef = ref(db);
    onValue(dataRef, (snapshot) => {
      const newData = snapshot.val();
      if (newData != null) {
        Object.values(newData).map((prev) => {
          setData(prev);
        });
      }
    });
  }, []);

  const hendelSubmit = (e) => {
    e.preventDefault();
    set(ref(db, `/calladmin/hodimlar/${login}`), {
      name: name,
      login: login,
      key: password,
    });
    setLogin("");
    setName("");
    setPassword("");
  };

  const hendelDalet = (daletLogin) => {
    remove(ref(db, `/calladmin/hodimlar/${daletLogin}`));
  };
  return (
    <div className="bgimgurl">
      <Link to="/adminpanel">
        {" "}
        <button className="btn ml-16 btn-primary mt-10">
          <GoArrowLeft className="text-2xl" />
        </button>
      </Link>
      <div className="h-screen">
        <div className="max-w-4xl  pt-10 grid grid-cols-3 max-[700px]:grid-cols-2 max-[700px]:mx-3 max-[500px]:grid-cols-1 gap-3 mx-auto">
          <div className="card h-[200px] bg-neutral mx-auto text-neutral-content max-w-96">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Admin!</h2>
              <p>Admin qoshish</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                  className="btn btn-primary"
                >
                  <CgAddR className="text-3xl" />
                </button>
              </div>
            </div>
          </div>

          <dialog id="my_modal_1" className="modal">
            <div className="modal-box bg-slate-300">
              <div className="bg-gradient-to-br  flex justify-center items-center w-full">
                <form onSubmit={hendelSubmit}>
                  <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
                    <div className="space-y-4">
                      <h1 className="text-center text-2xl font-semibold text-gray-600">
                        Register
                      </h1>
                      <div>
                        <label className="block mb-1 text-gray-600 font-semibold">
                          Username
                        </label>
                        <input
                          type="text"
                          className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-gray-600 font-semibold">
                          Login
                        </label>
                        <input
                          type="text"
                          className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                          required
                          value={login}
                          onChange={(e) => setLogin(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-gray-600 font-semibold">
                          Password
                        </label>
                        <input
                          type="password"
                          className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <button className="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>

          {data &&
            Object.values(data.hodimlar).map((prev) => {
              if (!prev.admin) {
                return (
                  <div
                    key={prev.login}
                    className="card h-[200px] bg-neutral mx-auto text-neutral-content max-w-96"
                  >
                    <div className="card-body items-center text-center">
                      <h2 className="card-title">{prev.name} !</h2>
                      <p>
                        Biriktirilgan mijozi{" "}
                        {data &&
                          data.briktirilganlar &&
                          data.briktirilganlar[prev.login] &&
                          Object.values(data.briktirilganlar[prev.login])
                            .length}
                      </p>
                      <div className="card-actions justify-end">
                        <button
                          onClick={() => {
                            document.getElementById("my_modal_2").showModal();
                            setDaletLogin(prev.login);
                            setDaletName(prev.name);
                          }}
                          className="btn btn-primary"
                        >
                          Ochirish
                        </button>
                        <dialog id="my_modal_2" className="modal">
                          <div className="modal-box bg-slate-300">
                            <h3 className="font-bold text-black text-lg">
                              {daletName}!
                            </h3>
                            <p className="py-4 text-black">
                              Xodim ochirib tashlansinmi ?
                            </p>
                            <div className="flex justify-center items-center gap-3">
                              <button
                                onClick={() => hendelDalet(daletLogin)}
                                className="btn btn-error text-white"
                              >
                                Ha
                              </button>
                              <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-success text-white">
                                  Yoq
                                </button>
                              </form>
                            </div>
                          </div>
                          <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                          </form>
                        </dialog>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}

export default AdminlarBoshqaruvi;
