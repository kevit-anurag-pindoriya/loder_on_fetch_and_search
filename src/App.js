import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Loder1 from "./Loder1";
import Loder2 from "./Loder2";
function App() {
  const [data, setaData] = useState([]);
  const [input, setInput] = useState("");
  const [loder, setLoder] = useState(true);
  const [textLoder, setTextLoder] = useState(false);

  const mydata = async () => {
    const newdata = await axios("https://jsonplaceholder.typicode.com/users");

    setaData(newdata.data);

    setTimeout(() => {
      setLoder(false);
    }, 1000);
  };
  console.log(data);
  useEffect(() => {
    mydata();
  }, []);
  const changehandler = (e) => {
    console.log(e.target.value);
    setInput(e.target.value);
    setTextLoder(true);
    setTimeout(() => {
      setTextLoder(false);
    }, 600);
  };

  return (
    <>
      <div className="App">
        <div className="App__containt">
          {loder ? (
            <div className="loder">
              <Loder1></Loder1>
            </div>
          ) : (
            <div>
              <input
                type="text"
                className="App__input-text"
                onChange={(e) => changehandler(e)}
              ></input>
              <div>
                {textLoder ? (
                  <div className="loder">
                    <Loder2></Loder2>
                  </div>
                ) : (
                  <div>
                    {data
                      .filter((res) =>
                        res.name
                          .toLowerCase()
                          .trim()
                          .includes(input.toLowerCase())
                      )
                      .map((e, index, arr) => (
                        <div key={e.div} className="App__option">
                          {e.name}
                          {console.log("Langth is 'e' ==> ", e.langth)}

                          {arr.langth === 0 && <p>No record found</p>}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
