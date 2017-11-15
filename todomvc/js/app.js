import app from '../../tvjs.js';

const todoApp = app
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
.handleAdd(({ target, target : { value } }) => {
	if (!value) return
	const todos = [...app.state.todos, {
		title : target.value,
		status : 'uncompleted'
	}]
	target.value = ''
	app.setState({ todos })
})
.handleClear(() => app.setState({ todos : app.state.todos.filter(todo => todo.status !== 'completed') }))
.handleDestroy(({ target : { dataset : { id } }}) => app.setState({ todos : app.state.todos.filter((item, i) => i != id) }) )
.handleToggle(({ target : { dataset : { id }, checked }}) => {
	app.state.todos[id].status = checked
		? 'completed'
		: 'uncompleted'
	app.setState()
})
.handleFilter(({ target : { dataset : { filter } }}) => app.setState({ filter }))
.getFiltered(() => app.state.todos.filter(todo => !app.state.filter || todo.status === app.state.filter))
.render(false)(r => r`
	<header class="header">
		<h1>todos</h1>
		<input class="new-todo" placeholder="What needs to be done?" autofocus onblur=${app.handleAdd} />
	</header>
	<!-- This section should be hidden by default and shown when there are todos -->
	<section class="main">
		<input id="toggle-all" class="toggle-all" type="checkbox">
			<label for="toggle-all">Mark all as complete</label>
			<ul class="todo-list">
				<!-- These are here just to show the structure of the list items -->
				<!-- List items should get the class editing when editing and completed when marked as completed -->
				${app.getFiltered().map((todo, i) => app.wire()`
					<li class=${todo.status}>
						<div class="view">
							<input class="toggle" type="checkbox" checked=${todo.status === 'completed'} data-id=${i} onchange=${app.handleToggle}/>
							<label>${todo.title}</label>
							<button class="destroy" data-id=${i} onclick=${app.handleDestroy}></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>
				`)}
			</ul>
	</section>
	<!-- This footer should hidden by default and shown when there are todos -->
	<footer class="footer">
		<!-- This should be 0 items left by default -->
		<span class="todo-count"><strong>${app.state.todos.filter(todo => todo.status === 'uncompleted').length}</strong> item left</span>
		<!-- Remove this if you don't implement routing -->
		<ul class="filters" onclick=${app.handleFilter}>
			<li>
				<a class=${!app.state.filter && 'selected'} href="#/">All</a>
			</li>
			<li>
				<a class=${app.state.filter === 'uncompleted' && 'selected'} href="#/active" data-filter="uncompleted">Active</a>
			</li>
			<li>
				<a class=${app.state.filter === 'completed' && 'selected'} href="#/completed" data-filter="completed">Completed</a>
			</li>
		</ul>
		<!-- Hidden if no completed items are left ↓ -->
		<button class="clear-completed" onclick=${app.handleClear}>Clear completed</button>
	</footer>
`)

todoApp.render('.todoapp')