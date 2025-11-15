import { Button, IconButton, CellAction, CellInput, CellList, CellSimple, Flex, Panel, Textarea, Typography, Input } from "@maxhub/max-ui";
import { useState, useEffect } from "react";
import { useModalWindow } from "react-modal-global";
import "react-modal-global/styles/modal.scss"

function Tag(props) {
    return <CellSimple title={props.name} after={<IconButton mode="tertiary" appearance="negative"><i className="fa-solid fa-trash" onClick={props.onDelete} /></IconButton>} />
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function getValidationIcon(condition) {
    return condition() ?
        <i className="text-green-600 fa-solid fa-check" /> :
        <i className="text-red-600 fa-solid fa-xmark" />
}

function TaskEditorModal(props) {
    const task = props.task;
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    const [name, setName] = useState(task.name);
    const [description, setDescription] = useState(task.comment);
    const [tagName, setTagName] = useState("");
    const [tags, setTags] = useState(task.tags || []);
    const [date, setDate] = useState(task.dueDate || formatDate(tomorrow));
    const [interval, setInterval] = useState(String(task.repeatInterval || 1));
    const [repeats, setRepeats] = useState(String(task.repeatCount || 0));

    const modal = useModalWindow()
    const handleCancel = () => {
        setName(task.name);
        setDescription(task.description);
        setTagName("");
        setTags(task.tags);
        setDate(task.dueDate || formatDate(tomorrow));
        setInterval(String(task.repeatInterval || 1));
        setRepeats(String(task.repeatCount || 0));
        modal.close();
    }
    const handleSave = () => {
        var updatedTask = { ...task, name: name, comment: description, tags: tags };
        if (task.category == "Scheduled") {
            updatedTask = {
                ...updatedTask,
                repeatInterval: Number(interval), repeatCount: Number(repeats),
                dueDate: date
            }
        }
        (async () => {
            if (props.onSave) {
                await props.onSave(updatedTask);
                modal.close();
            }
        })()
    }
    const handleDelete = () => {
        (async () => {
            if (props.onDelete) {
                await props.onDelete(task);
                modal.close()
            }
        })()
    }
    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }
    const handleTagNameChange = (event) => {
        setTagName(event.target.value);
    }
    const handleIntervalChange = (event) => {
        setInterval(event.target.value);
    }
    const handleRepeatsChange = (event) => {
        setRepeats(event.target.value);
    }
    const handleDateChange = (event) => {
        setDate(event.target.value);
    }
    const addTag = () => {
        if (tagName == "") {
            return;
        }
        tags.push({ name: tagName });
        setTags(tags);
        setTagName("");
    }
    const deleteTag = (tagId) => {
        setTags(tags.filter((tag, id) => id != tagId))
    }

    const isValidName = () => {
        return name != "";
    }
    const isValidRepeats = () => {
        return repeats != "" && !isNaN(Number(repeats)) && (Number(repeats) >= 0)
    }
    const isValidInterval = () => {
        return interval != "" && !isNaN(Number(interval)) && (Number(interval) > 0)
    }
    const isValidDate = () => {
        return (new Date(date)) && (new Date(date) > new Date())
    }

    const isValid = () => {
        return isValidName() && (
            (task.category != "Scheduled") ||
            isValidDate() && isValidInterval() && isValidRepeats()
        )
    }

    return (
        <Panel className="my-auto mx-2 h-auto">
            <Panel className="flex items-center pb-8">

                <Flex className="w-full px-3 pt-3 mb-4" direction="column">
                    <Typography.Body>Название</Typography.Body>
                    <Input className="w-full mt-2" compact={true} value={name}
                        iconBefore={
                            getValidationIcon(isValidName)
                        }
                        onChange={handleNameChange} />
                </Flex>

                <Flex className="w-full px-3 mb-4" direction="column">
                    <Typography.Body>Описание</Typography.Body>
                    <Textarea className="w-full mt-2" value={description}
                        onChange={handleDescriptionChange} />
                </Flex>
                <CellList header="Теги" mode="island" filled={true}>
                    {tags && tags.map((tag, id) => (
                        <Tag name={tag.name} onDelete={() => { deleteTag(id) }} />
                    ))}
                </CellList>
                <CellSimple>
                    <Flex direction="row" align="center" gapX={5}>
                        <Input placeholder="Новый тег" className="w-full" compact={true} value={tagName}
                            onChange={handleTagNameChange} />
                        <Button onClick={addTag}>
                            <i className="fa-solid fa-plus" />
                        </Button>
                    </Flex>
                </CellSimple>
                {task.category === "Scheduled" &&
                    <>
                        <Flex className="w-full px-3 mt-2 mb-4" direction="column">
                            <Typography.Body>Дата</Typography.Body>
                            <Input className="w-full mt-2" compact={true} placeholder={"2006-10-10 12:00"}
                                value={date}
                                onChange={handleDateChange}
                                iconBefore={
                                    getValidationIcon(isValidDate)
                                }
                            />
                        </Flex>

                        <Flex className="w-full px-3 mb-4" direction="column">
                            <Typography.Body>Повторения</Typography.Body>
                            <Input className="w-full mt-2" compact={true} value={repeats}
                                onChange={handleRepeatsChange}
                                iconBefore={
                                    getValidationIcon(isValidRepeats)
                                }
                            />
                        </Flex>
                        <Flex className="w-full px-3 mb-4" direction="column">
                            <Typography.Body>Интервал (минуты)</Typography.Body>
                            <Input className="w-full mt-2" compact={true} value={interval}
                                disabled={repeats === "0"}
                                onChange={handleIntervalChange}
                                iconBefore={
                                    getValidationIcon(isValidInterval)
                                }
                            />
                        </Flex>
                    </>
                }

                <Flex className="w-full px-3 mt-8" direction="column" gapY={12}>
                    <Button className="w-full" onClick={handleSave} disabled={!isValid()}>Сохранить</Button>
                    <Button className="w-full" onClick={handleCancel}>Отменить</Button>
                    {props.onDelete &&
                        <Button className="w-full" appearance="negative" onClick={handleDelete}>Удалить</Button>
                    }
                </Flex>
            </Panel>
        </Panel>
    );
}

export default TaskEditorModal;
