import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './styles.css';
import { Search } from './search.js';

$(document).ready(function() {
  $('#search').submit(function(event) {
    event.preventDefault();
    const symptom = $('#symptom').val();
    $('#symptom').val("");
    const name = $('#name').val();
    $('#name').val("");
    const displayBy = $('#display-by').val();

    let search = new Search();
    
    let promise = search.getSymptom(symptom, name,displayBy);
   
    
    promise.then(function(response) {
      const { data } = JSON.parse(response);
      for (let i=0; i < data.length; i++) {
        console.log('data[i]', data[i]);
        if (data[i].practices[0].name && data[i].profile.last_name) {
          $('#show-doctor').append(`<li>${data[i].practices[0].name}, ${data[i].profile.last_name}, ${data[i].practices[0].phones[0].number}</li>`)
        } else {
          'data incomplete';
        }
      }   
    }, function(error) {
      $('#error').text(`${error.message}`);
    });
    $('#show-doctor').text("");
  });
});
