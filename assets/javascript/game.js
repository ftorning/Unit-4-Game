console.log("loaded");
var charListElems = $("#character-select");

var player;
var opponent;
var playerArea = $('#player-area');
var opponentArea = $('#opponent-area');
var title = $('#section-title');
var atkBtn = $('#atk-btn');

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
        if (this.exp >= (this.level * 100)) {
            this.exp -= (this.level * 100);
            this.level++;
            this.atkPower *= (1 + (this.level / 10));
            this.defense *= (1 + (this.level / 10));
            this.hitPoints *= (1 + (this.level / 10));
        }
    }

    attack() {
        var atk = Math.floor(Math.random() * ((this.atkPower * 1.5) - this.atkPower) + this.atkPower);
        this.exp += 10;
        return atk;
    }

    defend(opponent_attack) {
        var def = Math.floor(Math.random() * ((this.defense * 0.5) - this.defense) + this.defense);
        if (opponent_attack > def) {
            this.currentHealth -= (opponent_attack - def);
            if (this.currentHealth <= 0) {
                this.alive == false;
            }
        } else {
            0;
        }
        this.exp += 10;
        return (opponent_attack - def)
    }

    createCard() {
        var charCard = $('<div/>');
        charCard.attr('id', this.name);
        charCard.addClass("card");
        charCard.addClass("text-center");
        charCard.css("width", "16rem");

        var charImg = $('<img/>');
        charImg.addClass("card-img-top");
        charImg.css("height", "160px");
        charImg.css("width", "100%");
        charImg.attr('src', this.imgUrl);
        charImg.attr('alt', this.name);

        var charCardBody = $('<div/>');
        charCardBody.addClass('card-body');

        var charTitle = $('<h5/>');
        charTitle.addClass('card-title');
        charTitle.text(this.name);

        var charHp = $('<p/>');
        charHp.addClass('card-hp');
        charHp.text('Hit Points: ' + this.hitPoints);
        
        var charAttack = $('<p/>');
        charAttack.addClass('card-atk');
        charAttack.text('Attack Power: ' + this.atkPower);

        var charDef = $('<p/>');
        charDef.addClass('card-def');
        charDef.text('Defense: ' + this.defense);

        var charHlth = $('<p/>');
        charHlth.addClass('card-hlth');
        charHlth.text('CurrentHealth: ' + this.currentHealth);
        
        charCardBody.append([charTitle, charHp, charAttack, charDef, charHlth]);
        charCard.append([charImg, charCardBody]);
        charListElems.append(charCard);
    }
   
    getCard() {
        return $('#' + this.name);
    }

    refreshCard(character) {
        if (this.currentHealth <= 0) {
            if (character === "player") {
                alert('You Lose!');
            } else if (character === "opponent") {
                alert('You win!')
            }
            
        } else {
            this.checkLevelUp();
            var card = this.getCard();
            var hp = card.find(".card-hp");
            hp.text('Hit Points: ' + this.hitPoints);
            var atk = card.find(".card-atk");
            atk.text('Attack Power: ' + this.atkPower);
            var def = card.find(".card-def");
            def.text('Defense: ' + this.defense);
            var hlth = card.find(".card-hlth");
            hlth.text('CurrentHealth: ' + this.currentHealth);
        }
    }
   
}

sponge = new Character("Spongebob", 100, 10, 10, './assets/images/spongebob.jpg');
squid = new Character("Squidward", 90, 12, 8, './assets/images/squidward.png');
star = new Character("Patrick", 120, 8, 12, './assets/images/patrick.gif');
krab = new Character("Mr_Krabs", 150, 4, 15, './assets/images/MrKrabs.jpg');
console.log(sponge);

charList = [sponge, squid, star, krab];

// function popPlayerChoice
function characterChoice() {
    $.each(charList, function(i) {
        charList[i].createCard();
    })
    
    $('#character-select .card').on('click', function() {
        if (!player) {
            for (var i = 0; i < charList.length; i++) {
                if (charList[i].name === $(this).attr('id')) {
                    player = charList[i];
                }
            }
            $(this).appendTo(playerArea);
            $(this).css('background-color', '#77dd77');
            title.text('Select an opponent');
        } else if (player && !opponent) {
            for (var i = 0; i < charList.length; i++) {
                if (charList[i].name === $(this).attr('id')) {
                    opponent = charList[i];
                }
            }
            $(this).appendTo(opponentArea);
            $(this).css('background-color', '#ff6961');
            $('#character-select').addClass('d-none');
            title.text('BATTLE');
        }
    })
}

function playerAttack() {
    opponent.getCard().effect( "shake", {times:4}, 250 );
    console.log(opponent);
    var dmg = opponent.defend(player.attack());
    opponent.refreshCard("opponent");
    console.log(dmg);
    console.log(opponent.currentHealth);
    setTimeout(function() {
        player.getCard().effect( "shake", {times:4}, 250 );
        var dmg = player.defend(player.attack());
        player.refreshCard("player");
    }, 1000);
    
    
}


$(document).ready(function() {
    characterChoice()

    atkBtn.on('click', playerAttack);
});


