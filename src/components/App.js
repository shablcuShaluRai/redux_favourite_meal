import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRecipe, removeFromCalendar } from '../actions'
import { capitalize } from '../utils/helpers'
import CalendarIcon  from 'react-icons/lib/fa/calendar-plus-o'
import Modal from 'react-modal'
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right'
import Loading from 'react-loading'
import { fetchRecipes } from '../utils/api'


class App extends Component {

  state = {
    foodModalOpen: false,
    meal:null,
    day:null,
    food:null,
    loadingFood:false
  }

  openFoodModal = ({ meal, day}) => {
    this.setState(() => ({
      foodModalOpen: true,
      meal,
      day
    }))
  }

  closeFoodModal = () => {
    this.setState(() =>({
      foodModalOpen: false,
      meal:null,
      day:null,
      food:null
    })
  )
  }


  searchFood = (e) =>{
    if(!this.input.value){
      return
    }
    e.preventDefault()
    this.setState(() => ({
      loadingFood: true
    }))

    fetchRecipes(this.input.value).then((food) =>this.setState(() => ({
      food,
      loadingFood: false,
    }))

    )
  }

  render() {
const {foodModalOpen, loadingFood, food } = this.state
const {calendar, remove, selectRecipe } = this.props
const mealOrder = ['breakfast', 'lunch', 'dinner']
return (

     <div className='container'>
       <ul className='meal-types'>
         {mealOrder.map((mealType)=>(
           <li key = {mealType} className= 'subheader'>
             {capitalize(mealType)}
           </li>
          ))}
       </ul>

       <div className='calendar'>
         <div className='days'>
           {calendar.map(({day}) =>
            <h3 key = {day} className='subheader'>{capitalize(day)}</h3>

            )}
        </div>

        <div className='icon-grid'>
           {calendar.map(({day, meals}) => (
             <ul key = {day}>
             {mealOrder.map((meal) =>(
               <li key = {meal} className='meal'>
               {meals[meal]?
                 <div className= 'food-item'>
                    <img src={meals[meal].image} alt= {meals[meal].label}/>
                    <button onclick={() => remove({meal, day})
                  }> clear</button>
                 </div>
                 : <button onclick={() => this.openFoodModal({meal, day})} className='icon-btn'>
                   <CalendarIcon size={30}/>
                 </button>
               }</li>
             )
             )}
             </ul>
           ))}
        </div>
     </div>




    </div>
    )
  }
}
function mapStateToProps({calendar , food}){
  const dayOrder = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']

    return {
      calendar: dayOrder.map((day) => ({
        day,
        meals: Object.keys(calendar[day]).reduce((meals, meal) => {
          meals[meal]= calendar[day][meal]?food[calendar[day][meal]]:null
          return meals
        },{})
      }))
    }
  }

  function mapDispatchToProps(dispatch){
    return {
      selectRecipe : (data) => dispatch(addRecipe(data)),
      remove : (data) => dispatch(removeFromCalendar(data))
        }
  }

export default connect(mapStateToProps,mapDispatchToProps)(App);
