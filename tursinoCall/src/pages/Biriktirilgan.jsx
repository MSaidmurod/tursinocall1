import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

//firebase
import { db } from "../firebase/firebase";
import { set, ref, get, onValue, remove } from "firebase/database";

function Biriktirilgan() {
  const [index, setIndex] = useState();

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
    remove(
      ref(
        db,
        `/calladmin/briktirilganlar/${id}/${
          data &&
          data.briktirilganlar &&
          Object.keys(data.briktirilganlar[id])[index]
        }`
      )
    );
  };

  return (
    <div className="bgimgurl">
      <Link to={`/employees/${id}`}>
        {" "}
        <button className="btn ml-16 btn-primary mt-10">
          <GoArrowLeft className="text-2xl" />
        </button>
      </Link>
      <div className="h-screen">
        <div className="max-w-4xl  pt-10 grid grid-cols-3 max-[700px]:grid-cols-2 max-[700px]:mx-3 max-[500px]:grid-cols-1 gap-3 mx-auto">
          {data &&
            data.briktirilganlar &&
            Object.values(data.briktirilganlar[id]).map((prev, index) => {
              const { name, phone, qoshimcha } = prev;
              return (
                <div
                  key={phone}
                  className="card py-2 bg-neutral mx-auto w-full text-neutral-content "
                >
                  <div className="card-body items-center text-center">
                    <h2 className="card-title text-wrap">{name} !</h2>
                    <p>Tel: {phone}</p>
                    <p>Malumot: {qoshimcha}</p>
                    <div className="card-actions justify-end">
                      <button
                        onClick={() => {
                          document.getElementById("my_modal_2").showModal();
                          setIndex(index);
                        }}
                        className="btn btn-primary"
                      >
                        Ochirish
                      </button>
                    </div>
                  </div>
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

export default Biriktirilgan;
