import Cookie from "js-cookie";
import { useState } from "react";
import * as DateHelpers from "utils/dateHelpers";
import * as ServerApi from "utils/serverApi";
import ButtonCom from "../../components/Button/ButtonCom";
import InputCom from "../../components/Input/InputCom";
import "./newtask.scss";

function clearFormInputs() {
  const form = document.getElementById("newtask-form");

  if (form) {
    const inputElements = form.getElementsByTagName("input");

    for (let i = 0; i < inputElements.length; i++) {
      const input = inputElements[i];
      if (input.type !== "submit" && input.type !== "button") {
        input.value = "";
      }
    }
  }
}

const descStyle = {
  height: "15rem",
};
const btnStyle = {
  marginTop: "3rem",
};

const NewTask = () => {
  const [TaskTitle, setTaskTitle] = useState("");
  const [TaskDescription, setTaskDescription] = useState("");
  const [minDate, setMinDate] = useState(DateHelpers.getTodayDate());

  const handleCreate = async (e) => {
    e.preventDefault();
    const accToken = Cookie.get("access_token");

    const data = {
      author: "almog",
      title: document.getElementById("task_title-input").value,
      description: document.getElementById("task-description").value,
      status: document.getElementById("task-status").value,
      dueDate: document.getElementById("input-date").value,
    };
    await ServerApi.newtask(accToken, data)
      .then((res) => {
        console.log(res);
        const newTaskForm = document.getElementById("newtask-form");
        const newTaskMsg = document.getElementById("new-task-added");
        newTaskForm.classList.add("hidden");
        newTaskMsg.classList.remove("hidden");
        clearFormInputs();
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err);
      });
  };

  const handleAddNewTask = (e) => {
    e.preventDefault();
    const newTaskForm = document.getElementById("newtask-form");
    const newTaskMsg = document.getElementById("new-task-added");
    newTaskForm.classList.remove("hidden");
    newTaskMsg.classList.add("hidden");
  };

  return (
    <div className="new-task-page">
      <div id="new-task-added" className="hidden">
        <h1>New Task was added.</h1>
        <ButtonCom
          onClick={handleAddNewTask}
          btnValue="CREATE TASK"
        ></ButtonCom>
      </div>
      <form id="newtask-form">
        <InputCom
          inputType="text"
          placeholder="Title"
          id="task-title"
          inputId="task_title-input"
          className="input-com"
          setValue={setTaskTitle}
          value={TaskTitle}
        />
        <textarea placeholder="Description" id="task-description"></textarea>
        <div className="select-status-div">
          <label>Status:</label>
          <select name="status" id="task-status">
            <option value="on going">on going</option>
            <option value="ready for review">ready for review</option>
            <option value="done">done</option>
          </select>
        </div>
        <div className="date-div">
          <label>Due date::</label>
          <input id="input-date" type="date" min={minDate}></input>
        </div>
        <div>
          <ButtonCom
            onClick={handleCreate}
            btnValue="CREATE NEW TASK"
          ></ButtonCom>
        </div>
      </form>
    </div>
  );
};

export default NewTask;
