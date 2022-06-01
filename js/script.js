'use strict';

class CulculatorValute {
    constructor({ card }) {

        this.card = document.querySelector(card);
        this.moneyType = this.card.querySelector('.moneyType');
        this.moneyType = this.card.querySelector('.moneyType');
        this.currentDate = this.card.querySelector('h2');
        this.inputChangeMoney = this.card.querySelector('.inputChangeMoney');
        this.valutaChange = this.card.querySelector('.valutaChange');
        this.buttonEqual = this.card.querySelector('.buttonEqual');
        this.rowChangeValute = this.card.querySelector('.rowChangeValute');
        this.resultChangeMoney = this.card.querySelector('.resultChangeMoney');
        this.valutaResult = this.card.querySelector('.valutaResult');

    }

    setCurrentDate() {
        let date = new Date();
        let day, month;
        if (date.getDate() < 10) { day = `0${date.getDate()}`; }
        else { day = date.getDate(); }
        if ((date.getMonth() + 1) < 10) { month = `0${date.getMonth() + 1}`; }
        else { month = date.getMonth() + 1; }
        this.currentDate.innerText = `${day}.${month}.${date.getFullYear()}`;
    }


    defualtValues() {
        sessionStorage.setItem('selectTypeMoney', 0);
        sessionStorage.setItem('selectTypeValuteForChange', "usd");
        sessionStorage.setItem('selectTypeValuteForBuy', "usd");
    }

    setTypeMoney() {
        this.moneyType.addEventListener('change', (even) => {
            let target = even.target;
            if (target.value == "Nul") {
                sessionStorage.setItem('selectTypeMoney', 0); //Наличный расчет
            } else {
                sessionStorage.setItem('selectTypeMoney', 1); //Безналичный расчет
            }
        });
    }

    setTypeValuteForChange() {
        this.valutaChange.addEventListener('change', (even) => {
            let target = even.target;
            if (target.value == "usd") {
                sessionStorage.setItem('selectTypeValuteForChange', "usd"); //usd
            } else if (target.value == "eur") {
                sessionStorage.setItem('selectTypeValuteForChange', "eur"); //eur
            } else {
                sessionStorage.setItem('selectTypeValuteForChange', "uah"); //uah
            }
        })
    }

    setTypeValuteForBuy() {
        this.valutaResult.addEventListener('change', (even) => {
            let target = even.target;
            if (target.value == "usd") {
                sessionStorage.setItem('selectTypeValuteForBuy', "usd"); //usd
            } else if (target.value == "eur") {
                sessionStorage.setItem('selectTypeValuteForBuy', "eur"); //eur
            } else {
                sessionStorage.setItem('selectTypeValuteForBuy', "uah"); //uah
            }
        })
    }

    clickOnButtonChangeValute() {
        this.rowChangeValute.addEventListener('click', () => {
            this.valutaChange.value = sessionStorage.getItem('selectTypeValuteForBuy');
            this.valutaResult.value = sessionStorage.getItem('selectTypeValuteForChange');

            sessionStorage.setItem('selectTypeValuteForChange', this.valutaChange.value);
            sessionStorage.setItem('selectTypeValuteForBuy', this.valutaResult.value);
        })
    }

    inputMoneyForChange() {
        this.inputChangeMoney.addEventListener('change', (even) => {
            let target = even.target;
            sessionStorage.setItem('inputChangeMoney', target.value);
        })
    }

    clickOnButtonGetResult() {
        this.buttonEqual.addEventListener('click', () => {

            let coefficient;
            let IamSell = sessionStorage.getItem('selectTypeValuteForChange');
            let IamBuy = sessionStorage.getItem('selectTypeValuteForBuy');

            if (sessionStorage.getItem('selectTypeMoney') == 0) {
                if ((IamSell == "usd") && (IamBuy == "uah")) {
                    coefficient = Number(sessionStorage.getItem('koefPerevod__USD__to__UAH__Nul'));
                } else if ((IamSell == "eur") && (IamBuy == "uah")) {
                    coefficient = Number(sessionStorage.getItem('koefPerevod__EUR__to__UAH__Nul'));
                } else if ((IamSell == "uah") && (IamBuy == "usd")) {
                    coefficient = Number(sessionStorage.getItem('koefPerevod__UAH__to__USD__Nul'));
                } else if ((IamSell == "uah") && (IamBuy == "eur")) {
                    coefficient = Number(sessionStorage.getItem('koefPerevod__UAH__to__EUR__Nul'));
                } else if ((IamSell == "usd") && (IamBuy == "eur")) {
                    coefficient = Number(sessionStorage.getItem('koefPerevod__USD__to__EUR__Nul'));
                } else if ((IamSell == "eur") && (IamBuy == "usd")) {
                    coefficient = Number(sessionStorage.getItem('koefPerevod__EUR__to__USD__Nul'));
                } else { coefficient = 1; }
            }
            else {
                if ((IamSell == "usd") && (IamBuy == "uah")) {
                    coefficient = Number(sessionStorage.getItem('koefPerevod__USD__to__UAH__Beznul'));
                } else if ((IamSell == "eur") && (IamBuy == "uah")) {
                    coefficient = Number(sessionStorage.getItem('koefPerevod__EUR__to__UAH__Beznul'));
                } else if ((IamSell == "uah") && (IamBuy == "usd")) {
                    coefficient = Number(sessionStorage.getItem('koefPerevod__UAH__to__USD__Beznul'));
                } else if ((IamSell == "uah") && (IamBuy == "eur")) {
                    coefficient = Number(sessionStorage.getItem('koefPerevod__UAH__to__EUR__Beznul'));
                } else if ((IamSell == "usd") && (IamBuy == "eur")) {
                    coefficient = Number(sessionStorage.getItem('koefPerevod__USD__to__EUR__Beznul'));
                } else if ((IamSell == "eur") && (IamBuy == "usd")) {
                    coefficient = Number(sessionStorage.getItem('koefPerevod__EUR__to__USD__Beznul'));
                }
                else { coefficient = 1; }
            }

            this.resultChangeMoney.value = (Number(sessionStorage.getItem('inputChangeMoney'))) * coefficient;
        })
    }

