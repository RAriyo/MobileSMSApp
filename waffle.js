const Order = require("./order");

//list of the items that will be displayed on the bot
const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    SYRUP:   Symbol("syrup"),
    ICECREAM: Symbol("icecream"),
    CHICKENWINGS:  Symbol("chickenwings")
});

module.exports = class WaffleOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sSyrup = "";
        this.sIceCream = "";
        this.sChickenwings = "";
        this.sItem = "waffles";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Riri's Waffle Store.");
                aReturn.push("What size would you like?");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.SYRUP
                this.sSize = sInput;
                aReturn.push("What syrup would you like?");
                break;
            case OrderState.SYRUP:
                this.stateCur = OrderState.ICECREAM
                this.sSyrup = sInput;
                aReturn.push("What flavor of ice cream would you like?");
                break;
            case OrderState.ICECREAM:
                this.stateCur = OrderState.CHICKENWINGS
                this.sIceCream = sInput;
                aReturn.push("Would you like chicken wings with that?");
                break;
            case OrderState.CHICKENWINGS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sChickenwings = sInput;
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem}, ${this.sSyrup} syrup and ${this.sIceCream} ice cream`);
                
                if (this.sChickenwings) {
                    
                    aReturn.push('with chicken wings');
                }

                let wafflePrice = 0;
                let waffleSize = (this.sSize).toLowerCase();
                let chickenWings = (this.sChickenwings).toLowerCase();
                if (waffleSize == "small")
                {
                    wafflePrice = 5;
                }
                else if (waffleSize == "medium")
                {
                    wafflePrice = 10;
                }
                else if (waffleSize == "large")
                {
                    wafflePrice = 20;
                }
                // list of prices of items sold in the store
                let syrupPrice = 5;
                let iceCreamPrice = 10;
                let chickenWingsPrice = 0;
                if (chickenWings == "yes") chickenWingsPrice = 10;
                
                let subtotal = wafflePrice + syrupPrice + iceCreamPrice + chickenWingsPrice;
                let hst = 0.13 * subtotal;
                let total = (subtotal + hst).toFixed(2);

                aReturn.push('your order costs, $'+total + ' (tax incl)');

                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
             
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}
