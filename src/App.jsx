import { useEffect, useState } from "react";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import ShowTask from "./components/ShowTask";
import "./App.css";

export default function App() {
  // 1. Initialize Tasks from LocalStorage (or empty array if none)
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // 2. Initialize Theme from LocalStorage (or default to 'light')
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // 3. State to track which task is being edited
  const [editingTask, setEditingTask] = useState(null);

  // 4. Save Tasks to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // 5. Save Theme to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    /* The dynamic class below is the secret. 
       It keeps "App" for your layout and adds the theme name 
       (e.g., "App dark" or "App gOne") to change colors.
    */
    <div className={"App " + theme}>
      <div className="container">
        <Header theme={theme} setTheme={setTheme} />
        
        <AddTask 
          taskList={tasks} 
          setTaskList={setTasks} 
          editingTask={editingTask} 
          setEditingTask={setEditingTask} 
        />
        
        <ShowTask 
          taskList={tasks} 
          setTaskList={setTasks} 
          setEditingTask={setEditingTask} 
        />
      </div>
    </div>
  );
}