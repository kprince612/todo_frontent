import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Todo.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Todo = ({ userEmail }) => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");

    useEffect(() => {
        if (userEmail) {
            axios.get(`http://localhost:5000/tasks/${userEmail}`)
                .then((res) => setTasks(res.data));
        }
    }, [userEmail]);

    if (task.trim () === 0) {
        alert ("enter task");
        return;
    }

    const addTask = () => {
        if (!task.trim()) return;
        axios.post("http://localhost:5000/tasks", { text: task, email: userEmail })
            .then((res) => {
                setTasks([...tasks, res.data]);
                setTask("");
            });
    };

    const markAsDone = (id) => {
        axios.put(`http://localhost:5000/tasks/${id}`).then(() => {
            setTasks(tasks.map(task =>
                task._id === id ? { ...task, completed: true } : task
            ));
        });
    };

    const pendingTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    const chartData = {
        labels: ["Pending", "Completed"],
        datasets: [
            {
                data: [pendingTasks.length, completedTasks.length],
                backgroundColor: ["#EF4444", "#35D399"]
            },
        ],
    };

    return (
        <div className="container1">
        <div className="chart-container">
            <Doughnut id="graph" data={chartData} />
        </div>

        <div className="todo-box">
            <h1>To-Do List</h1>

            <div className="todo-input">
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Add a new task..."
                />
                <button onClick={addTask}>Add</button>
            </div>

            <div className="task-section">
                <div className="task-list-container">
                    <h2 id="heading2">Pending Tasks</h2>
                    <ul className="task-list">
                        {pendingTasks.map((t) => (
                            <motion.li
                                key={t._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="task-item"
                            >
                                {t.text}
                                <button className="done-btn" onClick={() => markAsDone(t._id)}>Done</button>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                <div className="task-list-container">
                    <h2 id="heading2">Completed Tasks</h2>
                    <ul className="task-list">
                        {completedTasks.map((t) => (
                            <li key={t._id} className="task-item completed">{t.text}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Todo;
