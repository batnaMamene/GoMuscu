import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class Method {
    constructor() {}

    getDay(dayNb: number){
        let day = "";
        switch(dayNb){
            case 0: day="Dimanche";
                break;
            case 1: day="Lundi";
                break;
            case 2: day="Mardi";
                break;
            case 3: day="Mercredi";
                break;
            case 4: day="Jeudi";
                break;
            case 5: day="Vendredi";
                break;
            case 6: day="Samedi";
                break;
        }
        return day;
    }

    getDate(date: Date){
        let jourNum = date.getDate();
        let moisNum = date.getMonth() + 1;
        const annee = date.getFullYear();

        let jour, mois;
        if(jourNum < 10)    jour = "0" + jourNum.toString();
        else  jour = jourNum.toString();
        if(moisNum < 10)    mois = "0" + moisNum.toString();
        else    mois = moisNum.toString();

    
        const dateToReturn: string = jour + "/" + mois + "/" + annee.toString();
        return dateToReturn;
    }

    calculObjectifs(poids: number, MG: number, coefLip: number, coefProt: number, activity: number){
        const MS = poids * (1 - MG/100);
        const objLip = coefLip * MS;
        const objProt = coefProt * MS;
        const calories = 300 + (370 + 21.6 * MS)*activity;
        const objGlu = (calories - (objLip*9) - (objProt*4))/4;

        const objectifs = {
            lipides: Number(objLip),
            proteines: Number(objProt),
            glucides: Number(objGlu),
            MS: Number(MS),
            calories: Number(calories)
        }

        return objectifs;
    }

    calculDepense(poids: number,MET: number, time: number){
        const depense = (MET*poids*3.5)/200;

        return Math.round(depense * time);
    }

    calculCaloriesRecette(ingredients: any[]){
        let calories: any = {
            proteines: 0,
            glucides: 0,
            fibres: 0,
            lipides: 0,
            calories: 0,
        };
        let quantity: number = 0;

        ingredients.forEach(aliment => {
            calories.proteines += aliment.proteines;
            calories.glucides += aliment.glucides;
            calories.lipides += aliment.lipides;
            calories.fibres += aliment.fibres;
            calories.calories += aliment.calories;
            quantity += aliment.quantity;
        });

        if(quantity === 0){
            return calories;
        } else{
            calories.proteines /= quantity;
            calories.glucides /= quantity;
            calories.lipides /= quantity;
            calories.fibres /= quantity;
            calories.calories /= quantity;
    
            calories.proteines = Math.round(calories.proteines * 100);
            calories.glucides = Math.round(calories.glucides * 100);
            calories.lipides = Math.round(calories.lipides * 100);
            calories.fibres = Math.round(calories.fibres * 100);
            calories.calories = Math.round(calories.calories * 100);
    
            return calories;
        }
    }

    stringToDate(toConvert: any[]){
        toConvert.forEach((element:any) => {
            const day = Number(element.date.substring(0,2));
            const month = Number(element.date.substring(3,5)) -1;
            const year = Number(element.date.substring(6));
            let date = new Date();
            date.setFullYear(year);
            date.setMonth(month);
            date.setDate(day);
            element.date = date;
        });
        return toConvert;
    }

    sortByDate(toSort: any[]){
        this.stringToDate(toSort);
        toSort.sort((a:any,b:any) => {
            if(a.date > b.date) return 1;
            else return -1;
        });
        toSort.forEach((element:any) => {
            element.date = this.getDate(element.date);
        });
        return toSort;
    }
}