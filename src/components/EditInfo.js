/* eslint-disable no-undef */

import React, { Component } from 'react'


const coverterTime = (date)=> {
   return date.substring(0, 10)
}
const checkError=(err)=>{
  return (!err.name && !err.surname && !err.date)? false: true
}
class EditInfo extends Component{

constructor(){
  super()
  this.handleChange = this.handleChange.bind(this)
  this.handleBlur = this.handleBlur.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  this.state = {errors: {},touched: {}}
}

converToISOFormat(serverDate){
    let date = new Date(Date.parse(serverDate));
    return date.toISOString()
}

getInfo(){
  return {
    first_name: this.name.value,
    last_name: this.surname.value,
    post: this.rank.value,
    birth_date: this.converToISOFormat(this.birthDate.value),
    description: this.description.value
  }
}


handleSubmit(e){
  const {actions, id} = this.props
  let errors = this.state.errors
  if (checkError(errors)) return false;
  actions.editWorkerInfo(id, this.getInfo())
  return false;
}

handleChange(item,itemName){
 console.log()
  if (!item.value.length) {
    this.setState({errors: {...this.state.errors, [itemName]:'Поле не заполнено!'}})
  } else this.setState({errors:{ ...this.state.errors,[itemName]:  false}})
}

handleBlur(itemName){
 this.setState({touched:{ ...this.state.touched, [itemName]: true}})
}

render(){
  const {worker,posts, actions,id} = this.props 
  const{name,surname} = this.state.errors
  return (  
          <li className='editWorker' key = {id}>
            <img src = {worker.image} alt = {id}/>
              
              <div className='wrapperInput'>
                <label className={name?'error':''}>
                <div>Имя</div>
                <input name = 'name' 
                  ref={(input) => this.name = input}
                  defaultValue={worker.first_name}                 
                  onChange = {() => this.handleChange(this.name,'name')}
                  onBlur = {() => this.handleBlur('name')}
                />
                {this.state.touched.name && this.state.errors.name && <span>{this.state.errors.name}</span>}
              </label>

              <label className={surname?'error':''}>
                <div>Фамилия</div>
                <input name = 'surname' 
                  defaultValue = {worker.last_name}
                  ref={(input) => this.surname = input}
                  onChange = {() => this.handleChange(this.surname,'surname')}
                  onBlur = {() => this.handleBlur('surname')}
                />
                {this.state.touched.surname && this.state.errors.surname && <span>{this.state.errors.surname}</span>}               
              </label>

              <label className='birthDate'>
              <div >День рождения</div>
                <input type='date' defaultValue={coverterTime(worker.birth_date)}
                ref={(input) => this.birthDate = input} 
                onChange = {() => this.handleChange(this.birthDate,'date')}
                required/>
              </label>

              <label className='rank'>
                <div>Звание</div>
                <select defaultValue={posts[worker.post - 1].id}
                ref={(input) => this.rank = input}>
                   {posts.map(option =>
                  <option value={option.id} key={option.id}>
                    {option.name}
                  </option>)
                }
                </select>
              </label>
            </div>

            <label className='textarea'>
             <div>Характеристика</div>
              <textarea defaultValue={worker.description}
              ref={(input) => this.description = input}
              required/>
            </label>
            <div className='buttons'>
             <input className='save'
                type="submit" 
                onClick={this.handleSubmit} 
                value = 'Сохранить'
              />

              <button className='delete' 
                onClick={() => actions.deleteWorkerInfo(id)}>Удалить</button>
               <button className='cancell' onClick={() => actions.SetEditElementID(false)}>Отмена</button>
            
            </div> 
          </li>

            )
      }
 }

export default EditInfo
        



