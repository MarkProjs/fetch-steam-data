
function GameData(props){

  let reviewNumber

  if(props.isPositive){
    reviewNumber = `Number of positive reviews: ${props.details.positiveReviews}`
  } else {
    reviewNumber = `Number of negative reviews: ${props.details.negativeReviews}`
  }

  //name, image, short_desc, date
  return(
    <div>
      <h1>Name: {props.details.name}</h1>
      <h2>Genre: {props.details.Genre}</h2>
      <p>{reviewNumber}</p>
      <p>Description: {props.details.description}</p>
      <p>Release date: {props.details.date} </p>
    </div>
  )
}

export default GameData