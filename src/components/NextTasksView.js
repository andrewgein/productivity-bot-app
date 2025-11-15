import { Container } from "@maxhub/max-ui";
import CategoryHeader from "./CategoryHeader";
import TaskListView from "./TaskListView";

function NextTasksView() {
    return (
        <Container className="w-full">
            <CategoryHeader title="Актуальные задачи" />
            <TaskListView category="Next"/>
        </Container>
    );
}

export default NextTasksView;
