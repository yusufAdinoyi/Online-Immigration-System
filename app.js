// Global variable
let passport;

// getting image from input type of file and previewing it
document.querySelector('#passport').addEventListener('change', function(e){
    const reader = new FileReader();
    reader.addEventListener('load', function(){
    const imageStored = reader.result;
    const imageElement = document.querySelector('#image_preview')
    imageElement.setAttribute('src', imageStored);
    imageElement.style.display = 'block';
    passport =  imageStored;
    })
    reader.readAsDataURL(this.files[0]);
});

// File submission
document.querySelector('#registration_form').addEventListener('submit', function(e){
    e.preventDefault()
    const firstName = document.querySelector('#first_name').value;
    const lastName = document.querySelector('#last_name').value;
    const phoneNumber = document.querySelector('#phone_number').value;
    const age = document.querySelector('#age').value;
    const gender = document.querySelector('#gender').value;
    const bloodGroup = document.querySelector('#blood_group').value;
    const emailAddress = document.querySelector('#email_address').value;
    const resAddress = document.querySelector('#res_address').value;
    const passportNumber = document.querySelector('#passportnumber').value;
    const leavingPurpose = document.querySelector('#leavingpurpose').value;
    const dateIssue = document.querySelector('#dateissue').value;
    const dateExpire = document.querySelector('#dateexpire').value;
    const dateLeaving = document.querySelector('#dateleaving').value;
    const dateReturn = document.querySelector('#datereturn').value;
    const idRandomNumber = Math.ceil(Math.random() * 100000);
    const idNumber = firstName + idRandomNumber;

    const patient = {
        idNumber : idNumber,
        firstName : firstName,
        lastName : lastName,
        phoneNumber : phoneNumber,
        age : age,
        gender : gender,
        bloodGroup : bloodGroup,
        emailAddress : emailAddress,
        resAddress : resAddress,
        passportNumber: passportNumber,
        leavingPurpose: leavingPurpose,
        dateIssue: dateIssue,
        dateExpire: dateExpire,
        dateLeaving: dateLeaving,
        dateReturn: dateReturn,
        passport : passport
    }
    if(!firstName || !lastName || !phoneNumber || !age || !gender || !bloodGroup || !emailAddress || !resAddress || !passportNumber || !leavingPurpose || !dateIssue || !dateExpire || !dateLeaving || !dateReturn || !passport){
        alert('please complete the form')
    }else{
        let userval = confirm('Do you want to continue?');
        if(userval === true){
            // initializing
            document.querySelector('#first_name').value = '' ;
            document.querySelector('#last_name').value = '';
            document.querySelector('#phone_number').value = '';
            document.querySelector('#age').value = '';
            document.querySelector('#gender').value = '';
            document.querySelector('#blood_group').value = '';
            document.querySelector('#email_address').value = '';
            document.querySelector('#res_address').value = '';
            document.querySelector('#passportnumber').value = '';
            document.querySelector('#leavingpurpose').value = '';
            document.querySelector('#dateissue').value = '';
            document.querySelector('#dateexpire').value = '';
            document.querySelector('#dateleaving').value = '';
            document.querySelector('#datereturn').value = '';
            document.querySelector('.confirmation').style.transform = 'scale(1)';
            document.querySelector('#image_preview').style.display = 'none';
            document.querySelector('#getPatientId').innerText = idNumber;
            let patients;
            setTimeout(loadingComplete, 6000);
            if(localStorage.getItem('patients') === null){
                patients = [];
            }else{
                patients = JSON.parse( localStorage.getItem('patients'));
            }
            patients.push(patient);
            localStorage.setItem('patients', JSON.stringify(patients));           
        }
    }
})
function loadingComplete(){
    document.querySelector('.confirmation').style.transform = 'scale(0)';
}