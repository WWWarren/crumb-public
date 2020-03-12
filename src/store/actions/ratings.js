// Packages, config, etc.
// import database from '../../config';

// Reducers

//
// get total rating of an individual recipe
export function getRecipeRating(recipe) {
  if (recipe.rating) {
    const ratings = recipe.rating;
    let total = 0;

    // Add all the ratings to one variable
    ratings.forEach((r) => {
      let num = r.rating;
      num = Number(num);
      total = total + num;
    });

    // Create object with rating
    const ratingObj = {
      totalRating: Number(total / ratings.length),
      numberOfRatings: ratings.length
    };

    return ratingObj;
  }
  return 0;
}
