import React,{Component} from 'react';
import Person from './Person/Person';
import classes from './App.module.css';

class App extends Component{

state={
  persons:[
    {id:'faiz',name:'Faizan',age:21},
    {id:'ad',name:'Adnan',age:23},
    {id:'khan',name:'Hanzla', age:15}
  ],
  otherState:'Some other state',
  showPersons:false
}


deletePersonHandler=(personIndex)=>{
  // const persons=this.state.persons ; //Not recommended, it will have a reference towards original array
// const persons=this.state.persons.slice(); //one approach
const persons=[...this.state.persons] ;//updating state immutable way
persons.splice(personIndex,1);
this.setState({persons:persons});
}




togglePersonHandler=()=>{
  const doesShow=this.state.showPersons
this.setState({
  showPersons:!doesShow
})
}
nameChangehandler = (event, id)=>{
const personIndex=this.state.persons.findIndex((person)=>{
  return person.id===id
});
//const person=this.state.persons[personIndex] Not recommended

// const person=Object.assign({},this.state.persons[personIndex]) Another approach
const person={...this.state.persons[personIndex]};

person.name=event.target.value;

const persons=[...this.state.persons] //Just for the sake of not mutating

persons[personIndex]=person;

this.setState({persons:persons})






}

render(){


  const style={
    "backgroundColor":"green",
    "font":"inherit",
    "color":"white",
    "border":"1px solid blue",
    "padding":"8px",
    "margin":"5px",
    "cursor":"pointer"

  }

  let persons=null;
if(this.state.showPersons){
  persons=(
    <div>
    {this.state.persons.map((person,index)=>{
      return <Person 
      click={()=>this.deletePersonHandler(index)} 
      name={person.name} 
      age={person.age}
      key={person.id}
      changed={(event)=>this.nameChangehandler(event,person.id)} >
      </Person>
    })}
  </div>
  )
  style.backgroundColor='red';
}
const assignedClasses=[]
if(this.state.persons.length<=2){
  assignedClasses.push(classes.red);
}


if(this.state.persons.length<=1){
  assignedClasses.push(classes.bold);
}


  return (
    <div className={classes.App}>
      <h1>Hi, I'm React App</h1>
      <p className={assignedClasses.join(' ')}>This is really Working!!!</p>
      <button onClick={this.togglePersonHandler} 
      style={style}>Switch Name</button>
        {persons}
    </div>

  );
}

}
export default App;
