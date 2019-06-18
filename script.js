function setCookie(name, val, days, path, domain, secure) {
    if (navigator.cookieEnabled) {
        const cookieName = encodeURIComponent(name);
        const cookieVal = encodeURIComponent(val);
        let cookieText = cookieName + "=" + cookieVal;
        if (typeof days === "Number") {
            const data = new Date();
            data.setTime(data.getTime() + (days * 24*60*60*1000));
            cookieText += "; expires=" + data.toGMTString();
        }
        if (path) {
            cookieText += "; path=" + path;
        }
        if (domain) {
            cookieText += "; domain=" + domain;
        }
        if (secure) {
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    }
}
  
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function check(money){
    if (money < Number(getCookie('upgradeMoneyCost'))){
        isMoneyUpgradeAvailable = false;
        $('.upgrade-button-money').css('box-shadow', '0px 0px 5px 2px #a00');
    }
    if (money < Number(getCookie('upgradeClickCost'))){
        isClickUpgradeAvailable = false;
        $('.upgrade-button-click').css('box-shadow', '0px 0px 5px 2px #a00');
    }
    if (money < Number(getCookie('upgradeExpCost'))){
        isExpUpgradeAvailable = false;
        $('.upgrade-button-exp').css('box-shadow', '0px 0px 5px 2px #a00');
    }
}


if (getCookie('lvl') == ""){
    setCookie('exp', 0, 999);
    setCookie('requiredExp', 40, 999);
    setCookie('bonusExp', 1, 999);
    setCookie('lvl', 1, 999);
    setCookie('clickCount', 0, 999);
    setCookie('money', 0, 999);
    setCookie('moneyDrop', 1, 999);
    setCookie('upgradeClickCost', 200, 999);
    setCookie('upgradeExpCost', 200, 999);
    setCookie('upgradeMoneyCost', 200, 999);
    setCookie('upgradeMoneyLv', 1, 999);
    setCookie('upgradeExpLv', 1, 999);
    setCookie('upgradeClickLv', 1, 999);
}
var isMoneyUpgradeAvailable = false;
var isClickUpgradeAvailable = false;
var isExpUpgradeAvailable = false;
var anim = false;

$('.money-count').html(Number(getCookie('money')).toFixed(2));
$('.experience-count').html((Number(getCookie('exp')) / (Number(getCookie('requiredExp')))*100).toFixed(2) + '%');
$('.clicks').html('Kliknięcia: ' + getCookie('clickCount'));
$('.level-count').html(Number(getCookie('lvl')));
$('.upgrade-money-level').html('Poziom: ' + Number(getCookie('upgradeMoneyLv')));
$('.money-count').html(Number(getCookie('money')).toFixed(2));
$('.upgrade-money-price').html(Number(getCookie('upgradeMoneyCost')));
$('.upgrade-exp-level').html('Poziom: ' + Number(getCookie('upgradeExpLv')));
$('.money-count').html(Number(getCookie('money')).toFixed(2));
$('.upgrade-exp-price').html(Number(getCookie('upgradeExpCost')));
$('.upgrade-click-level').html('Poziom: ' + getCookie('upgradeClickLv'));
$('.money-count').html(Number(getCookie('money')).toFixed(2));
$('.upgrade-click-price').html(getCookie('upgradeClickCost'));
$('.experience-load').css('width', (Number(getCookie('exp')) / (Number(getCookie('requiredExp')))*100).toFixed(2) + '%');
        

if (Number(getCookie('money')) >= Number(getCookie('upgradeMoneyCost'))){
    isMoneyUpgradeAvailable = true;
    $('.upgrade-button-money').css('box-shadow', '0px 0px 5px 2px #008000');
}
else{
    $('.upgrade-button-money').css('box-shadow', '0px 0px 5px 2px #a00');
}
if (Number(getCookie('money')) >= Number(getCookie('upgradeExpCost'))){
    isExpUpgradeAvailable = true;
    $('.upgrade-button-exp').css('box-shadow', '0px 0px 5px 2px #008000');
}
else{
    $('.upgrade-button-exp').css('box-shadow', '0px 0px 5px 2px #a00');
}
if (Number(getCookie('money')) >= Number(getCookie('upgradeClickCost'))){
    isClickUpgradeAvailable = true;
    $('.upgrade-button-click').css('box-shadow', '0px 0px 5px 2px #008000');
}
else{
    $('.upgrade-button-click').css('box-shadow', '0px 0px 5px 2px #a00');
}

$(document).ready(function(){
    $('.source').click(function(){
        if (Number(getCookie('money')) >= 10000000000000000){
            $('.money').html('Zdobyłeś maksymalną ilość pieniędzy!');
            return false;
        }
        var clicked = true;
        var max = 255;
        var min = 0;
        var c1 = Math.floor(Math.random() * (+max - +min)) + +min;
        var c2 = Math.floor(Math.random() * (+max - +min)) + +min;
        var c3 = Math.floor(Math.random() * (+max - +min)) + +min;
        $('.source').toggle(50, function(event){
            $('.source').stop();
            $('.source').show();
            $('.source').css('background-color', 'rgba('+c1+','+c2+','+c3+',1)');
        });
        setCookie('exp', (Number(getCookie('exp'))+((Number(getCookie('bonusExp'))/2))*Number(getCookie('upgradeClickLv'))));
        setCookie('clickCount', Number(getCookie('clickCount'))+Number(getCookie('upgradeClickLv')));
        setCookie('money', Number(getCookie('money'))+(Number(getCookie('moneyDrop'))*Number(getCookie('upgradeClickLv'))));
        $('.money-count').html(Number(getCookie('money')).toFixed(2));
        $('.experience-count').html((Number(getCookie('exp')) / (Number(getCookie('requiredExp')))*100).toFixed(2) + '%');
        $('.experience-load').css('width', (Number(getCookie('exp')) / (Number(getCookie('requiredExp')))*100).toFixed(2) + '%');
        $('.clicks').html('Kliknięcia: ' + getCookie('clickCount'));
        if (Number(getCookie('exp')) >= Number(getCookie('requiredExp'))){
            setCookie('exp', 0);
            setCookie('requiredExp', Number(getCookie('requiredExp'))+(20*Number(getCookie('lvl'))));
            setCookie('lvl', Number(getCookie('lvl'))+1);
            $('.experience-count').html(Number(getCookie('exp')) + '%');
            $('.level-count').html(Number(getCookie('lvl')));
            $('.experience-load').css('width', '0%');
            setCookie('money', Number(getCookie('money'))+(100*Number(getCookie('lvl'))));
        }
        if (Number(getCookie('money')) >= Number(getCookie('upgradeMoneyCost'))){
            isMoneyUpgradeAvailable = true;
            $('.upgrade-button-money').css('box-shadow', '0px 0px 5px 2px #008000');
        }
        else{
            $('.upgrade-button-money').css('box-shadow', '0px 0px 5px 2px #a00');
        }
        if (Number(getCookie('money')) >= Number(getCookie('upgradeExpCost'))){
            isExpUpgradeAvailable = true;
            $('.upgrade-button-exp').css('box-shadow', '0px 0px 5px 2px #008000');
        }
        else{
            $('.upgrade-button-exp').css('box-shadow', '0px 0px 5px 2px #a00');
        }
        if (Number(getCookie('money')) >= Number(getCookie('upgradeClickCost'))){
            isClickUpgradeAvailable = true;
            $('.upgrade-button-click').css('box-shadow', '0px 0px 5px 2px #008000');
        }
        else{
            $('.upgrade-button-click').css('box-shadow', '0px 0px 5px 2px #a00');
        }
    })
    var i = 0;
    $(".upgrade-button-money").hover(function(){
        if (isMoneyUpgradeAvailable == true){
            $(".upgrade-button-money").css('cursor', 'pointer');
            $(".upgrade-button-money").click(function(){
                if (isMoneyUpgradeAvailable == true){
                    if (i == 0){
                        setCookie('money', Number(getCookie('money'))-Number(getCookie('upgradeMoneyCost')));
                        setCookie('moneyDrop', (Number(getCookie('moneyDrop'))+1)*1.2);
                        setCookie('upgradeMoneyCost', Number(getCookie('upgradeMoneyCost'))+50);
                        setCookie('upgradeMoneyLv', Number(getCookie('upgradeMoneyLv'))+1);
                        $('.upgrade-money-level').html('Poziom: ' + Number(getCookie('upgradeMoneyLv')));
                        $('.money-count').html(Number(getCookie('money')).toFixed(2));
                        $('.upgrade-money-price').html(Number(getCookie('upgradeMoneyCost')));
                        check(Number(getCookie('money')));
                        i++;
                    }
                }
                setTimeout(function(){i=0;}, 50);
            })
        }
        else{
            $(".upgrade-button-money").css('cursor', 'auto');
        }
    })
    $(".upgrade-button-exp").hover(function(){
        if (isExpUpgradeAvailable == true){
            $(".upgrade-button-exp").css('cursor', 'pointer');
            $(".upgrade-button-exp").click(function(){
                if (isExpUpgradeAvailable == true){
                    if (i == 0){
                        setCookie('money', Number(getCookie('money'))-Number(getCookie('upgradeExpCost')));
                        setCookie('bonusExp', Number(getCookie('bonusExp'))+1);
                        setCookie('upgradeExpCost', Number(getCookie('upgradeExpCost'))+50);
                        setCookie('upgradeExpLv', Number(getCookie('upgradeExpLv'))+1);
                        $('.upgrade-exp-level').html('Poziom: ' + Number(getCookie('upgradeExpLv')));
                        $('.money-count').html(Number(getCookie('money')).toFixed(2));
                        $('.upgrade-exp-price').html(Number(getCookie('upgradeExpCost')));
                        check(Number(getCookie('money')));
                        i++;
                    }
                }
                setTimeout(function(){i=0;}, 50);
            })
        }
        else{
            $(".upgrade-button-exp").css('cursor', 'auto');
        }
    })
    $(".upgrade-button-click").hover(function(){
        if (isClickUpgradeAvailable == true){
            $(".upgrade-button-click").css('cursor', 'pointer');
            $(".upgrade-button-click").click(function(){
                if (isClickUpgradeAvailable == true){
                    if (i == 0){
                        setCookie('money', Number(getCookie('money'))-Number(getCookie('upgradeClickCost')));
                        setCookie('upgradeClickLv', Number(getCookie('upgradeClickLv'))+1);
                        setCookie('upgradeClickCost', Number(getCookie('upgradeClickCost'))+300);
                        $('.upgrade-click-level').html('Poziom: ' + getCookie('upgradeClickLv'));
                        $('.money-count').html(Number(getCookie('money')).toFixed(2));
                        $('.upgrade-click-price').html(getCookie('upgradeClickCost'));
                        check(Number(getCookie('money')));
                        i++;
                    }
                }
                setTimeout(function(){i=0;}, 50);
            })
        }
    })
})