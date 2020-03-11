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
            done: false,
            editMode: false
        },
        {
            text: 'je suis une tâche accomplie',
            done: true,
            editMode: false
        },
        {
            text: 'tu peux valider une tâche en cliquant dessus',
            done: false,
            editMode: false
        },
        {
            text: 'tu peux éditer une tâche en cliquant sur le crayon',
            done: false,
            editMode: false
        },
        {
            text: 'tu peux supprimer une tâche en cliquant sur la poubelle',
            done: false,
            editMode: false
        }, 
        {
            text: "en mode edition, clique sur la croix pour annuler l'édition",
            done: false,
            editMode: true
        },
        {
            text: "et sur la disquette pour sauvegarder tes changements",
            done: false,
            editMode: true
        }
    ];

    
    // Les fonctions nécéssaires au bon fonctionnement de mon projet
    
    //Parcourir le tableau todo et pour chaque itération je crée une nouvelle représentation de l'entrée pour la transférer sur le dom
    const displayTodo = () => {
        const todosNode = todos.map((todo, index) => {
        // Je vérifie si je suis en mode édition ou non et selon, j'affiche ma liste
        if (todo.editMode){
            return createTodoEditElement(todo, index);
            console.log('coucou');
        }else{
                return createTodoElement(todo, index);
            };
        });
        ul.innerHTML = '';
        ul.append(...todosNode);
    };
    //Fonction pour transformer une todo particulière en élément html
    const createTodoElement = (todo, index) => {
        const li = document.createElement('li');
        const buttonDelete = document.createElement('button');
        buttonDelete.innerHTML =`<i class="fas fa-trash-alt" alt="delete"></i>`;
        const buttonEdit = document.createElement('button');
        buttonEdit.innerHTML = `<i class="fas fa-edit"></i>`;
        // Je rajoute un évenement à mon bouton delete
        buttonDelete.addEventListener('click', event => {
            // Si je clique sur delete, pas de changement toogle possible (la tâche suivante n'est pas validée)
            event.stopPropagation();
            // je me refére à l'index de mon tableau pour savoir quel élément supprimer
            deleteTodo(index);
        });
        // Je rajoute un événement sur mon bouton Edit
        buttonEdit.addEventListener('click', event => {
            event.stopPropagation();
            toggleEditMode(index);
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
        li.append(buttonEdit, buttonDelete);
        return li;
    };
    // Fonction éditer élément
    const createTodoEditElement = (todo, index) => {
        // preparation de mes balises html
        const li = document.createElement('li');
        const input = document.createElement('input');
        input.type = 'text';
        input.value = todo.text;
        const buttonSave = document.createElement('button');
        buttonSave.innerHTML = '<i class="fas fa-save"></i>';
        const buttonCancel = document.createElement('button');
        buttonCancel.innerHTML = '<i class="fas fa-window-close"></i>';
        // Je rajoute un événement sur mon bouton
        buttonCancel.addEventListener('click', event => {
            event.stopPropagation();
            // si j'appuie sur cancel, je rappelle ma fonction togggleEditmode
            toggleEditMode(index);
        });
        // Je rajoute enfin un événement sur mon bouton save
        buttonSave.addEventListener('click', event => {
            event.stopPropagation();
            // J'appelle ma fonction editTodo
            editTodo(index, input);
        });
        // Je greffe tout à la liste qui sera créée
        li.append(input, buttonCancel, buttonSave);
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
    // Fonction éditer tâche
    const toggleEditMode = (index) =>{
        todos[index].editMode = !todos[index].editMode;
        displayTodo();
    };
    // fonction pour enregistrer la tâche éditée
    const editTodo = (index, input) => {
        const value = input.value;
        todos[index].text = value;
        todos[index].editMode = false;
        displayTodo();
    };
    displayTodo();
}
