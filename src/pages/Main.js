import React, { Component } from 'react';
import axios from 'axios';



const Header = () => {
  return (
    <header>
      <h1>tasks</h1>
    </header>
  );
}


const TaskInput = ({addTask}) => {
    let task;
    return(
      <form
        id="task-input-container"
        onSubmit={(e)=>{
          e.preventDefault();
          addTask(task.value);
          task.value = '';
        }}>
        <input
          ref={node => {task = node;}}
          placeholder="New Task"
          className="task-input"
          type="text"
          required />


        <input value="Send" className="task-input" type="submit" />
      </form>
    );
}

const Task = ({task, remove}) => {
  return (
    <li className="task-list-item">
      <span className="task-name" data-type={task.type} data-id={task.id}>{task.name}</span>
      <button onClick={() => {remove(task.id)}} className="remove-btn">Remove</button>
    </li>
  )
}


const TaskList = ({tasks, remove}) => {
  console.log(tasks);
  const taskNode = tasks.map((task) => {
    return (<Task task={task} key={task.id} remove={remove}/>)
  });
  return (
    <div id="task-list-container">
      <ul id="task-list-ul">
        {taskNode}
      </ul>
    </div>
  )
}


class Main extends Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: []
    };
    this.apiUrl = '//5a65519cacd74f00128c6041.mockapi.io/tasks'
  }

  componentDidMount() {
    axios.get(this.apiUrl)
      .then((res) => {
        this.setState({data:res.data});
      });
  }

  addTask(taskInput){
    const task = {
      id: this.state.data.length + 1,
      name: taskInput,
      type: '',


    };

    axios.post(this.apiUrl, task)
       .then((res) => {
          this.state.data.push(res.data);
          this.setState({data: this.state.data});
       });

  }

  // Handle remove
 handleRemove(id){
   // Filter all todos except the one to be removed
   // eslint-disable-next-line
   const remainder = this.state.data.filter((todo) => {
     if(todo.id !== id) return todo;
   });
   // Update state with filter
   axios.delete(this.apiUrl+'/'+id)
     .then((res) => {
       this.setState({data: remainder});
     })
 }


  render(){

    return (
      <div id="main-page">
        <Header toggled={this.state.toggled}/>
        <TaskList
          tasks={this.state.data}
          remove={this.handleRemove.bind(this)}/>
        <TaskInput addTask={this.addTask.bind(this)}/>
      </div>
    );
  }
}

export default Main;
