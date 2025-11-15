import { Container } from "@maxhub/max-ui";
import CategoryHeader from "./CategoryHeader";
import TaskListView from "./TaskListView";

function SomedayTasksView() {
    return (
        <Container className="w-full">
            <CategoryHeader title="Когда-нибудь" />
            <TaskListView category="Someday" />
        </Container>
    );
}

export default SomedayTasksView;
