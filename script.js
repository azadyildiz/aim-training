var balonum = document.getElementById('balon');
var sayac = document.getElementById('sayac');
var bayrak=true;
var butonum = document.getElementById('buton');
var girisyazisi= document.getElementById('aimlab');
var giris = document.getElementById('giris');

butonum.addEventListener('mouseover',function(){
    butonum.style.fontSize='40px';
    butonum.style.marginTop='88px';
    butonum.style.backgroundColor='rgba(65, 67, 95,1)';
    butonum.style.color='white';
});
butonum.addEventListener('mouseout',function(){
    butonum.style.fontSize='24px';
    butonum.style.marginTop='96px';
    butonum.style.backgroundColor='rgba(65, 67, 95,0)';
    butonum.style.color='white';

});

butonum.addEventListener('click',function(){
    giris.style.display='none';
    balonum.style.display='block';
    sayac.style.display='block';
})

balonum.addEventListener('mouseover',function(){
    balonum.style.top= Math.floor(Math.random()*800)+13;+'px';
    balonum.style.left=Math.floor(Math.random()*1600)+13;+'px';
    sayac.textContent++;
    if(sayac.style.opacity==1){
        bayrak=false;
    }
    if(sayac.style.opacity==0.1){
        bayrak=true;
    }

    if(bayrak){
        sayac.style.opacity -= '-0.1';}
    else{
        sayac.style.opacity-='0.1';
    }
});