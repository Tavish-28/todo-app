import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash, Edit } from "lucide-react";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.title.trim()) return;
    setTasks([...tasks, { ...newTask, completed: false, id: Date.now() }]);
    setNewTask({ title: "", description: "" });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="flex gap-2 mb-4">
        <Input
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Task title"
        />
        <Button onClick={addTask} className="flex items-center gap-2">
          <Plus size={16} /> Add
        </Button>
      </div>
      <Textarea
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        placeholder="Task description (optional)"
        className="mb-4"
      />
      <div className="space-y-2">
        {tasks.map((task) => (
          <Card key={task.id} className="p-3 flex items-center gap-3">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleCompletion(task.id)}
            />
            <div className="flex-1">
              <h2 className={`font-medium ${task.completed ? "line-through" : ""}`}>{task.title}</h2>
              {task.description && <p className="text-sm text-gray-500">{task.description}</p>}
            </div>
            <Button size="icon" onClick={() => editTask(task.id, newTask)}>
              <Edit size={16} />
            </Button>
            <Button size="icon" variant="destructive" onClick={() => deleteTask(task.id)}>
              <Trash size={16} />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
