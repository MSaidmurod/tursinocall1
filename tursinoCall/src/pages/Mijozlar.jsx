import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

//firebase
import { db } from "../firebase/firebase";
import { set, ref, get, onValue, remove } from "firebase/database";

function Mijozlar() {
  const [idlog, setIdlog] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [index, setIndex] = useState();
  const [qoshimcha, setQoshimcha] = useState("");
  const { id } = useParams();
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
  const hendelDalet = () => {
    remove(ref(db, `/calladmin/information/${idlog}`));
  };

  const hendelSubmit = (e) => {
    e.preventDefault();
    set(
      ref(
        db,
        `/calladmin/briktirilganlar/${id}/${
          Object.keys(data.information)[index]
        }`
      ),
      {
        name: name,
        phone: phone,
        tasdiqlash: id,
        qoshimcha: qoshimcha,
      }
    );
    setQoshimcha("");
    remove(
      ref(db, `/calladmin/information/${Object.keys(data.information)[index]}`)
    );
  };
  return (
    <div className="bgimgurl">
      <Link to={id == "admin" ? "/adminpanel" : `/employees/${id}`}>
        {" "}
        <button className="btn ml-16 btn-primary mt-10">
          <GoArrowLeft className="text-2xl" />
        </button>
      </Link>
      <div className="h-screen">
        <div className="max-w-4xl  pt-10 grid grid-cols-3 max-[700px]:grid-cols-2 max-[700px]:mx-3 max-[500px]:grid-cols-1 gap-3 mx-auto">
          {data &&
            data.information &&
            Object.values(data.information).map((prev, index) => {
              const { name, phone } = prev;
              return (
                <div
                  key={prev.phone}
                  className="card h-[200px] bg-neutral mx-auto w-full text-neutral-content "
                >
                  <div className="card-body items-center text-center">
                    <h2 className="card-title text-wrap">{name} !</h2>
                    <p>Tel: {phone}</p>
                    <div className="card-actions justify-end">
                      <button
                        onClick={() => {
                          setName(name);
                          setPhone(phone);
                          setIndex(index);
                          document.getElementById("my_modal_1").showModal();
                        }}
                        className="btn btn-primary"
                      >
                        Boglash
                      </button>
                      <button
                        onClick={() => {
                          document.getElementById("my_modal_2").showModal();
                          setIdlog(Object.keys(data.information)[index]);
                        }}
                        className="btn btn-primary"
                      >
                        Ochirish
                      </button>
                    </div>
                  </div>
                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box bg-slate-300">
                      <div className="bg-gradient-to-br  flex justify-center items-center w-full">
                        <form onSubmit={(e) => hendelSubmit(e)}>
                          <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
                            <div className="space-y-4">
                              <h1 className="text-center text-2xl font-semibold text-gray-600">
                                Boglash
                              </h1>

                              <div>
                                <label className="block mb-1 text-gray-600 font-semibold">
                                  Qoshimcha
                                </label>
                                <input
                                  type="text"
                                  className="bg-indigo-50 px-4 text-black py-2 outline-none rounded-md w-full"
                                  required
                                  value={qoshimcha}
                                  onChange={(e) => setQoshimcha(e.target.value)}
                                />
                              </div>
                            </div>
                            <button className="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide">
                              Boglash
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </div>
              );
            })}
        </div>
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box bg-slate-300">
          <p className="py-4 text-black text-center">
            Mijoz ochirib tashlansinmi ?
          </p>
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() => hendelDalet()}
              className="btn btn-error text-white"
            >
              Ha
            </button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-success text-white">Yoq</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default Mijozlar;
