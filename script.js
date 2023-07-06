const myForm= document.querySelector('#my-form');
const msg= document.querySelector('.msg');
const userList= document.querySelector('#users');

myForm.addEventListener('submit', onSubmit);
function onSubmit(event) {
    event.preventDefault();
    
    const expenses= event.target.expenses.value;
    const details= event.target.details.value;
    const category= event.target.category.value;
    const obj= {expenses , details , category};

    if(obj.expenses === '' || obj.details === '' || obj.category === '') {
        msg.classList.add('error');
        msg.innerHTML= 'Please enter all fields';
        setTimeout(() => msg.remove(), 3000);
    } else {
        const li= document.createElement('li');
        var deleteBtn = document.createElement('button');
        deleteBtn.className= 'btn1';
        deleteBtn.appendChild(document.createTextNode('Delete'));

        var editBtn = document.createElement('button');
        editBtn.className= 'btn2';
        editBtn.appendChild(document.createTextNode('Edit'));

        editBtn.onclick =() => {
            localStorage.removeItem(obj.name);
            userList.removeChild(li);
            document.getElementById('expenses').value=obj.expenses;
            document.getElementById('details').value=obj.details;
            document.getElementById('category').value=obj.category;
        }
        
        li.appendChild(document.createTextNode(`Expenses Details: Amount-${obj.expenses} , Details-${obj.details} , Type-${obj.category}`));
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        userList.appendChild(li);

        localStorage.setItem(obj.name, JSON.stringify(obj));
        console.log(JSON.parse(localStorage.getItem(obj.name)));
        
        event.target.expenses.value = '';
        event.target.details.value = '';
        event.target.category.value = '';

    }    
}

userList.addEventListener('click', removeItem);
function removeItem(event) {
    if(event.target.classList.contains('btn1')) {
        if(confirm('Are you sure?')) {
            var li= event.target.parentElement;
            userList.removeChild(li);
        }
    }
}

