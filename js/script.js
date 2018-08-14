class TodoApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
				items: [], 
				text: '' 
			};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}		

	render() {
		return (
			this.state.items.map(item => (
				<div className="form-popup__select-item">

					<select className="form-popup__select">
						<option>W000 Silvery</option>
					</select>
					<input className="input form-popup__select-input" name="" type="number" placeholder="Размер, м">
					<button type="button" class="btn form-popup__select-add" title="Добавить наименование">+</button>
					
					<h3>TODO</h3>
					<TodoList items={this.state.items} />
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="new-todo">
							What needs to be done?
						</label>
						<input
							id="new-todo"
							onChange={this.handleChange}
							value={this.state.text}
						/>
						<button>
							Add #{this.state.items.length + 1}
						</button>
					</form>
				</div>
			))
		);
	}

	handleChange(e) {
		this.setState({ text: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		if (!this.state.text.length) {
			return;
		}
		const newItem = {
			text: this.state.text,
			id: Date.now()
		};
		this.setState(prevState => ({
			items: prevState.items.concat(newItem),
			text: ''
		}));
		console.log(this.state);
	}
}

class TodoList extends React.Component {
	render() {
		return (
			<ul>
				{this.props.items.map(item => (
					<li key={item.id}>{item.text}</li>
				))}
			</ul>
		);
	}
}


const mountNode = document.getElementById('testReact');

ReactDOM.render(<TodoApp />, mountNode);