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
