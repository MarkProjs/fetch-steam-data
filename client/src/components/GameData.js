
function GameData(props){

  let reviewNumber

  let ratioReviewNumber

  let total

  let ratioTotal

  let identifier

  if(props.isPositive){
    identifier = "positive"
    total = props.details.positiveReviews ? props.details.positiveReviews : 0
    ratioTotal = props.ratioDetails.positiveReviews ? props.ratioDetails.positiveReviews : 0
    reviewNumber = `Number of ${identifier} reviews: ${total}`
    ratioReviewNumber = `Number of ${identifier} reviews: ${ratioTotal}`
  } else {
    identifier = "negetive"
    total = props.details.negativeReviews ? props.details.negativeReviews : 0
    ratioTotal = props.ratioDetails.negativeReviews ? props.ratioDetails.negativeReviews : 0
    reviewNumber = `Number of ${identifier} reviews: ${total}`
    ratioReviewNumber = `Number of ${identifier} reviews: ${ratioTotal}`
  }

  //name, image, short_desc, date
  return(
    <div id="gamedata">

      <div>
        <h1>Name: {props.details.name}</h1>
        <h2>Genre: {props.details.Genre}</h2>
        <p>{reviewNumber}</p>
        <p>Description: {props.details.description}</p>
        <p>Release date: {props.details.date} </p>
      </div>

      <div>
        <h1>Name: {props.ratioDetails.name}</h1>
        <h2>Genre: {props.ratioDetails.Genre}</h2>
        <p>{ratioReviewNumber}</p>
        <p>Percentage of {identifier} reviews: {props.ratioDetails.percentage}</p>
        <p>Description: {props.ratioDetails.description}</p>
        <p>Release date: {props.ratioDetails.date} </p>
      </div>

    </div>
  )
}

export default GameData