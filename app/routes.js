//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// Run this code when a form is submitted to '/minimum-fare-answer'
router.post('/minimum-fare-answer', function (req, res) {

  // make a variable and give it the value from 'minimum-fare'
  var minFare = req.session.data['minimum-fare']

  console.log(typeof minFare)

  // Check whether the answer to question 3 has a value of 100 or more
  if (minFare >= 100) {
    // Send user to check their answers
    res.redirect('/check-answers')
  } else {
    // Send user to the rejection page
    res.redirect('/rejected')
  }
})

// Run this code whenever '/check-answers' is loaded
router.get('/check-answers', function (req, res) {
  var formattedRegions = ""
  var regions = req.session.data['regions']

  // check if there was more than one region selected
  if (regions.length > 1) {
    // store the number of regions selected
    var iterations = regions.length

    // loop through the selected regions
    for (var item of regions) {
      var join = ", "

      // check if this is the second to last item
      if (iterations - 2 == 0) {
        join = " and "
      // or if this is the last item
      } else if (iterations - 1 == 0) {
        join = ""
      }

      // add the item to our formatted output string
      formattedRegions += item + join

      // decrease the iterations counter by 1
      iterations--
    }
  } else {
    formattedRegions = regions
  }

  // store the data to send back to the view
  var data = { 
    formattedRegions: formattedRegions
  }

  // send the data to the view to render
  res.render('check-answers.html', data)

})
