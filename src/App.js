import '@maxhub/max-ui/dist/styles.css'
import { useState } from 'react';
import { MaxUI, Panel, Flex, Container, ToolButton, Spinner } from "@maxhub/max-ui";
import NavigationBar from './components/NavigationBar';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import NextTasksView from './components/NextTasksView';
import ScheduledTasksView from './components/ScheduledTasksView';
import SomedayTasksView from './components/SomedayTasksView';
import { ModalContainer } from 'react-modal-global';
import { Modal } from './components/Modal';

const App = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <MaxUI className="h-full">
            <BrowserRouter>
                <NavigationBar />
                <Panel className="flex-1 pt-6 overflow-auto">
                    <Routes>
                        <Route path="/" element={<NextTasksView />} />
                        <Route path="/scheduled" element={<ScheduledTasksView />} />
                        <Route path="/someday" element={<SomedayTasksView />} />
                    </Routes>
                </Panel>
                <ModalContainer controller={Modal} />
            </BrowserRouter>
        </MaxUI>
    );
}

export default App;
