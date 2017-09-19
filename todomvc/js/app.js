import v from '../../tvjs.js';

const todoApp = v

const fetchData = () => {
	return new Promise(function(resolve){
		setTimeout(resolve, 1500)
	})
}

(async () => todoApp
	.defaultState({
		todos : [
			{
				title : 'Taste JavaScript',
				status : 'completed'
			},
			{
				title : 'By a unicorn',
				status : 'uncompleted'
			}
		],
		filter : undefined
	})
	.on(function handleAdd(ev) {
		const { target } = ev;
		const { value } = target;
		if (!value) return;

		const todos = [...todoApp.state.todos, {
			title : target.value,
			status : 'uncompleted'
		}]
		target.value = ''
		todoApp.setState({ todos })
	})
	.on(function handleClear() {
		const todos = todoApp.state.todos.filter(todo => todo.status === 'completed');
		todoApp.setState({ todos })
	})
	.on(function handleDestroy(ev) {
		const id = ev.target.dataset.id;
		const todos = todoApp.state.todos.filter((item, i) => i != id);
		todoApp.setState({ todos })
	})
	.on(function handleToggle(ev) {
		const id = ev.target.dataset.id
		todoApp.state.todos[id].status = ev.target.checked
			? 'completed'
			: 'uncompleted'
		todoApp.setState()
	})
	.on(function handleFilter(ev) {
		todoApp.setState({
			filter : ev.target.dataset.filter
		})
	})
	.on(function getFiltered() {
		return todoApp.state.todos.filter(todo => !todoApp.state.filter || todo.status === todoApp.state.filter)
	})
	.render('.todoapp')`
		<div>Waiting for list</div>
	`
	.blackhole(await fetchData())
	.render('.todoapp')(r => r`
		<header class="header">
			<h1>todos</h1>
			<input class="new-todo" placeholder="What needs to be done?" autofocus onblur=${todoApp.handleAdd} />
		</header>
		<!-- This section should be hidden by default and shown when there are todos -->
		<section class="main">
			<input id="toggle-all" class="toggle-all" type="checkbox">
				<label for="toggle-all">Mark all as complete</label>
				<ul class="todo-list">
					<!-- These are here just to show the structure of the list items -->
					<!-- List items should get the class editing when editing and completed when marked as completed -->
					${todoApp.getFiltered().map((todo, i) => todoApp.wire()`
						<li class=${todo.status}>
							<div class="view">
								<input class="toggle" type="checkbox" checked=${todo.status === 'completed'} data-id=${i} onchange=${todoApp.handleToggle}/>
								<label>${todo.title}</label>
								<button class="destroy" data-id=${i} onclick=${todoApp.handleDestroy}></button>
							</div>
							<input class="edit" value="Create a TodoMVC template">
						</li>
					`)}
				</ul>
		</section>
		<!-- This footer should hidden by default and shown when there are todos -->
		<footer class="footer">
			<!-- This should be 0 items left by default -->
			<span class="todo-count"><strong>${todoApp.state.todos.filter(todo => todo.status === 'uncompleted').length}</strong> item left</span>
			<!-- Remove this if you don't implement routing -->
			<ul class="filters">
				<li>
					<a class=${!todoApp.state.filter && 'selected'} href="#/" onclick=${todoApp.handleFilter}>All</a>
				</li>
				<li>
					<a class=${todoApp.state.filter === 'uncompleted' && 'selected'} href="#/active" onclick=${todoApp.handleFilter} data-filter="uncompleted">Active</a>
				</li>
				<li>
					<a class=${todoApp.state.filter === 'completed' && 'selected'} href="#/completed" onclick=${todoApp.handleFilter} data-filter="completed">Completed</a>
				</li>
			</ul>
			<!-- Hidden if no completed items are left ↓ -->
			<button class="clear-completed" onclick=${todoApp.handleClear}>Clear completed</button>
		</footer>
	`))()