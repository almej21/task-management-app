import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as DateHelpers from "utils/dateHelpers";
import * as ServerApi from "utils/serverApi";
import ButtonCom from "../../components/Button/ButtonCom";

import "./edittask.scss";

const EditTask = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [newToken, setNewToken] = useState(false);
  const { id } = useParams();
  const taskIdParam = parseInt(id);
  const [minDate, setMinDate] = useState(DateHelpers.getTodayDate());

  const handleSubmit = () => {
    const accToken = Cookie.get("access_token");
    const editedTaskMsg = document.getElementById("edited-msg");
    const editTaskDiv = document.getElementById("edit-div");

    const editedTask = {
      id: taskIdParam,
      title: document.getElementById("edit-task-title").value,
      description: document.getElementById("edit-task-description").value,
      duedate: document.getElementById("edit-task-date").value,
      author: document.getElementById("edit-task-by").value,
      status: document.getElementById("edit-task-status").value,
    };
    ServerApi.edittask(accToken, editedTask)
      .then((res) => {
        console.log(res);
        editedTaskMsg.classList.remove("hidden");
        editTaskDiv.classList.add("hidden");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            setNewToken(!newToken);
          })
          .catch((error) => {
            console.log(error);
          });
        console.log("Server ERROR");
      });
  };

  useEffect(() => {
    console.log("edit Task page rerender");
    fetchTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      setFilteredTasks(
        tasks.filter((task) => {
          return task.id === taskIdParam;
        })
      );
    }
  }, [tasks]);

  return (
    <div className="edit-task-page">
      <h1 className="hidden" id="edited-msg">
        You have successfully edited the task
      </h1>
      {filteredTasks.map((task, index) => {
        return (
          <div key={index} className="task-edit-div" id="edit-div">
            <div className="edit-input">
              <label>Title:</label>
              <input id="edit-task-title" placeholder={task.title}></input>
            </div>
            <div className="edit-input">
              <label>Description:</label>
              <input
                id="edit-task-description"
                placeholder={task.description}
              ></input>
            </div>
            <div className="edit-input">
              <label>Due date:</label>
              <input
                id="edit-task-date"
                type="date"
                placeholder={task.duedate}
                min={minDate}
              ></input>
            </div>
            <div className="edit-input">
              <label>Status:</label>
              <select name="status" id="edit-task-status">
                <option value="on going">on going</option>
                <option value="ready for review">ready for review</option>
                <option value="done">done</option>
              </select>
            </div>
            <div className="edit-input">
              <label>edited by:</label>
              <input id="edit-task-by" placeholder={task.author}></input>
            </div>
            <ButtonCom onClick={handleSubmit} btnValue="SUBMIT"></ButtonCom>
          </div>
        );
      })}
    </div>
  );
};

export default EditTask;
