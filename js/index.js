window.onload = () => {

    // sélécteurs principaux
    
    const ul = document.querySelector('ul');
    // récupérer les élements de mon formulaire
    const form = document.querySelector('form');
    const input = document.querySelector('form > input');

    // écouter l'évenement submit pour récupérer les entrées en définissant une fonction de callback
    form.addEventListener('submit', (event) => {
        // je stoppe l'evenement pour éviter le rechargement de la page
        event.preventDefault();
        // je stocke l'entrée de mon input dans une cosnt
        const value = input.value;
        // je vide mon input
        input.value = '';
        // j'ajoute ma capture à ma liste de todo
        addTodo(value);
    });
    
    // déclarer un tableau de todo
    const todos = [
        {
            text: 'je suis une tâche à accomplir',
            done: false
        },
        {
            text: 'je suis une seconde tâche à accomplir',
            done: true
        }
    ]
    
    // Les fonctions nécéssaires au bon fonctionnement de mon projet
    
    //Parcourir le tableau todo et pour chaque itération je crée une nouvelle représentation de l'entrée pour la transférer sur le dom
    const displayTodo = () => {
        const todoNode = todos.map((todo, index) => {
            return createTodoElement(todo, index);
        })
        ul.innerHTML = '';
        ul.append(...todoNode);
    };
    //Fonction pour transformer une todo particulière en élément html
    const createTodoElement = (todo, index) => {
        const li = document.createElement('li');
        const buttonDelete = document.createElement('button');
        buttonDelete.innerHTML =`<i class="fas fa-trash-alt" alt="delete"></i>`;
        // Je rajoute un évenement à mon bouton delete
        buttonDelete.addEventListener('click', () => {
            // Si je clique sur delete, pas de changement toogle possible (la tâche suivante n'est pas validée)
            event.stopPropagation();
            // je me refére à l'index de mon tableau pour savoir quel élément supprimer
            deleteTodo(index);
        });

        // j'ajoute le contenu de ma liste
        li.innerHTML = `
        <span class="todo ${ todo.done ? 'done' : ''  }"></span>
        <p>${ todo.text }</p>
        `;
        // Ma tâche est accomplie ou pas ?
        li.addEventListener('click', () =>{
            toggleTodo(index);
        });
        // je rajoute mon bouton delete
        li.appendChild(buttonDelete);
        return li;
    };
    // j'ajoute ma capture à ma liste de todo
    const addTodo = (text) => {
        // Je rajoute ma capture dans mon tableau
        todos.push({
            text,
            done: false
        });
        displayTodo();
    };
    
    // fonction qui me permet de reconnaître l'index de l'élement que je désire effacer
    const deleteTodo = (index) => {
        todos.splice(index, 1);
        displayTodo();
    }
    // Fonction pour valider une tâche
    const toggleTodo = index => {
        // si tâche accomplie, j'inverse la valeur actuelle de ma tâche
        todos[index].done = !todos[index].done;
        // je raffraichi ma liste
        displayTodo();
    };
    displayTodo();
}
