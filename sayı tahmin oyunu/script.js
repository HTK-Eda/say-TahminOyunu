const guessInput = document.querySelector("#guess"); //Tahmin girilen input
const button = document.querySelector("#guessSend"); //Tahmin girilen inputun butonu
const attention = document.querySelector("#attention");
const kalanHak = document.querySelector("#left span"); //Kalan hak yazan 
const numbers = document.querySelector("#numbers span"); //Tahmin edilen sayılar
const playAgain = document.querySelector("#startAgain"); //Yeniden oyna butonu
var kalan, tahminler, random;
kalan=12;
tahminler = []; //Tahminler dizi i çinde yer alcak

function randomNumber(min,max){
    var number = Math.floor(Math.random() * (max-min)+min);
    return number;
};

random = randomNumber(1,100); //1-100 arasında random sayı üretcek
//Tahmin butonuna bastıktan sonra
button.addEventListener("click", () => {
    if(kalan == 1){ //Kalan=1 senaryosu
        kalan=0;
        attention.textContent = "Tahmin hakkınız bitti. Üretilen Sayı: "+random;
        playAgain.style.display ="block"; //Yeniden oyna butonu aktif
        tahminler.push(guessInput.value); //push ile veri eklenir
        numbers.textContent = tahminler;
        kalanHak.textContent=kalan;
        guessInput.value="";  //inputun içini boş bırakır
        button.disabled = true;  //Tahmin butonuna artık basılmıyor
    }
    else{
        if(guessInput.value ==""){ //inputun değeri boşsa
            attention.textContent = "Bir sayı giriniz";
            kalan++; //En altta azaltıldığı için boş inputta hak gitmemesi için arttırdık
        }
        else if(guessInput.value== random){ //inputun değeri hedef sayıya eşitse 
            attention.textContent ="TEBRİKLER DOĞRU BİLDİN! CEVAP:"+random;
            playAgain.style.display="block";
            button.disabled=true;
        }
        else if(guessInput.value < random){ //inputun değeri hedeften küçükse
            attention.textContent = "Üretilen sayı tahmininizden büyük";
            tahminler.push(" "+ guessInput.value);
        }
        else if(guessInput.value > random){ //inputun değeri hedeften büyükse
            attention.textContent = "Üretilen sayı tahmininizden küçük";
            tahminler.push(" "+ guessInput.value);
        }
        kalan--; //kalan hak azaltıldı
        guessInput.value="";
        numbers.textContent= tahminler;
        kalanHak.textContent=kalan;
        guessInput.focus(); //inputa üzerine tıklamadan odaklanmayı sağlıyor
    };
})

//Yeniden oyna butonu için
playAgain.addEventListener("click",() => {
    tahminler = [];
    numbers.textContent = tahminler; //aslında 0'a eşitliyor
    kalan=12;
    kalanHak.textContent = kalan;
    attention.textContent = "Tahminini Yaz";
    playAgain.style.display = "none"; //Yeniden oyna butonu artık gösterilmiyor
    random = randomNumber(1,100);
    button.disabled = false; //Buton artık tıklanabilir
    guessInput.value = "";
})

//Enter tuşunu da dahil ettik. Hak bittiğinde entera basılırsa yeniden başlatıyor
guessInput.addEventListener("keypress", function(){ 
    if(event.key == "Enter"){
        if(kalan == 0){
            playAgain.click(); 
        }
        else{
            button.click();
        }
    }
})