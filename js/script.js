class TodoApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {items: [0, 0, 1, 0]};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		return (
			<div>
				{this.state.items.forEach(function (item) {
					console.log(item);
					return <p>{item}</p>;
				})}
				<h3>TODO</h3>
				<TodoList items={this.state.items} />
			</div>
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
	}
}

class TodoList extends React.Component {
	render() {
		return (
			<div>
				{this.props.items.map(function (item) {
				  return <p>{item}</p>;
				})}
			</div>
		);
	}
}
const mountNode = document.getElementById('testReact');

ReactDOM.render(<TodoApp />, mountNode);