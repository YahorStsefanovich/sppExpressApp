const birthdaysLS = "birthdaysLS";

(function () {
    $("#post").click(()=>{
        let firstName = $("#firstName").val();
        let lastName = $("#lastName").val();
        let birthday = $("#birthday").val();

        if ((firstName === "") || (lastName === "") || (birthday === "")){
            alert("Заполните все поля!");
            return;
        }

        let resultList = JSON.parse(localStorage.getItem(birthdaysLS));

        if (resultList === null){
            resultList = [];
        }

        resultList.push(new Birthday(firstName, lastName, birthday));
        let now = new Date(Date.now() + 24*3600);
        now.setHours(0,0,0,0);
        
        resultList.sort((a, b)=>{
            let dateA = new Date(a._birthday);
            let dateB = new Date(b._birthday);
            let year = now.getFullYear();
            dateA.setFullYear(year);
            dateB.setFullYear(year);
            return (dateA.getTime() - now.getTime()) - (dateB.getTime() - now.getTime());
        });
        
        
        localStorage.setItem(birthdaysLS, JSON.stringify(resultList));
        console.log("added successfully");
    });

}());

function Birthday() {
    this._firstName = arguments[0];
    this._lastName = arguments[1];
    this._birthday = arguments[2];
}