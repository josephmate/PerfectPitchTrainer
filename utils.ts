
function calcPercentString(numerator: number, denominator: number): string {
    if(denominator == 0){
        return "N/A";
    } else {
        return (100 * numerator / denominator).toFixed(1) + "%";
    }
}

function calcPercent(numerator: number, denominator: number): number {
    if(denominator == 0){
        return 0;
    } else {
        return (100 * numerator / denominator);
    }
}
