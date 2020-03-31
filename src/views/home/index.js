import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

import Button from "../../components/button";

const Home = () => {
  const [socket, setSocket] = useState(null);
  const [id, setId] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:3333", {
      query: { user: +id }
    });

    socket.on("lobby", user => {
      setSocket(user);
    });
  }, [id]);

  const handleChange = event => {
    setId(event.target.value);
  };

  const handleClick = async () => {
    const { data } = await axios.post("http://localhost:3333/lobby");

    console.log(data);
  };

  return (
    <div>
      {console.log("socket", socket)}
      <input type="text" onChange={event => handleChange(event)} value={id} />
      <Button primary large onClick={() => handleClick()} type="submit">
        Refresh
      </Button>
    </div>
  );
};

export default Home;
