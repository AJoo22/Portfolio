var images = document.querySelectorAll("img");

// create an observer instance
var observer = new IntersectionObserver(function(entries, observer) {
  // loop through the entries
  entries.forEach(function(entry) {
    // check if the image is in the viewport
    if (entry.isIntersecting) {
      // load the image
      var image = entry.target;
      image.src = image.getAttribute('data-src');
      observer.unobserve(image);
    }
  });
});

// loop through all of the images and add them to the observer
images.forEach(function(image) {
  observer.observe(image);
});