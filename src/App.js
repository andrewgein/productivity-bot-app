import '@maxhub/max-ui/dist/styles.css'
import { useState } from 'react';
import { MaxUI, Panel, Flex, Container, ToolButton } from "@maxhub/max-ui";
import TasksView from './components/TasksView';

const App = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="full-height-child">
            <MaxUI>
                <Container>
                    <Panel style={{ marginTop: "15px", marginBottom: "15px" }}>
                        < Flex direction="row" gap={32} >
                            <ToolButton onClick={() => setActiveTab(0)}>Задачи</ToolButton>
                            <ToolButton onClick={() => setActiveTab(1)}>Календарь</ToolButton>
                        </Flex >
                    </Panel >

                    {(activeTab === 0) &&
                        <TasksView />
                    }
                </Container >
            </MaxUI >
        </div >
    )
}

export default App;
