import { Container } from "@maxhub/max-ui";
import CategoryHeader from "./CategoryHeader";
import TaskListView from "./TaskListView";

function ScheduledTasksView() {
    return (
        <Container className="w-full">
            <CategoryHeader title="Запланированные задачи" />
            <TaskListView category="Scheduled"/>
        </Container>
    );

}

export default ScheduledTasksView
