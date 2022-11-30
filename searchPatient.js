document.querySelector('.unit').addEventListener('click',function(e){
    const patientID = document.querySelector('#patient_id').value;
    e.preventDefault();
    patients = JSON.parse(localStorage.getItem('patients'));
    patients.forEach(function(patient){

        if(patient.idNumber === patientID){   document.querySelector('.error-message').style.transform = 'scale(0)';
        setTimeout(errorMessageErrase, 2000);
            document.querySelector('#patientForm').style.transform = 'scale(1)';
            document.querySelectorAll('#passportUpload').forEach(function(each){
                each.setAttribute('src', patient.passport)
            })
            document.querySelectorAll('#first_name').forEach(function(eachFirstName){
                eachFirstName.innerText = patient.firstName ;
            })
            document.querySelector('#last_name').innerText = patient.lastName;
            document.querySelector('#phone_number').innerText = patient.phoneNumber;
            document.querySelector('#age').innerText = patient.age;
            document.querySelector('#gender').innerText = patient.gender;
            document.querySelector('#blood_group').innerText = patient.bloodGroup;
            document.querySelector('#email_address').innerText = patient.emailAddress;
            document.querySelector('#res_address').innerText = patient.resAddress;
            document.querySelector('#userid').innerText = patient.idNumber;
            document.querySelector('#dateofleaving').innerText = patient.dateLeaving;
            document.querySelector('#passportnumber').innerText = patient.passportNumber;
            document.querySelector('#dateofreturn').innerText = patient.dateReturn;
        } if(patient.idNumber !== patientID){
            document.querySelector('.error-message').style.transform = 'scale(1)';
            setTimeout(errorMessageErrase, 2000);
        }
    })

})
function errorMessageErrase(){
    document.querySelector('.error-message').style.transform = 'scale(0)';
    document.querySelector('#patient_id').value = '';
}