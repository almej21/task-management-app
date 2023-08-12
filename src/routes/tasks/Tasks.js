import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import * as ServerApi from "utils/serverApi";
import "./tasks.scss";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const token = Cookie.get("access_token");
    await ServerApi.alltasks(token)
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log("Server ERROR");
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    // <div className="test">hello</div>
    <div className="tasks-page">
      {tasks.map((task) => {
        return (
          <div className="task">
            <p>{`Task ID: ${task.id}`}</p>
            <h1>{`Title: ${task.title}`}</h1>
            <h3>{`Author: ${task.author}`}</h3>
            <p>{`Description: ${task.description}`}</p>
            <p>{`Status: ${task.status}`}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Tasks;
