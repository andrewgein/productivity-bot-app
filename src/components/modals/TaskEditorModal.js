import { Button, IconButton, CellAction, CellInput, CellList, CellSimple, Flex, Input, Panel, Textarea, Typography } from "@maxhub/max-ui";
import { useEffect, useState } from "react";
import { useModalWindow } from "react-modal-global";
import "react-modal-global/styles/modal.scss"

function Tag(props) {
    return <CellSimple title={props.name} after={<IconButton mode="tertiary" appearance="negative"><i className="fa-solid fa-trash" onClick={props.onDelete} /></IconButton>} />
}

function TaskEditorModal(props) {
    const task = props.task;

    const [name, setName] = useState(task.name);
    const [description, setDescription] = useState(task.comment);
    const [tagName, setTagName] = useState("");
    const [tags, setTags] = useState(task.tags || []);


    const modal = useModalWindow()
    const handleCancel = () => {
        setName(task.name);
        setDescription(task.description);
        setTagName("");
        setTags(task.tags);
        modal.close();
    }
    const handleSave = () => {
        var updatedTask = { ...task, name: name, comment: description, tags: tags };
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

    return (
        <Panel className="my-auto mx-2 h-auto">
            <Panel className="flex items-center pb-8">

                <Flex className="w-full px-3 pt-3 mb-4" direction="column">
                    <Typography.Body>Название</Typography.Body>
                    <Input className="w-full mt-2" compact={true} value={name}
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

                <Flex className="w-full px-3 mt-8" direction="column" gapY={12}>
                    <Button className="w-full" onClick={handleSave}>Сохранить</Button>
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
