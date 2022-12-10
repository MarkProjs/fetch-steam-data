
function GameData(props){

  let reviewNumber

  let ratioReviewNumber

  let total

  let ratioTotal

  let identifier

  //If we are displaying positive reviews, set these values accordingly, do the same for
  //negative reviews
  if(props.isPositive){
    identifier = "positive"
    total = props.details.positiveReviews ? props.details.positiveReviews : 0
    ratioTotal = props.ratioDetails.positiveReviews ? props.ratioDetails.positiveReviews : 0
    reviewNumber = `Number of ${identifier} reviews: ${total}`
    ratioReviewNumber = `Number of ${identifier} reviews: ${ratioTotal}`
  } else {
    identifier = "negative"
    total = props.details.negativeReviews ? props.details.negativeReviews : 0
    ratioTotal = props.ratioDetails.negativeReviews ? props.ratioDetails.negativeReviews : 0
    reviewNumber = `Number of ${identifier} reviews: ${total}`
    ratioReviewNumber = `Number of ${identifier} reviews: ${ratioTotal}`
  }

  return(
    <div id="gamedata">

      <div className="specificdata">
        <h1>Top-rated Game:</h1>
        <h2>Name: {props.details.name}</h2>
        <h2>Genre: {props.details.Genre}</h2>
        <img src={props.details.image} alt="game image"></img>
        <p>{reviewNumber}</p>
        <p>Description: {props.details.description}</p>
        <p>Release date: {props.details.date} </p>
      </div>

      <div className="specificdata">
        <h1>Game with highest review ratio:</h1>
        <h2>Name: {props.ratioDetails.name}</h2>
        <h2>Genre: {props.ratioDetails.Genre}</h2>
        <img src={props.ratioDetails.image} alt="game image"></img>
        <p>{ratioReviewNumber}</p>
        <p>Percentage of {identifier} reviews: {props.ratioDetails.percentage}</p>
        <p>Description: {props.ratioDetails.description}</p>
        <p>Release date: {props.ratioDetails.date} </p>
      </div>

    </div>
  )
}

export default GameData