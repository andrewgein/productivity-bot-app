import { useCallback, useEffect, useState } from "react";
import { Button, CellList, CellSimple, Spinner, Container, Flex, IconButton } from "@maxhub/max-ui";
import StorageManager from "../StorageManager";
import { Modal } from "./Modal";
import TaskEditorModal from "./modals/TaskEditorModal";
import Api from "../Api";

function TaskListView(props) {
    const [tasks, setTasks] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            if (tasks == null) {
                const storage = StorageManager.getInstance()
                const category = props.category || ""
                setTasks((await storage.getTasks()).sort((a, b) => a.id - b.id)
                    .filter(t => t.category === category))
            }
            setLoading(false);
        }
        getData();
    })

    if (loading) {
        return (
            <Flex className="pt-32" justify="center">
                <Spinner appearance="primary" size={50} />
            </Flex>
        );
    }

    const getTags = (task) => {
        if (task.tags == null) {
            return ""
        }
        const tags = task.tags.map(t => t.name)
        return tags.join(", ")
    }

    const createTask = () => {
        let task = {};
        task.name = "";
        task.category = props.category;
        task.description = "";
        task.tags = [];
        return task;
    }

    const toggleTask = (task) => {
        if (task.category == "Scheduled") {
            return;
        }
        task.complete = !task.complete;
        setTasks(tasks =>
            tasks.map(t => t.id == task.id ? { ...task } : t)
        );
        (async () => {
            await Api.updateTask(task);
        })();
    }

    const isCompleted = (task) => {
        if (task.category == "Scheduled") {
            const endTime = new Date(task.dueDate)
            endTime.setMinutes(endTime.getMinutes() + task.repeatInterval * task.repeatCount)
            return (new Date() >= endTime);
        }
        return task.complete
    }


    const views = []
    for (let taskId in tasks) {
        views.push(
            <CellSimple key={taskId} className="static"
                before={
                    <IconButton mode="tertiary" appearance="contrast-static" className="z-0 relative"
                        onClick={() => toggleTask(tasks[taskId])}
                    >
                        {isCompleted(tasks[taskId]) ? <i className="relative fa fa-check-circle" /> : <i className="relative fa fa-circle" />}
                    </IconButton >
                }
                after={
                    < Button mode="secondary" onClick={() => {
                        Modal.open(TaskEditorModal, {
                            task: tasks[taskId],
                            onSave: async (updatedTask) => {
                                await Api.updateTask(updatedTask);
                                setTasks(tasks =>
                                    tasks.map(task =>
                                        task.id == tasks[taskId].id
                                            ? { ...task, ...updatedTask }
                                            : task
                                    ));
                            },
                            onDelete: async (task) => {
                                await Api.deleteTask(task.id);
                                setTasks(tasks => tasks.filter(t => t.id != task.id));
                            }
                        })
                    }
                    } >
                        <i className="fa-solid fa-pencil" />
                    </Button >
                }
                title={tasks[taskId].name}
                subtitle={getTags(tasks[taskId])}
                overline={tasks[taskId].dueDate}
            />);
    }

    return (
        <Container className="px-2 pt-6">
            <CellList>{views}</CellList>
            <IconButton className="absolute bottom-4 right-4 z-2" onClick={() => {
                Modal.open(TaskEditorModal, {
                    task: createTask(),
                    onSave: async (createdTask) => {
                        createdTask = await Api.addTask(createdTask);
                        setTasks([...tasks, createdTask]);
                    }
                });
            }}>
                <i className="fa-solid fa-plus" />
            </IconButton>
        </Container>
    );
}

export default TaskListView;