    getObjectNulMoney() {
        const requestNul = new XMLHttpRequest();

        requestNul.addEventListener('readystatechange', () => {

            if ((requestNul.readyState === 4) && (requestNul.status === 200)) {
                const dataNul = JSON.parse(requestNul.responseText);

                let koefPerevod__USD__to__UAH__Nul = dataNul[0].buy;
                let koefPerevod__UAH__to__USD__Nul = dataNul[0].sale;
                let koefPerevod__EUR__to__UAH__Nul = dataNul[1].buy;
                let koefPerevod__UAH__to__EUR__Nul = dataNul[1].sale;

                sessionStorage.setItem('koefPerevod__USD__to__UAH__Nul', koefPerevod__USD__to__UAH__Nul);
                sessionStorage.setItem('koefPerevod__UAH__to__USD__Nul', 1 / koefPerevod__UAH__to__USD__Nul);
                sessionStorage.setItem('koefPerevod__EUR__to__UAH__Nul', koefPerevod__EUR__to__UAH__Nul);
                sessionStorage.setItem('koefPerevod__UAH__to__EUR__Nul', 1 / koefPerevod__UAH__to__EUR__Nul);

                sessionStorage.setItem('koefPerevod__USD__to__EUR__Nul', koefPerevod__USD__to__UAH__Nul / koefPerevod__UAH__to__EUR__Nul);
                sessionStorage.setItem('koefPerevod__EUR__to__USD__Nul', koefPerevod__EUR__to__UAH__Nul / koefPerevod__UAH__to__USD__Nul);
            }
        });

        requestNul.open('GET', 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
        requestNul.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        requestNul.send();

    }

    getObjectBeznulMoney() {
        const requestBeznul = new XMLHttpRequest();

        requestBeznul.addEventListener('readystatechange', () => {

            if ((requestBeznul.readyState === 4) && (requestBeznul.status === 200)) {
                const dataBeznul = JSON.parse(requestBeznul.responseText);

                let koefPerevod__USD__to__UAH__Beznul = dataBeznul[0].buy;
                let koefPerevod__UAH__to__USD__Beznul = dataBeznul[0].sale;
                let koefPerevod__EUR__to__UAH__Beznul = dataBeznul[1].buy;
                let koefPerevod__UAH__to__EUR__Beznul = dataBeznul[1].sale;

                sessionStorage.setItem('koefPerevod__USD__to__UAH__Beznul', koefPerevod__USD__to__UAH__Beznul);
                sessionStorage.setItem('koefPerevod__UAH__to__USD__Beznul', 1 / koefPerevod__UAH__to__USD__Beznul);
                sessionStorage.setItem('koefPerevod__EUR__to__UAH__Beznul', koefPerevod__EUR__to__UAH__Beznul);
                sessionStorage.setItem('koefPerevod__UAH__to__EUR__Beznul', 1 / koefPerevod__UAH__to__EUR__Beznul);

                sessionStorage.setItem('koefPerevod__USD__to__EUR__Beznul', koefPerevod__USD__to__UAH__Beznul / koefPerevod__UAH__to__EUR__Beznul);
                sessionStorage.setItem('koefPerevod__EUR__to__USD__Beznul', koefPerevod__EUR__to__UAH__Beznul / koefPerevod__UAH__to__USD__Beznul);

            }
        });

        requestBeznul.open('GET', 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11');
        requestBeznul.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        requestBeznul.send();

    }

    init() {
        this.getObjectNulMoney();
        this.getObjectBeznulMoney();
        this.defualtValues();
        this.setCurrentDate();
        this.setTypeMoney();
        this.setTypeValuteForChange();
        this.setTypeValuteForBuy();
        this.inputMoneyForChange();
        this.clickOnButtonChangeValute();
        this.clickOnButtonGetResult();

    }
}

