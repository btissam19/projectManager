window.addEventListener('DOMContentLoaded', (event) => {
    let tasks = document.getElementsByClassName('single-task');
    let totalTasks = tasks.length;
    let completedTasks = 0;
    
    for(let task of tasks) {
        if(task.classList.contains('task-completed')) {
            completedTasks++;
        }
    }

    let chartContainer = document.querySelector('.chart-container');
    let noTasksMessage = document.querySelector('.no-tasks-message');

    if (totalTasks === 0) {
        chartContainer.style.display = 'none';
        noTasksMessage.style.display = 'block';
    } else {
        let uncompletedTasks = totalTasks - completedTasks;
        completedTasks = (completedTasks * 100) / totalTasks;
        uncompletedTasks = (uncompletedTasks * 100) / totalTasks;

        var commercesChart = new Chart(document.getElementById('commercesChart'), {
            type: 'doughnut',
            data: {
                labels: [`completed ${completedTasks.toFixed(2)}%`, `uncompleted ${uncompletedTasks.toFixed(2)}%`],
                datasets: [{
                    data: [completedTasks, uncompletedTasks],
                    backgroundColor: ['#06B6D4', '#CFFAFE'],
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'bottom'
                }
            }
        });
    }
    
    let projects = document.getElementsByClassName('single-project');
    let completedProjects = 0;
    let inProgressProjects = 0;
    let cancelledProjects = 0;
    let totalProject=projects.length

    for(let project of projects) {
        if(project.classList.contains('completed')) {
            completedProjects++;
        } else if (project.classList.contains('in_progress')) {
            inProgressProjects++;
        } else if (project.classList.contains('cancelled')) {
            cancelledProjects++;
        }
    }

    let chartContainerProject = document.querySelector('.chart-container-project');
    let noProjectMessage = document.querySelector('.no-project-message');
         if (totalProject === 0) {
        chartContainerProject.style.display = 'none';
        noProjectMessage.style.display = 'block';
}
  else {
    completedProjects=(completedProjects*100)/totalProject
    inProgressProjects=(inProgressProjects*100)/totalProject
    cancelledProjects=(cancelledProjects*100)/totalProject
    }

    var commercesChartTow = new Chart(document.getElementById('commercesChartTow'), {
        type: 'doughnut',
        data: {
            labels: [`completed ${completedProjects.toFixed(2)}%`, `in progress ${inProgressProjects.toFixed(2)}%`, `cancelled ${cancelledProjects.toFixed(2)}%`],
            datasets: [{
                data: [completedProjects, inProgressProjects, cancelledProjects],
                backgroundColor: ['#06B6D4', '#6EE7F9', '#CFFAFE'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: 'bottom'
            }
        }
    });

    const menuBtn = document.getElementById('menuBtn');
    const sideNav = document.getElementById('sideNav');

    menuBtn.addEventListener('click', () => {
        sideNav.classList.toggle('hidden'); 
    });
            const nameElements = document.querySelectorAll('[data-email]');
            nameElements.forEach(el => {
                const email = el.getAttribute('data-email');
                const name = email.split('@')[0].split('.').join(' ').split(' ')[0];
                el.textContent = `${name}  Dashboard `;
            });
        });