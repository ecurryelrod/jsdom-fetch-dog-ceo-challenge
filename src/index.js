console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", () => {
    fetchImages();
    fetchBreeds();
});

function fetchImages() {
    // debugger
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(data => showImage(data["message"]));
};

function showImage(imageUrls) {
    const divImage = document.getElementById('dog-image-container');
    imageUrls.forEach(image => {
        // when using innerHTML can just write the html tag directly and don't need to use appendChild
        divImage.innerHTML += `<img src=${image}>`;
        // can also say:
        // const img = document.createElement('img');
        // img.src = image;
        // divImage.appendChild(img);
    });
};

function fetchBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(dogs => addBreed(dogs["message"]));
};

function addBreed(dogs) {
    // console.log(dogs)
    for (dog in dogs) { // using in because looking through object to get specific dog in the dogs object array
        // console.log(dog)
        displayBreed(dog)
    }

    const select = document.getElementById('breed-dropdown')
    select.addEventListener('change', event => {
        const ul = document.getElementById('dog-breeds');
        // want to clear out dog breeds list so just show dogs that match selection
        ul.innerText = ""
        const letter = event.target.value 

        for (dog in dogs) {
            if (dog.charAt(0) === letter) // charAt(0) is the first letter of dog (first letter in the string) and make sure it's equal to the letter selected from the dropdown
            displayBreed(dog) // if match then display the dog breeds that starts with that letter
        }
    })

    function displayBreed(dog) {
        const ul = document.getElementById('dog-breeds')
        const li = document.createElement('li')
        li.innerText = dog
        ul.appendChild(li)
        const subUl = document.createElement('ul')
        li.addEventListener('click', event => event.target.style.color = "aqua") // adds event listener to change color when click
        for (type of dogs[dog]) { // looping through the dogs array for a specific dog, and then finding the type of the dog if the subcategory exists
            const subLi = document.createElement('li')
            subLi.innerText = type
            li.appendChild(subUl)
            subUl.appendChild(subLi)
        }
    }
}
