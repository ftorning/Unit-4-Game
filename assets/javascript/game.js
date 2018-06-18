console.log("loaded");
var charListElems = $("#character-select");

class Character {
    constructor(name, hitPoints, atkPower, defense, imgUrl) {
        this.name = name;
        this.imgUrl = imgUrl;
        this.hitPoints = hitPoints;
        this.atkPower = atkPower;
        this.defense = defense;
        this.level = 1;
        this.currentHealth = hitPoints;
        this.exp = 0;
        this.alive = true;
    }

    checkLevelUp() {
        if (this.exp >= (this.level * 10)) {
            level++;
            this.atkPower * (1 + (level / 10));
            this.defend * (1 + (level / 10));
            this.hitPoints * (1 + (level / 10));
        }
    }

    attack() {
        var atk = Math.random() * ((this.atkPower * 1.5) - this.atkPower) + this.atkPower;
        this.exp += 10;
        return atk;
    }

    defend(opponent_attack) {
        var def = Math.random() * ((this.defense * 1.5) - this.defense) + this.defense;
        if (opponent_attack > def) {
            this.currentHealth -= (opponent_attack - def);
            if (this.currentHealth <= 0) {
                this.alive == false;
            }
        } else {
            0;
        }
        this.exp += 10;
    }
   
}

sponge = new Character("Spongebob", 100, 10, 10, './assets/images/spongebob.jpg');
squid = new Character("Squidward", 90, 12, 8, './assets/images/squidward.png');
star = new Character("Patrick", 120, 8, 12, './assets/images/patrick.gif');
krab = new Character("Mr. Krabs", 150, 4, 15, './assets/images/MrKrabs.jpg');
console.log(sponge);

charList = [sponge, squid, star, krab];

$(document).ready(function() {
    $.each(charList, function(i) {
        console.log(charList[i]);
        var charCard = $('<div/>');
        charCard.attr('id', charList[i].name);
        charCard.addClass("card");
        charCard.addClass("text-center");
        charCard.css("width", "16rem");

        var charImg = $('<img/>');
        charImg.addClass("card-img-top");
        charImg.css("width", "100%");
        charImg.attr('src', charList[i].imgUrl);
        charImg.attr('alt', charList[i].name);

        var charCardBody = $('<div/>');
        charCardBody.addClass('card-body');

        var charTitle = $('<h5/>');
        charTitle.addClass('card-title');
        charTitle.text(charList[i].name);

        var charHp = $('<p/>');
        charHp.text('Hit Points: ' + charList[i].hitPoints);
        
        var charAttack = $('<p/>');
        charAttack.text('Attack Power: ' + charList[i].atkPower);

        var charDef = $('<p/>');
        charDef.text('Defense: ' + charList[i].defense);

        charCardBody.append([charTitle, charHp, charAttack, charDef]);
        charCard.append([charImg, charCardBody]);
        charListElems.append(charCard);

    })
});


