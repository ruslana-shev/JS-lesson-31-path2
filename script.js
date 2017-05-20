var btn = document.querySelector('button');

btn.addEventListener('click', usersList);

function usersList () {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'users.json');
	xhr.timeout = 10000;
	xhr.addEventListener('readystatechange', function () {
		if (xhr.readyState === 4 && xhr.status === 200){
			let users = JSON.parse(xhr.responseText) || [];
			createListUsers(users);
			// console.log(users);
		} else if (xhr.status == 404){
			console.log('error');
		}
	});

	xhr.addEventListener('timeout', function () {
		console.log('Сервер слишком долго не отвечает');
	});

	xhr.send();
}

function createListUsers(users) {
	var list = document.querySelector('ul.list');

	var fragment = document.createDocumentFragment();

	users.forEach (function (user) {
		var li = document.createElement('li');
		li.classList.add('listItem');
		li.innerHTML = user.name;

		li.addEventListener('click', function (e) {
			var infoUser = li.nextElementSibling;
			infoUser.style.display = 'block';
		});
		
		fragment.appendChild(li);
		var infoBlock = createInfoUserBlock(user);
		
		fragment.appendChild(infoBlock);	

	});

	list.appendChild(fragment);

}

function createInfoUserBlock(user) {
	var fragment = document.createDocumentFragment();
	var info = document.createElement('div');
		info.classList.add('infoUser');
		info.style.display = 'none';
		
	var close = document.createElement('div');
		close.classList.add('close');

	var ul = document.createElement('ul');

	for (prop in user){
		var li = document.createElement('li');
		li.innerHTML = `${prop} : ${user[prop]}`;
		ul.appendChild(li);
	}
	
	info.appendChild(close);
	info.appendChild(ul);	
	close.addEventListener('click', function(){
		info.style.display = 'none';
	});

	fragment.appendChild(info);

	return fragment;
}