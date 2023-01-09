class Piringku {

    constructor() {
        if(!localStorage.getItem("piring")) {
            localStorage.setItem("piring", "[]");
        }
    }

    throwPiring() {
        localStorage.clear("piring");
    }

    getPiring() {
        return JSON.parse(localStorage.getItem("piring"))
    }

    appendToPiring(data) {
        let piring = JSON.parse(localStorage.getItem("piring"))
        piring.push(data)
        localStorage.setItem("piring", JSON.stringify(piring))
    }

    removeFromPiring(data) {
        let piring = JSON.parse(localStorage.getItem("piring"))
        piring.forEach((e) => {
            
        })
        
    }

    emptyPiring() {
        localStorage.setItem("piring", "[]");
    }

    calculatePiring() {
        let piring = JSON.parse(localStorage.getItem("piring"))

        let retval = {
            tot_carbs : 0,
            tot_protein: 0,
            tot_sodium: 0,
            remarks: "All unit is stated in grams"
        }

        piring.forEach((e) => {
            console.log(e)
            retval.tot_carbs += e.data.nf_total_carbohydrate
            retval.tot_protein += e.data.nf_protein
            retval.tot_sodium += e.data.nf_sodium/1000
        })

        return retval;
    }
}

export default Piringku;