import { useState, useEffect } from "react";

export default function AddTask({ taskList, setTaskList, editingTask, setEditingTask }) {
  const [taskInput, setTaskInput] = useState("");

  // Sync input when edit mode is triggered
  useEffect(() => {
    if (editingTask) {
      setTaskInput(editingTask.name);
    } else {
      setTaskInput("");
    }
  }, [editingTask]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!taskInput.trim()) return;

    if (editingTask) {
      // UPDATE existing task
      const updatedTasks = taskList.map(task => 
        task.id === editingTask.id ? { ...task, name: taskInput.trim() } : task
      );
      setTaskList(updatedTasks);
      setEditingTask(null); // Exit edit mode
    } else {
      // ADD new task
      const date = new Date();
      const newTask = {
        id: date.getTime(),
        name: taskInput.trim(),
        time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
      };
      setTaskList([...taskList, newTask]);
    }
    setTaskInput("");
  }

  return (
    <>
      <section className="addTask">
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            autoComplete="off"
            name="task"
            maxLength={25}
            placeholder={editingTask ? "Edit Task" : "Add Task"}
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button type="submit">{editingTask ? "Update" : "Add"}</button>
        </form>
      </section>
    </>
  );
}