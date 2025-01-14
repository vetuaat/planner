const elements = {
    textInput: document.querySelector('.input-text'),
    priorityOptions: document.querySelector('.priority-options'),
    addBtn: document.querySelector('.add-btn'),
    deleteAllBtn: document.querySelector('.delete-all-btn'),
    deleteBtn: document.querySelector('.delete-btn'),
    todoList: document.querySelector('.todo-list'),
    checkBtn: document.querySelector('.checkmarkBtn'),
    listItem: document.querySelector('.list-item'),
};

const allData = [];

//////////////////////////////////////////////////////////////////////////////
// MODULES

// Create a factory function instead

const createNote = (text) => ({
    text,
    priority: getPriority(),
    id: uniqueId()
});

const getPriority = () => {
    const selItem = elements.priorityOptions;
    const value = selItem.options[selItem.selectedIndex].value;
    return value;
};

const uniqueId = () => {
    return 'id-' + Math.random().toString(36).substr(2, 16);
};

const getData = (obj) => {
    // create unique id for the obj
    obj.id = uniqueId();
    // return the value of textentry
    obj.text = elements.textInput.value;
    // get the entered priority info
    obj.priority = getPriority();
    return obj;
};

const clearField = () => {
    elements.textInput.value = '';
};


// Consider refactroing this function
// You can use the same technics to get the id as in the UI item delete function
const deleteNote = (event) => {
    // get which item was clicked -> itemID
    const itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    //console.log(itemID);
    if (itemID) {
        //delete item from data
        deleteData(itemID, allData);
    } 
};

const deleteData = (id, arr) => {
    arr.forEach((cur, i) => {
        if (id === cur.id) {
            arr.splice(i, 1);
        }
    });
};


/////////////////////////////////////////////////////////////////////////////////
// UI VIEW

const renderNote = obj => {
    const markup = `
        <li class="list-item" id="${obj.id}">
            <div class="item__data">
                <div class="item__text">${obj.text}</div>
                <div class="item__status">
                    <div class="item__prio ${obj.priority}"></div>
                    <!--
                    <div class="item__prio" id="medium"></div>
                    <div class="item__prio" id="low"></div>
                    -->
                    <div class="item__checkmark">
                        <ion-icon class="checkmark-btn" name="checkmark"></ion-icon>
                    </div>
                        
                    <div class="item__delete">
                        <ion-icon class="delete-btn" name="close"></ion-icon>
                    </div>
                </div>
            </div>
        </li>
    `;

    elements.todoList.insertAdjacentHTML('beforeend', markup);

};

const renderPrio = ({priority}) => {
    // use destructuring
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    if (priority === 'high') {
        document.querySelector('.high').classList.add('color1');
        document.querySelector('.high').classList.remove('high');
    }
    else if (priority === 'medium') {
        document.querySelector('.medium').classList.add('color2');
        document.querySelector('.medium').classList.remove('medium');
    }
    else if (priority === 'low') {
        document.querySelector('.low').classList.add('color3');
        document.querySelector('.low').classList.remove('low');
    }
};


/////////////////////////////////////////////////////////////////////////////////
// CONTROLlER

const addItem = () => {
    const inputValue = elements.textInput.value;
    // if there's some entered text, then:
    if(inputValue) {
        // create a note
        const newItem = createNote(inputValue);
        // render new note to the UI
        renderNote(newItem);
        // render the priority color to the item
        renderPrio(newItem);
        // fill the allData array with the new object
        allData.push(newItem);
        // delete the textentry field to prevent entering the same text twice
       clearField();
    }
    console.log(allData)
    return allData;
};

// add an item
elements.addBtn.addEventListener('click', addItem);

// delete all items from data and UI
elements.deleteAllBtn.addEventListener('click', () => {
    if (allData != undefined || allData.length > 0) {
        // empty all items from allData array
        allData.length = 0;
        // delete all items from UI
        elements.todoList.innerHTML = '';
    }
});

document.querySelector('.todo-list').addEventListener('click', (event) =>{
    // event.target is the clicked item
    if (!event.target) {
        return;
    }
    if (event.target.matches('.delete-btn')) {
        // delete item from data
        deleteNote(event);
        // delete item from UI
        event.target.closest('.list-item').remove();
    }
    // toggle check button color - green if checked
    else if (event.target.matches('.checkmark-btn')) {
        event.target.classList.toggle('checked');
    }
});
