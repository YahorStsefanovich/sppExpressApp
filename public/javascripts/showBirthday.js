const birthdaysLS = "birthdaysLS";

(function () {
    let resultList = JSON.parse(localStorage.getItem(birthdaysLS));

    if (resultList === null){
        resultList = [];
    }

    window.location.href = `http://localhost:3000?resultList=${JSON.stringify(resultList)}`

}());