interface Project {
    id: number;
    title: string;
    description: string
}

const projects: Project[] = [
    {
        id: 1,
        title: "Разработка лендинга",
        description: "Создание современного лендинга для IT-стартапа с анимациями и адаптивным дизайном."
    },
    {
        id: 2,
        title: "Мобильное приложение",
        description: "Приложение для управления личными финансами с графиками и уведомлениями."
    },
    {
        id: 3,
        title: "Интернет-магазин",
        description: "Разработка e-commerce платформы с корзиной, оплатой и личным кабинетом пользователя."
    }]

const ProjectsPage = () => {
    return (
        <div className="p-4">
            <h1 className=" flex justify-center text-2xl font-bold mb-4">Projects</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 columns-sm gap-4 ">
                {projects.map(project => (
                    <div
                        key={project.id}
                        className="bg-white/20 p-6 rounded-lg shadow-lg"
                    >
                        <h2 className=" flex justify-center text-lg font-semibold mb-2 px-4 py-2">{project.title}</h2>
                        <p className="flex justify-center text-sm p-4 ">{project.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsPage;