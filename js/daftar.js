const nomorHpInput = document.getElementById('nomorHp');
const nimInput = document.getElementById('nimMhs');
const maxLength = 13;

nomorHpInput.addEventListener('input', function() {
// Hapus karakter non-angka
this.value = this.value.replace(/[^0-9]/g, '');

// Batasi panjang input
if (this.value.length > maxLength) {
    this.value = this.value.slice(0, maxLength);
}
});

// Pencegahan untuk paste 
nomorHpInput.addEventListener('paste', function(event) {
const pastedText = event.clipboardData.getData('text');
const sanitizedText = pastedText.replace(/[^0-9]/g, '');
const newValue = this.value + sanitizedText;
if (newValue.length > maxLength) {
    this.value = newValue.slice(0, maxLength);
} else {
    this.value = newValue;
}
event.preventDefault();
});


nimInput.addEventListener('input', function() {
// Hapus karakter non-angka
this.value = this.value.replace(/[^0-9]/g, '');

// Batasi panjang input
if (this.value.length > maxLength) {
    this.value = this.value.slice(0, maxLength);
}
});

// Pencegahan untuk paste 
nimInput.addEventListener('paste', function(event) {
const pastedText = event.clipboardData.getData('text');
const sanitizedText = pastedText.replace(/[^0-9]/g, '');
const newValue = this.value + sanitizedText;
if (newValue.length > maxLength) {
    this.value = newValue.slice(0, maxLength);
} else {
    this.value = newValue;
}
event.preventDefault();
});




//Bagian untuk mengisi option program studi

const dataProdi ={
    "fst": ["Ilmu Komputer", "Teknik Industri", "Sistem Informasi", "Matematika"],
    "feph" : ["Ekonomi Syariah", "Akuntansi", "Bisnis Digital", "PGSD", "Hukum"],
};

const fakultas = document.getElementById('fakultas');
const prodi = document.getElementById('prodi');

fakultas.addEventListener('change', function(){
    const fakultasPilihan = this.value;

    prodi.innerHTML = '<option value="" disabled selected>-- Pilih Program Studi --</option>';
    prodi.disabled = true;

    if(dataProdi.hasOwnProperty(fakultasPilihan)){
        const listProdi = dataProdi[fakultasPilihan];

        prodi.disabled = false;

        listProdi.forEach(prodiKu => {
            const option = document.createElement('option');
            option.value = prodiKu.toLowerCase().replace(/\s+/g, '-');
            option.textContent= prodiKu;
            prodi.appendChild(option);
        });
    }
});







// penggunaan DOM
