import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as ServerApi from "utils/serverApi";
import "./alltasks.scss";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newToken, setNewToken] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchTasks = async () => {
    const token = Cookie.get("access_token");
    await ServerApi.alltasks(token)
      .then((res) => {
        setTasks(res.data);
      })
      .catch(async (err) => {
        // console.log("sending req for refresh tokens");
        await ServerApi.refreshTokens(Cookie.get("refresh_token"))
          .then(async (result) => {
            // console.log(result.data);
            Cookie.set("access_token", result.data.access_token);
            Cookie.set("refresh_token", result.data.refresh_token);
            setNewToken(!newToken);
          })
          .catch((error) => {
            console.log(error);
          });
        console.log("Server ERROR");
      });
  };

  const handleEdit = (e) => {
    const id = e.target.getAttribute("taskid");
    navigate(`/edittask/${id}`);
  };

  useEffect(() => {
    console.log("AllTasks page rerender");
    fetchTasks();
  }, [newToken]);

  return (
    <div className="tasks-page">
      {tasks.map((task, index) => {
        return (
          <div className="task" key={index}>
            <div>
              <div className="task-id-edit">
                <p>{`Task ID: ${task.id}`}</p>
                <button
                  className="edit-task-btn"
                  taskid={task.id}
                  onClick={handleEdit}
                >
                  <FontAwesomeIcon
                    className="edit-icon"
                    icon={faPenToSquare}
                    style={{ color: "#ffffff" }}
                  />
                  edit
                </button>
              </div>
              <h1>{`Title: ${task.title}`}</h1>
              <p>{`Author: ${task.author}`}</p>
              <p>{`Description: ${task.description}`}</p>
            </div>
            <div>
              <p>{`Status: ${task.status}`}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllTasks;
