import { CellList, CellSimple, Container, Spinner, Panel, Typography, Flex, Button } from "@maxhub/max-ui";
import { useEffect, useState } from "react";
import StorageManager from "../StorageManager";
import CategoryHeader from "./CategoryHeader";
import TaskListView from "./TaskListView";

function NextTasksView() {
    return (
        <Container className="w-full">
            <CategoryHeader title="Актуальные задачи" />
            <TaskListView />
        </Container>
    );
}

export default NextTasksView;
