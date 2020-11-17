//UC1 Check if present
{
    const IS_ABSENT = 0
    let empCheck = Math.floor(Math.random() * 10) % 2;
    if(empCheck == IS_ABSENT){
        console.log("Employee is Absent");
        return;
    }else{
        console.log("Employee is Present");
    }
}

//UC2, UC3 Calculate wage
const IS_PART_TIME = 1;
const IS_FULL_TIME = 2;
const PART_TIME_HRS = 4;
const FULL_TIME_HRS = 8;
const WAGE_PER_HOUR = 20;
const NUM_OF_WORKING_DAYS = 20;
function getWorkingHrs(empCheck){
    switch(empCheck){
        case IS_PART_TIME:
                return PART_TIME_HRS;
        case IS_FULL_TIME:
                return FULL_TIME_HRS;
        default:
                return 0;
    }
}
let empCheck = Math.floor(Math.random() * 10)%3;
let empHrs = getWorkingHrs(empCheck);
let empWage = empHrs * WAGE_PER_HOUR;
console.log("Daily wage : " + empWage);

//UC4 Total Hours
let empHrs = 0;
for(var i = 0; i < NUM_OF_WORKING_DAYS; i++){
    let empCheck = Math.floor(Math.random() * 10) % 3;
    empHrs+= getWorkingHrs(empCheck);
}
let empWage = empHrs * WAGE_PER_HOUR;
console.log("Total hrs : " + empHrs + " Emp wage : " + empWage);

//UC5, UC6 Total Employee Wage
let totalEmpHrs = 0;
let empWageArr = new Array();
let empDailyHrsAndWageArr = new Array();
let empDailyWageMap = new Map();
let empHrsMap = new Map();
function calcDailyWage(empHrs){
    return empHrs * WAGE_PER_HOUR;
}
while(totalEmpHrs < MAX_WORKING_HRS && totalWorkingDays < NUM_OF_WORKING_DAYS){
    totalWorkingDays++;
    let empCheck = Math.floor(Math.random() * 10) % 3;
    let empHrs = getWorkingHrs(empCheck);
    totalEmpHrs += empHrs;
    empWageArr.push(calcDailyWage(empHrs));
    empHrsMap.set(totalWorkingDays, empHrs);
    empDailyWageMap.set(totalWorkingDays, calcDailyWage(empHrs))
    empDailyHrsAndWageArr.push({
        dayNum : totalWorkingDays,
        dailyHours : empHrs,
        dailyWage: calcDailyWage(empHrs),
        toString(){
            return "\nDay "+ this.dayNum + " => Working Hours is "+
                    this.dailyHours+" And Wage Earned = "+this.dailyWage;
        }
    });
}
let employeeWage = calcDailyWage(totalEmpHrs);
console.log("Total hrs : " + totalEmpHrs + " Total Employee Wage : " + employeeWage);

// UC7 Using array functions
let totalEmpWage = 0;
function sum(dailyWage){
    totalEmpWage +=dailyWage;
}
empWageArr.forEach(sum);
console.log(" Total employee wage using forEach: "+totalEmpWage);

function totalWages(totalWage, dailyWage){
    console.log("TotalWages function: "+totalWage)
    return totalEmpWage + dailyWage;
}
console.log("With reduce "+empWageArr.reduce(totalWages,0));
let dailyCounter = 0;
function dayAlongWithWage(dailyWage){
    dailyCounter++;
    return dailyCounter + " = " + dailyWage;
}
let mapDayWithWage = empWageArr.map(dayAlongWithWage);
console.log(" Day along with daily wage ");
console.log(mapDayWithWage);

function fullTimeWage(dailyWage){
    return dailyWage.includes("160");
}
let fullDayWageArr = mapDayWithWage.filter(fullTimeWage);
console.log(" Full Time wage : ");
console.log(fullDayWageArr);

console.log(" Find first occurence of full time wage: "+ mapDayWithWage.find(fullTimeWage));

function isAllFullTimeWage(dailyWage){
    return dailyWage.includes("160");
}
console.log(" Check all elements have full time wage: "+fullDayWageArr.every(isAllFullTimeWage));

function isAnyPartTimeWage(dailyWage){
    return dailyWage.includes("80");
}
console.log(" Check if any part time wage: "+mapDayWithWage.some(isAnyPartTimeWage));
function totalDaysWorked(numOfDays,dailyWage){
    if(dailyWage > 0) return numOfDays + 1;
    return numOfDays;
}
console.log(" Number of days employee worked : "+ empWageArr.reduce(totalDaysWorked,0));

//UC8 Using map
console.log(" Emp wage map totalHrs : " + Array.from(empDailyWageMap.values()).reduce(totalWages,0));

//UC9 Using Employee Hours map
const findTotal = (totalVal, dailyVal) => {
    console.log("Findtotal: "+totalVal);
    return totalVal+dailyVal;
}

let totalHours = Array.from(empHrsMap.values()).reduce(findTotal, 0);
let totalSalary = empWageArr.filter(dailyWage => dailyWage > 0).reduce(findTotal,0);
console.log(" Total hours: "+totalHours + " Total Salary: "+totalSalary);

let nonWorkingDays = new Array();
let partWorkingDays = new Array();
let fullWorkingDays = new Array();

empHrsMap.forEach((value, key) => {
    if(value == 8) fullWorkingDays.push(key);
    else if(value == 4) partWorkingDays.push(key);
    else  nonWorkingDays.push(key);
});

console.log("Full time working days : "+ fullWorkingDays);
console.log("Part time working days : "+ partWorkingDays);
console.log("Non working days : "+ nonWorkingDays);

//UC10
console.log("Employee Hours and Daily wage : " + empDailyHrsAndWageArr );

//UC11 
let totalwages = empDailyHrsAndWageArr.filter(dailyHrsAndWage => dailyHrsAndWage.dailyWage > 0)
                    .reduce((totalWage, dailyHrsAndWage) => totalWage += dailyHrsAndWage.dailyWage,0);

let totalhours = empDailyHrsAndWageArr.filter(dailyHrsAndWage => dailyHrsAndWage.dailyWage > 0)
                    .reduce((totalHours, dailyHrsAndWage) => totalHours += dailyHrsAndWage.dailyHours,0);

console.log(" Total hours: " + totalhours + " total wage: " + totalwages);

console.log(" Logging full work days");
empDailyHrsAndWageArr.filter(dailyHrsAndWage => dailyHrsAndWage.dailyWage > 0)
                    .forEach(dailyHrsAndWage => console.log(dailyHrsAndWage.toString()));

let partWorkingDaysArr = empDailyHrsAndWageArr.filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours == 4)
                                                .map(dailyHrsAndWage => dailyHrsAndWage.toString());
console.log(" Part working days: " + partWorkingDaysArr);

let fullWorkingDaysArr = empDailyHrsAndWageArr.filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours == 8)
                                                .map(dailyHrsAndWage => dailyHrsAndWage.toString());
console.log(" Part working days: " + fullWorkingDaysArr); 