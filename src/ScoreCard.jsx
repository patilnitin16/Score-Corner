import React, { useEffect, useState } from "react";

const ScoreCard = () => {
  const [data, setData] = useState([]);
  const [inputs, setInputs] = useState("");
  const [search, setSearch] = useState("")

  const inputHandler= (e) =>{
    setInputs(e.target.value);
  }

  const btnHandler = () =>{
    setSearch(inputs)
  }

  useEffect(() => {
    const apiCall = async () => {
      try {
        const response = await fetch(
          "https://api.cricapi.com/v1/cricScore?apikey={API_KEY}"
        );
        const resdata = await response.json();
        setData(resdata.data);
        console.log(resdata);
      } catch (e) {
        console.error(error);
      }
    };
    apiCall();
  }, []);

  return (
    <div>
      <div className="shadow-lg pb-[10px]">
        <div className="max-w-[1170px] mx-auto">
          <h1 className="font-bold lg:text-4xl sm:text-3xl text-blue-700 text-center py-[15px] underline">
            SPORTS SCORE CORNER
          </h1>
          <div className="flex items-center justify-center gap-[20px] lg:py-[10px] sm:py-[5px]">
            <input
              className="lg:py-[10px] lg:px-[10px] lg:w-[300px] sm:py-[5px] sm:px-[5px] sm:w-[240px] border-[1px] border-[black] rounded"
              type="text"
              placeholder=" Series,Team etc"
              value={inputs}
              onChange={(e)=>{
                inputHandler(e);
              }}
            />
            <button className="bg-blue-500 text-white lg:text-[20px] lg:py-[7px] lg:px-[18px] rounded-[8px] sm:text-[15px] sm:py-[15px] sm:px-[30px]"
            onClick={btnHandler}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1170px] mx-auto py-[10px] grid lg:grid-cols-3 sm:grid-cols-2">
        {data.map((elem, idx) => {
          return (
            <div className="flex flex-col flex-wrap gap-[10px] border-[1px] rounded-[10px] px-[10px] py-[5px] m-[20px_10px] shadow-xl mx-[20px]">
              <div>
                <h2 className="text-center font-bold text-lg">{elem.series}</h2>
                <h2 className="text-center text-xl">{elem.matchtype}</h2>
              </div>
              <div className="flex gap-[60px] items-center justify-around text-sm py-[15px]">
                <p className="text-center">{elem.t1}</p>
                <p className="text-center">{elem.t2}</p>
              </div>
              <div className="flex gap-[60px] items-center justify-around">
                <img
                  className="h-[50px] w-[50px] border-[1px] border-[black]"
                  src={elem.t1img}
                  alt="team1"
                />
                <img
                  className="h-[50px] w-[50px] border-[1px] border-[black]"
                  src={elem.t2img}
                  alt="team2"
                />
              </div>
              <div className="flex gap-[60px] items-center justify-around">
                <p>{elem.t1s}</p>
                <p>{elem.t2s}</p>
              </div>

              <p className="text-center text-lg">Status : {elem.status} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreCard;
