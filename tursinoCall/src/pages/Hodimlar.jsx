import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
//firebase
import { db } from "../firebase/firebase";
import { set, ref, get, onValue } from "firebase/database";

function Hodimlar() {
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

  return (
    <div className="bgimgurl ">
      <div className="max-w-4xl mx-auto flex justify-center items-center h-[100vh] gap-6 max-[700px]:gap-3 max-[550px]:flex-col">
        <div className="card h-[220px] bg-base-100 image-full max-w-96 shadow-xl max-[800px]:mx-4 max-[550px]:mx-auto">
          <figure>
            <img
              className="w-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAyFxOq4vNGugWWzmo3nHk4lhQ9EoMaaaqXv2aZXfb3L3vSrZ-liDXXULrMvIY-6v2-g4&usqp=CAU"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Biriktirilgan !</h2>
            <p>
              Menga biriktirilgan mijozlar soni{" "}
              {data &&
                data.briktirilganlar &&
                Object.values(data.briktirilganlar[id]).length}
            </p>
            <Link to={`/attached/${id}`}>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Korish</button>
              </div>
            </Link>
          </div>
        </div>
        {/* //mijozlar */}
        <div className="card h-[220px] bg-base-100 image-full max-w-96 shadow-xl max-[800px]:mx-4 max-[550px]:mx-auto">
          <figure>
            <img
              className="w-full"
              src="https://aniq.uz/photos/news/Z4y276FoWUhpRbT.jpeg"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Mijozlar !</h2>
            <p>
              Biz bilan boglanmoqchi bolgan mijozlar soni ({" "}
              {data &&
                data.information &&
                Object.values(data.information).length}{" "}
              ) ta
            </p>
            <Link to={`/customers/${id}`}>
              {" "}
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Korish</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hodimlar;
