import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookie from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readFromLocalStorage } from "utils/localStorageHelpers";
import * as ServerApi from "utils/serverApi";
import "./alltasks.scss";

const AllTasks = () => {
  const global_is_logged_in = readFromLocalStorage("is_logged_in");
  const [tasks, setTasks] = useState([]);
  const [newToken, setNewToken] = useState(false);
  const taskRef = useRef(null);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const token = Cookie.get("access_token");
    await ServerApi.alltasks(token)
      .then((res) => {
        setTasks(res.data);
      })
      .catch(async (err) => {
        await ServerApi.refreshTokens(Cookie.get("refresh_token"))
          .then(async (result) => {
            Cookie.set("access_token", result.data.access_token);
            Cookie.set("refresh_token", result.data.refresh_token);
            setNewToken(true);
          })
          .catch((error) => {
            console.log(error.response.data.msg);
          });
        console.log("Server ERROR");
      });
  };

  const handleEdit = (e) => {
    const id = e.target.getAttribute("taskid");
    navigate(`/edittask/${id}`);
  };

  const handleDelete = (e) => {
    const accToken = Cookie.get("access_token");
    var id = e.target.id;
    const task = e.currentTarget.parentElement;

    if (id === "") {
      id = e.currentTarget.id;
    }
    ServerApi.deletetask(accToken, id)
      .then((res) => {
        console.log("you have deleted the task");
        task.parentElement.classList.add("fade-out");
        setTimeout(() => {
          task.parentElement.remove();
        }, 1000);
      })
      .catch((err) => {
        console.log("error with deleting the task!");
      });
  };

  useEffect(() => {
    fetchTasks();
  }, [newToken]);

  return (
    <div className="tasks-page">
      {!global_is_logged_in ? (
        <div>
          <h1 className="login-title">please log in to view tasks</h1>
        </div>
      ) : (
        <div className="tasks-view">
          <h1 className="tasks-page-title">View tasks and edit</h1>
          <div className="tasks">
            {tasks.map((task, index) => {
              return (
                <div className="task" key={index} ref={taskRef}>
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
                          style={{ color: "#000000" }}
                        />
                        edit
                      </button>
                    </div>
                    <h1>{`Title: ${task.title}`}</h1>
                    <p>{`Author: ${task.author}`}</p>
                    <p>{`Description: ${task.description}`}</p>
                  </div>
                  <p>{`Due Date: ${task.dueDate}`}</p>
                  <div className="status-delete-div">
                    <p>{`Status: ${task.status}`}</p>
                    <button
                      className="delete-task-btn"
                      id={`${task.id}`}
                      onClick={handleDelete}
                    >
                      <FontAwesomeIcon
                        className="edit-icon"
                        icon={faTrash}
                        style={{ color: "#ff0000" }}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTasks;
