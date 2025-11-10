import { CellSimple, CellHeader, CellList, Container } from "@maxhub/max-ui";

function getTasksByDate(tasks) {
    const result = {}
    tasks.sort((a, b) => a.time - b.time);
    for (var task of tasks) {
        const taskDate = new Date(task.time);
        const year = taskDate.getFullYear();
        const month = taskDate.getMonth();
        const day = taskDate.getDate();
        if (result[year] == null) {
            result[year] = new Map();
        }
        if (result[year][month] == null) {
            result[year][month] = new Map();
        }
        if (result[year][month][day] == null) {
            result[year][month][day] = [];
        }
        result[year][month][day].push(task);
    }
    return result;
}

function getTasksForToday(tasks) {
    const now = new Date();
    return tasks[now.getFullYear()][now.getMonth()][now.getDate()];
}

function getTasksForTomorrow(tasks) {
    const tomorrow = (new Date());
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tasks[tomorrow.getFullYear()][tomorrow.getMonth()][tomorrow.getDate()];
}

function getTasksForMonth(tasks) {
    const daTomorrow = (new Date());
    daTomorrow.setDate(daTomorrow.getDate() + 2);
    const result = []
    for (var day of Object.keys(tasks[daTomorrow.getFullYear()][daTomorrow.getMonth()])) {
        if (day >= daTomorrow.getDate()) {
            result.push(...tasks[daTomorrow.getFullYear()][daTomorrow.getMonth()][day]);
        }
    }
    return result
}

function getTaskView(task) {
    const now = new Date();
    const taskDate = new Date(task.time);

    if (taskDate < now) {
        return <CellSimple
            before={<i className="fa fa-check-circle"></i>}
            title={task.name}
            subtitle={task.time}
        />
    } else {
        return <CellSimple
            before={<i className="fa fa-circle"></i>}
            title={task.name}
            subtitle={task.time}
        />
    }
}

function getViewForSection(title, tasks) {
    let tasksView = [];
    for (var task of tasks) {
        tasksView.push(getTaskView(task));
    }
    return (
        <CellList
            header=<CellHeader>{title}</CellHeader>
        >
            {tasksView}
        </CellList>
    );
}

function TasksView() {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayInMonth = new Date();
    dayInMonth.setDate(dayInMonth.getDate() + 2);
    const tasks = [
        {
            name: "Новая задача",
            time: `2025-11-${today.getDate()} 10:00`
        },
        {
            name: "Новая задача 2",
            time: `2025-11-${today.getDate()} 11:00`
        },
        {
            name: "Задача на завтра 1",
            time: `2025-11-${tomorrow.getDate()} 09:00`
        },
        {
            name: "Задача на завтра 2",
            time: `2025-11-${tomorrow.getDate()} 18:00`
        },
        {
            name: "Задача на месяц",
            time: `2025-11-${dayInMonth.getDate()} 23:59`
        },
    ];
    const views = [];

    const taskMap = getTasksByDate(tasks);
    views.push(getViewForSection("Задачи на сегондя", getTasksForToday(taskMap)));
    views.push(getViewForSection("Задачи на завтра", getTasksForTomorrow(taskMap)));
    views.push(getViewForSection("Задачи на месяц", getTasksForMonth(taskMap)));

    return (
        <Container>
            {views}
        </Container>
    )
}

export default TasksView;
